import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import ReactResponsiveSelect from './ReactResponsiveSelect';
import * as actionTypes from './constants/actionTypes';
import * as handleEnterPressed from './lib/eventHandlers/handleEnterPressed';
import * as handleKeyUpOrDownPressed from './lib/eventHandlers/handleKeyUpOrDownPressed';
import keyCodes from './constants/keyCodes';

describe('ReactResponsiveSelect', () => {
  Enzyme.configure({ adapter: new Adapter() });

  const mockFunctions = {
    onSubmitFunction: () => {},
    onChangeFunction: () => {},
  };

  function setup(overrideProps, customProps = undefined, state = {}) {
    const initialProps = {
      prefix: 'Make',
      name: 'make',
      selectedValue: 'fiat',
      onSubmit: () => {},
      onChange: () => {},
      options: [
        { text: 'Any', value: 'null' },
        { text: 'Fiat', value: 'fiat' },
        { text: 'Subaru', value: 'subaru' },
        { text: 'BMW', value: 'bmw' },
        { text: 'Tesla', value: 'tesla' },
      ],
    };

    const props = customProps || {
      ...initialProps,
      ...overrideProps,
    };

    return mount(<ReactResponsiveSelect {...props} {...state} />);
  }

  describe('Initialise', () => {
    let selectBox;
    let selectBoxInstance;

    let submitSpy;
    let changeSpy;
    let updateStateSpy;
    let handleEnterPressedSpy;
    let handleKeyUpOrDownPressedSpy;

    beforeEach(() => {
      submitSpy = sinon.spy(mockFunctions, 'onSubmitFunction');
      changeSpy = sinon.spy(mockFunctions, 'onChangeFunction');
      selectBox = setup({
        onSubmit: submitSpy,
        onChange: changeSpy,
      });
      selectBoxInstance = selectBox.instance();
      updateStateSpy = sinon.spy(selectBoxInstance, 'updateState');
      handleEnterPressedSpy = sinon.spy(handleEnterPressed, 'default');
      handleKeyUpOrDownPressedSpy = sinon.spy(
        handleKeyUpOrDownPressed,
        'default',
      );
    });

    afterEach(() => {
      submitSpy.restore();
      changeSpy.restore();
      updateStateSpy.restore();
      handleEnterPressedSpy.restore();
      handleKeyUpOrDownPressedSpy.restore();

      selectBox.unmount();
    });

    it('should render correct amount of options and have an onSubmit function', () => {
      expect(selectBox.find('.rrs__options .rrs__option').length).toEqual(5);
      expect(selectBox.find('ReactResponsiveSelect').props().onSubmit).toEqual(
        submitSpy,
      );
    });

    it('should setup state', () => {
      const expectedState = {
        isDragging: false,
        isOptionsPanelOpen: false,
        singleSelectInitialIndex: 1,
        multiSelectInitialSelectedIndexes: [0],
        multiselect: false,
        noSelectionLabel: undefined,
        nextPotentialSelectionIndex: 1,
        singleSelectSelectedIndex: 1,
        name: 'make',
        options: [
          { text: 'Any', value: 'null' },
          { text: 'Fiat', value: 'fiat' },
          { text: 'Subaru', value: 'subaru' },
          { text: 'BMW', value: 'bmw' },
          { text: 'Tesla', value: 'tesla' },
        ],
        multiSelectSelectedIndexes: [0],
        altered: false,
        disabled: false,
        multiSelectSelectedOptions: {
          options: [
            {
              name: 'make',
              text: 'Any',
              value: 'null',
            },
          ],
        },
        singleSelectSelectedOption: {
          name: 'make',
          text: 'Fiat',
          value: 'fiat',
        },
      };
      expect(selectBox.state()).toMatchObject(expectedState);
    });
  });

  describe('Events', () => {
    let selectBox;
    let selectBoxContainer;
    let optionsContainer;
    let selectBoxDOM;

    beforeEach(() => {
      selectBox = setup();
      selectBoxContainer = selectBox.find('.rrs');
      optionsContainer = selectBox.find('.rrs__options');
      selectBoxDOM = selectBoxContainer.getDOMNode();
    });

    afterEach(() => {
      selectBox.unmount();
    });

    it('mousedown on rrs__button container should toggle the options panel open and closed', () => {
      // Open
      selectBox.simulate('mousedown');

      expect(selectBox.state('isOptionsPanelOpen')).toEqual(true);

      // Closed
      selectBoxContainer.simulate('mousedown');
      expect(selectBox.state('isOptionsPanelOpen')).toEqual(false);

      // Open
      selectBoxContainer.simulate('mousedown');
      expect(selectBox.state('isOptionsPanelOpen')).toEqual(true);
    });

    it('mousedown on option should update state with correct option index', () => {
      const selectBoxInstance = selectBox.instance();
      const updateStateSpy = sinon.spy(selectBoxInstance, 'updateState');
      optionsContainer.find('[data-key=3]').simulate('mousedown');
      expect(updateStateSpy.args[0][0]).toMatchObject({
        type: actionTypes.SET_SINGLESELECT_OPTIONS,
        value: 3,
      });
      selectBoxInstance.updateState.restore();
    });

    it('blur on rrs__select-container container should close the options panel', () => {
      selectBoxDOM.focus();

      selectBoxContainer.simulate('mouseDown');

      expect(selectBox.state('isOptionsPanelOpen')).toEqual(true);

      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.ESCAPE });

      expect(selectBox.state('isOptionsPanelOpen')).toEqual(false);
    });

    it('hitting an alphanumerical key on a rrs__button container should open the options panel and set nextPotentialSelectionIndex', () => {
      selectBoxDOM.focus();

      expect(selectBox.state('nextPotentialSelectionIndex')).toEqual(1);

      selectBoxContainer.simulate('keyDown', { keyCode: 66, key: 'b' });

      expect(selectBox.state('nextPotentialSelectionIndex')).toEqual(3);
      expect(selectBox.state('isOptionsPanelOpen')).toEqual(true);
    });
  });

  describe('ReactResponsiveSelect Disabled', () => {
    let selectBox;
    let selectBoxContainer;
    let selectBoxDOM;

    afterEach(() => {
      selectBox.unmount();
    });

    it('when disabled, event handlers cannot change state', () => {
      selectBox = setup({ disabled: true });
      selectBoxContainer = selectBox.find('.rrs');
      selectBoxDOM = selectBoxContainer.getDOMNode();

      const initialState = { ...selectBox.state() };
      selectBoxDOM.focus();

      selectBoxContainer.simulate('keyDown', { keyCode: 66, key: 'b' });
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.ESCAPE });
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.ENTER });
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.SPACE });
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.UP });
      selectBoxContainer.simulate('touchStart');
      selectBoxContainer.simulate('touchMove');
      selectBoxContainer.simulate('touchEnd');
      selectBoxContainer.simulate('mouseDown');

      expect(initialState).toMatchObject(selectBox.state());
    });

    it('should add disabled class on singleselect', () => {
      const props = {
        disabled: true,
        name: 'make',
        options: [
          { text: 'Any', value: 'null' },
          { text: 'Fiat', value: 'fiat' },
        ],
      };
      selectBox = setup(undefined, props);
      expect(selectBox.find('.rrs__button--disabled').length).toEqual(1);
    });

    it('should add disabled class on multiselect', () => {
      const props = {
        multiselect: true,
        disabled: true,
        name: 'make',
        options: [
          { text: 'Any', value: 'null' },
          { text: 'Fiat', value: 'fiat' },
        ],
      };
      selectBox = setup(undefined, props);
      expect(selectBox.find('.rrs__button--disabled').length).toEqual(1);
    });

    it('option can be disabled on multiselect', () => {
      const props = {
        multiselect: true,
        name: 'make',
        options: [
          { text: 'Any', value: 'null' },
          { text: 'Fiat', value: 'fiat', disabled: true },
        ],
      };
      selectBox = setup(undefined, props);
      expect(
        selectBox
          .find('.rrs__option')
          .at(0)
          .props()['aria-disabled'],
      ).toEqual('false');
      expect(
        selectBox
          .find('.rrs__option')
          .at(1)
          .props()['aria-disabled'],
      ).toEqual('true');
      expect(selectBox.find('.rrs__option--disabled').length).toEqual(1);
    });

    it('option can be disabled on singleselect', () => {
      const props = {
        multiselect: true,
        name: 'make',
        options: [
          { text: 'Any', value: 'null' },
          { text: 'Fiat', value: 'fiat', disabled: true },
        ],
      };
      selectBox = setup(undefined, props);
      expect(
        selectBox
          .find('.rrs__option')
          .at(0)
          .props()['aria-disabled'],
      ).toEqual('false');
      expect(
        selectBox
          .find('.rrs__option')
          .at(1)
          .props()['aria-disabled'],
      ).toEqual('true');
      expect(selectBox.find('.rrs__option--disabled').length).toEqual(1);
    });
  });

  describe('ReactResponsiveSelect functions', () => {
    let selectBox;
    let selectBoxInstance;
    let selectBoxContainer;

    let submitSpy;
    let changeSpy;
    let updateStateSpy;
    let handleEnterPressedSpy;
    let handleKeyUpOrDownPressedSpy;

    beforeEach(() => {
      submitSpy = sinon.spy(mockFunctions, 'onSubmitFunction');
      changeSpy = sinon.spy(mockFunctions, 'onChangeFunction');
      selectBox = setup({
        onSubmit: submitSpy,
        onChange: changeSpy,
      });
      selectBoxContainer = selectBox.find('.rrs__button');
      selectBoxInstance = selectBox.instance();
      updateStateSpy = sinon.spy(selectBoxInstance, 'updateState');
      handleEnterPressedSpy = sinon.spy(handleEnterPressed, 'default');
      handleKeyUpOrDownPressedSpy = sinon.spy(
        handleKeyUpOrDownPressed,
        'default',
      );
    });

    afterEach(() => {
      submitSpy.restore();
      changeSpy.restore();
      updateStateSpy.restore();
      handleEnterPressedSpy.restore();
      handleKeyUpOrDownPressedSpy.restore();

      selectBox.unmount();
    });

    it('handleTouchStart() should set isDragging to false', () => {
      selectBoxContainer.simulate('touchStart');
      expect(updateStateSpy.args[0]).toMatchObject([
        { type: actionTypes.SET_IS_DRAGGING, value: false },
      ]);
    });

    it('handleTouchMove() should set isDragging to true', () => {
      selectBoxContainer.simulate('touchMove');
      expect(updateStateSpy.args[0]).toMatchObject([
        { type: actionTypes.SET_IS_DRAGGING, value: true },
      ]);
    });

    it('Enter key calls handleKeyEvent() handleEnterPressed()', () => {
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.ENTER });
      expect(handleEnterPressedSpy.called).toEqual(true);
    });

    it('handleKeyEvent() - keyDown "ENTER" calls handleEnterPressed() and onSubmit() when options panel closed', () => {
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.ENTER });
      expect(handleEnterPressedSpy.called).toEqual(true);
      expect(submitSpy.called).toEqual(true);
      expect(handleEnterPressedSpy.args[0][0].event.defaultPrevented).toEqual(
        true,
      );
    });

    it('handleKeyEvent() - keyDown "ENTER" calls handleEnterPressed() and toggleOptionsPanel("close") when options panel open', () => {
      selectBoxContainer.simulate('mouseDown'); // open
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.ENTER });

      expect(handleEnterPressedSpy.called).toEqual(true);
      expect(submitSpy.called).toEqual(false);
      expect(updateStateSpy.secondCall.args[0]).toMatchObject({
        value: 1,
        type: 'SET_SINGLESELECT_OPTIONS',
      });
      expect(handleEnterPressedSpy.args[0][0].event.defaultPrevented).toEqual(
        true,
      );
      expect(
        handleEnterPressedSpy.args[0][0].event.isPropagationStopped(),
      ).toEqual(true);
    });

    it('handleKeyEvent() - keyDown "ENTER" calls handleEnterPressed() and selects nextPotentialSelectionIndex when multiselect', () => {
      selectBox.setState({
        multiselect: true,
        nextPotentialSelectionIndex: 3,
        isOptionsPanelOpen: true,
      });

      selectBox
        .find('.rrs__options .rrs__option')
        .at(3)
        .simulate('keyDown', { keyCode: keyCodes.ENTER });

      expect(handleEnterPressedSpy.called).toEqual(true);
      expect(submitSpy.called).toEqual(false);
      expect(updateStateSpy.firstCall.args[0]).toMatchObject({
        type: actionTypes.SET_MULTISELECT_OPTIONS,
        value: 3,
      });
    });

    it('handleKeyEvent() - keyDown "SPACE" toggles the options panel open/closed with toggleOptionsPanel()', () => {
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.SPACE });
      expect(selectBox.state('isOptionsPanelOpen')).toEqual(true);

      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.SPACE });
      expect(selectBox.state('isOptionsPanelOpen')).toEqual(false);
    });

    it('handleKeyEvent() - keyDown "ESCAPE" closes the options panel by blurring it', () => {
      selectBoxContainer.simulate('mouseDown'); // open
      expect(selectBox.state('isOptionsPanelOpen')).toEqual(true);

      // ensure its focussed
      expect(
        document.activeElement.classList.contains('rrs__option--selected'),
      ).toEqual(true);

      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.ESCAPE });
      expect(
        document.activeElement.classList.contains('rrs__option--selected'),
      ).toEqual(false);
    });

    it('handleKeyEvent() - keyDown "UP" calls handleEnterPressed("decrement")', () => {
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.UP });
      expect(handleKeyUpOrDownPressedSpy.calledOnce).toEqual(true);
      expect(handleKeyUpOrDownPressedSpy.args[0][0].type).toEqual('DECREMENT');
    });

    it('handleKeyEvent() - keyDown "UP" opens the options panel when closed', () => {
      selectBox.setState({ isOptionsPanelOpen: false });
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.UP });
      expect(updateStateSpy.args[0][0]).toMatchObject({
        type: 'SET_NEXT_SELECTED_INDEX',
        value: 1,
      });
      expect(updateStateSpy.args[1][0]).toMatchObject({
        type: 'SET_OPTIONS_PANEL_OPEN',
      });
    });

    it('handleKeyEvent() - keyDown "DOWN" calls handleEnterPressed("increment")', () => {
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.DOWN });
      expect(handleKeyUpOrDownPressedSpy.calledOnce).toEqual(true);
      expect(handleKeyUpOrDownPressedSpy.args[0][0].type).toEqual('INCREMENT');
    });

    it('handleKeyEvent() - keyDown "DOWN" opens the options panel when closed', () => {
      selectBox.setState({ isOptionsPanelOpen: false });
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.DOWN });
      expect(updateStateSpy.args[0][0]).toMatchObject({
        type: 'SET_NEXT_SELECTED_INDEX',
        value: 1,
      });
      expect(updateStateSpy.args[1][0]).toMatchObject({
        type: 'SET_OPTIONS_PANEL_OPEN',
      });
    });

    it('handleKeyEvent() - keyDown "DOWN" does NOT open the options panel when open', () => {
      selectBox.setState({ isOptionsPanelOpen: true });
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.DOWN });
      expect(
        updateStateSpy.calledWith({ type: 'SET_OPTIONS_PANEL_OPEN' }),
      ).toEqual(false);
    });

    it('handleKeyEvent() - keyDown "TAB" does NOT move focus away from options panel when open', () => {
      selectBox.setState({ isOptionsPanelOpen: true });
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.TAB });
      expect(updateStateSpy.calledOnce).toEqual(false);
    });

    it('handleKeyEvent() - keyDown "TAB" does NOT close options panel when multiselect', () => {
      selectBox.setState({ isOptionsPanelOpen: true, multiselect: true });
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.TAB });
      expect(selectBox.state('isOptionsPanelOpen')).toEqual(true);
    });

    it('tapping on selectBox does not close the options panel when a user is dragging - allowing a touch device user to scroll', () => {
      window.ontouchstart = 'fakeEvent';

      const selectBoxButton = selectBox.find('.rrs__button');

      selectBox.setState({
        isDragging: true,
        isOptionsPanelOpen: true,
      });

      selectBoxButton.simulate('touchStart');

      expect(selectBox.state('isOptionsPanelOpen')).toEqual(true);

      delete window.ontouchstart;
    });
  });

  describe('option list selectedValue .rrs__option--selected class', () => {
    let selectBox;

    afterEach(() => {
      selectBox.unmount();
    });

    it('should add .rrs__option--selected class to option if selectedValue prop found in options', () => {
      selectBox = setup();
      expect(
        selectBox
          .find('.rrs__options .rrs__option.rrs__option--selected')
          .props().children,
      ).toEqual('Fiat');
    });

    it('should add .rrs__option--selected class to first option when unrecognised selectedValue prop', () => {
      selectBox = setup({ selectedValue: 'blahblah' });
      expect(
        selectBox
          .find('.rrs__options .rrs__option.rrs__option--selected')
          .props().children,
      ).toEqual('Any');
    });

    it('should add .rrs__option--selected class to first option when no selectedValue prop', () => {
      const props = {
        prefix: 'Make',
        name: 'make',
        selectedValue: undefined,
        options: [
          { text: 'Any', value: 'null' },
          { text: 'Fiat', value: 'fiat' },
        ],
      };
      selectBox = setup(props);
      expect(
        selectBox
          .find('.rrs__options .rrs__option.rrs__option--selected')
          .props().children,
      ).toEqual('Any');
    });
  });

  describe('MultiSelect', () => {
    let selectBox;

    afterEach(() => {
      selectBox.unmount();
    });

    it('should render MultiSelect if multiselect mode requested', () => {
      selectBox = setup(
        {
          multiselect: true,
        },
        undefined,
        {
          multiselect: true,
          multiSelectInitialSelectedIndexes: [1, 2, 3],
          multiSelectSelectedOptions: {
            options: [
              { value: 'fiat', text: 'Fiat' },
              { value: 'subaru', text: 'Subaru' },
              { value: 'bmw', text: 'BMW' },
            ],
          },
          multiSelectSelectedIndexes: [1, 2, 3],
        },
      );
      expect(selectBox.find('.rrs__multiselect-label').length).toEqual(1);
    });

    it('should add .rrs--has-changed class to label if select has been altered', () => {
      selectBox = setup({
        multiselect: true,
        caretIcon: '+',
        selectedValues: ['fiat', 'subaru'],
      });
      const selectBoxInstance = selectBox.instance();

      selectBoxInstance.updateState({
        type: actionTypes.SET_MULTISELECT_OPTIONS,
        value: 3,
      });

      selectBox.update();

      expect(selectBox.find('.rrs').hasClass('rrs--has-changed')).toEqual(true);
    });

    it('should allow multiple selection on click of an option and not close', () => {
      selectBox = setup({
        multiselect: true,
        caretIcon: '+',
        selectedValues: ['fiat', 'subaru'],
      });
      const selectBoxInstance = selectBox.instance();
      const updateStateSpy = sinon.spy(selectBoxInstance, 'updateState');
      const optionsContainer = selectBox.find('.rrs__options');

      optionsContainer.find('[data-key=3]').simulate('mousedown');
      expect(updateStateSpy.args[0][0]).toMatchObject({
        type: actionTypes.SET_MULTISELECT_OPTIONS,
        value: 3,
      });
      expect(updateStateSpy.calledOnce).toEqual(true); // does not do anything else .... like close
    });
  });

  describe('customLabelRenderer', () => {
    let selectBox;

    afterEach(() => {
      selectBox.unmount();
    });

    it('should handle customLabelRenderer on single select', () => {
      const props = {
        prefix: 'Make',
        name: 'make',
        customLabelRenderer: option => `${option.text} selected`,
        options: [
          { text: 'Any', value: 'null' },
          { text: 'Fiat', value: 'fiat' },
        ],
      };
      selectBox = setup(undefined, props);
      expect(selectBox.find('.rrs__label__text').props().children).toEqual(
        'Any selected',
      );
    });

    it('should handle customLabelRenderer on multi select', () => {
      const props = {
        multiselect: true,
        prefix: 'Make',
        name: 'make',
        selectedValues: ['fiat'],
        customLabelRenderer: option =>
          `${
            option.options
              ? option.options.map(o => o.text).join(', ')
              : 'Nothing'
          } selected`,
        options: [
          { text: 'Any', value: 'null' },
          { text: 'Fiat', value: 'fiat' },
        ],
      };
      selectBox = setup(undefined, props);
      expect(selectBox.find('.rrs__label__text').props().children).toEqual(
        'Fiat selected',
      );
    });
  });
});
