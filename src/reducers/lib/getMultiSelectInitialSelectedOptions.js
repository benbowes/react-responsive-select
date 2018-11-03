/*
  Use existing state.singleSelectSelectedOption, or first possible option to use as a selection
*/
function findClosestValidOption(state) {
  if (state.multiSelectSelectedOptions) {
    return state.multiSelectSelectedOptions;
  }

  const possibleOptions = state.options.reduce((acc, option) => {
    if (!option.optHeader) acc.push(option);
    return acc;
  }, []);

  // Note: Will fail if no non-optHeader options exist
  return possibleOptions[0];
}

export default function getMultiSelectInitialSelectedOptions(state) {
  let selectedOptionsToReturn;

  if (!state.noSelectionLabel) {
    // Preselect the first item in the list when if no noSelectionLabel exists
    if (state.selectedValues) {
      // Grab selected options by matching option.value with selectedValues, and merge in `name`
      selectedOptionsToReturn = state.options
        .filter(option =>
          state.selectedValues.some(
            selectedValue => selectedValue === option.value,
          ),
        )
        .map(option => ({ name: state.name, ...option }));
    } else {
      // ELSE - Grab first option and merge in `name`
      const option =
        state.options[0] && state.options[0].optHeader
          ? findClosestValidOption(state)
          : state.options[0];

      selectedOptionsToReturn = [
        {
          name: state.name,
          ...option,
        },
      ];
    }

    return selectedOptionsToReturn;
  }

  selectedOptionsToReturn =
    state.selectedValues && state.selectedValues.length > 0
      ? state.options
          .filter(option =>
            state.selectedValues.some(
              selectedValue => selectedValue === option.value,
            ),
          )
          .map(option => ({ name: state.name, ...option }))
      : [
          {
            name: state.name,
            text: state.noSelectionLabel,
            value: 'null',
          },
        ];

  return selectedOptionsToReturn;
}
