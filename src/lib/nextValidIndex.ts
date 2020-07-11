import { IOption, IState } from '../types/';

export function nextValidIndex(
  state: IState,
  nextPotentialSelectionIndex: number,
  mode: 'INCREMENT' | 'DECREMENT' = 'INCREMENT'
): number {
  const { options } = state;

  const possibleOptionIndexes = options.reduce((acc: number[], option: IOption, index: number) => {
    if (!option.optHeader) acc.push(index);
    return acc;
  }, []);

  const indexNotFocusable = possibleOptionIndexes.indexOf(nextPotentialSelectionIndex) === -1;

  if (indexNotFocusable && mode === 'INCREMENT') {
    const nextSelectionPossible =
      options[nextPotentialSelectionIndex + 1] && !options[nextPotentialSelectionIndex + 1].optHeader;

    return nextSelectionPossible ? nextPotentialSelectionIndex + 1 : possibleOptionIndexes[0];
  }

  if (indexNotFocusable && mode === 'DECREMENT') {
    const nextSelectionPossible =
      options[nextPotentialSelectionIndex - 1] && !options[nextPotentialSelectionIndex - 1].optHeader;

    return nextSelectionPossible
      ? nextPotentialSelectionIndex - 1
      : possibleOptionIndexes[possibleOptionIndexes.length - 1];
  }

  return nextPotentialSelectionIndex;
}
