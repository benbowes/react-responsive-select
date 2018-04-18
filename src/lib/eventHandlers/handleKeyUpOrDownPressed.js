import getNextIndex from '../getNextIndex';
import * as actionTypes from '../../constants/actionTypes';

export default function handleKeyUpOrDownPressed({ state, ReactResponsiveSelectClassRef, type }) {
  const { isOptionsPanelOpen, disabled } = state;

  if (disabled) return;

  ReactResponsiveSelectClassRef.updateState({
    type: actionTypes.SET_NEXT_SELECTED_INDEX,
    optionIndex: getNextIndex(type, state),
  });

  /* Open the options panel */
  if (isOptionsPanelOpen === false) {
    ReactResponsiveSelectClassRef.updateState({
      type: actionTypes.SET_OPTIONS_PANEL_OPEN,
    });
  }
}
