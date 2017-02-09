import { expect } from 'chai';
import getNextIndex from './getNextIndex';

describe('getNextIndex', () => {

  // mode INCREMENT

  it('should retun current selectedIndex when opensPanel is closed and mode is "increment"', () => {
    const ARGS = {
      mode: 'increment',
      isOptionsPanelOpen: false,
      selectedIndex: 3,
      optionNodesLength: 4
    };

    expect(getNextIndex(ARGS.mode, ARGS.isOptionsPanelOpen, ARGS.selectedIndex, ARGS.optionNodesLength)).to.equal(3);
  });

  it('should return current selectedIndex when options panel is closed, mode is "increment" and selectedIndex equals optionNodesLength - 1', () => {
    const ARGS = {
      mode: 'increment',
      isOptionsPanelOpen: false,
      selectedIndex: 3,
      optionNodesLength: 4
    };

    expect(getNextIndex(ARGS.mode, ARGS.isOptionsPanelOpen, ARGS.selectedIndex, ARGS.optionNodesLength)).to.equal(3);
  });

  it('should return current selectedIndex when options panel is open, mode is "increment" and selectedIndex equals optionNodesLength - 1', () => {
    const ARGS = {
      mode: 'increment',
      isOptionsPanelOpen: true,
      selectedIndex: 3, // zero base
      optionNodesLength: 4 // non zero based
    };

    expect(getNextIndex(ARGS.mode, ARGS.isOptionsPanelOpen, ARGS.selectedIndex, ARGS.optionNodesLength)).to.equal(3);
  });

  it('should return current selectedIndex +1 when options panel is open, mode is "increment" and selectedIndex is less than optionNodesLength - 1', () => {
    const ARGS = {
      mode: 'increment',
      isOptionsPanelOpen: true,
      selectedIndex: 2,
      optionNodesLength: 4
    };

    expect(getNextIndex(ARGS.mode, ARGS.isOptionsPanelOpen, ARGS.selectedIndex, ARGS.optionNodesLength)).to.equal(3);
  });

  // mode DECREMENT

  it('should retun current selectedIndex when opensPanel is closed and mode is "decrement"', () => {
    const ARGS = {
      mode: 'decrement',
      isOptionsPanelOpen: false,
      selectedIndex: 2,
      optionNodesLength: 4
    };

    expect(getNextIndex(ARGS.mode, ARGS.isOptionsPanelOpen, ARGS.selectedIndex, ARGS.optionNodesLength)).to.equal(2);
  });

  it('should return current selectedIndex when options panel is open, mode is "decrement" and selectedIndex equals 0', () => {
    const ARGS = {
      mode: 'decrement',
      isOptionsPanelOpen: true,
      selectedIndex: 0,
      optionNodesLength: 4
    };

    expect(getNextIndex(ARGS.mode, ARGS.isOptionsPanelOpen, ARGS.selectedIndex, ARGS.optionNodesLength)).to.equal(0);
  });

  it('should return current selectedIndex when options panel is open, mode is "decrement" and selectedIndex equals 0', () => {
    const ARGS = {
      mode: 'decrement',
      isOptionsPanelOpen: true,
      selectedIndex: 0, // zero base
      optionNodesLength: 4 // non zero based
    };

    expect(getNextIndex(ARGS.mode, ARGS.isOptionsPanelOpen, ARGS.selectedIndex, ARGS.optionNodesLength)).to.equal(0);
  });

  it('should return current selectedIndex +1 when options panel is open, mode is "decrement" and selectedIndex is greater than 0', () => {
    const ARGS = {
      mode: 'decrement',
      isOptionsPanelOpen: true,
      selectedIndex: 2,
      optionNodesLength: 4
    };

    expect(getNextIndex(ARGS.mode, ARGS.isOptionsPanelOpen, ARGS.selectedIndex, ARGS.optionNodesLength)).to.equal(1);
  });
});
