import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import removeMultiSelectIndex from './removeMultiSelectIndex';
import state from '../../../mocha/state-mock';

describe('removeMultiSelectIndex', () => {
  deepFreeze(state);

  it('should remove from multiSelectSelectedIndexes at requested index', () => {
    const result = removeMultiSelectIndex({
      ...state,
      multiSelectSelectedIndexes: [1, 2, 3],
    }, 1);
    expect(result).to.eql([1, 3]);
  });
});
