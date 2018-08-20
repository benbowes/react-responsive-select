import getSingleSelectSelectedOption from './getSingleSelectSelectedOption';

export default function getInitialOption(state, initialSelectedIndex = 0) {
  return {
    ...state,
    multiSelectSelectedIndexes: [0],
    multiSelectSelectedOptions: {
      options: [
        {
          name: state.name,
          ...state.options[0],
        },
      ],
    },
    nextPotentialSelectionIndex: 0,

    singleSelectSelectedOption: getSingleSelectSelectedOption(
      state,
      initialSelectedIndex,
    ),
  };
}
