import React, { Component } from 'react';
import singleline from 'singleline';
import isEqual from 'lodash.isequal';
import { ReactResponsiveSelectProps } from './propTypes';
import handleKeyEvent from './handleKeyEvent';
import handleTouchStart from './handleTouchStart';
import handleTouchMove from './handleTouchMove';
import handleClick from './handleClick';
import handleBlur from './handleBlur';
import * as actionTypes from './constants/actionTypes';
import reducer, { initialState } from './reducers/reducer';
import SingleSelect from './components/SingleSelect';
import MultiSelect from './components/MultiSelect';
import debugReportChange from './lib/debugReportChange';
import { singleSelectBroadcastChange, multiSelectBroadcastChange } from './lib/onChangeBroadcasters';

export default class ReactResponsiveSelect extends Component {

  state = initialState;
  reducer = reducer;

  componentDidMount() {
    const { options, selectedValue, selectedValues, name, multiselect, disabled, altered } = this.props;

    this.updateState({
      type: actionTypes.INITIALISE,
      value: { options, selectedValue, selectedValues, name, multiselect, disabled, altered }
    });
  }

  /**
  * Allow for the component to be updated/controlled via props after componentDidMount
  * TODO add a test for this
  */
  componentWillReceiveProps(nextProps) {
    if(!isEqual(nextProps, this.props)) {
      this.updateState({
        type: actionTypes.UPDATE_VIA_PROPS,
        value: { ...this.props, ...nextProps }
      });
    }
  }

  /* Broadcast change when there has been one */
  componentDidUpdate( prevProps, prevState ) {
    const { singleSelectSelectedOption, multiSelectSelectedOptions, multiselect, altered } = this.state;
    const { onChange } = this.props;

    /**
    * Check if there is a need to broadcast a change, props can now change state given
    * that the component can be controlled externally.
    * Exit if - the same single select option is selected as before
    * Exit if - the same multi select options are selected as before
    * TODO add a test for this
    */
    if (
      this.props.selectedValue === this.state.singleSelectInitialIndex ||
      isEqual(this.props.selectedValues, this.state.multiSelectInitialSelectedIndexes)
    ) {
      return false;
    }

    if (multiselect) {
      multiSelectBroadcastChange(prevState.multiSelectSelectedOptions.options, multiSelectSelectedOptions.options, altered, onChange);
    } else {
      singleSelectBroadcastChange(prevState.singleSelectSelectedOption, singleSelectSelectedOption, altered, onChange);
    }
  }

  render() {
    const { prefix, caretIcon, customLabelRenderer, disabled } = this.props;
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
      multiselect
    } = this.state;

    if (multiselect) {
      const customLabelText = customLabelRenderer && customLabelRenderer(multiSelectSelectedOptions) || false;
      return (
        <div
          className={singleline(`
            rrs
            ${(isOptionsPanelOpen === true) ? 'rrs--options-visible' : ''}
            ${altered ? 'rrs--has-changed': ''}
          `)}
          ref={(r) => { this.selectBox = r; }}
          onKeyDown={(e) => handleKeyEvent({
            event: e,
            ReactResponsiveSelectClassRef: this,
            state: this.state,
            props: this.props
          })}
          onTouchStart={() => handleTouchStart({
            ReactResponsiveSelectClassRef: this,
            state: this.state
          })}
          onTouchMove={() => handleTouchMove({
            ReactResponsiveSelectClassRef: this,
            state: this.state
          })}
          onTouchEnd={(e) => handleClick({
            event: e,
            ReactResponsiveSelectClassRef: this,
            state: this.state
          })}
          onMouseDown={(e) => handleClick({
            event: e,
            ReactResponsiveSelectClassRef: this,
            state: this.state
          })}
          onBlur={() => handleBlur({
            ReactResponsiveSelectClassRef: this,
            state: this.state
          })}
        >
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
        </div>
      );
    } else {
      const customLabelText = customLabelRenderer && customLabelRenderer(singleSelectSelectedOption) || false;
      return (
        <div
          className={singleline(`
            rrs
            ${(isOptionsPanelOpen === true) ? 'rrs--options-visible' : ''}
            ${altered ? 'rrs--has-changed': ''}
          `)}
          ref={(r) => { this.selectBox = r; }}
          onKeyDown={(e) => handleKeyEvent({
            event: e,
            ReactResponsiveSelectClassRef: this,
            state: this.state,
            props: this.props
          })}
          onTouchStart={() => handleTouchStart({
            ReactResponsiveSelectClassRef: this,
            state: this.state
          })}
          onTouchMove={() => handleTouchMove({
            ReactResponsiveSelectClassRef: this,
            state: this.state
          })}
          onTouchEnd={(e) => handleClick({
            event: e,
            ReactResponsiveSelectClassRef: this,
            state: this.state
          })}
          onMouseDown={(e) => handleClick({
            event: e,
            ReactResponsiveSelectClassRef: this,
            state: this.state
          })}
          onBlur={() => handleBlur({
            ReactResponsiveSelectClassRef: this,
            state: this.state
          })}
        >
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
        </div>
      );
    }
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

}

ReactResponsiveSelect.propTypes = ReactResponsiveSelectProps;
