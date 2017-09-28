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
      expect(selectBox.find('.rrs__options .rrs__option').length).to.equal(5);
      expect(selectBox.find('ReactResponsiveSelect').props().onSubmit).to.equal(submitSpy);
    });

    it('should setup state', () => {
      const expectedState = {
        isDragging: false,
        isOptionsPanelOpen: false,
        singleSelectInitialIndex: 1,
        multiSelectInitialSelectedIndexes: [ 0 ],
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

    it('should setup listeners', () => {
      const listenerKeys = Object.keys(selectBoxInstance.listeners).map(k => k);
      expect(listenerKeys).to.eql(['onTouchStart', 'onTouchMove', 'onTouchEnd', 'onBlur', 'onMouseDown', 'onKeyDown']);
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
      selectBoxContainer.simulate('mousedown');
      expect(selectBoxContainer.hasClass('rrs--options-visible')).to.equal(true);
      expect(selectBox.state('isOptionsPanelOpen')).to.equal(true);

      // Closed
      selectBoxContainer.simulate('mousedown');
      expect(selectBoxContainer.hasClass('rrs--options-visible')).to.equal(false);
      expect(selectBox.state('isOptionsPanelOpen')).to.equal(false);

      // Open
      selectBoxContainer.simulate('mousedown');
      expect(selectBoxContainer.hasClass('rrs--options-visible')).to.equal(true);
      expect(selectBox.state('isOptionsPanelOpen')).to.equal(true);
    });

    it('mousedown on option should update state with correct option index', () => {
      const selectBoxInstance = selectBox.instance();
      const updateStateSpy = sinon.spy(selectBoxInstance, 'updateState');
      optionsContainer.find('[data-key=3]').simulate('mousedown');
      expect(updateStateSpy.args[0][0]).to.eql({ type: actionTypes.SET_SINGLESELECT_OPTIONS, optionIndex: 3 });
      selectBoxInstance.updateState.restore();
    });

    it('blur on rrs__select-container container should close the options panel', () => {
      selectBoxDOM.focus();

      selectBoxContainer.simulate('mouseDown');

      expect(selectBoxContainer.hasClass('rrs--options-visible')).to.equal(true);
      expect(selectBox.state('isOptionsPanelOpen')).to.equal(true);

      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.ESCAPE });

      expect(selectBoxContainer.hasClass('rrs--options-visible')).to.equal(false);
      expect(selectBox.state('isOptionsPanelOpen')).to.equal(false);
    });

    it('hitting an alphanumerical key on a rrs__button container should open the options panel and set nextPotentialSelectionIndex', () => {
      selectBoxDOM.focus();

      expect(selectBox.state('nextPotentialSelectionIndex')).to.equal(1);

      selectBoxContainer.simulate('keyDown', { keyCode: 66, key: 'b' });

      expect(selectBox.state('nextPotentialSelectionIndex')).to.equal(3);
      expect(selectBox.state('isOptionsPanelOpen')).to.equal(true);
    });

    //handleAlphaNumerical

  });

  describe('ReactResponsiveSelect functions', () => {
    let selectBox;
    let selectBoxInstance;
    let selectBoxContainer;
    let updateStateSpy;
    let handleEnterPressedSpy;
    let handleKeyUpOrDownPressedSpy;

    beforeEach(() => {
      selectBox = setup();
      selectBoxInstance = selectBox.instance();

      selectBoxContainer = selectBox.find('.rrs__button');
      updateStateSpy = sinon.spy(selectBoxInstance, 'updateState');
      handleEnterPressedSpy = sinon.spy(selectBoxInstance, 'handleEnterPressed');
      handleKeyUpOrDownPressedSpy = sinon.spy(selectBoxInstance, 'handleKeyUpOrDownPressed');
    });

    afterEach(() => {
      selectBoxInstance.updateState.restore();
      selectBoxInstance.handleEnterPressed.restore();
      selectBoxInstance.handleKeyUpOrDownPressed.restore();
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

    it('Enter key calls handleKeyEvent() handleEnterPressed()', () => {
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.ENTER });
      expect(handleEnterPressedSpy.called).to.equal(true);
    });

    it('handleKeyEvent() - keyDown "ENTER" calls handleEnterPressed() and onSubmit() when options panel closed', () => {
      submitSpy.reset();

      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.ENTER });
      expect(handleEnterPressedSpy.called).to.equal(true);
      expect(submitSpy.called).to.equal(true);
      expect(handleEnterPressedSpy.args[0][0].defaultPrevented).to.equal(true);
    });

    it('handleKeyEvent() - keyDown "ENTER" calls handleEnterPressed() and toggleOptionsPanel("close") when options panel open', () => {
      submitSpy.reset();

      selectBoxContainer.simulate('mouseDown'); // open
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.ENTER });

      expect(handleEnterPressedSpy.called).to.equal(true);
      expect(submitSpy.called).to.equal(false);
      expect(updateStateSpy.secondCall.args[0]).to.eql({ 'optionIndex': 1, 'type': 'SET_SINGLESELECT_OPTIONS' });
      expect(handleEnterPressedSpy.args[0][0].defaultPrevented).to.equal(true);
      expect(handleEnterPressedSpy.args[0][0].isPropagationStopped()).to.equal(true);
    });

    it('handleKeyEvent() - keyDown "ENTER" calls handleEnterPressed() and selects nextPotentialSelectionIndex when multiselect', () => {
      submitSpy.reset();
      selectBox.setState({ isMultiSelect: true, nextPotentialSelectionIndex: 3, isOptionsPanelOpen: true });

      selectBox.find('.rrs__options .rrs__option').at(3).simulate('keyDown', { keyCode: keyCodes.ENTER });

      expect(handleEnterPressedSpy.called).to.equal(true);
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
      expect(document.activeElement.classList.contains('rrs__option--selected')).to.equal(true);

      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.ESCAPE });
      expect(document.activeElement.classList.contains('rrs__option--selected')).to.equal(false);
    });

    it('handleKeyEvent() - keyDown "UP" calls handleEnterPressed("decrement")', () => {
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.UP });
      expect(handleKeyUpOrDownPressedSpy.calledOnce).to.equal(true);
      expect(handleKeyUpOrDownPressedSpy.args[0][0]).to.equal('decrement');
    });

    it('handleKeyEvent() - keyDown "UP" opens the options panel when closed', () => {
      selectBox.setState({ isOptionsPanelOpen: false });
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.UP });
      expect(updateStateSpy.args[0][0]).to.eql({ type: 'SET_NEXT_SELECTED_INDEX', optionIndex: 1 });
      expect(updateStateSpy.args[1][0]).to.eql({ type: 'SET_OPTIONS_PANEL_OPEN' });
    });

    it('handleKeyEvent() - keyDown "DOWN" calls handleEnterPressed("increment")', () => {
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.DOWN });
      expect(handleKeyUpOrDownPressedSpy.calledOnce).to.equal(true);
      expect(handleKeyUpOrDownPressedSpy.args[0][0]).to.equal('increment');
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

    it('handleKeyEvent() - keyDown "TAB" does NOT close options panel when isMultiSelect', () => {
      selectBox.setState({ isOptionsPanelOpen: true, isMultiSelect: true });
      selectBoxContainer.simulate('keyDown', { keyCode: keyCodes.TAB });
      expect(selectBox.state('isOptionsPanelOpen')).to.equal(true);
    });

    it('tapping on selectBox does not close the options panel when a user is dragging - allowing a touch device user to scroll', () => {
      window['ontouchstart'] = 'fakeEvent';

      const selectBoxMobile = setup();
      const selectBoxMobileContainer = selectBoxMobile.find('.rrs__button');

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
      expect(selectBox.find('.rrs__options .rrs__option.rrs__option--selected').props()['children']).to.equal('Fiat');
    });

    it('should add .rrs__option--selected class to first option when unrecognised selectedValue prop', () => {
      selectBox = setup({selectedValue: 'blahblah'});
      expect(selectBox.find('.rrs__options .rrs__option.rrs__option--selected').props().children).to.equal('Any');
    });

    it('should add .rrs__option--selected class to first option when no selectedValue prop', () => {
      const props = {
        prefix: 'Make',
        name: 'make',
        onSubmit: submitSpy,
        options: [{ text: 'Any', value: 'null' }, { text: 'Fiat', value: 'fiat' }]
      };
      selectBox = setup(undefined, props);
      expect(selectBox.find('.rrs__options .rrs__option.rrs__option--selected').props().children).to.equal('Any');
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
      expect(selectBox.find('.rrs__multiselect-label').length).to.equal(1);
    });

    it('should add .rrs--has-changed class to label if select has been altered', () => {
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

      expect(selectBox.find('.rrs').hasClass('rrs--has-changed')).to.equal(true);
    });

    it('should allow multiple selection on click of an option and not close', () => {
      selectBox = setup({
        multiselect: true,
        caretIcon: '+',
        selectedValues: ['fiat', 'subaru']
      });
      const selectBoxInstance = selectBox.instance();
      const updateStateSpy = sinon.spy(selectBoxInstance, 'updateState');
      const optionsContainer = selectBox.find('.rrs__options');

      optionsContainer.find('[data-key=3]').simulate('mousedown');
      expect(updateStateSpy.args[0][0]).to.eql({ type: actionTypes.SET_MULTISELECT_OPTIONS, optionIndex: 3 });
      expect(updateStateSpy.calledOnce).to.equal(true); // does not do anything else .... like close
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
      expect(selectBox.find('.rrs__label__text').props().children).to.equal('Any selected');
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
      expect(selectBox.find('.rrs__label__text').props().children).to.equal('Fiat selected');
    });

  });

  describe('disabled', () => {
    let selectBox;

    afterEach(() => {
      selectBox.unmount();
    });

    it('should add disabled class on singleselect', () => {
      const props = {
        disabled: true,
        name: 'make',
        options: [{ text: 'Any', value: 'null' }, { text: 'Fiat', value: 'fiat' }]
      };
      selectBox = setup(undefined, props);
      expect(selectBox.find('.rrs__button--disabled').length).to.equal(1);
    });

    it('should add disabled class on multiselect', () => {
      const props = {
        multiselect: true,
        disabled: true,
        name: 'make',
        options: [{ text: 'Any', value: 'null' }, { text: 'Fiat', value: 'fiat' }]
      };
      selectBox = setup(undefined, props);
      expect(selectBox.find('.rrs__button--disabled').length).to.equal(1);
    });

    it('should not add listeners when disabled', () => {
      const props = {
        multiselect: true,
        disabled: true,
        name: 'make',
        options: [{ text: 'Any', value: 'null' }, { text: 'Fiat', value: 'fiat' }]
      };
      selectBox = setup(undefined, props);
      expect( selectBox.instance().listeners ).to.eql({});
    });
  });

});
