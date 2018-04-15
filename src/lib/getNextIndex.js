export default function getNextIndex(mode, state) {
  const { isOptionsPanelOpen, nextPotentialSelectionIndex, options } = state;

  switch (mode) {
    case 'increment':
      // Hold selection on current selected option when options panel first opens
      if (isOptionsPanelOpen === false) {
        return nextPotentialSelectionIndex;
      }

      // User is at the end of the options so cycle back to start
      if (nextPotentialSelectionIndex === options.length - 1) {
        return 0;
      }

      // Else increment
      return nextPotentialSelectionIndex + 1;

    case 'decrement':
      // Hold selection on current selected option when options panel first opens
      if (isOptionsPanelOpen === false) {
        return nextPotentialSelectionIndex;
      }

      // User is at start of the options so cycle around to end
      if (nextPotentialSelectionIndex === 0) {
        return options.length - 1;
      }

      // Else decrement
      return nextPotentialSelectionIndex - 1;

    default:
      return 0;
  }
}
