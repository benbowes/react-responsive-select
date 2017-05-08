export default function removeMultiSelectIndex(state, indexLocation) {
  return [
    ...state.multiSelectSelectedIndexes.slice(0, indexLocation),
    ...state.multiSelectSelectedIndexes.slice(indexLocation + 1)
  ];
}
