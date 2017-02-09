import * as actionTypes from './actionTypes';
// import deepFreeze from 'deep-freeze';

export const initialState = {
  isDragging: false,
  isOptionsPanelOpen: false,
  selectedIndex: 0,
  name: undefined,
  options: [],
  selectedOption: {}
};

let state = { ...initialState };

export const resetState = () => {
  state = { ...initialState };
};

export const getSelectedValueIndex = (options, selectedValue) => {
  const index = options.map(option => option.value).indexOf(selectedValue);
  return (index > -1)
    ? index
    : 0;
};

const reducer = (action, overrrideState = undefined) => {

  state = overrrideState || state;

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
      isOptionsPanelOpen: action.value
    };

  case actionTypes.SET_SELECTED_INDEX:
    return state = {
      ...state,
      selectedIndex: action.value,
      selectedOption: {
        ...state.options[ action.value ]
      }
    };

  }

};

export default reducer;
