import { IOption, IState } from '../../types/';

/*
  use existing state.singleSelectSelectedOption, or first possible option to use as a selection
*/
function closestValidOption(state: IState): IOption & { name?: string } {
  if (state.singleSelectSelectedOption) {
    return state.singleSelectSelectedOption;
  }

  const possibleOptions: IOption[] = state.options.reduce((acc: IOption[], option: IOption): IOption[] => {
    if (!option.optHeader) {
      acc.push(option);
    }
    return acc;
  }, []);

  // Note: Will fail if no non-optHeader options exist
  return {
    ...possibleOptions[0],
    name: state.name,
  };
}

export function getSingleSelectSelectedOption(
  state: IState,
  initialSelectedIndex: number = 0
): IOption & { name?: string } {
  const selectionIndex = initialSelectedIndex === -1 && !state.noSelectionLabel ? 0 : initialSelectedIndex;

  // if optHeader, then use existing state.singleSelectSelectedOption, or findClosestValidOption
  if (state.options[selectionIndex] && state.options[selectionIndex].optHeader) {
    return closestValidOption(state);
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
