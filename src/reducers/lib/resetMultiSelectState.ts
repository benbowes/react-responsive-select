import { IState } from '../../types/';
import { initialState } from '../initialState';

export function resetMultiSelectState(state: IState): IState {
  return {
    // reset multiSelect state
    ...state,
    multiSelectSelectedIndexes: [...initialState.multiSelectSelectedIndexes],
    multiSelectSelectedOptions: { ...initialState.multiSelectSelectedOptions },
  };
}
