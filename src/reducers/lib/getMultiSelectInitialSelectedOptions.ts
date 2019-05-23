import { IOption, IOutputMultiSelectOption, IState } from '../../types/';

/*
  Use existing state.singleSelectSelectedOption, or first possible option to use as a selection
*/
function findClosestValidOption(state: IState): IOutputMultiSelectOption {
  if (
    state.multiSelectSelectedOptions &&
    state.multiSelectSelectedOptions.options.length
  ) {
    return state.multiSelectSelectedOptions.options[0];
  }

  const possibleOptions = state.options.reduce(
    (acc: IOption[], option: IOption) => {
      if (!option.optHeader) {
        acc.push(option);
      }
      return acc;
    },
    [],
  );

  // Note: Will fail if no non-optHeader options exist
  return {
    name: state.name,
    text: possibleOptions[0].text,
    value: possibleOptions[0].value,
  };
}

export function getMultiSelectInitialSelectedOptions(
  state: IState,
  selectedValues?: string[],
): IOutputMultiSelectOption[] {
  let selectedOptionsToReturn;

  if (!state.noSelectionLabel) {
    // Preselect the first item in the list when if no noSelectionLabel exists
    if (selectedValues && selectedValues.length > 0) {
      // Grab selected options by matching option.value with selectedValues, and merge in `name`
      selectedOptionsToReturn = state.options
        .filter((option: IOption) =>
          selectedValues.some(
            (selectedValue: string) => selectedValue === option.value,
          ),
        )
        .map((option: IOption) => ({ name: state.name, ...option }));
    } else {
      // ELSE - Grab first option and merge in `name`
      const option =
        state.options[0] && state.options[0].optHeader
          ? findClosestValidOption(state)
          : state.options[0];

      selectedOptionsToReturn = [
        {
          name: state.name,
          text: option.text,
          value: option.value,
        },
      ];
    }

    return selectedOptionsToReturn;
  }

  selectedOptionsToReturn =
    selectedValues && selectedValues.length > 0
      ? state.options
          .filter((option: IOption) =>
            selectedValues.some(
              (selectedValue: string) => selectedValue === option.value,
            ),
          )
          .map((option: IOption) => ({ name: state.name, ...option }))
      : [
          {
            name: state.name,
            text: state.noSelectionLabel,
            value: 'null',
          },
        ];

  return selectedOptionsToReturn;
}
