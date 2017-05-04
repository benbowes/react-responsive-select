import { expect } from 'chai';
import reducer, { initialState } from './reducer';
import * as actionTypes from '../constants/actionTypes';

describe('reducer', () => {

  it('should update state when BOOTSTRAP_STATE is fired', () => {
    const result = reducer(
      initialState,
      {
        type: actionTypes.BOOTSTRAP_STATE,
        value: {
          ...initialState,
          options: [{ name: 'make1', text: 'Any', value: 'null' }, { name: 'make2', text: 'Fiat', value: 'fiat' }],
          selectedValue: 'fiat',
          name: 'thing'
        }
      }
    );
    expect(result.name).to.eql('thing');
    expect(result.selectedOption).to.eql({ name: 'make2', text: 'Fiat', value: 'fiat' });
  });

  it('should update state.isDragging when SET_IS_DRAGGING is fired', () => {
    const result = reducer(
      initialState,
      { type: actionTypes.SET_IS_DRAGGING, value: true }
    );

    expect(result).to.eql({
      ...initialState,
      isDragging: true
    });
  });

  it('should update state.isOptionsPanelOpen when SET_OPTIONS_PANEL_OPEN is fired', () => {
    const mockInitialState = {
      nextSelectedIndex: 0,
      selectedIndex: 0,
      name: 'make1',
      options: [{ text: 'Any', value: 'null' }]
    };
    const result = reducer(
      mockInitialState,
      { type: actionTypes.SET_OPTIONS_PANEL_OPEN, value: true }
    );

    expect(result).to.eql({
      ...mockInitialState,
      selectedOption: {
        name: 'make1',
        altered: true,
        text: 'Any',
        value: 'null'
      },
      isOptionsPanelOpen: true
    });
  });

  it('should update state.selectedIndex when SET_SELECTED_INDEX is fired', () => {
    const result = reducer(
      initialState,
      { type: actionTypes.SET_SELECTED_INDEX, value: 7 }
    );

    expect(result).to.eql({
      ...initialState,
      nextSelectedIndex: 7,
      selectedIndex: 7
    });
  });

});
