import * as actionTypes from '../../constants/actionTypes';

export default function handleTouchMove({ state, ReactResponsiveSelectClassRef }) {
  /* if touchmove fired - User is dragging, this disables touchend/click */
  const { isDragging, disabled } = state;

  if (disabled) return;

  if (!isDragging) {
    ReactResponsiveSelectClassRef.updateState({
      type: actionTypes.SET_IS_DRAGGING,
      value: true,
    });
  }
}
