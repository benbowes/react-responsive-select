/*
  use existing state.singleSelectSelectedOption, or first possible option to use as a selection
*/
function findClosestValidOption(state) {
  if (state.singleSelectSelectedOption) {
    return state.singleSelectSelectedOption;
  }

  const possibleOptions = state.options.reduce((acc, option) => {
    if (!option.optHeader) {
      acc.push(option);
    }
    return acc;
  }, []);

  // Note: Will fail if no non-optHeader options exist
  return possibleOptions[0];
}

export default function getSingleSelectSelectedOption(
  state = {},
  initialSelectedIndex = 0,
) {
  const selectionIndex = initialSelectedIndex === -1 ? 0 : initialSelectedIndex;

  // if optHeader, then use existing state.singleSelectSelectedOption, or findClosestValidOption
  if (
    state.options[selectionIndex] &&
    state.options[selectionIndex].optHeader
  ) {
    const closestValidOption = findClosestValidOption(state);

    return {
      name: state.name,
      ...closestValidOption,
    };
  }

  // Has selection, has no selection use default noSelectionLabel (if exists) and nullify value
  if (!state.noSelectionLabel) {
    // Preselect the first item in the list when if no noSelectionLabel exists
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
