import * as isEqual from 'lodash.isequal';
import * as React from 'react';
import singleline from 'singleline-next';
import * as actionTypes from './constants/actionTypes';
import debugReportChange from './lib/debugReportChange';
import { handleBlur, handleClick, handleKeyEvent, handleTouchMove, handleTouchStart } from './lib/eventHandlers';
import getCustomLabelText from './lib/getCustomLabelText';
import { multiSelectBroadcastChange, singleSelectBroadcastChange } from './lib/onChangeBroadcasters';
import initialState from './reducers/initialState';
import reducer from './reducers/reducer';
import { IAction, IProps, IState } from './types/';

import MultiSelect from './components/MultiSelect';
import SingleSelect from './components/SingleSelect';

export default class ReactResponsiveSelect extends React.Component<IProps, IState> {
  public selectBox: HTMLDivElement | null;
  private reducer: (state: IState, action: IAction) => IState;

  constructor(props: IProps) {
    super(props);
    this.state = initialState;
    this.reducer = reducer;
  }

  public componentDidMount(): void {
    const {
      options,
      noSelectionLabel,
      selectedValue,
      selectedValues,
      name,
      multiselect,
      disabled,
    } = this.props;

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
  public componentWillReceiveProps(nextProps: IProps): void {
    if (!isEqual(nextProps, this.props)) {
      this.updateState({
        type: actionTypes.UPDATE_VIA_PROPS,
        value: { ...this.props, ...nextProps },
      });
    }
  }

  /* Broadcast change when there has been one */
  public componentDidUpdate(prevProps: IProps, prevState: IState): boolean {
    const {
      singleSelectSelectedOption,
      multiSelectSelectedOptions,
      multiselect,
      altered,
    } = this.state;

    const { onChange } = this.props;

    if (multiselect) {
      multiSelectBroadcastChange(
        multiSelectSelectedOptions.options,
        Boolean(altered),
        onChange,
        prevState.multiSelectSelectedOptions.options,
      );
    } else {
      singleSelectBroadcastChange(
        singleSelectSelectedOption,
        Boolean(altered),
        onChange,
        prevState.singleSelectSelectedOption,
      );
    }

    return true;
  }

  public updateState(action: IAction, callback?: (nextState: IState) => any): void {
    const nextState = this.reducer(this.state, action);
    this.setState(nextState, () => {
      if (callback) {
        callback(nextState);
      }
    });

    /* To debug actions plus their resulting state whilst developing, add ?debug=true */
    debugReportChange(this.props.name, action, nextState);
  }

  public focusButton(): void {
    const el: HTMLDivElement | null =
      this.selectBox && this.selectBox.querySelector('.rrs__button');
    // tslint:disable-next-line no-unused-expression
    el && el.focus();
  }

  public render(): React.ReactNode {
    const { prefix, caretIcon, disabled } = this.props;
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
        onKeyDown={(e: any): void => {
          handleKeyEvent({
            event: e,
            ReactResponsiveSelectClassRef: this,
            state: this.state,
            props: this.props,
          });
        }}
        onTouchStart={(): void =>
          handleTouchStart({
            ReactResponsiveSelectClassRef: this,
            state: this.state,
          })
        }
        onTouchMove={(): void =>
          handleTouchMove({
            ReactResponsiveSelectClassRef: this,
            state: this.state,
          })
        }
        onTouchEnd={(e: any): void =>
          handleClick({
            event: e,
            ReactResponsiveSelectClassRef: this,
            state: this.state,
          })
        }
        onMouseDown={(e: any): void =>
          handleClick({
            event: e,
            ReactResponsiveSelectClassRef: this,
            state: this.state,
          })
        }
        onBlur={(): void =>
          handleBlur({
            ReactResponsiveSelectClassRef: this,
            state: this.state,
            props: this.props,
          })
        }
      >
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
