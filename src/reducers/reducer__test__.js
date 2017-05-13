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
    expect(result.singleSelectSelectedOption).to.eql({ name: 'make2', text: 'Fiat', value: 'fiat' });
  });

  it('should update state.isDragging when SET_IS_DRAGGING is fired', () => {
    const result = reducer(
      initialState,
      { type: actionTypes.SET_IS_DRAGGING, boolean: true }
    );

    expect(result).to.eql({
      ...initialState,
      isDragging: true
    });
  });

  it('should update state.isOptionsPanelOpen when SET_OPTIONS_PANEL_OPEN is fired', () => {
    const mockInitialState = {
      nextPotentialSelectionIndex: 0,
      singleSelectSelectedIndex: 0,
      name: 'make1',
      options: [{ text: 'Any', value: 'null' }]
    };
    const result = reducer(
      mockInitialState,
      { type: actionTypes.SET_OPTIONS_PANEL_OPEN, value: true }
    );

    expect(result).to.eql({
      ...mockInitialState,
      altered: true,
      singleSelectSelectedOption: {
        name: 'make1',
        text: 'Any',
        value: 'null'
      },
      isOptionsPanelOpen: true
    });
  });

  it('should update state.singleSelectSelectedIndex when SET_SELECTED_INDEX is fired', () => {
    const result = reducer(
      initialState,
      { type: actionTypes.SET_SELECTED_INDEX, optionIndex: 7 }
    );

    expect(result).to.eql({
      ...initialState,
      nextPotentialSelectionIndex: 7,
      singleSelectSelectedIndex: 7
    });
  });

});
