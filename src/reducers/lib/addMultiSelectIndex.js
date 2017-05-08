export default function addMultiSelectIndex(state, index) {
  return [
    ...state.multiSelectSelectedIndexes,
    index
  ];
}
