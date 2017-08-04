import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actionTypes from './constants/actionTypes';
import keyCodes from './constants/keyCodes';
import reducer, { initialState } from './reducers/reducer';
import getNextIndex from './lib/getNextIndex';
import SingleSelect from './components/SingleSelect';
import MultiSelect from './components/MultiSelect';

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
      type: actionTypes.BOOTSTRAP_STATE,
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
      const shouldBroadcastChange = (
        prevValue && prevValue !== currValue
      );

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
          className="rrs__select"
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
          className="rrs__select"
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

  debugReportChange( nextState ) {
    let cache = [];
    const stateObj = JSON.stringify(nextState, function(key, value) {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1 || (key === 'markup')) return; // Circular reference found, discard key
        cache.push(value);
      }
      return value;
    }, 2);
    cache = null;
    console.log(`${this.props.name}:`, JSON.parse(stateObj));
  }

  updateState(action) {
    /* Update state in a similar way to Redux - hat tip https://twitter.com/mehdimollaverdi */
    const nextState = this.reducer(this.state, action);
    this.setState( nextState );

    /* Debug in console whilst developing */
    if ( process.env.NODE_ENV === 'development') this.debugReportChange( nextState );
  }

  handleTouchStart() {
    /* initially it's assumed that the user is not dragging */
    this.updateState({
      type: actionTypes.SET_IS_DRAGGING,
      boolean: false
    });
  }

  handleTouchMove() {
    /* if touchmove fired - User is dragging, this disables touchend/click */
    this.updateState({
      type: actionTypes.SET_IS_DRAGGING,
      boolean: true
    });
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

    if ( e.keyCode === keyCodes.TAB ) {
      /* dont blur selectbox when the panel is open */
      if (isOptionsPanelOpen && !isMultiSelect) e.preventDefault();
      return e;
    }

    if ( e.keyCode === keyCodes.ENTER ) {
      /* can close the panel when open and focussed
       * can submit the form when closed and focussed */
      return this.enterPressed(e);
    }

    if ( e.keyCode === keyCodes.SPACE ) {
      /* open or close the panel when focussed */
      if (isOptionsPanelOpen) {
        this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED });
        return this.focusButton();
      }
      return this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_OPEN });
    }

    if ( e.keyCode === keyCodes.ESCAPE ) {
      /* remove focus from the panel when focussed */
      this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED_NO_SELECTION });
      return this.focusButton();
    }

    if ( e.keyCode === keyCodes.UP ) {
      /* will open the options panel if closed
       * will not decrement selection if options panel closed
       * if panel open, will decrement up the options list */
      return this.keyUpOrDownPressed('decrement');
    }

    if ( e.keyCode === keyCodes.DOWN ) {
      /* will open the options panel if closed
       * will not increment selection if options panel closed
       * if panel open, will increment down the options list */
      return this.keyUpOrDownPressed('increment');
    }
  }

  handleClick(e) {
    const { isMultiSelect, isOptionsPanelOpen, isDragging } = this.state;

    /* Ignore touchend if user is dragging */
    if (isDragging === false) {
      e.preventDefault();

      /* Ensure selectBox container has focus */
      this.selectBox.firstChild.focus();

      /* Select option index, if an index was clicked/touchend'd */
      if (e && e.target.classList.contains('rrs__option')) {

        if(isMultiSelect) {
          const optionIndex = parseFloat(e.target.getAttribute('data-key'));
          /* Dont close on selection for multi select */
          return this.updateState({
            type: actionTypes.SET_MULTISELECT_OPTIONS,
            optionIndex
          });

        } else {
          this.updateState({
            type: actionTypes.SET_SELECTED_INDEX,
            optionIndex: parseFloat(e.target.getAttribute('data-key'))
          });
        }
        /* Close on selection for single select */
        return this.forceUpdate(() => {
          this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED });
          return this.focusButton();
        });

      } else if (e && e.target.classList.contains('rrs__options-container')) {
        return false; /* presume user is scrolling by mouse*/
      }

      /* Open panel if closed, close panel if open */
      if (isOptionsPanelOpen) {
        this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED });
        return this.focusButton();
      }
      return this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_OPEN });
    }
  }

  handleBlur(e) {
    if (e.target.role === 'button') {
      this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED_NO_SELECTION });
    }
  }

  /* Disable native functionality if keyCode match */
  preventDefaultForKeyCodes(keyCodes, e) {
    keyCodes.forEach(keyCode => {
      if(keyCode === e.keyCode) e.preventDefault();
    });
  }

  enterPressed(e) {
    const { isMultiSelect, isOptionsPanelOpen, nextPotentialSelectionIndex } = this.state;
    if (isMultiSelect) {
      return this.updateState({
        type: actionTypes.SET_MULTISELECT_OPTIONS,
        optionIndex: nextPotentialSelectionIndex
      });
    }

    if (isOptionsPanelOpen === true) {
      e.stopPropagation(); // Do not submit form
      this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED });
      return this.focusButton();
    }
    return this.props.onSubmit(); // Submit the form
  }

  keyUpOrDownPressed(type) {
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

  focusButton() {
    this.selectBox.querySelector('.rrs__select-container').focus();
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
