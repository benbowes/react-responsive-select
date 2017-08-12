import * as actionTypes from '../constants/actionTypes';
import getSelectedValueIndex from './lib/getSelectedValueIndex';
import getSelectedValueIndexes from './lib/getSelectedValueIndexes';
import getInitialMultiSelectSelectedOptions from './lib/getInitialMultiSelectSelectedOptions';
import addMultiSelectIndex from './lib/addMultiSelectIndex';
import removeMultiSelectIndex from './lib/removeMultiSelectIndex';
import addMultiSelectOption from './lib/addMultiSelectOption';
import removeMultiSelectOption from './lib/removeMultiSelectOption';
import mergeIsAlteredState from './lib/mergeIsAlteredState';
import getInitialOption from './lib/getInitialOption';

export const initialState = {

  // Constants
  isMultiSelect: false,

  // Universal
  name: undefined,
  options: [],
  isDragging: false,
  isOptionsPanelOpen: false,
  altered: false,

  // Single select
  singleSelectInitialIndex: 0,
  singleSelectSelectedIndex: 0,
  singleSelectSelectedOption: {},

  // For determining highlighted item on Keyboard navigation
  nextPotentialSelectionIndex: 0,

  // Multi select
  multiSelectInitialSelectedIndexes: [0],
  multiSelectSelectedOptions: { options: [] },
  multiSelectSelectedIndexes: []
};

function resetMultiSelectState(state) {
  return { // reset multiSelect state
    ...state,
    multiSelectSelectedIndexes: [ ...initialState.multiSelectSelectedIndexes ],
    multiSelectSelectedOptions: { ...initialState.multiSelectSelectedOptions }
  };
}

export default function reducer(state, action) {

  switch (action.type) {
    case actionTypes.INITIALISE: {
      const initialSelectedIndex = getSelectedValueIndex(action.value.options, action.value.selectedValue);
      const initialSelectedIndexes = getSelectedValueIndexes(action.value.options, action.value.selectedValues);
      const initialSelectedOptions = getInitialMultiSelectSelectedOptions(action.value.options, action.value.selectedValues, action.value.name);
      return {
        ...state,

        // Constants
        isMultiSelect: action.value.multiselect || false,

        // Universal
        name: action.value.name,
        options: action.value.options,
        altered: false,

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
        multiSelectInitialSelectedIndexes: initialSelectedIndexes,
        multiSelectSelectedIndexes: initialSelectedIndexes,
        multiSelectSelectedOptions: {
          options: initialSelectedOptions
        }
      };
    }

    case actionTypes.SET_IS_DRAGGING:
      return {
        ...state,
        isDragging: action.boolean
      };

    case actionTypes.SET_OPTIONS_PANEL_OPEN: {
      const newState = {
        ...state,
        isOptionsPanelOpen: true,
        nextPotentialSelectionIndex: state.singleSelectSelectedIndex,
        singleSelectSelectedOption: {
          name: state.name,
          ...state.options[ state.singleSelectSelectedIndex ]
        }
      };
      return mergeIsAlteredState(newState);
    }

    case actionTypes.SET_OPTIONS_PANEL_CLOSED: {
      const newState = {
        ...state,
        isOptionsPanelOpen: false,
        singleSelectSelectedIndex: state.nextPotentialSelectionIndex,
        singleSelectSelectedOption: {
          name: state.name,
          ...state.options[state.nextPotentialSelectionIndex]
        }
      };
      return mergeIsAlteredState(newState);
    }

    case actionTypes.SET_OPTIONS_PANEL_CLOSED_NO_SELECTION:
    case actionTypes.SET_OPTIONS_PANEL_CLOSED_ONBLUR:
      return {
        ...state,
        isOptionsPanelOpen: false
      };

    case actionTypes.SET_NEXT_SELECTED_INDEX:
      return {
        ...state,
        nextPotentialSelectionIndex: action.optionIndex
      };

    case actionTypes.SET_NEXT_SELECTED_INDEX_ALPHA_NUMERIC:
      return {
        ...state,
        isOptionsPanelOpen: true,
        nextPotentialSelectionIndex: action.optionIndex
      };

    case actionTypes.SET_SINGLESELECT_OPTIONS: {
      const nextState = {
        ...state,
        nextPotentialSelectionIndex: action.optionIndex,
        singleSelectSelectedIndex: action.optionIndex,
        isOptionsPanelOpen: false,
        singleSelectSelectedOption: {
          name: state.name,
          ...state.options[action.optionIndex]
        }
      };

      // Set altered state
      return mergeIsAlteredState(nextState);
    }

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
        const nextState = getInitialOption(state);
        return mergeIsAlteredState(nextState);
      }

      // Deselect first option when first option selected and another option is requested
      if ( shouldDeselectFirstOptionAndSelectRequestedOption ) {
        state = resetMultiSelectState(state);
      }

      // Find index of requested option
      const indexLocation = state.multiSelectSelectedIndexes.indexOf(action.optionIndex);

      // If requested item does not exist, add it. Else remove it
      let nextState = {
        ...state,
        nextPotentialSelectionIndex: action.optionIndex,
        multiSelectSelectedIndexes: (indexLocation === -1)
          ? addMultiSelectIndex(state, action.optionIndex)
          : removeMultiSelectIndex(state, indexLocation),
        multiSelectSelectedOptions: (indexLocation === -1)
          ? addMultiSelectOption(state, action.optionIndex)
          : removeMultiSelectOption(state, indexLocation)
      };

      // Select first option if user has deselected all items
      if (nextState.multiSelectSelectedOptions.options.length === 0) {
        nextState = getInitialOption(state);
      }

      // Set altered state
      return mergeIsAlteredState(nextState);
    }
  }

}
