import * as isEqual from 'lodash.isequal';
import { IState } from '../../types/';

export function isAltered(newState: IState): boolean {
  return !newState.multiselect
    ? newState.singleSelectSelectedIndex !== newState.singleSelectInitialIndex
    : !isEqual(
        newState.multiSelectInitialSelectedIndexes,
        newState.multiSelectSelectedIndexes,
      );
}

export function mergeIsAlteredState(newState: IState): IState {
  return {
    ...newState,
    altered: isAltered(newState),
  };
}
