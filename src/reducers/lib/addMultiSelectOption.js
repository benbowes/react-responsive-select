import isAltered from './isAltered';

export default function addMultiSelectOption(state, index) {
  return {
    altered: isAltered(state),
    options: [
      ...state.multiSelectSelectedOptions.options,
      {
        name: state.name,
        ...state.options[index]
      }
    ]
  };
}
