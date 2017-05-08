import isAltered from './isAltered';

export default function removeMultiSelectOption(state, indexLocation) {
  return {
    altered: isAltered(state),
    options: [
      ...state.multiSelectSelectedOptions.options.slice(0, indexLocation),
      ...state.multiSelectSelectedOptions.options.slice(indexLocation + 1)
    ]
  };
}
