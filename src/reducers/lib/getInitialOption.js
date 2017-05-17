export default function getInitialOption(state) {
  return {
    ...state,
    multiSelectSelectedIndexes: [0],
    multiSelectSelectedOptions: {
      options: [{
        name: state.name,
        ...state.options[0]
      }]
    },
    nextPotentialSelectionIndex: 0
  };
}
