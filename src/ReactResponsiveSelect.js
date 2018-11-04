import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import singleline from 'singleline';
import * as actionTypes from './constants/actionTypes';
import {
  handleBlur,
  handleClick,
  handleKeyEvent,
  handleTouchMove,
  handleTouchStart,
} from './lib/eventHandlers';
import {
  multiSelectBroadcastChange,
  singleSelectBroadcastChange,
} from './lib/onChangeBroadcasters';
import { ReactResponsiveSelectProps } from './propTypes';
import debugReportChange from './lib/debugReportChange';
import getCustomLabelText from './lib/getCustomLabelText';
import initialState from './reducers/initialState';
import reducer from './reducers/reducer';

import MultiSelect from './components/MultiSelect';
import SingleSelect from './components/SingleSelect';

export default class ReactResponsiveSelect extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.reducer = reducer;
  }

  componentDidMount() {
    const {
      options,
      noSelectionLabel,
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
        options,
        noSelectionLabel,
        selectedValue,
        selectedValues,
        name,
        multiselect,
        disabled,
        altered,
      },
    });
  }

  /**
   * Allow for the component to be updated/controlled via props after componentDidMount
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
      singleSelectSelectedOption,
      multiSelectSelectedOptions,
      multiselect,
      altered,
    } = this.state;

    const { onChange } = this.props;

    if (multiselect) {
      multiSelectBroadcastChange(
        prevState.multiSelectSelectedOptions.options,
        multiSelectSelectedOptions.options,
        altered,
        onChange,
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
    const nextState = this.reducer(this.state, action);
    this.setState(nextState, () => {
      if (callback) {
        callback(nextState);
      }
    });

    /* To debug actions plus their resulting state whilst developing, add ?debug=true */
    debugReportChange(this.props.name, action, nextState);
  }

  focusButton() {
    this.selectBox.querySelector('.rrs__button').focus();
  }

  render() {
    const { prefix, caretIcon, disabled } = this.props;
    const {
      altered,
      singleSelectInitialIndex,
      hasOptHeaders,
      isOptionsPanelOpen,
      isDragging,
      noSelectionLabel,
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
        data-name={name}
        className={singleline(`
          rrs
          ${isOptionsPanelOpen === true ? 'rrs--options-visible' : ''}
          ${altered ? 'rrs--has-changed' : ''}
          ${hasOptHeaders ? 'rrs--has-opt-headers' : ''} 
        `)}
        ref={r => {
          this.selectBox = r;
        }}
        tabIndex="-1"
        onKeyDown={e =>
          handleKeyEvent({
            event: e,
            ReactResponsiveSelectClassRef: this,
            state: this.state,
            props: this.props,
          })
        }
        onTouchStart={() =>
          handleTouchStart({
            ReactResponsiveSelectClassRef: this,
            state: this.state,
          })
        }
        onTouchMove={() =>
          handleTouchMove({
            ReactResponsiveSelectClassRef: this,
            state: this.state,
          })
        }
        onTouchEnd={e =>
          handleClick({
            event: e,
            ReactResponsiveSelectClassRef: this,
            state: this.state,
          })
        }
        onMouseDown={e =>
          handleClick({
            event: e,
            ReactResponsiveSelectClassRef: this,
            state: this.state,
          })
        }
        onBlur={() =>
          handleBlur({
            ReactResponsiveSelectClassRef: this,
            state: this.state,
            props: this.props,
          })
        }
      >
        {multiselect ? (
          <MultiSelect
            noSelectionLabel={noSelectionLabel}
            disabled={disabled}
            altered={altered}
            isDragging={isDragging}
            caretIcon={caretIcon}
            customLabelText={customLabelText}
            prefix={prefix}
            name={name}
            multiSelectInitialSelectedIndexes={
              multiSelectInitialSelectedIndexes
            }
            multiSelectSelectedOptions={multiSelectSelectedOptions}
            multiSelectSelectedIndexes={multiSelectSelectedIndexes}
            nextPotentialSelectionIndex={nextPotentialSelectionIndex}
            isOptionsPanelOpen={isOptionsPanelOpen}
            options={options}
            selectBoxRef={this.selectBox}
          />
        ) : (
          <SingleSelect
            noSelectionLabel={noSelectionLabel}
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
            selectBoxRef={this.selectBox}
          />
        )}
      </div>
    );
  }
}

ReactResponsiveSelect.propTypes = ReactResponsiveSelectProps;
