import { expect } from 'chai';
import isAltered from './isAltered';
import state from '../../../mocha/state-mock';
import deepFreeze from 'deep-freeze';

describe('isAltered', () => {

  deepFreeze(state);

  it('should return true if selection is different from initial selection', () => {
    const result = isAltered({
      ...state,
      multiSelectSelectedIndexes: [1, 2, 3],
      multiSelectInitialSelectedIndexes: [0]
    });
    expect(result).to.eql(true);
  });

  it('should return false if selection is same as initial selection', () => {
    const result = isAltered({
      ...state,
      multiSelectSelectedIndexes: [4, 5, 6],
      multiSelectInitialSelectedIndexes: [4, 5, 6]
    });
    expect(result).to.eql(false);
  });

});
