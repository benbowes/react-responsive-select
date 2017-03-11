import * as actionTypes from './actionTypes';

export const initialState = {
  isDragging: false,
  isOptionsPanelOpen: false,
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

    return state = {
      ...state,
      name: action.value.name,
      options: action.value.options,
      selectedIndex: getSelectedValueIndex(action.value.options, action.value.selectedValue),
      selectedOption: {
        ...action.value.options[ getSelectedValueIndex(action.value.options, action.value.selectedValue) ]
      }
    };

  case actionTypes.SET_IS_DRAGGING:
    return state = {
      ...state,
      isDragging: action.value
    };

  case actionTypes.SET_OPTIONS_PANEL_OPEN:
    return state = {
      ...state,
      isOptionsPanelOpen: action.value,
      selectedOption: {
        ...state.options[ state.selectedIndex ]
      }
    };

  case actionTypes.SET_SELECTED_INDEX:
    return state = {
      ...state,
      selectedIndex: action.value
    };

  }

};

export default reducer;
