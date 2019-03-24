import deepFreeze from 'deep-freeze';
import removeMultiSelectIndex from './removeMultiSelectIndex';
import state from '../../../__mocks__/state-mock';

describe('removeMultiSelectIndex', () => {
  deepFreeze(state);

  it('should remove from multiSelectSelectedIndexes at requested index', () => {
    const result = removeMultiSelectIndex(
      {
        ...state,
        multiSelectSelectedIndexes: [1, 2, 3],
      },
      1,
    );
    expect(result).toMatchObject([1, 3]);
  });
});
