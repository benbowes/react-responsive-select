import * as actionTypes from '../../constants/actionTypes';
import ReactResponsiveSelect from '../../ReactResponsiveSelect';
import { IState } from '../../types/';

interface TArgs {
  state: IState;
  RRSClassRef: ReactResponsiveSelect;
}

export function handleTouchStart({ state, RRSClassRef }: TArgs): void {
  const { disabled } = state;

  if (disabled) return;

  /* initially it's assumed that the user is not dragging */
  RRSClassRef.updateState({
    type: actionTypes.SET_IS_DRAGGING,
    value: false,
  });
}
