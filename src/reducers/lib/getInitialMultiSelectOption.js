/*
  use existing state.singleSelectSelectedOption, or first possible option to use as a selection
*/
function findClosestValidOption(state) {
  const possibleOptions = state.options.reduce((acc, option, index) => {
    if (!option.optHeader) acc.push({ option, index });
    return acc;
  }, []);

  // Note: Will fail if no non-optHeader options exist
  return possibleOptions[0];
}

export default function getInitialMultiSelectOption(state) {
  const { option, index } = findClosestValidOption(state);
  return {
    ...state,
    multiSelectSelectedIndexes: [index],
    multiSelectSelectedOptions: {
      options: [
        {
          name: state.name,
          ...option,
        },
      ],
    },
    nextPotentialSelectionIndex: index,
  };
}
