import { IOption, IOutputMultiSelectOption, IState } from '../../types/';

/* Use existing state.singleSelectSelectedOption, or first possible option to use as a selection */
function findClosestValidOption(state: IState): IOutputMultiSelectOption {
  const { multiSelectSelectedOptions, options, name } = state;

  if (multiSelectSelectedOptions && multiSelectSelectedOptions.options.length) {
    return multiSelectSelectedOptions.options[0];
  }

  const possibleOptions = options.reduce((acc: IOption[], option: IOption) => {
    if (!option.optHeader) acc.push(option);
    return acc;
  }, []);

  // Note: Will fail if no non-optHeader options exist
  return {
    name,
    text: possibleOptions[0].text,
    value: possibleOptions[0].value,
  };
}

export function getMultiSelectInitialSelectedOptions(
  state: IState,
  selectedValues?: string[]
): IOutputMultiSelectOption[] {
  const { noSelectionLabel, options, name } = state;

  let selectedOptionsToReturn;

  if (!noSelectionLabel) {
    // Preselect the first item in the list when if no noSelectionLabel exists
    if (selectedValues && selectedValues.length > 0) {
      // Grab selected options by matching option.value with selectedValues, and merge in `name`
      selectedOptionsToReturn = options
        .filter((option: IOption) => selectedValues.some((selectedValue: string) => selectedValue === option.value))
        .map((option: IOption) => ({ name, ...option }));
    } else {
      // Grab first option and merge in `name`
      const option = options[0] && options[0].optHeader ? findClosestValidOption(state) : options[0];

      selectedOptionsToReturn = [
        {
          name,
          text: option.text,
          value: option.value,
        },
      ];
    }

    return selectedOptionsToReturn;
  }

  selectedOptionsToReturn =
    selectedValues && selectedValues.length > 0
      ? options.reduce((acc: any[], option: IOption) => {
          if (selectedValues.some((selectedValue: string) => selectedValue === option.value)) {
            acc.push({ ...option });
          }
          return acc;
        }, [])
      : [
          {
            name: state.name,
            text: noSelectionLabel,
            value: 'null',
          },
        ];

  return selectedOptionsToReturn;
}
