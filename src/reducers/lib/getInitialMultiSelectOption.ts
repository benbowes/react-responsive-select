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

function findClosestValidOption(state: IState): { option: IOutputMultiSelectOptionSansDisabled; index: number } {
  const { options, name } = state;
  const possibleOptions = options.reduce((acc: IFindClosestValidOptionOutput[], option: IOption, index: number) => {
    if (!option.optHeader) {
      acc.push({
        option: { value: option.value, text: option.text, name },
        index,
      });
    }
    return acc;
  }, []);

  // Note: Will fail if there is only one option, and it is an optHeader
  return possibleOptions[0];
}

export function getInitialMultiSelectOption(state: IState): IState {
  //: { option: IOutputMultiSelectOptionSansDisabled; index: number; }
  const { option, index } = findClosestValidOption(state);

  return {
    ...state,
    multiSelectSelectedIndexes: [index],
    multiSelectSelectedOptions: { options: [{ ...option }] },
    nextPotentialSelectionIndex: index,
  };
}
