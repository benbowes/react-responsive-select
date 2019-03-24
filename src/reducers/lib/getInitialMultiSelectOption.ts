import { IOption, IState } from '../../types/';

type TOutputMultiSelectOptionSansDisabled = { value: string; text: string; name: string; }

interface IFindClosestValidOptionOutput {
  option: TOutputMultiSelectOptionSansDisabled;
  index: number;
}

// Use existing state.singleSelectSelectedOption, or first possible option to use as a selection
function findClosestValidOption(
  state: IState,
): { option: TOutputMultiSelectOptionSansDisabled; index: number } {
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

export default function getInitialMultiSelectOption(state: IState): IState {
  const {
    option,
    index,
  }: {
    option: TOutputMultiSelectOptionSansDisabled;
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
