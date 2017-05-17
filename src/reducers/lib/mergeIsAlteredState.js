import _ from 'lodash';

export function isAltered(newState) {
  return (!newState.isMultiSelect)
    ? newState.singleSelectSelectedIndex !== newState.singleSelectInitialIndex
    : !_.isEqual(newState.multiSelectInitialSelectedIndexes, newState.multiSelectSelectedIndexes);
}

export default function mergeIsAlteredState(newState) {
  return {
    ...newState,
    altered: isAltered(newState)
  };
}
