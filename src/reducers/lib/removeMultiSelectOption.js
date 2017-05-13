export default function removeMultiSelectOption(state, indexLocation) {
  return {
    options: [
      ...state.multiSelectSelectedOptions.options.slice(0, indexLocation),
      ...state.multiSelectSelectedOptions.options.slice(indexLocation + 1)
    ]
  };
}
