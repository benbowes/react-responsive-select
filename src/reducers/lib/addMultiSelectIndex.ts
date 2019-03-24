import { IState } from '../../types/';

export default function addMultiSelectIndex(
  state: IState,
  index: number,
): number[] {
  return [...state.multiSelectSelectedIndexes, index];
}
