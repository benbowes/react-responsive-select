import React, { Component, PropTypes } from 'react';
import * as actionTypes from './constants/actionTypes';
import keyCodes from './constants/keyCodes';
import reducer, { initialState } from './reducers/reducer';
import isTouchableDevice from './lib/isTouchableDevice';
import getNextIndex from './lib/getNextIndex';
import ReactResponsiveSelectComponent from './ReactResponsiveSelectComponent';
import ReactResponsiveMultiSelectComponent from './ReactResponsiveMultiSelectComponent';

export default class ReactResponsiveSelect extends Component {

  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ).isRequired,
    customLabelRenderer: PropTypes.func,
    caretIcon: PropTypes.element,
    prefix: PropTypes.string,
    name: PropTypes.string.isRequired,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    selectedValue: PropTypes.string,
    multiselect: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = initialState;
    this.reducer = reducer;
    return this;
  }

  componentDidMount() {
    const { options, selectedValue, name } = this.props;
    const isTouchDevice = isTouchableDevice();

    this.updateState({
      type: actionTypes.BOOTSTRAP_STATE,
      value: { options, selectedValue, name, isTouchDevice }
    });

    this.OPTION_NODES_LENGTH = options.length;
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

  componentDidUpdate( prevProps, prevState ) {
    const { selectedOption, multiSelectOptions } = this.state;
    const { onChange, multiselect } = this.props;

    if (multiselect) {
      if(prevState.multiSelectOptions.length !== multiSelectOptions.length) {
        return onChange(multiSelectOptions);
      }
    } else {
      if(prevState.selectedOption.value && prevState.selectedOption.value !== selectedOption.value) {
        return onChange(selectedOption);
      }
    }
  }

  render() {
    const { multiselect, prefix, caretIcon, customLabelRenderer } = this.props;
    const {
      name, isTouchDevice, isDragging, selectedOption, initialIndex, selectedIndex,
      nextSelectedIndex, isOptionsPanelOpen, options, multiSelectIndexes, multiSelectOptions
    } = this.state;
    const customLabelText = customLabelRenderer && customLabelRenderer(selectedOption) || false;

    if (multiselect) {
      return (
        <div ref={(r) => { this.selectBox = r; }} {...this.listeners}>
          <ReactResponsiveMultiSelectComponent
            isTouchDevice={isTouchDevice}
            initialIndex={initialIndex}
            caretIcon={caretIcon}
            prefix={prefix}
            name={name}
            customLabelText={customLabelText}
            multiSelectOptions={multiSelectOptions}
            multiSelectIndexes={multiSelectIndexes}
            nextSelectedIndex={nextSelectedIndex}
            isOptionsPanelOpen={isOptionsPanelOpen}
            options={options}
            isDragging={isDragging}
          />
        </div>
      );
    } else {
      return (
        <div ref={(r) => { this.selectBox = r; }} {...this.listeners}>
          <ReactResponsiveSelectComponent
            isTouchDevice={isTouchDevice}
            initialIndex={initialIndex}
            caretIcon={caretIcon}
            prefix={prefix}
            name={name}
            customLabelText={customLabelText}
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
  }

  updateState(action) {
    const nextState = this.reducer(this.state, action);
    this.setState( nextState );
  }

  handleTouchStart() {
    /* initially it's assumed that the user is not dragging */
    this.updateState({
      type: actionTypes.SET_IS_DRAGGING,
      value: false
    });
  }

  handleTouchMove() {
    /* if touchmove fired - User is dragging, this disables touchend/click */
    this.updateState({
      type: actionTypes.SET_IS_DRAGGING,
      value: true
    });
  }

  handleKeyEvent(e) {
    this.preventDefaultForKeyCodes([
      keyCodes.ENTER,
      keyCodes.SPACE,
      keyCodes.ESCAPE,
      keyCodes.UP,
      keyCodes.DOWN
    ], e);

    if ( e.keyCode === keyCodes.TAB ) {
      /* dont blur selectbox when the panel is open */
      if (this.state.isOptionsPanelOpen) e.preventDefault();
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
    const { multiselect } = this.props;
    /* Ignore click and touchend if user is dragging */
    if(this.state.isDragging === false) {
      e.preventDefault();
      this.selectBox.firstChild.focus();

      if (e && e.target.classList.contains('rrs__option')) {
        this.updateState({
          type: (multiselect)
            ? actionTypes.SET_MULTISELECT_OPTIONS
            : actionTypes.SET_SELECTED_INDEX,
          value: parseFloat(e.target.getAttribute('data-key'))
        });

        if (multiselect) return this.forceUpdate();

        return this.forceUpdate(() => {
          return this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED });
        });
      }

      /* Open panel if closed, close panel if open */
      return (this.state.isOptionsPanelOpen)
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

    /* Open the options panel */
    if (this.state.isOptionsPanelOpen === false) {
      this.updateState({ type: actionTypes.SET_OPTIONS_PANEL_OPEN });
    }
  }

}
