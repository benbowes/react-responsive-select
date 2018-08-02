import deepFreeze from 'deep-freeze';
import addMultiSelectIndex from './addMultiSelectIndex';
import state from '../../../__mocks__/state-mock';

describe('addMultiSelectIndex', () => {
  deepFreeze(state);

  it('should add to end of multiSelectSelectedIndexes', () => {
    const result = addMultiSelectIndex({
      ...state,
      multiSelectSelectedIndexes: [1, 2, 3],
    }, 6);
    expect(result).toMatchObject([1, 2, 3, 6]);
  });
});
