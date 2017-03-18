import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import jsdom from 'jsdom';

import SelectBox from './SelectBox';
import * as actionTypes from './actionTypes';

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

const setup = ((overrideProps, customProps = undefined) => {
  const props = customProps || {
    ...initialProps,
    ...overrideProps
  };
  return mount(<SelectBox {...props}/>);
});

describe('SelectBox', () => {

  describe('Initialise', () => {

    let selectBox;
    let selectBoxInstance;

    beforeEach(() => {
      selectBox = setup();
      selectBoxInstance = selectBox.instance();
    });

    it('should render correct amount of options and have an onSubmit function', () => {
      expect(selectBox.find('.options-container .option').length).to.equal(5);
      expect(selectBox.find('SelectBox').props().onSubmit).to.equal(submitSpy);
    });

    it('should setup state', () => {
      const expectedState = {
        isDragging: false,
        isOptionsPanelOpen: false,
        nextSelectedIndex: 1,
        selectedIndex: 1,
        name: 'make',
        options: [
          { text: 'Any', value: 'null' },
          { text: 'Fiat', value: 'fiat' },
          { text: 'Subaru', value: 'subaru' },
          { text: 'BMW', value: 'bmw' },
          { text: 'Tesla', value: 'tesla' }
        ],
        selectedOption: {
          text: 'Fiat',
          value: 'fiat'
        }
      };

      expect(selectBox.state()).to.eql( expectedState );
    });

    it('should not mutate state', () => {
      expect(selectBox.state()).to.eql( {
        isDragging: false,
        isOptionsPanelOpen: false,
        nextSelectedIndex: 1,
        selectedIndex: 1,
        name: 'make',
        options: [
          { text: 'Any', value: 'null' },
          { text: 'Fiat', value: 'fiat' },
          { text: 'Subaru', value: 'subaru' },
          { text: 'BMW', value: 'bmw' },
          { text: 'Tesla', value: 'tesla' }
        ],
        selectedOption: {
          text: 'Fiat',
          value: 'fiat'
        }
      } );
    });

    it('should setup mousedown, keyup and blur on desktop', () => {
      const listenerKeys = Object.keys(selectBoxInstance.listeners).map(k => k);
      expect(listenerKeys).to.eql(['onBlur', 'onMouseDown', 'onKeyDown']);
    });

    it('should setup touchmove, touchstart, touchend and blur on a touch device', () => {
      jsdom.env({
        html: '<html></html>',
        done: function (error, window) {
          window['ontouchstart'] = 'fakeEvent';

          const selectBoxMobile = setup();
          const selectBoxInstanceMobile = selectBoxMobile.instance();

          const listenerKeys = Object.keys(selectBoxInstanceMobile.listeners).map(k => k);
          expect(listenerKeys).to.eql(['onBlur', 'onTouchMove', 'onTouchStart', 'onTouchEnd']);

          window.close();
        }
      });
    });

    afterEach(() => {
      selectBox.unmount();
    });

  });

  describe('Events', () => {

    let selectBox;
    let selectBoxContainer;
    let selectBoxDOM;

    beforeEach(() => {
      selectBox = setup();
      selectBoxContainer = selectBox.find('.select-box');
      selectBoxDOM = selectBoxContainer.getDOMNode();
    });

    it('mousedown on select-box container should toggle the options panel open and closed', () => {
      // Open
      selectBoxContainer.simulate('mousedown');
      expect(selectBoxContainer.hasClass('options-container-visible')).to.equal(true);
      expect(selectBox.state('isOptionsPanelOpen')).to.equal(true);

      // Closed
      selectBoxContainer.simulate('mousedown');
      expect(selectBoxContainer.hasClass('options-container-visible')).to.equal(false);
      expect(selectBox.state('isOptionsPanelOpen')).to.equal(false);

      // Open
      selectBoxContainer.simulate('mousedown');
      expect(selectBoxContainer.hasClass('options-container-visible')).to.equal(true);
      expect(selectBox.state('isOptionsPanelOpen')).to.equal(true);
    });

    it('mousedown on option should update state with correct option index', () => {
      const selectBoxInstance = selectBox.instance();
      const updateStateSpy = sinon.spy(selectBoxInstance, 'updateState');
      selectBoxContainer.find('[data-key=3]').simulate('mousedown');
      expect(updateStateSpy.args[0][0]).to.eql({ type: actionTypes.SET_SELECTED_INDEX, value: 3 });
      selectBoxInstance.updateState.restore();
    });

    it('blur on select-box container should close the options panel', () => {

      expect(selectBoxContainer.hasClass('options-container-visible')).to.equal(false);
      expect(selectBox.state('isOptionsPanelOpen')).to.equal(false);

      selectBoxDOM.focus();

      // Close
      selectBoxContainer.simulate('blur');
      expect(selectBoxContainer.hasClass('options-container-visible')).to.equal(false);
      expect(selectBox.state('isOptionsPanelOpen')).to.equal(false);
    });

    afterEach(() => {
      selectBox.unmount();
    });

  });

  describe('SelectBox functions', () => {

    let selectBox;
    let selectBoxInstance;
    let selectBoxContainer;
    let updateStateSpy;
    let enterPressedSpy;
    let keyUpOrDownPressedSpy;

    beforeEach(() => {
      selectBox = setup();
      selectBoxInstance = selectBox.instance();

      selectBoxContainer = selectBox.find('.select-box');
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
      expect(updateStateSpy.args[0]).to.eql([{ type: actionTypes.SET_IS_DRAGGING, value: false }]);
      updateStateSpy.reset();
    });

    it('handleTouchMove() should set isDragging to true', () => {
      selectBoxInstance.handleTouchMove();
      expect(updateStateSpy.args[0]).to.eql([{ type: actionTypes.SET_IS_DRAGGING, value: true }]);
      updateStateSpy.reset();
    });

    it('Enter key calls handleSelectBoxKeyEvent() enterPressed()', () => {
      selectBoxContainer.simulate('keyDown', { keyCode: 13 });
      expect(enterPressedSpy.called).to.equal(true);
    });

    it('handleSelectBoxKeyEvent() - keyDown "ENTER" calls enterPressed() and onSubmit() when options panel closed', () => {
      submitSpy.reset();

      selectBoxContainer.simulate('keyDown', { keyCode: 13 });
      expect(enterPressedSpy.called).to.equal(true);
      expect(submitSpy.called).to.equal(true);
      expect(enterPressedSpy.args[0][0].defaultPrevented).to.equal(true);
    });

    it('handleSelectBoxKeyEvent() - keyDown "ENTER" calls enterPressed() and toggleOptionsPanel("close") when options panel open', () => {
      submitSpy.reset();

      selectBoxContainer.simulate('mouseDown'); // open
      selectBoxContainer.simulate('keyDown', { keyCode: 13 }); // enter pressed

      expect(enterPressedSpy.called).to.equal(true);
      expect(submitSpy.called).to.equal(false);
      expect(updateStateSpy.secondCall.args[0]).to.eql({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED });
      expect(enterPressedSpy.args[0][0].defaultPrevented).to.equal(true);
      expect(enterPressedSpy.args[0][0].isPropagationStopped()).to.equal(true);
    });

    it('handleSelectBoxKeyEvent() - keyDown "SPACE" toggles the options panel open/closed with toggleOptionsPanel()', () => {
      selectBoxContainer.simulate('keyDown', { keyCode: 32 }); // space pressed
      expect(selectBox.state('isOptionsPanelOpen')).to.equal( true );

      selectBoxContainer.simulate('keyDown', { keyCode: 32 }); // space pressed
      expect(selectBox.state('isOptionsPanelOpen')).to.equal( false );
    });

    it('handleSelectBoxKeyEvent() - keyDown "ESCAPE" closes the options panel by blurring it', () => {
      selectBoxContainer.simulate('mouseDown'); // open
      expect(selectBox.state('isOptionsPanelOpen')).to.equal( true );

      // ensure its focussed
      expect(document.activeElement.classList.contains('select-box')).to.equal(true);

      selectBoxContainer.simulate('keyDown', { keyCode: 27 }); // escape pressed
      expect(document.activeElement.classList.contains('select-box')).to.equal(false);
    });

    it('handleSelectBoxKeyEvent() - keyDown "UP" calls enterPressed("decrement")', () => {
      selectBoxContainer.simulate('keyDown', { keyCode: 38 });
      expect(keyUpOrDownPressedSpy.calledOnce).to.equal(true);
      expect(keyUpOrDownPressedSpy.args[0][0]).to.equal('decrement');
    });

    it('handleSelectBoxKeyEvent() - keyDown "UP" opens the options panel when closed', () => {
      selectBox.setState({ isOptionsPanelOpen: false });
      selectBoxContainer.simulate('keyDown', { keyCode: 38 });
      expect(updateStateSpy.args[0][0]).to.eql({ type: 'SET_NEXT_SELECTED_INDEX', value: 1 });
      expect(updateStateSpy.args[1][0]).to.eql({ type: 'SET_OPTIONS_PANEL_OPEN' });
    });

    it('handleSelectBoxKeyEvent() - keyDown "DOWN" calls enterPressed("increment")', () => {
      selectBoxContainer.simulate('keyDown', { keyCode: 40 });
      expect(keyUpOrDownPressedSpy.calledOnce).to.equal(true);
      expect(keyUpOrDownPressedSpy.args[0][0]).to.equal('increment');
    });

    it('handleSelectBoxKeyEvent() - keyDown "DOWN" opens the options panel when closed', () => {
      selectBox.setState({ isOptionsPanelOpen: false });
      selectBoxContainer.simulate('keyDown', { keyCode: 40 });
      expect(updateStateSpy.args[0][0]).to.eql({ type: 'SET_NEXT_SELECTED_INDEX', value: 1 });
      expect(updateStateSpy.args[1][0]).to.eql({ type: 'SET_OPTIONS_PANEL_OPEN' });
    });

    it('handleSelectBoxKeyEvent() - keyDown "DOWN" does NOT open the options panel when open', () => {
      selectBox.setState({ isOptionsPanelOpen: true });
      selectBoxContainer.simulate('keyDown', { keyCode: 40 });
      expect(updateStateSpy.calledWith({ type: 'SET_OPTIONS_PANEL_OPEN' })).to.equal(false);
    });

    it('handleSelectBoxKeyEvent() - keyDown "TAB" does NOT move focus away from options panel when open', () => {
      selectBox.setState({ isOptionsPanelOpen: true });
      selectBoxContainer.simulate('keyDown', { keyCode: 9 });
      expect(updateStateSpy.calledOnce).to.equal(false);
    });

    it('tapping on selectBox does not close the options panel when a user is dragging - allowing a touch device user to scroll', () => {
      jsdom.env({
        html: '<html></html>',
        done: function (error, window) {
          window['ontouchstart'] = 'fakeEvent';

          const selectBoxMobile = setup();
          const selectBoxMobileContainer = selectBoxMobile.find('.select-box');

          selectBoxMobileContainer.simulate('touchStart');
          // expect(toggleOptionsPanelSpy.calledOnce).to.equal(true);
          //  expect(updateStateSpy.args[0]).to.eql([{ type: actionTypes.SET_OPTIONS_PANEL_OPEN }]);

          selectBox.setState({ isDragging: true });
          selectBoxMobileContainer.simulate('touchStart');
          // expect(toggleOptionsPanelSpy.calledTwice).to.equal(false);

          window.close();
        }
      });
    });

  });


  describe('option list selectedValue .selected class', () => {

    let selectBox;

    it('should add .selected class to option if selectedValue prop found in options', () => {
      selectBox = setup();
      expect(selectBox.find('.options-container .option.selected').props()['children']).to.equal('Fiat');
    });

    it('should add .selected class to first option when unrecognised selectedValue prop', () => {
      selectBox = setup({selectedValue: 'blahblah'});
      expect(selectBox.find('.options-container .option.selected').props().children).to.equal('Any');
    });

    it('should add .selected class to first option when no selectedValue prop', () => {
      const props = {
        prefix: 'Make',
        name: 'make',
        onSubmit: submitSpy,
        options: [{ text: 'Any', value: 'null' }, { text: 'Fiat', value: 'fiat' }]
      };
      selectBox = setup(undefined, props);
      expect(selectBox.find('.options-container .option.selected').props().children).to.equal('Any');
    });

    afterEach(() => {
      selectBox.unmount();
    });

  });

});
