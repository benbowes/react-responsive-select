export default {
  isTouchDevice: false,
  isMultiSelect: false,
  name: 'Make 1',
  options: [{
    value: 'null',
    text: 'Any'
  }, {
    value: 'fiat',
    text: 'Fiat'
  }, {
    value: 'subaru',
    text: 'Subaru'
  }, {
    value: 'bmw',
    text: 'BMW'
  }, {
    value: 'tesla',
    text: 'Tesla'
  }],
  isDragging: false,
  isOptionsPanelOpen: false,
  singleSelectInitialIndex: 0,
  singleSelectSelectedIndex: 0,
  singleSelectSelectedOption: {},
  nextPotentialSelectionIndex: 0,
  multiSelectInitialSelectedIndexes: [1, 2, 3],
  altered: false,
  multiSelectSelectedOptions: {
    options: [{
      value: 'fiat',
      text: 'Fiat'
    }, {
      value: 'subaru',
      text: 'Subaru'
    }, {
      value: 'bmw',
      text: 'BMW'
    }]
  },
  multiSelectSelectedIndexes: [1, 2, 3]
};
