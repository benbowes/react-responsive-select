import deepFreeze from 'deep-freeze';
import getInitialMultiSelectOption from './getInitialMultiSelectOption';
import state from '../../../__mocks__/state-mock';

describe('getInitialMultiSelectOption', () => {
  deepFreeze(state);

  it('should return the first option', () => {
    const result = getInitialMultiSelectOption(state);
    expect(result).toMatchObject({
      altered: false,
      isDragging: false,
      multiselect: false,
      isOptionsPanelOpen: false,
      isTouchDevice: false,
      multiSelectInitialSelectedIndexes: [1, 2, 3],
      multiSelectSelectedIndexes: [0],
      multiSelectSelectedOptions: {
        options: [
          {
            name: 'Make 1',
            value: 'null',
            text: 'Any',
          },
        ],
      },
      name: 'Make 1',
      nextPotentialSelectionIndex: 0,
      options: [
        {
          text: 'Any',
          value: 'null',
        },
        {
          text: 'Fiat',
          value: 'fiat',
        },
        {
          text: 'Subaru',
          value: 'subaru',
        },
        {
          text: 'BMW',
          value: 'bmw',
        },
        {
          text: 'Tesla',
          value: 'tesla',
        },
      ],
      singleSelectInitialIndex: 0,
      singleSelectSelectedIndex: 0,
      singleSelectSelectedOption: {},
    });
  });
});
