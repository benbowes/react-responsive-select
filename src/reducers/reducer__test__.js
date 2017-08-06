import { expect } from 'chai';
import reducer, { initialState } from './reducer';
import * as actionTypes from '../constants/actionTypes';

describe('reducer', () => {

  it('should update state when INITIALISE is fired', () => {
    const result = reducer(
      initialState,
      {
        type: actionTypes.INITIALISE,
        value: {
          ...initialState,
          options: [{ text: 'Any', value: 'null' }, { text: 'Fiat', value: 'fiat' }],
          selectedValue: 'fiat',
          name: 'thing'
        }
      }
    );
    expect(result.name).to.eql('thing');
    expect(result.singleSelectSelectedOption).to.eql({ name: 'thing', text: 'Fiat', value: 'fiat' });
  });

  it('should update state.isDragging when SET_IS_DRAGGING is fired', () => {
    const result = reducer(
      initialState,
      {
        type: actionTypes.SET_IS_DRAGGING,
        boolean: true
      }
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
      {
        type: actionTypes.SET_OPTIONS_PANEL_OPEN,
        value: true
      }
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

  it('should update state.singleSelectSelectedIndex when SET_SINGLESELECT_OPTIONS is fired', () => {
    const mockState = {
      ...initialState,
      name: 'make1',
      options: [{ text: 'Any', value: 'null' }, { text: 'Fiat', value: 'fiat' }]
    };
    const result = reducer(
      mockState,
      {
        type: actionTypes.SET_SINGLESELECT_OPTIONS,
        optionIndex: 1
      }
    );

    expect(result).to.eql({
      ...mockState,
      altered: true,
      nextPotentialSelectionIndex: 1,
      singleSelectSelectedIndex: 1,
      singleSelectSelectedOption: {
        name: 'make1',
        text: 'Fiat',
        value: 'fiat'
      }
    });
  });

  describe('MultiSelect', () => {

    it('should deselect all and select first option when first option requested', () => {
      const initialState = {
        name: 'thing',
        isMultiSelect: true,
        altered: false,
        options: [
          { text: 'Any', value: 'null' },
          { text: 'Fiat', value: 'fiat' },
          { text: 'Mazda', value: 'mazda' }
        ],
        multiSelectInitialSelectedIndexes: [1, 2],
        multiSelectSelectedIndexes: [1, 2],
        multiSelectSelectedOptions: {
          options: [{ name: 'make2', text: 'Fiat', value: 'fiat' }, { name: 'make2', text: 'Mazda', value: 'mazda' }]
        },
        nextPotentialSelectionIndex: 2
      };

      const result = reducer(
        initialState,
        {
          type: actionTypes.SET_MULTISELECT_OPTIONS,
          optionIndex: 0
        }
      );

      expect(result).to.eql({
        isMultiSelect: true,
        altered: true,
        name: 'thing',
        options: [
          { text: 'Any', value: 'null' },
          { text: 'Fiat', value: 'fiat' },
          { text: 'Mazda', value: 'mazda' }
        ],
        multiSelectInitialSelectedIndexes: [1, 2],
        multiSelectSelectedIndexes: [0],
        multiSelectSelectedOptions: {
          options: [{ name: 'thing', text: 'Any', value: 'null' }]
        },
        nextPotentialSelectionIndex: 0
      });
    });

    it('should deselect first option and select requested option when NOT first option requested', () => {
      const initialState = {
        isMultiSelect: true,
        altered: false,
        name: 'thing',
        options: [{ text: 'Any', value: 'null' }, { text: 'Fiat', value: 'fiat' }],
        multiSelectInitialSelectedIndexes: [0],
        multiSelectSelectedIndexes: [0],
        multiSelectSelectedOptions: {
          options: [{ name: 'thing', text: 'Any', value: 'null' }]
        },
        nextPotentialSelectionIndex: 0
      };

      const result = reducer(
        initialState,
        {
          type: actionTypes.SET_MULTISELECT_OPTIONS,
          optionIndex: 1
        }
      );

      expect(result).to.eql({
        isMultiSelect: true,
        altered: true,
        name: 'thing',
        options: [{ text: 'Any', value: 'null' }, { text: 'Fiat', value: 'fiat' }],
        multiSelectInitialSelectedIndexes: [0],
        multiSelectSelectedIndexes: [1],
        multiSelectSelectedOptions: {
          options: [{ name: 'thing', text: 'Fiat', value: 'fiat' }]
        },
        nextPotentialSelectionIndex: 1
      });
    });

    it('should add to multiselect options when requested item if does not exist', () => {
      const initialState = {
        isMultiSelect: true,
        name: 'thing',
        altered: false,
        options: [
          { text: 'Any', value: 'null' },
          { text: 'Fiat', value: 'fiat' },
          { text: 'Mazda', value: 'mazda' }
        ],
        multiSelectInitialSelectedIndexes: [1],
        multiSelectSelectedIndexes: [1],
        multiSelectSelectedOptions: {
          options: [{ name: 'thing', text: 'Fiat', value: 'fiat' }]
        },
        nextPotentialSelectionIndex: 1
      };

      const result = reducer(
        initialState,
        {
          type: actionTypes.SET_MULTISELECT_OPTIONS,
          optionIndex: 2
        }
      );

      expect(result).to.eql({
        isMultiSelect: true,
        altered: true,
        options: [
          { text: 'Any', value: 'null' },
          { text: 'Fiat', value: 'fiat' },
          { text: 'Mazda', value: 'mazda' }
        ],
        name: 'thing',
        multiSelectInitialSelectedIndexes: [1],
        multiSelectSelectedIndexes: [1, 2],
        multiSelectSelectedOptions: {
          options: [{ name: 'thing', text: 'Fiat', value: 'fiat' }, { name: 'thing', text: 'Mazda', value: 'mazda' }]
        },
        nextPotentialSelectionIndex: 2
      });
    });

    it('should remove from multiselect options when requested item exists', () => {
      const initialState = {
        isMultiSelect: true,
        altered: false,
        options: [
          { text: 'Any', value: 'null' },
          { text: 'Fiat', value: 'fiat' },
          { text: 'Mazda', value: 'mazda' }
        ],
        multiSelectInitialSelectedIndexes: [1],
        multiSelectSelectedIndexes: [1, 2],
        multiSelectSelectedOptions: {
          options: [{ name: 'make2', text: 'Fiat', value: 'fiat' }, { name: 'make2', text: 'Mazda', value: 'mazda' }]
        },
        nextPotentialSelectionIndex: 2
      };

      const result = reducer(
        initialState,
        {
          type: actionTypes.SET_MULTISELECT_OPTIONS,
          optionIndex: 2
        }
      );

      expect(result).to.eql({
        isMultiSelect: true,
        altered: false,
        options: [
          { text: 'Any', value: 'null' },
          { text: 'Fiat', value: 'fiat' },
          { text: 'Mazda', value: 'mazda' }
        ],
        multiSelectInitialSelectedIndexes: [1],
        multiSelectSelectedIndexes: [1],
        multiSelectSelectedOptions: {
          options: [{ name: 'make2', text: 'Fiat', value: 'fiat' }]
        },
        nextPotentialSelectionIndex: 2
      });
    });

    it('should select first item if all options are deselected', () => {
      const initialState = {
        isMultiSelect: true,
        altered: false,
        name: 'thing',
        options: [{ text: 'Any', value: 'null' }, { text: 'Fiat', value: 'fiat' }],
        multiSelectInitialSelectedIndexes: [1],
        multiSelectSelectedIndexes: [1],
        multiSelectSelectedOptions: {
          options: [{ name: 'thing', text: 'Fiat', value: 'fiat' }]
        },
        nextPotentialSelectionIndex: 1
      };

      const result = reducer(
        initialState,
        {
          type: actionTypes.SET_MULTISELECT_OPTIONS,
          optionIndex: 1
        }
      );

      expect(result).to.eql({
        isMultiSelect: true,
        altered: true,
        name: 'thing',
        options: [{ text: 'Any', value: 'null' }, { text: 'Fiat', value: 'fiat' }],
        multiSelectInitialSelectedIndexes: [1],
        multiSelectSelectedIndexes: [0],
        multiSelectSelectedOptions: {
          options: [{ name: 'thing', text: 'Any', value: 'null' }]
        },
        nextPotentialSelectionIndex: 0
      });

    });
  });

});
