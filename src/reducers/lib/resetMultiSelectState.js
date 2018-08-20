import initialState from '../initialState';

export default function resetMultiSelectState(state) {
  return {
    // reset multiSelect state
    ...state,
    multiSelectSelectedIndexes: [...initialState.multiSelectSelectedIndexes],
    multiSelectSelectedOptions: { ...initialState.multiSelectSelectedOptions },
  };
}
