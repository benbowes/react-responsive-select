import React, { Component } from 'react';
import { ReactResponsiveSelectProps } from './propTypes';
import singleline from 'singleline';
import * as actionTypes from './constants/actionTypes';
import keyCodes from './constants/keyCodes';
import reducer, { initialState } from './reducers/reducer';
import SingleSelect from './components/SingleSelect';
import MultiSelect from './components/MultiSelect';
import containsClassName from './lib/containsClassName';
import debugReportChange from './lib/debugReportChange';
import getNextIndex from './lib/getNextIndex';
import { singleSelectBroadcastChange, multiSelectBroadcastChange } from './lib/onChangeBroadcasters';

export default class ReactResponsiveSelect extends Component {

  state = initialState;
  reducer = reducer;
  listeners = {};
  handleBlur = this.handleBlur.bind(this);
  handleTouchMove = this.handleTouchMove.bind(this);
  handleTouchStart = this.handleTouchStart.bind(this);
  handleClick = this.handleClick.bind(this);
  handleKeyEvent = this.handleKeyEvent.bind(this);

  componentDidMount() {
    const { options, selectedValue, selectedValues, name, multiselect, disabled } = this.props;

    this.updateState({
      type: actionTypes.INITIALISE,
      value: { options, selectedValue, selectedValues, name, multiselect }
    });

    if (!disabled) {
      this.listeners = {
        onTouchStart: this.handleTouchStart,
        onTouchMove: this.handleTouchMove,
        onTouchEnd: this.handleClick,
        onBlur: this.handleBlur,
        onMouseDown: this.handleClick,
        onKeyDown: this.handleKeyEvent
      };
    }
  }

  /* Allow updating options and selectedValue via props */
  componentWillReceiveProps(nextProps) {
    const { options, selectedValue } = nextProps;
    const { selectedValues, name, multiselect, disabled } = this.props;

    this.updateState({
      type: actionTypes.INITIALISE,
      value: { options, selectedValue, selectedValues, name, multiselect }
    });
  }

  /* Broadcast change when there has been one */
  componentDidUpdate( prevProps, prevState ) {
    const { singleSelectSelectedOption, multiSelectSelectedOptions, isMultiSelect, altered } = this.state;
    const { onChange } = this.props;

    if (isMultiSelect) {
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
      isMultiSelect
    } = this.state;

    if (isMultiSelect) {
      const customLabelText = customLabelRenderer && customLabelRenderer(multiSelectSelectedOptions) || false;
      return (
        <div
          className={singleline(`
            rrs
            ${(isOptionsPanelOpen === true) ? 'rrs--options-visible' : ''}
            ${altered ? 'rrs--has-changed': ''}
          `)}
          ref={(r) => { this.selectBox = r; }}
          {...this.listeners}
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
          {...this.listeners}
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

  handleTouchStart() {
    /* initially it's assumed that the user is not dragging */
    this.updateState({ type: actionTypes.SET_IS_DRAGGING, boolean: false });
  }

  handleTouchMove() {
    /* if touchmove fired - User is dragging, this disables touchend/click */
    this.updateState({ type: actionTypes.SET_IS_DRAGGING, boolean: true });
  }

  handleKeyEvent(e) {
    const { isMultiSelect, isOptionsPanelOpen } = this.state;

    this.preventDefaultForKeyCodes([
      keyCodes.ENTER,
      keyCodes.SPACE,
      keyCodes.ESCAPE,
      keyCodes.UP,
      keyCodes.DOWN
    ], e);

    switch (e.keyCode) {
      case keyCodes.TAB:
        /* Don't shift focus when the panel is open (unless it's a Multiselect) */
        if (isOptionsPanelOpen) {
          e.preventDefault();

          /* Multiselect does not close on selection. Focus button to blur and close options panel on TAB */
          if (isMultiSelect) {
            this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED }, () => this.focusButton);
          }
        }
        return e;

      case keyCodes.ENTER:
        /* can close the panel when open and focussed
         * can submit the form when closed and focussed */
        return this.handleEnterPressed(e);

      case keyCodes.SPACE:
        /* close the panel and select option when open, or open the panel if closed */
        if (isOptionsPanelOpen) return this.handleClick(e);
        return this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_OPEN });

      case keyCodes.ESCAPE:
        /* remove focus from the panel when focussed */
        return this.updateState(
          { type: actionTypes.SET_OPTIONS_PANEL_CLOSED_NO_SELECTION },
          () => this.focusButton,
        );

      case keyCodes.UP:
        /* will open the options panel if closed
         * will not decrement selection if options panel closed
         * if panel open, will decrement up the options list */
        return this.handleKeyUpOrDownPressed('decrement');

      case keyCodes.DOWN:
        /* will open the options panel if closed
         * will not increment selection if options panel closed
         * if panel open, will increment down the options list */
        return this.handleKeyUpOrDownPressed('increment');
    }

    /* handle alpha-nemeric key press */
    if (/^[a-z0-9]+$/.test(e.key)) this.handleAlphaNumerical(e);
  }

  handleClick(e) {
    const { isMultiSelect, isOptionsPanelOpen, isDragging } = this.state;

    if (isDragging === false) {
      /* Disallow natural event flow - don't allow blur to happen from button focus to selected option focus */
      e.preventDefault();

      /* If user is scrolling return */
      if (e && containsClassName(e.target, 'rrs__options')) return true;

      /* Select option index, if user selected option */
      if (containsClassName(e.target, 'rrs__option')) {
        return this.updateState({
          type: isMultiSelect
            ? actionTypes.SET_MULTISELECT_OPTIONS
            : actionTypes.SET_SINGLESELECT_OPTIONS,
          optionIndex: parseFloat(e.target.getAttribute('data-key'))
        });
      }

      /* Else user clicked close or open the options panel */
      this.updateState({
        type: isOptionsPanelOpen
          ? actionTypes.SET_OPTIONS_PANEL_CLOSED
          : actionTypes.SET_OPTIONS_PANEL_OPEN
      }, () => this.focusButton);
    }
  }

  handleBlur() {
    const { isOptionsPanelOpen } = this.state;
    /* Handle click outside of selectbox */
    if (
      this.selectBox
      && !this.selectBox.contains(document.activeElement)
      && isOptionsPanelOpen
    ) {
      return this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED_ONBLUR });
    }
  }

  handleAlphaNumerical(e) {
    const { options } = this.state;
    const optionIndex = options.map(v => v.text.toLowerCase().charAt(0)).indexOf(e.key);

    if (optionIndex > -1) {
      this.updateState({
        type: actionTypes.SET_NEXT_SELECTED_INDEX_ALPHA_NUMERIC,
        optionIndex
      });
    }
  }

  handleEnterPressed(e) {
    const { isMultiSelect, isOptionsPanelOpen, nextPotentialSelectionIndex } = this.state;

    if (isMultiSelect) {
      this.updateState({
        type: actionTypes.SET_MULTISELECT_OPTIONS,
        optionIndex: nextPotentialSelectionIndex
      });
    } else {
      this.updateState({
        type: actionTypes.SET_SINGLESELECT_OPTIONS,
        optionIndex: nextPotentialSelectionIndex
      });
    }

    return (isOptionsPanelOpen)
      ? e.stopPropagation() // Do not submit form
      : this.props.onSubmit(); // Submit the form
  }

  handleKeyUpOrDownPressed(type) {
    const { isOptionsPanelOpen, nextPotentialSelectionIndex, options } = this.state;

    this.updateState({
      type: actionTypes.SET_NEXT_SELECTED_INDEX,
      optionIndex: getNextIndex(type, isOptionsPanelOpen, nextPotentialSelectionIndex, options.length)
    });

    /* Open the options panel */
    if (isOptionsPanelOpen === false) {
      this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_OPEN });
    }
  }

  /* Disable native functionality if keyCode match */
  preventDefaultForKeyCodes(keyCodes, e) {
    keyCodes.forEach(keyCode => {
      if (keyCode === e.keyCode) e.preventDefault();
    });
  }

  focusButton() {
    this.selectBox.querySelector('.rrs__button').focus();
  }

}

ReactResponsiveSelect.propTypes = ReactResponsiveSelectProps;
