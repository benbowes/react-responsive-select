import deepFreeze from 'deep-freeze';
import addMultiSelectOption from './addMultiSelectOption';
import state from '../../../__mocks__/state-mock';

describe('addMultiSelectOption', () => {
  deepFreeze(state);

  it('should add to end of multiSelectSelectOptions', () => {
    const result = addMultiSelectOption(
      {
        ...state,
        multiSelectSelectedOptions: {
          options: [
            {
              name: 'Make 1',
              value: 'fiat',
              text: 'Fiat',
            },
          ],
        },
      },
      3,
    );

    expect(result).toMatchObject({
      options: [
        {
          name: 'Make 1',
          value: 'fiat',
          text: 'Fiat',
        },
        {
          name: 'Make 1',
          value: 'bmw',
          text: 'BMW',
        },
      ],
    });
  });
});
