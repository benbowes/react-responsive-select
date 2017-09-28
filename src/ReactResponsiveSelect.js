import React, { Component } from 'react';
import PropTypes from 'prop-types';
import singleline from 'singleline';
import * as actionTypes from './constants/actionTypes';
import keyCodes from './constants/keyCodes';
import reducer, { initialState } from './reducers/reducer';
import getNextIndex from './lib/getNextIndex';
import SingleSelect from './components/SingleSelect';
import MultiSelect from './components/MultiSelect';
import debugReportChange from './lib/debugReportChange';

export default class ReactResponsiveSelect extends Component {

  state = initialState;
  reducer = reducer;
  handleBlur = this.handleBlur.bind(this);
  handleTouchMove = this.handleTouchMove.bind(this);
  handleTouchStart = this.handleTouchStart.bind(this);
  handleClick = this.handleClick.bind(this);
  handleKeyEvent = this.handleKeyEvent.bind(this);

  optionNodesLength = 0;
  listeners = {};

  componentDidMount() {
    const { options, selectedValue, selectedValues, name, multiselect, disabled } = this.props;

    this.updateState({
      type: actionTypes.INITIALISE,
      value: { options, selectedValue, selectedValues, name, multiselect }
    });

    this.optionNodesLength = options.length;

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

  /* Broadcast change when there has been one */
  componentDidUpdate( prevProps, prevState ) {
    const { singleSelectSelectedOption, multiSelectSelectedOptions, isMultiSelect, altered } = this.state;
    const { onChange } = this.props;

    if (isMultiSelect) {
      const { options: prevOptions } = prevState.multiSelectSelectedOptions;
      const { options: currOptions } = multiSelectSelectedOptions;
      const shouldBroadcastChange = (
        prevOptions.length &&
        (prevOptions.length !== currOptions.length || prevOptions[0].value !== currOptions[0].value)
      );

      if( shouldBroadcastChange ) {
        return onChange({
          options: multiSelectSelectedOptions.options.map(v => ({
            name: v.name,
            text: v.text,
            value: v.value
          })),
          altered
        });
      }

    } else {
      const { value: prevValue } = prevState.singleSelectSelectedOption;
      const { value: currValue } = singleSelectSelectedOption;
      const shouldBroadcastChange = ( prevValue && prevValue !== currValue  );

      if( shouldBroadcastChange ) {
        return onChange({
          name: singleSelectSelectedOption.name,
          text: singleSelectSelectedOption.text,
          value: singleSelectSelectedOption.value,
          altered
        });
      }
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

  updateState(action) {
    /* Update state in a similar way to Redux - thanks to https://twitter.com/mehdimollaverdi */
    const nextState = this.reducer(this.state, action);
    this.setState( nextState );

    /* To debug actions plus their resulting state whilst developing, add ?debug=true */
    debugReportChange( this.props.name, action, nextState );
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

    switch ( e.keyCode ) {

      case keyCodes.TAB:
        /* Don't shift focus when the panel is open (unless it's a Multiselect) */
        if (isOptionsPanelOpen) {
          e.preventDefault();

          /* Multiselect does not close on selection. Focus button to blur and close options panel on TAB */
          if (isMultiSelect) {
            this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED });
            this.focusButton();
          }
        }
        return e;

      case keyCodes.ENTER:
        /* can close the panel when open and focussed
         * can submit the form when closed and focussed */
        return this.handleEnterPressed(e);

      case keyCodes.SPACE:
        /* open or close the panel when focussed */
        if (isOptionsPanelOpen) {
          return this.handleClick(e);
        }
        return this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_OPEN });

      case keyCodes.ESCAPE:
        /* remove focus from the panel when focussed */
        this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED_NO_SELECTION });
        return this.focusButton();

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
      if (e && e.target.classList.contains('rrs__options-container')) {
        return true;
      }

      const userSelectedOption = e.target.classList.contains('rrs__option');

      /* Select option index, if an index was clicked */
      if (userSelectedOption) {
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
      });
      return this.focusButton();
    }
  }

  handleBlur(e) {
    const { isOptionsPanelOpen } = this.state;

    /* Handle click outside of selectbox */
    if (
      this.selectBox
      && !this.selectBox.contains(e.relatedTarget)
      && isOptionsPanelOpen
    ) {
      return this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED_ONBLUR });
    }
  }

  handleAlphaNumerical(e) {
    const { options } = this.state;
    const optionIndex = options.map(v => String(v.text).toLowerCase().charAt(0)).indexOf(e.key);

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
    const { isOptionsPanelOpen, nextPotentialSelectionIndex } = this.state;

    this.updateState({
      type: actionTypes.SET_NEXT_SELECTED_INDEX,
      optionIndex: getNextIndex(type, isOptionsPanelOpen, nextPotentialSelectionIndex, this.optionNodesLength)
    });

    /* Open the options panel */
    if (isOptionsPanelOpen === false) {
      this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_OPEN });
    }
  }

  /* Disable native functionality if keyCode match */
  preventDefaultForKeyCodes(keyCodes, e) {
    keyCodes.forEach(keyCode => {
      if(keyCode === e.keyCode) e.preventDefault();
    });
  }

  focusButton() {
    this.selectBox.querySelector('.rrs__button').focus();
  }

}

ReactResponsiveSelect.propTypes = {
  caretIcon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  customLabelRenderer: PropTypes.func,
  disabled: PropTypes.bool,
  multiselect: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  onSubmit: PropTypes.func,
  prefix: PropTypes.string,
  selectedValue: PropTypes.string,
  selectedValues: PropTypes.arrayOf( PropTypes.string.isRequired )
};
