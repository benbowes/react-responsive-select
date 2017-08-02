import simpleArraysEqual from '../../lib/simpleArraysEqual';

export function isAltered(newState) {
  return (!newState.isMultiSelect)
    ? newState.singleSelectSelectedIndex !== newState.singleSelectInitialIndex
    : !simpleArraysEqual(newState.multiSelectInitialSelectedIndexes, newState.multiSelectSelectedIndexes);
}

export default function mergeIsAlteredState(newState) {
  return {
    ...newState,
    altered: isAltered(newState)
  };
}
