import * as actionTypes from '../../constants/actionTypes';
import ReactResponsiveSelect from '../../ReactResponsiveSelect';
import { IState } from '../../types/';
import getNextIndex from '../getNextIndex';

interface TArgs {
  state: IState;
  type: 'INCREMENT' | 'DECREMENT';
  ReactResponsiveSelectClassRef: ReactResponsiveSelect;
}

export default function handleKeyUpOrDownPressed({
  state,
  ReactResponsiveSelectClassRef,
  type,
}: TArgs): void {
  const { isOptionsPanelOpen, disabled } = state;

  if (disabled) {
    return;
  }

  ReactResponsiveSelectClassRef.updateState({
    type: actionTypes.SET_NEXT_SELECTED_INDEX,
    value: getNextIndex(type, state),
  });

  /* Open the options panel */
  if (isOptionsPanelOpen === false) {
    ReactResponsiveSelectClassRef.updateState({
      type: actionTypes.SET_OPTIONS_PANEL_OPEN,
    });
  }
}
