import * as actionTypes from './actionTypes';

export const initialState = {
  isDragging: false,
  isOptionsPanelOpen: false,
  nextSelectedIndex: 0,
  selectedIndex: 0,
  name: undefined,
  options: [],
  selectedOption: {}
};

export const getSelectedValueIndex = (options, selectedValue) => {
  const index = options.map(option => option.value).indexOf(selectedValue);
  return (index > -1)
    ? index
    : 0;
};

const reducer = (state = initialState, action) => {

  switch(action.type) {

  case actionTypes.BOOTSTRAP_STATE:
    return {
      ...state,
      name: action.value.name,
      options: action.value.options,
      selectedIndex: getSelectedValueIndex(action.value.options, action.value.selectedValue),
      nextSelectedIndex: getSelectedValueIndex(action.value.options, action.value.selectedValue),
      selectedOption: {
        ...action.value.options[ getSelectedValueIndex(action.value.options, action.value.selectedValue) ]
      }
    };

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
        ...state.options[ state.selectedIndex ]
      }
    };

  case actionTypes.SET_OPTIONS_PANEL_CLOSED:
    return {
      ...state,
      isOptionsPanelOpen: false,
      selectedIndex: state.nextSelectedIndex,
      selectedOption: {
        ...state.options[ state.nextSelectedIndex ]
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
