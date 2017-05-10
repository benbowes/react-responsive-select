import { expect } from 'chai';
import addMultiSelectIndex from './addMultiSelectIndex';
import state from '../../../mocha/state-mock';
import deepFreeze from 'deep-freeze';

describe('addMultiSelectIndex', () => {

  deepFreeze(state);

  it('should add to end of multiSelectSelectedIndexes', () => {
    const result = addMultiSelectIndex({
      ...state,
      multiSelectSelectedIndexes: [1, 2, 3]
    }, 6);
    expect(result).to.eql([1, 2, 3, 6]);
  });

});
