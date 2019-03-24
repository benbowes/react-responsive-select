import getNextIndex from './getNextIndex';

describe('getNextIndex', () => {
  // mode INCREMENT

  it('should retun current nextPotentialSelectionIndex when opensPanel is closed and mode is "increment"', () => {
    const ARGS = {
      mode: 'INCREMENT',
      state: {
        isOptionsPanelOpen: false,
        nextPotentialSelectionIndex: 3,
        options: [1, 2, 3, 4],
      },
    };

    expect(getNextIndex(ARGS.mode, ARGS.state)).toEqual(3);
  });

  it('should return current nextPotentialSelectionIndex when options panel is closed, mode is "increment" and nextPotentialSelectionIndex equals optionNodesLength - 1', () => {
    const ARGS = {
      mode: 'INCREMENT',
      state: {
        isOptionsPanelOpen: false,
        nextPotentialSelectionIndex: 3,
        options: [1, 2, 3, 4],
      },
    };

    expect(getNextIndex(ARGS.mode, ARGS.state)).toEqual(3);
  });

  it('should return first nextPotentialSelectionIndex when options panel is open, mode is "increment" and nextPotentialSelectionIndex equals optionNodesLength - 1', () => {
    const ARGS = {
      mode: 'INCREMENT',
      state: {
        isOptionsPanelOpen: true,
        nextPotentialSelectionIndex: 3, // zero base
        options: [1, 2, 3, 4], // non zero based
      },
    };

    expect(getNextIndex(ARGS.mode, ARGS.state)).toEqual(0);
  });

  it('should return current nextPotentialSelectionIndex +1 when options panel is open, mode is "increment" and nextPotentialSelectionIndex is less than optionNodesLength - 1', () => {
    const ARGS = {
      mode: 'INCREMENT',
      state: {
        isOptionsPanelOpen: true,
        nextPotentialSelectionIndex: 2,
        options: [1, 2, 3, 4],
      },
    };

    expect(getNextIndex(ARGS.mode, ARGS.state)).toEqual(3);
  });

  // mode DECREMENT

  it('should retun current nextPotentialSelectionIndex when opensPanel is closed and mode is "decrement"', () => {
    const ARGS = {
      mode: 'DECREMENT',
      state: {
        isOptionsPanelOpen: false,
        nextPotentialSelectionIndex: 2,
        options: [1, 2, 3, 4],
      },
    };

    expect(getNextIndex(ARGS.mode, ARGS.state)).toEqual(2);
  });

  it('should return last nextPotentialSelectionIndex when options panel is open, mode is "decrement" and nextPotentialSelectionIndex equals 0', () => {
    const ARGS = {
      mode: 'DECREMENT',
      state: {
        isOptionsPanelOpen: true,
        nextPotentialSelectionIndex: 0,
        options: [1, 2, 3, 4],
      },
    };

    expect(getNextIndex(ARGS.mode, ARGS.state)).toEqual(3);
  });

  it('should return current nextPotentialSelectionIndex +1 when options panel is open, mode is "decrement" and nextPotentialSelectionIndex is greater than 0', () => {
    const ARGS = {
      mode: 'DECREMENT',
      state: {
        isOptionsPanelOpen: true,
        nextPotentialSelectionIndex: 2,
        options: [1, 2, 3, 4],
      },
    };

    expect(getNextIndex(ARGS.mode, ARGS.state)).toEqual(1);
  });
});
