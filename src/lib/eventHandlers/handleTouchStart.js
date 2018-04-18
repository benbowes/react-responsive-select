import * as actionTypes from '../../constants/actionTypes';

export default function handleTouchStart({ state, ReactResponsiveSelectClassRef }) {
  const { disabled } = state;

  if (disabled) return;

  /* initially it's assumed that the user is not dragging */
  ReactResponsiveSelectClassRef.updateState({
    type: actionTypes.SET_IS_DRAGGING,
    value: false,
  });
}
