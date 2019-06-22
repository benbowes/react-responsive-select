import * as actionTypes from '../../constants/actionTypes';
import ReactResponsiveSelect from '../../ReactResponsiveSelect';
import { IState } from '../../types/';

interface TArgs {
  state: IState;
  RRSClassRef: ReactResponsiveSelect;
}

export function handleTouchMove({ state, RRSClassRef }: TArgs): void {
  /* if touchmove fired - User is dragging, this disables touchend/click */
  const { isDragging, disabled } = state;

  if (disabled) return;

  if (!isDragging) {
    RRSClassRef.updateState({
      type: actionTypes.SET_IS_DRAGGING,
      value: true,
    });
  }
}
