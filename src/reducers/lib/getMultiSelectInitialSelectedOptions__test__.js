import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import getMultiSelectInitialSelectedOptions from './getMultiSelectInitialSelectedOptions';
import state from '../../../mocha/state-mock';

describe('addMultiSelectOption', () => {
  deepFreeze(state);

  it('should return list of selected multiSelectSelectOptions when selectedValues is set', () => {
    const result = getMultiSelectInitialSelectedOptions({
      ...state,
      selectedValues: ['fiat', 'bmw'],
      name: 'Make 1',
    });

    expect(result).to.eql([{
      name: 'Make 1',
      value: 'fiat',
      text: 'Fiat',
    }, {
      name: 'Make 1',
      value: 'bmw',
      text: 'BMW',
    }]);
  });

  it('should return first item for multiSelectSelectOptions when selectedValues is not set', () => {
    const result = getMultiSelectInitialSelectedOptions({
      ...state,
      selectedValues: undefined,
      name: 'Make 1',
    });

    expect(result).to.eql([{
      name: 'Make 1',
      value: 'null',
      text: 'Any',
    }]);
  });
});
