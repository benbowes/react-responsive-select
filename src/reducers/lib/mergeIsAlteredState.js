import isEqual from 'lodash.isequal';

export function isAltered(newState) {
  return (!newState.isMultiSelect)
    ? newState.singleSelectSelectedIndex !== newState.singleSelectInitialIndex
    : !isEqual(newState.multiSelectInitialSelectedIndexes, newState.multiSelectSelectedIndexes);
}

export default function mergeIsAlteredState(newState) {
  return {
    ...newState,
    altered: isAltered(newState)
  };
}
