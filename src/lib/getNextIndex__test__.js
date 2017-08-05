import { expect } from 'chai';
import getNextIndex from './getNextIndex';

describe('getNextIndex', () => {

  // mode INCREMENT

  it('should retun current singleSelectSelectedIndex when opensPanel is closed and mode is "increment"', () => {
    const ARGS = {
      mode: 'increment',
      isOptionsPanelOpen: false,
      singleSelectSelectedIndex: 3,
      optionNodesLength: 4
    };

    expect(getNextIndex(ARGS.mode, ARGS.isOptionsPanelOpen, ARGS.singleSelectSelectedIndex, ARGS.optionNodesLength)).to.equal(3);
  });

  it('should return current singleSelectSelectedIndex when options panel is closed, mode is "increment" and singleSelectSelectedIndex equals optionNodesLength - 1', () => {
    const ARGS = {
      mode: 'increment',
      isOptionsPanelOpen: false,
      singleSelectSelectedIndex: 3,
      optionNodesLength: 4
    };

    expect(getNextIndex(ARGS.mode, ARGS.isOptionsPanelOpen, ARGS.singleSelectSelectedIndex, ARGS.optionNodesLength)).to.equal(3);
  });

  it('should return first singleSelectSelectedIndex when options panel is open, mode is "increment" and singleSelectSelectedIndex equals optionNodesLength - 1', () => {
    const ARGS = {
      mode: 'increment',
      isOptionsPanelOpen: true,
      singleSelectSelectedIndex: 3, // zero base
      optionNodesLength: 4 // non zero based
    };

    expect(getNextIndex(ARGS.mode, ARGS.isOptionsPanelOpen, ARGS.singleSelectSelectedIndex, ARGS.optionNodesLength)).to.equal(0);
  });

  it('should return current singleSelectSelectedIndex +1 when options panel is open, mode is "increment" and singleSelectSelectedIndex is less than optionNodesLength - 1', () => {
    const ARGS = {
      mode: 'increment',
      isOptionsPanelOpen: true,
      singleSelectSelectedIndex: 2,
      optionNodesLength: 4
    };

    expect(getNextIndex(ARGS.mode, ARGS.isOptionsPanelOpen, ARGS.singleSelectSelectedIndex, ARGS.optionNodesLength)).to.equal(3);
  });

  // mode DECREMENT

  it('should retun current singleSelectSelectedIndex when opensPanel is closed and mode is "decrement"', () => {
    const ARGS = {
      mode: 'decrement',
      isOptionsPanelOpen: false,
      singleSelectSelectedIndex: 2,
      optionNodesLength: 4
    };

    expect(getNextIndex(ARGS.mode, ARGS.isOptionsPanelOpen, ARGS.singleSelectSelectedIndex, ARGS.optionNodesLength)).to.equal(2);
  });

  it('should return last singleSelectSelectedIndex when options panel is open, mode is "decrement" and singleSelectSelectedIndex equals 0', () => {
    const ARGS = {
      mode: 'decrement',
      isOptionsPanelOpen: true,
      singleSelectSelectedIndex: 0,
      optionNodesLength: 4
    };

    expect(getNextIndex(ARGS.mode, ARGS.isOptionsPanelOpen, ARGS.singleSelectSelectedIndex, ARGS.optionNodesLength)).to.equal(3);
  });

  it('should return current singleSelectSelectedIndex +1 when options panel is open, mode is "decrement" and singleSelectSelectedIndex is greater than 0', () => {
    const ARGS = {
      mode: 'decrement',
      isOptionsPanelOpen: true,
      singleSelectSelectedIndex: 2,
      optionNodesLength: 4
    };

    expect(getNextIndex(ARGS.mode, ARGS.isOptionsPanelOpen, ARGS.singleSelectSelectedIndex, ARGS.optionNodesLength)).to.equal(1);
  });
});
