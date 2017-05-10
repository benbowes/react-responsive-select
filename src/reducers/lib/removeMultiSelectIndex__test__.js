import { expect } from 'chai';
import removeMultiSelectIndex from './removeMultiSelectIndex';
import state from '../../../mocha/state-mock';
import deepFreeze from 'deep-freeze';

describe('removeMultiSelectIndex', () => {

  deepFreeze(state);

  it('should remove from multiSelectSelectedIndexes at requested index', () => {
    const result = removeMultiSelectIndex({
      ...state,
      multiSelectSelectedIndexes: [1, 2, 3]
    }, 1);
    expect(result).to.eql([1, 3]);
  });

});
