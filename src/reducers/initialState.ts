export const initialState = {
  // Constants
  multiselect: false,

  // Universal
  name: '',
  options: [],
  isDragging: false,
  isOptionsPanelOpen: false,
  altered: false,

  // Single select
  singleSelectInitialIndex: 0,
  singleSelectSelectedIndex: 0,
  singleSelectSelectedOption: {},

  // For determining highlighted item on Keyboard navigation
  nextPotentialSelectionIndex: 0,

  // Multi select
  multiSelectInitialSelectedIndexes: [0],
  multiSelectSelectedOptions: {
    altered: false,
    options: [],
  },
  multiSelectSelectedIndexes: [],
};
