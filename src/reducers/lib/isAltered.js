import _ from 'lodash';

export default function isAltered(state) {
  return !_.isEqual(state.multiSelectInitialSelectedIndexes, state.multiSelectSelectedIndexes);
}
