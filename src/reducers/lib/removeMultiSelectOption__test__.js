import { expect } from 'chai';
import removeMultiSelectOption from './removeMultiSelectOption';
import state from '../../../mocha/state-mock';
import deepFreeze from 'deep-freeze';

describe('removeMultiSelectOption', () => {

  deepFreeze(state);

  it('should remove from multiSelectSelectOptions at requested index', () => {
    const result = removeMultiSelectOption({
      ...state,
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
        }, {
          value: 'tesla',
          text: 'Tesla'
        }]
      }
    }, 1);

    expect(result).to.eql({
      options: [{
        value: 'fiat',
        text: 'Fiat'
      }, {
        value: 'bmw',
        text: 'BMW'
      }, {
        value: 'tesla',
        text: 'Tesla'
      }]
    });
  });

});
