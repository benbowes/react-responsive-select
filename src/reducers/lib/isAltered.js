import _ from 'lodash';

export default function isAltered(state) {
  return (!state.isMultiSelect)
    ? state.singleSelectSelectedIndex !== state.singleSelectInitialIndex
    : !_.isEqual(state.multiSelectInitialSelectedIndexes, state.multiSelectSelectedIndexes);
}
