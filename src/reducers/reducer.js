import * as actionTypes from '../constants/actionTypes';
import _ from 'lodash';

export const initialState = {
  isTouchDevice: false,
  isDragging: false,
  isOptionsPanelOpen: false,
  nextSelectedIndex: 0,
  selectedIndex: 0,
  name: undefined,
  options: [],
  selectedOption: {},
  isMultiSelect: false,
  multiSelectOptions: {
    altered: false,
    options: []
  },
  multiSelectIndexes: []
};

export const getSelectedValueIndex = (options, selectedValue) => {
  const index = options.map(option => option.value).indexOf(selectedValue);
  return (index > -1)
    ? index
    : 0;
};

const isAltered = (state) => {
  return !_.isEqual(state.initialSelectedIndexes, state.multiSelectIndexes);
};

const addMultiSelectIndex = (state, index) => {
  return [
    ...state.multiSelectIndexes,
    index
  ];
};

const removeMultiSelectIndex = (state, indexLocation) => {
  return [
    ...state.multiSelectIndexes.slice(0, indexLocation),
    ...state.multiSelectIndexes.slice(indexLocation + 1)
  ];
};

const addMultiSelectOption = (state, index) => {
  return {
    altered: isAltered(state),
    options: [
      ...state.multiSelectOptions.options,
      {
        name: state.name,
        ...state.options[index]
      }
    ]
  };
};

const removeMultiSelectOption = (state, indexLocation) => {
  return {
    altered: isAltered(state),
    options: [
      ...state.multiSelectOptions.options.slice(0, indexLocation),
      ...state.multiSelectOptions.options.slice(indexLocation + 1)
    ]
  };
};

const getInitialOption = (state) => ({
  multiSelectIndexes: [0],
  multiSelectOptions: {
    altered: false,
    options: [{
      name: state.name,
      ...state.options[0]
    }]
  },
  nextSelectedIndex: 0
});

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.BOOTSTRAP_STATE: {
      const initialSelectedIndex = getSelectedValueIndex(action.value.options, action.value.selectedValue);
      return {
        ...state,
        isTouchDevice: action.value.isTouchDevice,
        initialIndex: initialSelectedIndex,
        initialSelectedIndexes: [initialSelectedIndex],
        name: action.value.name,
        options: action.value.options,
        selectedIndex: initialSelectedIndex,
        nextSelectedIndex: initialSelectedIndex,
        selectedOption: {
          name: action.value.name,
          ...action.value.options[ initialSelectedIndex ]
        },
        isMultiSelect: action.value.multiselect || false,
        multiSelectOptions: {
          altered: false,
          options: [{
            name: action.value.name,
            ...action.value.options[ initialSelectedIndex ]
          }]
        },
        multiSelectIndexes: [initialSelectedIndex]
      };
    }

    case actionTypes.SET_IS_DRAGGING:
      return {
        ...state,
        isDragging: action.value
      };

    case actionTypes.SET_OPTIONS_PANEL_OPEN:
      return {
        ...state,
        isOptionsPanelOpen: true,
        nextSelectedIndex: state.selectedIndex,
        selectedOption: {
          altered: state.selectedIndex !== state.initialIndex,
          name: state.name,
          ...state.options[ state.selectedIndex ]
        }
      };

    case actionTypes.SET_OPTIONS_PANEL_CLOSED:
      return {
        ...state,
        isOptionsPanelOpen: false,
        selectedIndex: state.nextSelectedIndex,
        selectedOption: {
          name: state.name,
          altered: state.nextSelectedIndex !== state.initialIndex,
          ...state.options[state.nextSelectedIndex]
        }
      };

    case actionTypes.SET_MULTISELECT_OPTIONS: {
      // Deselect first option when any other value is selected
      if (
        state.multiSelectIndexes.length === 1 && // Something is selected
        state.multiSelectIndexes[0] === 0 && // And that something is the first item
        action.value !== 0 // And the user is not clicking first item
      ) {
        // Clear all options
        state = {
          ...state,
          multiSelectIndexes: [],
          multiSelectOptions: {
            altered: false,
            options: []
          }
        };
      }

      // If any thing selected and first option was selected,
      // deselect all, then select first option
      if (
        state.multiSelectIndexes.length > 0 &&
        action.value === 0
      ) {
        return {
          ...state,
          multiSelectIndexes: [0],
          multiSelectOptions: {
            altered: false,
            options: [{
              name: state.name,
              ...state.options[0]
            }]
          },
          nextSelectedIndex: 0
        };
      }

      const indexLocation = state.multiSelectIndexes.indexOf(action.value);

      // If requested item does not exist, add it. Else remove it
      let newState = {
        ...state,
        nextSelectedIndex: action.value,
        multiSelectIndexes: indexLocation === -1
          ? addMultiSelectIndex(state, action.value)
          : removeMultiSelectIndex(state, indexLocation),
        multiSelectOptions: indexLocation === -1
          ? addMultiSelectOption(state, action.value)
          : removeMultiSelectOption(state, indexLocation)
      };

      // Select first option if user has deselected all other items
      if (newState.multiSelectOptions.options.length === 0) {
        newState = {
          ...state,
          ...getInitialOption(state)
        };
      }

      return newState;
    }

    case actionTypes.SET_OPTIONS_PANEL_CLOSED_NO_SELECTION:
      return {
        ...state,
        isOptionsPanelOpen: false
      };

    case actionTypes.SET_NEXT_SELECTED_INDEX:
      return {
        ...state,
        nextSelectedIndex: action.value
      };

    case actionTypes.SET_SELECTED_INDEX:
      return {
        ...state,
        nextSelectedIndex: action.value,
        selectedIndex: action.value
      };

  }
};

export default reducer;
