import { expect } from 'chai';
import getInitialOption from './getInitialOption';
import state from '../../../mocha/state-mock';
import deepFreeze from 'deep-freeze';

describe('getInitialOption', () => {

  deepFreeze(state);

  it('should return then first option', () => {
    const result = getInitialOption(state);
    expect(result).to.eql({
      multiSelectSelectedIndexes: [0],
      multiSelectSelectedOptions: {
        options: [{
          name: 'Make 1',
          value: 'null',
          text: 'Any'
        }]
      },
      nextPotentialSelectionIndex: 0
    });
  });

});
