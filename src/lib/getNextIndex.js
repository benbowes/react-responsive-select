import { nextValidIndex } from './nextValidIndex';

export default function getNextIndex(mode, state) {
  const { isOptionsPanelOpen, nextPotentialSelectionIndex, options } = state;

  switch (mode) {
    case 'INCREMENT':
      // Hold selection on current selected option when options panel first opens
      if (isOptionsPanelOpen === false) {
        return nextValidIndex(
          options,
          nextPotentialSelectionIndex,
          'INCREMENT',
        );
      }

      // User is at the end of the options so cycle back to start
      if (nextPotentialSelectionIndex === options.length - 1) {
        return nextValidIndex(options, 0, 'INCREMENT');
      }

      // Else increment
      return nextValidIndex(
        options,
        nextPotentialSelectionIndex + 1,
        'INCREMENT',
      );

    case 'DECREMENT':
      // Hold selection on current selected option when options panel first opens
      if (isOptionsPanelOpen === false) {
        return nextValidIndex(
          options,
          nextPotentialSelectionIndex,
          'DECREMENT',
        );
      }

      // User is at start of the options so cycle around to end
      if (nextPotentialSelectionIndex === 0) {
        return nextValidIndex(options, options.length - 1, 'DECREMENT');
      }

      // Else decrement
      return nextValidIndex(
        options,
        nextPotentialSelectionIndex - 1,
        'DECREMENT',
      );

    default:
      return nextValidIndex(options, 0, 'DECREMENT');
  }
}
