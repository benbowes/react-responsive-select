import { IState } from '../../types/';

export default function removeMultiSelectIndex(
  state: IState,
  indexLocation: number,
): number[] {
  return [
    ...state.multiSelectSelectedIndexes.slice(0, indexLocation),
    ...state.multiSelectSelectedIndexes.slice(indexLocation + 1),
  ];
}
