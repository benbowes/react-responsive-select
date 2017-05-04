import * as actionTypes from '../constants/actionTypes';

export const initialState = {
  isTouchDevice: false,
  isDragging: false,
  isOptionsPanelOpen: false,
  nextSelectedIndex: 0,
  selectedIndex: 0,
  name: undefined,
  options: [],
  selectedOption: {},
  multiSelectOptions: [],
  multiSelectIndexes: []
};

export const getSelectedValueIndex = (options, selectedValue) => {
  const index = options.map(option => option.value).indexOf(selectedValue);
  return (index > -1)
    ? index
    : 0;
};

const addMultiSelectIndex = (state, index) => {
  return [ ...state.multiSelectIndexes, index ];
};

const removeMultiSelectIndex = (state, indexLocation) => {
  return [
    ...state.multiSelectIndexes.slice( 0, indexLocation ),
    ...state.multiSelectIndexes.slice( indexLocation + 1 )
  ];
};

const addMultiSelectOption = (state, index) => {
  return [
    ...state.multiSelectOptions,
    { name: state.name, ...state.options[ index ] }
  ];
};

const removeMultiSelectOption = (state, indexLocation) => {
  return [
    ...state.multiSelectOptions.slice( 0, indexLocation ),
    ...state.multiSelectOptions.slice( indexLocation + 1 )
  ];
};

const reducer = (state = initialState, action) => {

  switch(action.type) {

    case actionTypes.BOOTSTRAP_STATE: {
      const initialSelectedIndex = getSelectedValueIndex(action.value.options, action.value.selectedValue);

      return {
        ...state,
        isTouchDevice: action.value.isTouchDevice,
        initialIndex: initialSelectedIndex,
        name: action.value.name,
        options: action.value.options,
        selectedIndex: initialSelectedIndex,
        nextSelectedIndex: initialSelectedIndex,
        selectedOption: {
          name: action.value.name,
          ...action.value.options[ initialSelectedIndex ]
        },
        multiSelectOptions: [{
          name: action.value.name,
          ...action.value.options[ initialSelectedIndex ]
        }],
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
          ...state.options[ state.nextSelectedIndex ]
        }
      };

    case actionTypes.SET_MULTISELECT_OPTIONS: {
      const indexLocation = state.multiSelectIndexes.indexOf(action.value);

      // Deselect first option when any other value is selected
      if (
        state.multiSelectIndexes.length === 1 &&
        state.multiSelectIndexes[0] === 0 &&
        action.value !== 0
      ) {
        state.multiSelectIndexes = [];
        state.multiSelectOptions = [];
      }

      // If any thing selected, deselect all then select first option
      if (
        state.multiSelectIndexes.length > 0 &&
        action.value === 0
      ) {
        return {
          ...state,
          multiSelectIndexes: [0],
          multiSelectOptions: [{ name: state.name, ...state.options[ 0 ] }],
          nextSelectedIndex: 0
        };
      }

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

      // Select first if none selected
      if (newState.multiSelectOptions.length === 0) {
        newState = {
          ...state,
          nextSelectedIndex: 0,
          multiSelectIndexes: [0],
          multiSelectOptions: [{
            ...state.options[0]
          }]
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
