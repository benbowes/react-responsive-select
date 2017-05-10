import { expect } from 'chai';
import getSelectedValueIndexes from './getSelectedValueIndexes';
import state from '../../../mocha/state-mock';
import deepFreeze from 'deep-freeze';

describe('getSelectedValueIndexes', () => {

  deepFreeze(state);

  it('should return an array of found option indexes if match', () => {
    const selectedValues = ['fiat', 'bmw'];
    const result = getSelectedValueIndexes(state.options, selectedValues);
    expect(result).to.eql([1,3]);
  });

  it('should return [0] if no matches found', () => {
    const selectedValues = ['jibber', 'jabber'];
    const result = getSelectedValueIndexes(state.options, selectedValues);
    expect(result).to.eql([0]);
  });

  it('should return [0] if selectedValues is undefined', () => {
    const selectedValues = undefined;
    const result = getSelectedValueIndexes(state.options, selectedValues);
    expect(result).to.eql([0]);
  });

});
