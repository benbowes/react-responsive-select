import * as React from 'react';
import singleline from 'singleline';
import * as actionTypes from './constants/actionTypes';
import { handleBlur, handleClick, handleKeyEvent, handleTouchMove, handleTouchStart } from './lib/eventHandlers';
import { getCustomLabelText } from './lib/getCustomLabelText';
import { multiSelectBroadcastChange, singleSelectBroadcastChange } from './lib/onChangeBroadcasters';
import { initialState } from './reducers/initialState';
import { reducer } from './reducers/reducer';
import { isEqual } from './lib/isEqual';
import { IAction, IProps, IState } from './types/';

import { MultiSelect } from './components/MultiSelect';
import { SingleSelect } from './components/SingleSelect';

export class Select extends React.Component<IProps, IState> {
  public selectBox: HTMLDivElement | null;
  private reducer: (state: IState, action: IAction) => IState;
  private firstLoad: boolean;

  constructor(props: IProps) {
    super(props);
    this.state = initialState;
    this.reducer = reducer;
    this.firstLoad = true;
    this.selectBox = null;
  }

  public componentDidMount(): void {
    const { options, noSelectionLabel, selectedValue, selectedValues, name, multiselect, disabled } = this.props;

    this.updateState({
      type: actionTypes.INITIALISE,
      value: {
        options,
        noSelectionLabel,
        selectedValue,
        selectedValues,
        name,
        multiselect,
        disabled,
      },
    });
  }

  /**
   * Allow for the component to be updated/controlled via props after componentDidMount
   */
  public UNSAFE_componentWillReceiveProps(nextProps: IProps): void {
    if (!isEqual(nextProps, this.props)) {
      this.updateState({
        type: actionTypes.UPDATE_VIA_PROPS,
        value: { ...this.props, ...nextProps },
      });
    }
  }

  /* Broadcast change when there has been one */
  public componentDidUpdate(_prevProps: IProps, prevState: IState): boolean {
    const { singleSelectSelectedOption, multiSelectSelectedOptions, multiselect, altered } = this.state;
    const { onChange } = this.props;

    if (this.firstLoad) {
      this.firstLoad = false;
      return false;
    }

    if (multiselect) {
      multiSelectBroadcastChange(
        multiSelectSelectedOptions.options,
        Boolean(altered),
        onChange,
        prevState.multiSelectSelectedOptions.options
      );
    } else {
      singleSelectBroadcastChange(
        singleSelectSelectedOption,
        Boolean(altered),
        onChange,
        prevState.singleSelectSelectedOption
      );
    }

    return true;
  }

  public updateState(action: IAction, callback?: (nextState: IState) => any): void {
    const { onListen, name } = this.props;
    const nextState = this.reducer(this.state, action);

    this.setState(nextState, () => {
      if (callback) {
        callback(nextState);
      }
    });

    /* Allow user to listen to actions being fired */
    if (onListen) {
      const isOpen = [
        actionTypes.SET_OPTIONS_PANEL_OPEN,
        actionTypes.SET_NEXT_SELECTED_INDEX,
        actionTypes.SET_NEXT_SELECTED_INDEX_ALPHA_NUMERIC,
        actionTypes.SET_IS_DRAGGING,
      ].some((actionType: string) => action.type === actionType);

      onListen(isOpen, name, action.type);
    }
  }

  public focusButton(): void {
    const el: HTMLDivElement | null = this.selectBox && this.selectBox.querySelector('.rrs__button');
    // tslint:disable-next-line no-unused-expression
    el && el.focus();
  }

  public onHandleKeyEvent = (e: any): void => {
    handleKeyEvent({
      event: e,
      RRSClassRef: this,
      state: this.state,
      props: this.props,
    });
  };

  public onHandleTouchStart = (_e: any): void => {
    handleTouchStart({
      RRSClassRef: this,
      state: this.state,
    });
  };

  public onHandleTouchMove = (_e: any): void => {
    handleTouchMove({
      RRSClassRef: this,
      state: this.state,
    });
  };

  public onHandleClick = (e: any): void => {
    handleClick({
      event: e,
      RRSClassRef: this,
      state: this.state,
      props: this.props,
    });
  };

  public onHandleBlur = (_e: any): void => {
    handleBlur({
      RRSClassRef: this,
      state: this.state,
      props: this.props,
    });
  };

  public render(): React.ReactNode {
    const { prefix, caretIcon, disabled, modalCloseButton } = this.props;
    const {
      altered,
      hasOptHeaders,
      isOptionsPanelOpen,
      isDragging,
      noSelectionLabel,
      multiSelectSelectedIndexes,
      multiSelectSelectedOptions,
      name,
      nextPotentialSelectionIndex,
      options,
      singleSelectSelectedIndex,
      singleSelectSelectedOption,
      multiselect,
    } = this.state;

    const customLabelText = getCustomLabelText({
      props: this.props,
      state: this.state,
    });

    return (
      <div
        data-testid={name}
        data-name={name}
        className={singleline(`
          rrs
          ${isOptionsPanelOpen === true ? 'rrs--options-visible' : ''}
          ${altered ? 'rrs--has-changed' : ''}
          ${hasOptHeaders ? 'rrs--has-opt-headers' : ''}
        `)}
        ref={(r: HTMLDivElement): void => {
          this.selectBox = r;
        }}
        tabIndex={-1}
        onKeyDown={this.onHandleKeyEvent}
        onTouchStart={this.onHandleTouchStart}
        onTouchMove={this.onHandleTouchMove}
        onTouchEnd={this.onHandleClick}
        onMouseDown={this.onHandleClick}
        onBlur={this.onHandleBlur}
      >
        {!!modalCloseButton && isOptionsPanelOpen === true && (
          <div aria-hidden="true" className="mobile-close">
            {modalCloseButton}
          </div>
        )}
        {multiselect ? (
          <MultiSelect
            disabled={Boolean(disabled)}
            isDragging={isDragging}
            caretIcon={caretIcon}
            customLabelText={customLabelText}
            prefix={prefix || ''}
            name={name}
            multiSelectSelectedOptions={multiSelectSelectedOptions}
            multiSelectSelectedIndexes={multiSelectSelectedIndexes}
            nextPotentialSelectionIndex={nextPotentialSelectionIndex}
            isOptionsPanelOpen={isOptionsPanelOpen}
            options={options}
            selectBoxRef={this.selectBox}
          />
        ) : (
          <SingleSelect
            noSelectionLabel={noSelectionLabel || ''}
            disabled={Boolean(disabled)}
            caretIcon={caretIcon}
            prefix={prefix || ''}
            name={name}
            customLabelText={customLabelText}
            singleSelectSelectedOption={singleSelectSelectedOption}
            singleSelectSelectedIndex={singleSelectSelectedIndex}
            nextPotentialSelectionIndex={nextPotentialSelectionIndex}
            isOptionsPanelOpen={isOptionsPanelOpen}
            options={options}
            selectBoxRef={this.selectBox}
          />
        )}
      </div>
    );
  }
}

export * from './Extras';
export * from './types/';
