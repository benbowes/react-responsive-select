import * as actionTypes from '../../constants/actionTypes';
import { Select } from '../../react-responsive-select';
import { IState } from '../../types/';

interface TArgs {
  state: IState;
  RRSClassRef: Select;
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
