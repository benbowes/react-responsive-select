import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import removeMultiSelectOption from './removeMultiSelectOption';
import state from '../../../mocha/state-mock';

describe('removeMultiSelectOption', () => {
  deepFreeze(state);

  it('should remove from multiSelectSelectOptions at requested index', () => {
    const result = removeMultiSelectOption({
      ...state,
      multiSelectSelectedOptions: {
        options: [{
          value: 'fiat',
          text: 'Fiat',
        }, {
          value: 'subaru',
          text: 'Subaru',
        }, {
          value: 'bmw',
          text: 'BMW',
        }, {
          value: 'tesla',
          text: 'Tesla',
        }],
      },
    }, 1);

    expect(result).to.eql({
      options: [{
        value: 'fiat',
        text: 'Fiat',
      }, {
        value: 'bmw',
        text: 'BMW',
      }, {
        value: 'tesla',
        text: 'Tesla',
      }],
    });
  });
});
