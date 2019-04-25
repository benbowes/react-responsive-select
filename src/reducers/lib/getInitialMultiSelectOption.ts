import { IOption, IState } from '../../types/';

interface IOutputMultiSelectOptionSansDisabled {
  value?: string;
  text?: string;
  name?: string;
}

interface IFindClosestValidOptionOutput {
  option: IOutputMultiSelectOptionSansDisabled;
  index: number;
}

// Use existing state.singleSelectSelectedOption, or first possible option to use as a selection
function findClosestValidOption(state: IState): { option: IOutputMultiSelectOptionSansDisabled; index: number } {
  const possibleOptions = state.options.reduce(
    (acc: IFindClosestValidOptionOutput[], option: IOption, index: number) => {
      if (!option.optHeader) {
        acc.push({
          option: {
            value: option.value,
            text: option.text,
            name: state.name,
          },
          index,
        });
      }
      return acc;
    },
    [],
  );

  // Note: Will fail if no non-optHeader options exist
  return possibleOptions[0];
}

export function getInitialMultiSelectOption(state: IState): IState {
  const {
    option,
    index,
  }: {
    option: IOutputMultiSelectOptionSansDisabled;
    index: number;
  } = findClosestValidOption(state);

  return {
    ...state,
    multiSelectSelectedIndexes: [index],
    multiSelectSelectedOptions: {
      options: [
        {
          ...option,
        },
      ],
    },
    nextPotentialSelectionIndex: index,
  };
}
