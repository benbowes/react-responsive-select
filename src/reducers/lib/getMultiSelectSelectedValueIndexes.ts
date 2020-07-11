import { nextValidIndex } from '../../lib/nextValidIndex';
import { IState } from '../../types/';

export function getMultiSelectSelectedValueIndexes(
  state: IState,
  selectedValues: string[] = [],
  noSelectionLabel?: string
): number[] {
  const { options } = state;
  const emptyResult = noSelectionLabel ? [] : [nextValidIndex(state, 0)];

  /* return the index of the found item, if found */
  const result = options.reduce((acc: any, option: any, value: number) => {
    if (selectedValues.some((selected: string) => option.value === selected)) {
      acc.push(value);
    }
    return acc;
  }, []);

  /* If something found return that, else return the first item */
  return result.length > 0 ? result : emptyResult;
}
