import * as actionTypes from '../constants/actionTypes';

/* TODO add a test for this */
export default function handleBlur({ state, ReactResponsiveSelectClassRef }) {
  const { isOptionsPanelOpen, disabled } = state;

  if (disabled) return;

  /* Handle click outside of selectbox */
  if (
    isOptionsPanelOpen &&
    !ReactResponsiveSelectClassRef.selectBox.contains(document.activeElement)
  ) {
    ReactResponsiveSelectClassRef.updateState({
      type: actionTypes.SET_OPTIONS_PANEL_CLOSED_ONBLUR,
    });
  }
}
