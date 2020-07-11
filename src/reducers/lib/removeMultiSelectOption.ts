import { IOutputMultiSelectOption, IState } from '../../types/';

export function removeMultiSelectOption(
  state: IState,
  indexLocation: number
): {
  options: IOutputMultiSelectOption[];
} {
  return {
    options: [
      ...state.multiSelectSelectedOptions.options.slice(0, indexLocation),
      ...state.multiSelectSelectedOptions.options.slice(indexLocation + 1),
    ],
  };
}
