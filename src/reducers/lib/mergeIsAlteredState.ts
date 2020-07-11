import { IState } from '../../types/';

export function isAltered(newState: IState): boolean {
  return !newState.multiselect
    ? newState.singleSelectSelectedIndex !== newState.singleSelectInitialIndex
    : !(
        JSON.stringify(newState.multiSelectInitialSelectedIndexes) ===
        JSON.stringify(newState.multiSelectSelectedIndexes)
      );
}

export function mergeIsAlteredState(newState: IState): IState {
  return {
    ...newState,
    altered: isAltered(newState),
  };
}
