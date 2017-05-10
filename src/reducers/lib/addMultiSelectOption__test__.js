import { expect } from 'chai';
import addMultiSelectOption from './addMultiSelectOption';
import state from '../../../mocha/state-mock';
import deepFreeze from 'deep-freeze';

describe('addMultiSelectOption', () => {

  deepFreeze(state);

  it('should add to end of multiSelectSelectOptions', () => {
    const result = addMultiSelectOption({
      ...state,
      multiSelectSelectedOptions: {
        altered: true,
        options: [{
          name: 'Make 1',
          value: 'fiat',
          text: 'Fiat'
        }]
      }
    }, 3);

    expect(result).to.eql({
      altered: true,
      options: [{
        name: 'Make 1',
        value: 'fiat',
        text: 'Fiat'
      }, {
        name: 'Make 1',
        value: 'bmw',
        text: 'BMW'
      }]
    });
  });

});
