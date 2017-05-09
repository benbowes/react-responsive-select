import * as actionTypes from '../constants/actionTypes';
import getSelectedValueIndex from './lib/getSelectedValueIndex';
import addMultiSelectIndex from './lib/addMultiSelectIndex';
import removeMultiSelectIndex from './lib/removeMultiSelectIndex';
import addMultiSelectOption from './lib/addMultiSelectOption';
import removeMultiSelectOption from './lib/removeMultiSelectOption';
import getInitialOption from './lib/getInitialOption';

export const initialState = {

  // Constants
  isTouchDevice: false,
  isMultiSelect: false,

  // Universal
  name: undefined,
  options: [],
  isDragging: false,
  isOptionsPanelOpen: false,

  // Single select
  singleSelectInitialIndex: 0,
  singleSelectSelectedIndex: 0,
  singleSelectSelectedOption: {},

  // For determining highlighted item on Keyboard navigation
  nextPotentialSelectionIndex: 0,

  // Multi select
  multiSelectInitialSelectedIndexes: [0],
  multiSelectSelectedOptions: {
    altered: false,
    options: []
  },
  multiSelectSelectedIndexes: []
};

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case actionTypes.BOOTSTRAP_STATE: {
      const initialSelectedIndex = getSelectedValueIndex(action.value.options, action.value.selectedValue);
      return {
        ...state,

        // Constants
        isTouchDevice: action.value.isTouchDevice,
        isMultiSelect: action.value.multiselect || false,

        // Universal
        name: action.value.name,
        options: action.value.options,

        // Single select
        singleSelectInitialIndex: initialSelectedIndex,
        singleSelectSelectedIndex: initialSelectedIndex,
        singleSelectSelectedOption: {
          name: action.value.name,
          ...action.value.options[ initialSelectedIndex ]
        },

        // For determining highlighted item on Keyboard navigation
        nextPotentialSelectionIndex: initialSelectedIndex,

        // Multi select
        multiSelectInitialSelectedIndexes: [initialSelectedIndex],
        multiSelectSelectedIndexes: [initialSelectedIndex],
        multiSelectSelectedOptions: {
          altered: false,
          options: [{
            name: action.value.name,
            ...action.value.options[ initialSelectedIndex ]
          }]
        }
      };
    }

    case actionTypes.SET_IS_DRAGGING:
      return {
        ...state,
        isDragging: action.boolean
      };

    case actionTypes.SET_OPTIONS_PANEL_OPEN:
      return {
        ...state,
        isOptionsPanelOpen: true,
        nextPotentialSelectionIndex: state.singleSelectSelectedIndex,
        singleSelectSelectedOption: {
          altered: state.singleSelectSelectedIndex !== state.singleSelectInitialIndex,
          name: state.name,
          ...state.options[ state.singleSelectSelectedIndex ]
        }
      };

    case actionTypes.SET_OPTIONS_PANEL_CLOSED:
      return {
        ...state,
        isOptionsPanelOpen: false,
        singleSelectSelectedIndex: state.nextPotentialSelectionIndex,
        singleSelectSelectedOption: {
          name: state.name,
          altered: state.nextPotentialSelectionIndex !== state.singleSelectInitialIndex,
          ...state.options[state.nextPotentialSelectionIndex]
        }
      };

    case actionTypes.SET_OPTIONS_PANEL_CLOSED_NO_SELECTION:
      return {
        ...state,
        isOptionsPanelOpen: false
      };

    case actionTypes.SET_NEXT_SELECTED_INDEX:
      return {
        ...state,
        nextPotentialSelectionIndex: action.optionIndex
      };

    case actionTypes.SET_SELECTED_INDEX:
      return {
        ...state,
        nextPotentialSelectionIndex: action.optionIndex,
        singleSelectSelectedIndex: action.optionIndex
      };

    case actionTypes.SET_MULTISELECT_OPTIONS: {

      const isFirstOptionInListSelected = (
        state.multiSelectSelectedIndexes[0] === 0 &&
        state.multiSelectSelectedIndexes.length === 1
      );

      // If anything selected and first option was requested, deselect all, then select first option
      const shouldDeselectAllAndSelectFirstOption = (
        state.multiSelectSelectedIndexes.length > 0 &&
        !isFirstOptionInListSelected &&
        action.optionIndex === 0
      );

      // Deselect first option when any other value is requested
      const shouldDeselectFirstOptionAndSelectRequestedOption = (
        isFirstOptionInListSelected &&
        action.optionIndex !== 0
      );

      // If any thing selected and first option was requested, deselect all, and return first option
      if ( shouldDeselectAllAndSelectFirstOption ) {
        return {
          ...state,
          multiSelectSelectedIndexes: [0],
          multiSelectSelectedOptions: {
            altered: false,
            options: [{ name: state.name, ...state.options[0] }]
          },
          nextPotentialSelectionIndex: 0
        };
      }

      // Deselect first option when first option selected and another option is requested
      if ( shouldDeselectFirstOptionAndSelectRequestedOption ) {
        // reset multiSelect state
        state = {
          ...state,
          multiSelectSelectedIndexes: [],
          multiSelectSelectedOptions: {
            altered: false,
            options: []
          }
        };
      }

      // Find index of requested option or return -1
      const indexLocation = state.multiSelectSelectedIndexes.indexOf(action.optionIndex);

      // If requested item does not exist, add it. Else remove it
      let newState = {
        ...state,
        nextPotentialSelectionIndex: action.optionIndex,
        multiSelectSelectedIndexes: indexLocation === -1
          ? addMultiSelectIndex(state, action.optionIndex)
          : removeMultiSelectIndex(state, indexLocation),
        multiSelectSelectedOptions: indexLocation === -1
          ? addMultiSelectOption(state, action.optionIndex)
          : removeMultiSelectOption(state, indexLocation)
      };

      // Select first option if user has deselected all items
      if (newState.multiSelectSelectedOptions.options.length === 0) {
        newState = {
          ...state,
          ...getInitialOption(state)
        };
      }

      return newState;
    }
  }

}
