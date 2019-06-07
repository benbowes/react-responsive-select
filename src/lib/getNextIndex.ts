import { IState } from '../types/';
import { nextValidIndex } from './nextValidIndex';

export function getNextIndex(mode: 'INCREMENT' | 'DECREMENT', state: IState): number {
  const { isOptionsPanelOpen, nextPotentialSelectionIndex, options } = state;

  switch (mode) {
    case 'INCREMENT':
      // Hold selection on current selected option when options panel first opens
      if (isOptionsPanelOpen === false) {
        return nextValidIndex(state, nextPotentialSelectionIndex, 'INCREMENT');
      }

      // User is at the end of the options so cycle back to start
      if (nextPotentialSelectionIndex === options.length - 1) {
        return nextValidIndex(state, 0, 'INCREMENT');
      }

      // Else increment
      return nextValidIndex(state, nextPotentialSelectionIndex + 1, 'INCREMENT');

    case 'DECREMENT':
      // Hold selection on current selected option when options panel first opens
      if (isOptionsPanelOpen === false) {
        return nextValidIndex(state, nextPotentialSelectionIndex, 'DECREMENT');
      }

      // User is at start of the options so cycle around to end
      if (nextPotentialSelectionIndex === 0) {
        return nextValidIndex(state, options.length - 1, 'DECREMENT');
      }

      // Else decrement
      return nextValidIndex(state, nextPotentialSelectionIndex - 1, 'DECREMENT');

    default:
      return nextValidIndex(state, 0, 'DECREMENT');
  }
}
