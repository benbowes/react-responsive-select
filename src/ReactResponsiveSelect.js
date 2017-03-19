import React, { Component, PropTypes } from 'react';
import * as actionTypes from './actionTypes';
import reducer, { initialState } from './reducer';
import isTouchDevice from './utils/isTouchDevice';
import getNextIndex from './getNextIndex';
import ReactResponsiveSelectComponent from './ReactResponsiveSelectComponent';

export default class ReactResponsiveSelect extends Component {

  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ).isRequired,
    caretIcon: PropTypes.element,
    prefix: PropTypes.string,
    name: PropTypes.string.isRequired,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    selectedValue: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = initialState;
    this.reducer = reducer;
    return this;
  }

  componentDidMount() {
    const { options, selectedValue, name } = this.props;

    this.updateState({
      type: actionTypes.BOOTSTRAP_STATE,
      value: { options, selectedValue, name }
    });

    this.OPTION_NODES_LENGTH = options.length;
    this.handleBlur = this.handleBlur.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
    this.listeners = (isTouchDevice())
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

  componentDidUpdate( prevProps, prevState ) {
    const { selectedOption } = this.state;
    const { onChange } = this.props;

    if(prevState.selectedOption.value && prevState.selectedOption.value !== selectedOption.value) {
      return onChange(selectedOption.value);
    }
  }

  render() {
    const { prefix, caretIcon } = this.props;
    const { name, isDragging, selectedOption, initialIndex, selectedIndex, nextSelectedIndex, isOptionsPanelOpen, options } = this.state;

    return (
      <div ref={(r) => { this.selectBox = r; }} {...this.listeners}>
        <ReactResponsiveSelectComponent
          initialIndex={initialIndex}
          caretIcon={caretIcon}
          prefix={prefix}
          name={name}
          selectedOption={selectedOption}
          selectedIndex={selectedIndex}
          nextSelectedIndex={nextSelectedIndex}
          isOptionsPanelOpen={isOptionsPanelOpen}
          options={options}
          isDragging={isDragging}
        />
      </div>
    );
  }

  updateState(action) {
    this.setState( this.reducer(this.state, action) );
  }

  handleTouchStart() {
    // initially it's assumed that the user is not dragging
    this.updateState({ type: actionTypes.SET_IS_DRAGGING, value: false });
  }

  handleTouchMove() {
    // if touchmove fired - User is dragging, this disables touchend/click
    this.updateState({ type: actionTypes.SET_IS_DRAGGING, value: true });
  }

  handleKeyEvent(e) {
    // Apply e.preventDefault for these keyCodes
    this.preventDefaultForKeyCodes([13, 32, 27, 38, 40], e);

    switch (e.keyCode) {
    case 9: // Tab
      /*
      * dont blur selectbox when the panel is open
      */
      if (this.state.isOptionsPanelOpen) e.preventDefault();
      return e;

    case 13: // Enter
      /*
      * can close the panel when open and focussed
      * can submit the form when closed and focussed
      */
      return this.enterPressed(e);

    case 32: // Space
      /*
      * open or close the panel when focussed
      */
      return (this.state.isOptionsPanelOpen)
        ? this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED })
        : this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_OPEN });

    case 27: // Esc
      /*
      * remove focus from the panel when focussed
      */
      return this.selectBox.firstChild.blur();

    case 38: // Up
      /*
      * will open the options panel if closed
      * will not decrement selection if options panel closed
      * if panel open will decrement up the options list and update ui
      */
      return this.keyUpOrDownPressed('decrement');

    case 40: // Down
      /*
      * will open the options panel if closed
      * will not increment selection if options panel closed
      * if panel open will increment down the options list and update ui
      */
      return this.keyUpOrDownPressed('increment');

    }
  }

  handleClick(e) {
    // Ignore click and touchend if user is dragging
    if(this.state.isDragging === false) {
      e.preventDefault();

      this.selectBox.firstChild.focus();

      if (e && e.target.classList.contains('rrs__option')) {
        this.updateState({
          type: actionTypes.SET_SELECTED_INDEX,
          value: parseFloat(e.target.getAttribute('data-key'))
        });

        return this.forceUpdate(() => {
          this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED });
        });
      }

      // Open panel if closed, close panel if open
      return (this.state.isOptionsPanelOpen)
        ? this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED })
        : this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_OPEN });
    }
  }

  handleBlur() {
    this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED_NO_SELECTION });
  }

  // Disable native functionality if keyCode match
  preventDefaultForKeyCodes(keyCodes, e) {
    keyCodes.forEach(keyCode => {
      if(keyCode === e.keyCode) e.preventDefault();
    });
  }

  enterPressed(e) {
    if (this.state.isOptionsPanelOpen === true) {
      e.stopPropagation(); // Do not submit form
      return this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED });
    }
    return this.props.onSubmit(); // Submit the form
  }

  keyUpOrDownPressed(type) {
    const { isOptionsPanelOpen, nextSelectedIndex } = this.state;

    this.updateState({
      type: actionTypes.SET_NEXT_SELECTED_INDEX,
      value: getNextIndex(type, isOptionsPanelOpen, nextSelectedIndex, this.OPTION_NODES_LENGTH)
    });

    // Open the options panel
    if (this.state.isOptionsPanelOpen === false) {
      this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_OPEN });
    }
  }

}
