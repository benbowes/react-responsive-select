import { expect } from 'chai';
import getSelectedValueIndex from './getSelectedValueIndex';
import state from '../../../mocha/state-mock';
import deepFreeze from 'deep-freeze';

describe('getSelectedValueIndex', () => {

  deepFreeze(state);

  it('should return then index of a found option if match', () => {
    const selectedValue = 'fiat';
    const result = getSelectedValueIndex(state.options, selectedValue);
    expect(result).to.equal(1);
  });

  it('should return 0 if no matches found', () => {
    const selectedValue = 'jibber';
    const result = getSelectedValueIndex(state.options, selectedValue);
    expect(result).to.equal(0);
  });

  it('should return 0 if selectedValues is undefined', () => {
    const selectedValue = undefined;
    const result = getSelectedValueIndex(state.options, selectedValue);
    expect(result).to.equal(0);
  });

});
