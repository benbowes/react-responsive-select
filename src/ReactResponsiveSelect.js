import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actionTypes from './constants/actionTypes';
import keyCodes from './constants/keyCodes';
import reducer, { initialState } from './reducers/reducer';
import isTouchableDevice from './lib/isTouchableDevice';
import getNextIndex from './lib/getNextIndex';
import SingleSelect from './SingleSelect';
import MultiSelect from './MultiSelect';

export default class ReactResponsiveSelect extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    this.reducer = reducer;
    return this;
  }

  componentDidMount() {
    const { options, selectedValue, selectedValues, name, multiselect, disabled } = this.props;
    const isTouchDevice = isTouchableDevice();

    this.updateState({
      type: actionTypes.BOOTSTRAP_STATE,
      value: { options, selectedValue, selectedValues, name, isTouchDevice, multiselect }
    });

    this.OPTION_NODES_LENGTH = options.length;

    if (!disabled) {
      this.handleBlur = this.handleBlur.bind(this);
      this.handleTouchMove = this.handleTouchMove.bind(this);
      this.handleTouchStart = this.handleTouchStart.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleKeyEvent = this.handleKeyEvent.bind(this);
      this.listeners = (isTouchDevice)
        ? {
          onBlur: this.handleBlur,
          onTouchMove: this.handleTouchMove,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleClick
        }
        : {
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
        return onChange({ ...multiSelectSelectedOptions, altered });
      }

    } else {

      const { value: prevValue } = prevState.singleSelectSelectedOption;
      const { value: currValue } = singleSelectSelectedOption;
      const shouldBroadcastChange = (
        prevValue && prevValue !== currValue
      );

      if( shouldBroadcastChange ) {
        return onChange({ ...singleSelectSelectedOption,  altered });
      }

    }
  }

  render() {
    const { prefix, caretIcon, customLabelRenderer, disabled } = this.props;
    const {
      altered,
      singleSelectInitialIndex,
      isOptionsPanelOpen,
      isTouchDevice,
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
        <div ref={(r) => { this.selectBox = r; }} {...this.listeners}>
          <MultiSelect
            disabled={disabled}
            altered={altered}
            isTouchDevice={isTouchDevice}
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
        <div ref={(r) => { this.selectBox = r; }} {...this.listeners}>
          <SingleSelect
            disabled={disabled}
            altered={altered}
            isTouchDevice={isTouchDevice}
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
    const nextState = this.reducer(this.state, action);
    this.setState( nextState );
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
    const { isMultiSelect } = this.state;

    this.preventDefaultForKeyCodes([
      keyCodes.ENTER,
      keyCodes.SPACE,
      keyCodes.ESCAPE,
      keyCodes.UP,
      keyCodes.DOWN
    ], e);

    if ( e.keyCode === keyCodes.TAB ) {
      /* dont blur selectbox when the panel is open */
      if (this.state.isOptionsPanelOpen && !isMultiSelect) e.preventDefault();
      return e;
    }

    if ( e.keyCode === keyCodes.ENTER ) {
      /* can close the panel when open and focussed
       * can submit the form when closed and focussed */
      return this.enterPressed(e);
    }

    if ( e.keyCode === keyCodes.SPACE ) {
      /* open or close the panel when focussed */
      return (this.state.isOptionsPanelOpen)
        ? this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED })
        : this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_OPEN });
    }

    if ( e.keyCode === keyCodes.ESC ) {
      /* remove focus from the panel when focussed */
      return this.selectBox.firstChild.blur();
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
    if(isDragging === false) {
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
          return this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED });
        });
      }

      /* Open panel if closed, close panel if open */
      return (isOptionsPanelOpen)
        ? this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED })
        : this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_OPEN });
    }
  }

  handleBlur() {
    this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED_NO_SELECTION });
  }

  /* Disable native functionality if keyCode match */
  preventDefaultForKeyCodes(keyCodes, e) {
    keyCodes.forEach(keyCode => {
      if(keyCode === e.keyCode) e.preventDefault();
    });
  }

  enterPressed(e) {
    if(this.state.isMultiSelect) {
      return this.updateState({
        type: actionTypes.SET_MULTISELECT_OPTIONS,
        optionIndex: this.state.nextPotentialSelectionIndex
      });
    }

    if (this.state.isOptionsPanelOpen === true) {
      e.stopPropagation(); // Do not submit form
      return this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED });
    }
    return this.props.onSubmit(); // Submit the form
  }

  keyUpOrDownPressed(type) {
    const { isOptionsPanelOpen, nextPotentialSelectionIndex } = this.state;

    this.updateState({
      type: actionTypes.SET_NEXT_SELECTED_INDEX,
      optionIndex: getNextIndex(type, isOptionsPanelOpen, nextPotentialSelectionIndex, this.OPTION_NODES_LENGTH)
    });

    /* Open the options panel */
    if (this.state.isOptionsPanelOpen === false) {
      this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_OPEN });
    }
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
