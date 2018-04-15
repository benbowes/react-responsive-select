import React, { Component } from 'react';
import singleline from 'singleline';
import isEqual from 'lodash.isequal';
import { ReactResponsiveSelectProps } from './propTypes';
import handleKeyEvent from './lib/handleKeyEvent';
import handleTouchStart from './lib/handleTouchStart';
import handleTouchMove from './lib/handleTouchMove';
import handleClick from './lib/handleClick';
import handleBlur from './lib/handleBlur';
import getCustomLabelText from './lib/getCustomLabelText';
import * as actionTypes from './constants/actionTypes';
import reducer, { initialState } from './reducers/reducer';
import SingleSelect from './components/SingleSelect';
import MultiSelect from './components/MultiSelect';
import debugReportChange from './lib/debugReportChange';
import { singleSelectBroadcastChange, multiSelectBroadcastChange } from './lib/onChangeBroadcasters';

export default class ReactResponsiveSelect extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.reducer = reducer;
  }

  componentDidMount() {
    const {
      options,
      selectedValue,
      selectedValues,
      name,
      multiselect,
      disabled,
      altered,
    } = this.props;

    this.updateState({
      type: actionTypes.INITIALISE,
      value: {
        options, selectedValue, selectedValues, name, multiselect, disabled, altered,
      },
    });
  }

  /**
  * Allow for the component to be updated/controlled via props after componentDidMount
  * TODO add a test for this
  */
  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps, this.props)) {
      this.updateState({
        type: actionTypes.UPDATE_VIA_PROPS,
        value: { ...this.props, ...nextProps },
      });
    }
  }

  /* Broadcast change when there has been one */
  componentDidUpdate(prevProps, prevState) {
    const {
      singleSelectInitialIndex,
      singleSelectSelectedOption,
      multiSelectSelectedOptions,
      multiselect,
      altered,
      selectedValues,
      multiSelectInitialSelectedIndexes,
    } = this.state;

    const { onChange, selectedValue } = this.props;

    /**
    * Check if there is a need to broadcast a change, props can now change state given
    * that the component can be controlled externally.
    * Exit if - the same single select option is selected as before
    * Exit if - the same multi select options are selected as before
    * TODO add a test for this
    */
    if (
      selectedValue === singleSelectInitialIndex ||
      isEqual(selectedValues, multiSelectInitialSelectedIndexes)
    ) {
      return false;
    }

    if (multiselect) {
      multiSelectBroadcastChange(
        prevState.multiSelectSelectedOptions.options,
        multiSelectSelectedOptions.options, altered, onChange,
      );
    } else {
      singleSelectBroadcastChange(
        prevState.singleSelectSelectedOption,
        singleSelectSelectedOption,
        altered,
        onChange,
      );
    }

    return true;
  }

  updateState(action, callback) {
    /* Update state in a similar way to Redux - thanks to https://twitter.com/mehdimollaverdi */
    const nextState = this.reducer(this.state, action);
    this.setState(nextState, () => callback && callback());

    /* To debug actions plus their resulting state whilst developing, add ?debug=true */
    debugReportChange(this.props.name, action, nextState);
  }

  /* TODO add a test for this */
  focusButton() {
    this.selectBox.querySelector('.rrs__button').focus();
  }

  render() {
    const { prefix, caretIcon, disabled } = this.props;
    const {
      altered,
      singleSelectInitialIndex,
      isOptionsPanelOpen,
      isDragging,
      multiSelectInitialSelectedIndexes,
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
      state: this.state,
      props: this.props,
    });

    return (
      <div
        className={singleline(`
          rrs
          ${(isOptionsPanelOpen === true) ? 'rrs--options-visible' : ''}
          ${altered ? 'rrs--has-changed' : ''}
        `)}
        ref={(r) => { this.selectBox = r; }}
        onKeyDown={e => handleKeyEvent({
          event: e,
          ReactResponsiveSelectClassRef: this,
          state: this.state,
          props: this.props,
        })}
        onTouchStart={() => handleTouchStart({
          ReactResponsiveSelectClassRef: this,
          state: this.state,
        })}
        onTouchMove={() => handleTouchMove({
          ReactResponsiveSelectClassRef: this,
          state: this.state,
        })}
        onTouchEnd={e => handleClick({
          event: e,
          ReactResponsiveSelectClassRef: this,
          state: this.state,
        })}
        onMouseDown={e => handleClick({
          event: e,
          ReactResponsiveSelectClassRef: this,
          state: this.state,
        })}
        onBlur={() => handleBlur({
          ReactResponsiveSelectClassRef: this,
          state: this.state,
        })}
      >
        {multiselect
          ? (
            <MultiSelect
              disabled={disabled}
              altered={altered}
              isDragging={isDragging}
              caretIcon={caretIcon}
              customLabelText={customLabelText}
              prefix={prefix}
              name={name}
              multiSelectInitialSelectedIndexes={multiSelectInitialSelectedIndexes}
              multiSelectSelectedOptions={multiSelectSelectedOptions}
              multiSelectSelectedIndexes={multiSelectSelectedIndexes}
              nextPotentialSelectionIndex={nextPotentialSelectionIndex}
              isOptionsPanelOpen={isOptionsPanelOpen}
              options={options}
            />
        )
        : (
          <SingleSelect
            disabled={disabled}
            altered={altered}
            isDragging={isDragging}
            singleSelectInitialIndex={singleSelectInitialIndex}
            caretIcon={caretIcon}
            prefix={prefix}
            name={name}
            customLabelText={customLabelText}
            singleSelectSelectedOption={singleSelectSelectedOption}
            singleSelectSelectedIndex={singleSelectSelectedIndex}
            nextPotentialSelectionIndex={nextPotentialSelectionIndex}
            isOptionsPanelOpen={isOptionsPanelOpen}
            options={options}
          />
        )}
      </div>
    );
  }
}

ReactResponsiveSelect.propTypes = ReactResponsiveSelectProps;
