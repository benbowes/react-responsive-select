import * as actionTypes from '../constants/actionTypes';
import {
  getSelectedValueIndex,
  getSelectedValueIndexes,
  getInitialMultiSelectSelectedOptions,
  addMultiSelectIndex,
  removeMultiSelectIndex,
  addMultiSelectOption,
  removeMultiSelectOption,
  mergeIsAlteredState,
  getInitialOption,
  getSingleSelectSelectedOption,
  resetMultiSelectState,
} from './lib';

export default function reducer(state, action) {
  switch (action.type) {
    case actionTypes.UPDATE_VIA_PROPS:
    case actionTypes.INITIALISE: {
      const initialSelectedIndex = getSelectedValueIndex(action.value);
      const initialSelectedIndexes = getSelectedValueIndexes(action.value.options, action.value.selectedValues);
      const initialSelectedOptions = getInitialMultiSelectSelectedOptions(action.value.options, action.value.selectedValues, action.value.name);
      return {
        ...state,

        // Constants
        multiselect: action.value.multiselect || false,

        // Optional nothing selected label
        noSelectionLabel: action.value.noSelectionLabel,

        // Universal
        name: action.value.name,
        options: action.value.options,
        altered: action.value.altered || false,
        disabled: action.value.disabled || false,

        // Single select
        singleSelectInitialIndex: initialSelectedIndex,
        singleSelectSelectedIndex: initialSelectedIndex,
        singleSelectSelectedOption: getSingleSelectSelectedOption(action.value, initialSelectedIndex),

        // For determining highlighted item on Keyboard navigation and selection via UPDATE_VIA_PROPS
        // If UPDATE_VIA_PROPS and state exists, re-select nextPotentialSelectionIndex from state
        nextPotentialSelectionIndex: (state.nextPotentialSelectionIndex)
          ? state.nextPotentialSelectionIndex
          : initialSelectedIndex,

        // Multi select
        multiSelectInitialSelectedIndexes: initialSelectedIndexes,
        multiSelectSelectedIndexes: initialSelectedIndexes,
        multiSelectSelectedOptions: {
          options: initialSelectedOptions,
        },
      };
    }

    case actionTypes.SET_IS_DRAGGING:
      return {
        ...state,
        isDragging: action.value,
      };

    case actionTypes.SET_OPTIONS_PANEL_OPEN: {
      const newState = {
        ...state,
        isOptionsPanelOpen: true,

        // For determining highlighted item on Keyboard navigation
        nextPotentialSelectionIndex: (() => {
          if (state.multiselect) {
            return state.multiSelectSelectedIndexes.length
              ? state.multiSelectSelectedIndexes[0]
              : 0;
          }
          return state.nextPotentialSelectionIndex;
        })(),

        singleSelectSelectedOption: getSingleSelectSelectedOption(state, state.nextPotentialSelectionIndex),
      };

      return mergeIsAlteredState(newState);
    }

    case actionTypes.SET_OPTIONS_PANEL_CLOSED: {
      const newState = {
        ...state,
        isOptionsPanelOpen: false,
        singleSelectSelectedIndex: state.nextPotentialSelectionIndex,
        singleSelectSelectedOption: getSingleSelectSelectedOption(state, state.nextPotentialSelectionIndex),
      };
      return mergeIsAlteredState(newState);
    }

    case actionTypes.SET_OPTIONS_PANEL_CLOSED_NO_SELECTION:
    case actionTypes.SET_OPTIONS_PANEL_CLOSED_ONBLUR:
      return {
        ...state,
        isOptionsPanelOpen: false,
      };

    case actionTypes.SET_NEXT_SELECTED_INDEX:
      return {
        ...state,
        nextPotentialSelectionIndex: action.optionIndex,
      };

    case actionTypes.SET_NEXT_SELECTED_INDEX_ALPHA_NUMERIC:
      return {
        ...state,
        isOptionsPanelOpen: true,
        nextPotentialSelectionIndex: action.optionIndex,
      };

    case actionTypes.SET_SINGLESELECT_OPTIONS: {
      const nextState = {
        ...state,
        nextPotentialSelectionIndex: action.optionIndex,
        singleSelectSelectedIndex: action.optionIndex,
        isOptionsPanelOpen: false,
        singleSelectSelectedOption: getSingleSelectSelectedOption(state, action.optionIndex),
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
      if (shouldDeselectAllAndSelectFirstOption) {
        const nextState = getInitialOption(state);
        return mergeIsAlteredState(nextState);
      }

      // Deselect first option when first option selected and another option is requested
      if (shouldDeselectFirstOptionAndSelectRequestedOption) {
        // eslint-disable-next-line no-param-reassign
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
          : removeMultiSelectOption(state, indexLocation),
      };

      // Select first option if user has deselected all items
      if (nextState.multiSelectSelectedOptions.options.length === 0) {
        nextState = getInitialOption(state);
      }

      // Set altered state
      return mergeIsAlteredState(nextState);
    }
    default:
      return state;
  }
}
