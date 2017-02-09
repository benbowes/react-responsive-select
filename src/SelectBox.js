import React, { Component, PropTypes } from 'react';
import * as actionTypes from './actionTypes';
import reducer, { initialState, resetState } from './reducer';
import isTouchDevice from './isTouchDevice';
import getNextIndex from './getNextIndex';

export default class SelectBox extends Component {

  constructor() {
    super();
    this.state = initialState;
    this.reducer = reducer;
    return this;
  }

  componentDidMount() {
    const { options, selectedValue, name } = this.props;

    this.updateState({
      type: actionTypes.BOOTSTRAP_STATE,
      value: {
        options,
        selectedValue,
        name
      }
    });

    this.OPTION_NODES_LENGTH = options.length;

    this.handleSelectBoxBlur = this.handleSelectBoxBlur.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleSelectBoxClick = this.handleSelectBoxClick.bind(this);
    this.handleSelectBoxKeyEvent = this.handleSelectBoxKeyEvent.bind(this);
    this.listeners = (isTouchDevice())
        ? {
          onBlur: this.handleSelectBoxBlur,
          onTouchMove: this.handleTouchMove,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleSelectBoxClick
        }
        : {
          onBlur: this.handleSelectBoxBlur,
          onMouseDown: this.handleSelectBoxClick,
          onKeyDown: this.handleSelectBoxKeyEvent
        };

  }

  componentWillUnmount() {
    resetState();
  }

  componentDidUpdate(){
    if(this.state.isDragging === false) {
      const { selectedIndex } = this.state;
      // Scroll to keep the selected option in view
      this.optionsContainer.scrollTop = this[`option_${selectedIndex}`].offsetTop;
    }
  }

  render() {
    const { prefix } = this.props;
    const { name, selectedOption, selectedIndex, isOptionsPanelOpen, options } = this.state;

    return (
      <div
        className={`select-box ${(isOptionsPanelOpen === true) ? 'options-container-visible' : ''}`}
        role="listbox"
        tabIndex="0"
        ref={(r) => { this.selectBox = r; }}
        {...this.listeners}
      >

        <div className="label-container">
          {prefix}:
          <span className="label"> {selectedOption.displayText}</span>
          <i className="icon fa fa-angle-down" aria-hidden="true"></i>
        </div>

        <div className="options-container" ref={(r) => { this.optionsContainer = r; }}>
          {
            options.length > 0 &&
            options.map((option, index) => (
              <div
                key={index}
                role="option"
                className={`option ${(selectedIndex === index) ? 'selected' : ''}`}
                data-key={index}
                ref={(r) => {this[`option_${index}`] = r;}}
              >
                {option.displayText}
              </div>
            ))
          }
        </div>

        {name &&
        <input type="hidden" name={name} value={selectedOption.value} />
        }

      </div>
    );
  }

  updateState(action) {
    this.setState( this.reducer(action) );
  }

  toggleOptionsPanel(mode) {
    switch (mode) {
    case 'open':
      // Open the options panel
      return this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_OPEN, value: true });

    case 'close':
      // Close the options panel
      return  this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_OPEN, value: false });

    default:
      // Toggle the options panel open or closed based on this.state.isOptionsPanelOpen
      return this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_OPEN, value: !this.state.isOptionsPanelOpen });
    }
  }

  // HANDLERS

  handleTouchStart() {
    // initially it's assumed that the user is not dragging
    this.updateState({ type: actionTypes.SET_IS_DRAGGING, value: false });
  }

  handleTouchMove() {
    // if touchmove fired - User is dragging, this disables ability for
    this.updateState({ type: actionTypes.SET_IS_DRAGGING, value: true });
  }

  handleSelectBoxKeyEvent(e) {
    // Apply e.preventDefault for these keyCodes
    this.preventDefaultForKeyCodes([13, 32, 27, 38, 40], e);

    switch (e.keyCode) {
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
      return this.toggleOptionsPanel();

    case 27: // Esc
      /*
      * remove focus from the panel when focussed
      */
      return this.selectBox.blur();

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

  handleSelectBoxClick(e) {
    // Ignore click and touchend if user is dragging
    if(this.state.isDragging === false) {
      e.preventDefault();

      this.selectBox.focus();

      if (e && e.target.classList.contains('option')) {
        this.updateState({
          type: actionTypes.SET_SELECTED_INDEX,
          value: parseFloat(e.target.getAttribute('data-key'))
        });
      }

      // Open panel if closed, close panel if open
      this.toggleOptionsPanel();
    }
  }

  handleSelectBoxBlur() {
    this.toggleOptionsPanel('close');
  }

  // HANDLER HELPERS

  // Disable native functionality if keyCode match
  preventDefaultForKeyCodes(keyCodes, e) {
    keyCodes.forEach(keyCode => {
      if(keyCode === e.keyCode) e.preventDefault();
    });
  }

  enterPressed(e) {
    if (this.state.isOptionsPanelOpen === true) {
      e.stopPropagation(); // Do not submit form
      return this.toggleOptionsPanel('close'); // Close the panel
    }
    return this.props.onSubmit(); // Submit the form
  }

  keyUpOrDownPressed(type) {
    const { isOptionsPanelOpen, selectedIndex } = this.state;

    this.updateState({
      type: actionTypes.SET_SELECTED_INDEX,
      value: getNextIndex(type, isOptionsPanelOpen, selectedIndex, this.OPTION_NODES_LENGTH)
    });

    // Open the options panel
    if (this.state.isOptionsPanelOpen === false) {
      this.toggleOptionsPanel('open');
    }
  }

}

SelectBox.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      displayText: PropTypes.string,
      value: PropTypes.string
    })
  ),
  prefix: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectedValue: PropTypes.string
};
