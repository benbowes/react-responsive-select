export default function getSingleSelectSelectedOption(state, initialSelectedIndex = 0) {
  // has selction, has no selection use default noSelectionLabel (if exists) and nullify value

  if (!state.noSelectionLabel) {
    // Preselect the first item in the list when if no noSelectionLabel exists
    const selectionIndex = initialSelectedIndex === -1
      ? 0
      : initialSelectedIndex;

    return {
      name: state.name,
      ...state.options[selectionIndex],
    };
  }

  return initialSelectedIndex > -1
    ? {
      name: state.name,
      ...state.options[initialSelectedIndex],
    }
    : {
      name: state.name,
      text: state.noSelectionLabel,
      value: 'null',
    };
}
