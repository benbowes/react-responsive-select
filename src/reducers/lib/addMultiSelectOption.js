export default function addMultiSelectOption(state, index) {
  return {
    options: [
      ...state.multiSelectSelectedOptions.options,
      {
        name: state.name,
        ...state.options[index]
      }
    ]
  };
}
