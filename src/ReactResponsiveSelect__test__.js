import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

import ReactResponsiveSelect from './ReactResponsiveSelect';
import * as actionTypes from './constants/actionTypes';
import keyCodes from './constants/keyCodes';

const submitSpy = sinon.spy();
const changeSpy = sinon.spy();

const initialProps = {
  prefix: 'Make',
  name: 'make',
  selectedValue: 'fiat',
  onSubmit: submitSpy,
  onChange: changeSpy,
  options: [
    { text: 'Any', value: 'null' },
    { text: 'Fiat', value: 'fiat' },
    { text: 'Subaru', value: 'subaru' },
    { text: 'BMW', value: 'bmw' },
    { text: 'Tesla', value: 'tesla' }
  ]
};

const setup = ((overrideProps, customProps = undefined, state = {}) => {
  const props = customProps || {
    ...initialProps,
    ...overrideProps
  };
  return mount(<ReactResponsiveSelect {...props} {...state} />);
});

describe('ReactResponsiveSelect', () => {

  describe('Initialise', () => {
    let selectBox;
    let selectBoxInstance;

    beforeEach(() => {
      selectBox = setup();
      selectBoxInstance = selectBox.instance();
    });

    afterEach(() => {
      selectBox.unmount();
    });

    it('should render correct amount of options and have an onSubmit function', () => {
      expect(selectBox.find('.rrs__options-container .rrs__option').length).to.equal(5);
      expect(selectBox.find('ReactResponsiveSelect').props().onSubmit).to.equal(submitSpy);
    });

    it('should setup state', () => {
      const expectedState = {
        isDragging: false,
        isOptionsPanelOpen: false,
        singleSelectInitialIndex: 1,
        multiSelectInitialSelectedIndexes: [ 0 ],
        isTouchDevice: false,
        isMultiSelect: false,
        nextPotentialSelectionIndex: 1,
        singleSelectSelectedIndex: 1,
        name: 'make',
        options: [
          { text: 'Any', value: 'null' },
          { text: 'Fiat', value: 'fiat' },
          { text: 'Subaru', value: 'subaru' },
          { text: 'BMW', value: 'bmw' },
          { text: 'Tesla', value: 'tesla' }
        ],
        'multiSelectSelectedIndexes': [ 0 ],
        altered: false,
        'multiSelectSelectedOptions': {
          options: [{
            name: 'make',
            text: 'Any',
            value: 'null'
          }]
        },
        singleSelectSelectedOption: {
          name: 'make',
          text: 'Fiat',
          value: 'fiat'
        }
      };
      expect(selectBox.state()).to.eql( expectedState );
    });

    it('should setup mousedown, keyup and blur on desktop', () => {
      const listenerKeys = Object.keys(selectBoxInstance.listeners).map(k => k);
      expect(listenerKeys).to.eql(['onBlur', 'onMouseDown', 'onKeyDown']);
    });

    it('should setup touchmove, touchstart, touchend and blur on a touch device', () => {
      window['ontouchstart'] = 'fakeEvent';

      const selectBoxMobile = setup();
      const selectBoxInstanceMobile = selectBoxMobile.instance();

      const listenerKeys = Object.keys(selectBoxInstanceMobile.listeners).map(k => k);
      expect(listenerKeys).to.eql(['onBlur', 'onTouchMove', 'onTouchStart', 'onTouchEnd']);

      delete window.ontouchstart;
    });

  });

  describe('Events', () => {
    let selectBox;
    let selectBoxContainer;
    let selectBoxDOM;

    beforeEach(() => {
      selectBox = setup();
      selectBoxContainer = selectBox.find('.rrs__select-container');
      selectBoxDOM = selectBoxContainer.getDOMNode();
    });

    afterEach(() => {
      selectBox.unmount();
    });

    it('mousedown on rrs__select-container container should toggle the options panel open and closed', () => {
      // Open
      selectBoxContainer.simulate('mousedown');
      expect(selectBoxContainer.hasClass('rrs__options-container--visible')).to.equal(true);
      expect(selectBox.state('isOptionsPanelOpen')).to.equal(true);

      // Closed
      selectBoxContainer.simulate('mousedown');
      expect(selectBoxContainer.hasClass('rrs__options-container--visible')).to.equal(false);
      expect(selectBox.state('isOptionsPanelOpen')).to.equal(false);

      // Open
      selectBoxContainer.simulate('mousedown');
      expect(selectBoxContainer.hasClass('rrs__options-container--visible')).to.equal(true);
      expect(selectBox.state('isOptionsPanelOpen')).to.equal(true);
    });

    it('mousedown on option should update state with correct option index', () => {
      const selectBoxInstance = selectBox.instance();
      const updateStateSpy = sinon.spy(selectBoxInstance, 'updateState');
      selectBoxContainer.find('[data-key=3]').simulate('mousedown');
      expect(updateStateSpy.args[0][0]).to.eql({ type: actionTypes.SET_SELECTED_INDEX, optionIndex: 3 });
      selectBoxInstance.updateState.restore();
    });

    it('blur on rrs__select-container container should close the options panel', () => {
      expect(selectBoxContainer.hasClass('rrs__options-container--visible')).to.equal(false);
      expect(selectBox.state('isOptionsPanelOpen')).to.equal(false);

      selectBoxDOM.focus();

      // Close
      selectBoxContainer.simulate('blur');
      expect(selectBoxContainer.hasClass('rrs__options-container--visible')).to.equal(false);
      expect(selectBox.state('isOptionsPanelOpen')).to.equal(false);
    });

  });

  describe('ReactResponsiveSelect functions', () => {
    let selectBox;
    let selectBoxInstance;
    let selectBoxContainer;
    let updateStateSpy;
    let enterPressedSpy;
    let keyUpOrDownPressedSpy;

    beforeEach(() => {
      selectBox = setup();
      selectBoxInstance = selectBox.instance();

      selectBoxContainer = selectBox.find('.rrs__select-container');
      updateStateSpy = sinon.spy(selectBoxInstance, 'updateState');
      enterPressedSpy = sinon.spy(selectBoxInstance, 'enterPressed');
      keyUpOrDownPressedSpy = sinon.spy(selectBoxInstance, 'keyUpOrDownPressed');
    });

    afterEach(() => {
      selectBoxInstance.updateState.restore();
      selectBoxInstance.enterPressed.restore();
      selectBoxInstance.keyUpOrDownPressed.restore();
      selectBox.unmount();
    });

    it('handleTouchStart() should set isDragging to false', () => {
      selectBoxInstance.handleTouchStart();
      expect(updateStateSpy.args[0]).to.eql([{ type: actionTypes.SET_IS_DRAGGING, boolean: false }]);
      updateStateSpy.reset();
    });

    it('handleTouchMove() should set isDragging to true', () => {
      selectBoxInstance.handleTouchMove();
      expect(updateStateSpy.args[0]).to.eql([{ type: actionTypes.SET_IS_DRAGGING, boolean: true }]);
      updateStateSpy.reset();
    });

    it('Enter key calls handleKeyEvent() enterPressed()', () => {
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.ENTER });
      expect(enterPressedSpy.called).to.equal(true);
    });

    it('handleKeyEvent() - keyDown "ENTER" calls enterPressed() and onSubmit() when options panel closed', () => {
      submitSpy.reset();

      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.ENTER });
      expect(enterPressedSpy.called).to.equal(true);
      expect(submitSpy.called).to.equal(true);
      expect(enterPressedSpy.args[0][0].defaultPrevented).to.equal(true);
    });

    it('handleKeyEvent() - keyDown "ENTER" calls enterPressed() and toggleOptionsPanel("close") when options panel open', () => {
      submitSpy.reset();

      selectBoxContainer.simulate('mouseDown'); // open
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.ENTER });

      expect(enterPressedSpy.called).to.equal(true);
      expect(submitSpy.called).to.equal(false);
      expect(updateStateSpy.secondCall.args[0]).to.eql({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED });
      expect(enterPressedSpy.args[0][0].defaultPrevented).to.equal(true);
      expect(enterPressedSpy.args[0][0].isPropagationStopped()).to.equal(true);
    });

    it('handleKeyEvent() - keyDown "ENTER" calls enterPressed() and selects nextPotentialSelectionIndex when multiselect', () => {
      submitSpy.reset();
      selectBox.setState({ isMultiSelect: true, nextPotentialSelectionIndex: 3 });

      selectBoxContainer.simulate('mouseDown'); // open
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.ENTER });

      selectBox.find('.rrs__options-container .rrs__option').at(3).simulate('keyDown', { keyCode: keyCodes.ENTER });

      expect(enterPressedSpy.called).to.equal(true);
      expect(submitSpy.called).to.equal(false);
      expect(updateStateSpy.firstCall.args[0]).to.eql({ type: actionTypes.SET_MULTISELECT_OPTIONS, optionIndex: 3 });
    });

    it('handleKeyEvent() - keyDown "SPACE" toggles the options panel open/closed with toggleOptionsPanel()', () => {
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.SPACE });
      expect(selectBox.state('isOptionsPanelOpen')).to.equal( true );

      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.SPACE });
      expect(selectBox.state('isOptionsPanelOpen')).to.equal( false );
    });

    it('handleKeyEvent() - keyDown "ESCAPE" closes the options panel by blurring it', () => {
      selectBoxContainer.simulate('mouseDown'); // open
      expect(selectBox.state('isOptionsPanelOpen')).to.equal( true );

      // ensure its focussed
      expect(document.activeElement.classList.contains('rrs__select-container')).to.equal(true);

      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.ESC });
      expect(document.activeElement.classList.contains('rrs__select-container')).to.equal(false);
    });

    it('handleKeyEvent() - keyDown "UP" calls enterPressed("decrement")', () => {
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.UP });
      expect(keyUpOrDownPressedSpy.calledOnce).to.equal(true);
      expect(keyUpOrDownPressedSpy.args[0][0]).to.equal('decrement');
    });

    it('handleKeyEvent() - keyDown "UP" opens the options panel when closed', () => {
      selectBox.setState({ isOptionsPanelOpen: false });
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.UP });
      expect(updateStateSpy.args[0][0]).to.eql({ type: 'SET_NEXT_SELECTED_INDEX', optionIndex: 1 });
      expect(updateStateSpy.args[1][0]).to.eql({ type: 'SET_OPTIONS_PANEL_OPEN' });
    });

    it('handleKeyEvent() - keyDown "DOWN" calls enterPressed("increment")', () => {
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.DOWN });
      expect(keyUpOrDownPressedSpy.calledOnce).to.equal(true);
      expect(keyUpOrDownPressedSpy.args[0][0]).to.equal('increment');
    });

    it('handleKeyEvent() - keyDown "DOWN" opens the options panel when closed', () => {
      selectBox.setState({ isOptionsPanelOpen: false });
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.DOWN });
      expect(updateStateSpy.args[0][0]).to.eql({ type: 'SET_NEXT_SELECTED_INDEX', optionIndex: 1 });
      expect(updateStateSpy.args[1][0]).to.eql({ type: 'SET_OPTIONS_PANEL_OPEN' });
    });

    it('handleKeyEvent() - keyDown "DOWN" does NOT open the options panel when open', () => {
      selectBox.setState({ isOptionsPanelOpen: true });
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.DOWN });
      expect(updateStateSpy.calledWith({ type: 'SET_OPTIONS_PANEL_OPEN' })).to.equal(false);
    });

    it('handleKeyEvent() - keyDown "TAB" does NOT move focus away from options panel when open', () => {
      selectBox.setState({ isOptionsPanelOpen: true });
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.TAB });
      expect(updateStateSpy.calledOnce).to.equal(false);
    });

    it('tapping on selectBox does not close the options panel when a user is dragging - allowing a touch device user to scroll', () => {
      window['ontouchstart'] = 'fakeEvent';

      const selectBoxMobile = setup();
      const selectBoxMobileContainer = selectBoxMobile.find('.rrs__select-container');

      selectBoxMobileContainer.simulate('touchStart');

      selectBox.setState({ isDragging: true });
      selectBoxMobileContainer.simulate('touchStart');
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
      expect(selectBox.find('.rrs__options-container .rrs__option.rrs__option--selected').props()['children']).to.equal('Fiat');
    });

    it('should add .rrs__option--selected class to first option when unrecognised selectedValue prop', () => {
      selectBox = setup({selectedValue: 'blahblah'});
      expect(selectBox.find('.rrs__options-container .rrs__option.rrs__option--selected').props().children).to.equal('Any');
    });

    it('should add .rrs__option--selected class to first option when no selectedValue prop', () => {
      const props = {
        prefix: 'Make',
        name: 'make',
        onSubmit: submitSpy,
        options: [{ text: 'Any', value: 'null' }, { text: 'Fiat', value: 'fiat' }]
      };
      selectBox = setup(undefined, props);
      expect(selectBox.find('.rrs__options-container .rrs__option.rrs__option--selected').props().children).to.equal('Any');
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
          multiselect: true
        },
        undefined,
        {
          isMultiSelect: true,
          multiSelectInitialSelectedIndexes: [1, 2, 3],
          multiSelectSelectedOptions: {
            options: [
              { value: 'fiat', text: 'Fiat' },
              { value: 'subaru', text: 'Subaru' },
              { value: 'bmw', text: 'BMW' }
            ]
          },
          multiSelectSelectedIndexes: [1, 2, 3]
        }
      );
      expect(selectBox.find('.rrs__select-container--multiselect').length).to.equal(1);
    });

    it('should add .rrs__has-changed class to label if select has been altered', () => {
      selectBox = setup({
        multiselect: true,
        caretIcon: '+',
        selectedValues: ['fiat', 'subaru']
      });
      const selectBoxInstance = selectBox.instance();

      selectBoxInstance.updateState({
        type: actionTypes.SET_MULTISELECT_OPTIONS,
        optionIndex: 3
      });

      expect(selectBox.find('.rrs__select-container--multiselect').hasClass('rrs__has-changed')).to.equal(true);
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
        customLabelRenderer: (option) => `${option.text} selected`,
        onSubmit: submitSpy,
        options: [{ text: 'Any', value: 'null' }, { text: 'Fiat', value: 'fiat' }]
      };
      selectBox = setup(undefined, props);
      expect(selectBox.find('.rrs__select-container .rrs__label').props().children).to.equal('Any selected');
    });

    it('should handle customLabelRenderer on multi select', () => {
      const props = {
        multiselect: true,
        prefix: 'Make',
        name: 'make',
        selectedValues: ['fiat'],
        customLabelRenderer: (option) => {
          return `${option.options ? option.options.map(o => o.text).join(', ') : 'Nothing'} selected`;
        },
        onSubmit: submitSpy,
        options: [{ text: 'Any', value: 'null' }, { text: 'Fiat', value: 'fiat' }]
      };
      selectBox = setup(undefined, props);
      expect(selectBox.find('.rrs__select-container .rrs__label').props().children).to.equal('Fiat selected');
    });

  });
});
