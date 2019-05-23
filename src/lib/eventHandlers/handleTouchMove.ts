import * as actionTypes from '../../constants/actionTypes';
import ReactResponsiveSelect from '../../ReactResponsiveSelect';
import { IState } from '../../types/';

interface TArgs {
  state: IState;
  ReactResponsiveSelectClassRef: ReactResponsiveSelect;
}

export function handleTouchMove({
  state,
  ReactResponsiveSelectClassRef,
}: TArgs): void {
  /* if touchmove fired - User is dragging, this disables touchend/click */
  const { isDragging, disabled } = state;

  if (disabled) {
    return;
  }

  if (!isDragging) {
    ReactResponsiveSelectClassRef.updateState({
      type: actionTypes.SET_IS_DRAGGING,
      value: true,
    });
  }
}
