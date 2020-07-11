import * as actionTypes from '../../constants/actionTypes';
import { Select } from '../../react-responsive-select';
import { IState } from '../../types/';
import { getNextIndex } from '../getNextIndex';

interface TArgs {
  state: IState;
  type: 'INCREMENT' | 'DECREMENT';
  RRSClassRef: Select;
}

export function handleKeyUpOrDownPressed({ state, RRSClassRef, type }: TArgs): void {
  const { isOptionsPanelOpen, disabled } = state;

  if (disabled) return;

  RRSClassRef.updateState({
    type: actionTypes.SET_NEXT_SELECTED_INDEX,
    value: getNextIndex(type, state),
  });

  /* Open the options panel */
  if (isOptionsPanelOpen === false) {
    RRSClassRef.updateState({
      type: actionTypes.SET_OPTIONS_PANEL_OPEN,
    });
  }
}
