import { expect } from 'chai';
import getSelectedValueIndexes from './getSelectedValueIndexes';

describe('getSelectedValueIndexes', () => {

  const options = [{
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
  }];

  it('should return an array of found option indexes if found', () => {
    const selectedValues = ['fiat', 'bmw'];
    const result = getSelectedValueIndexes(options, selectedValues);
    expect(result).to.eql([1,3]);
  });
  it('should return [0] if no matches found', () => {
    const selectedValues = ['jibber', 'jabber'];
    const result = getSelectedValueIndexes(options, selectedValues);
    expect(result).to.eql([0]);
  });
});
