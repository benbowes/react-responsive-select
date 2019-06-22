import { IState } from '../../types/';

export function addMultiSelectIndex(state: IState, index: number): number[] {
  return [...state.multiSelectSelectedIndexes, index];
}
