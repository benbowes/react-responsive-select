import { IOutputMultiSelect, IState } from '../../types/';

export function addMultiSelectOption(state: IState, index: number): IOutputMultiSelect {
  return {
    options: [
      ...state.multiSelectSelectedOptions.options,
      {
        name: state.name,
        text: state.options[index].text,
        value: state.options[index].value,
      },
    ],
  };
}
