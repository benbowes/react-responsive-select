import * as actionTypes from '../../constants/actionTypes';
import ReactResponsiveSelect from '../../ReactResponsiveSelect';
import { IState } from '../../types/';

interface TArgs {
  state: IState;
  ReactResponsiveSelectClassRef: ReactResponsiveSelect;
}

export function handleTouchStart({
  state,
  ReactResponsiveSelectClassRef,
}: TArgs): void {
  const { disabled } = state;

  if (disabled) {
    return;
  }

  /* initially it's assumed that the user is not dragging */
  ReactResponsiveSelectClassRef.updateState({
    type: actionTypes.SET_IS_DRAGGING,
    value: false,
  });
}
