import { expect } from 'chai';
import getInitialMultiSelectSelectedOptions from './getInitialMultiSelectSelectedOptions';
import state from '../../../mocha/state-mock';
import deepFreeze from 'deep-freeze';

describe('addMultiSelectOption', () => {

  deepFreeze(state);

  it('should return list of selected multiSelectSelectOptions when selectedValues is set', () => {
    const selectedValues = ['fiat' , 'bmw'];
    const name = 'Make 1';
    const result = getInitialMultiSelectSelectedOptions(
      state.options,
      selectedValues,
      name
    );

    expect(result).to.eql([{
      name: 'Make 1',
      value: 'fiat',
      text: 'Fiat'
    }, {
      name: 'Make 1',
      value: 'bmw',
      text: 'BMW'
    }]);
  });

  it('should return first item for multiSelectSelectOptions when selectedValues is not set', () => {
    const selectedValues = undefined;
    const name = 'Make 1';
    const result = getInitialMultiSelectSelectedOptions(
      state.options,
      selectedValues,
      name
    );

    expect(result).to.eql([{
      name: 'Make 1',
      value: 'null',
      text: 'Any'
    }]);
  });

});
