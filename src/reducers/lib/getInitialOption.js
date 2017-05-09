export default function getInitialOption(state) {
  return {
    multiSelectSelectedIndexes: [0],
    multiSelectSelectedOptions: {
      altered: false,
      options: [{
        name: state.name,
        ...state.options[0]
      }]
    },
    nextPotentialSelectionIndex: 0
  };
}
