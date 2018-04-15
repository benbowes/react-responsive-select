import containsClassName from './lib/containsClassName';
import * as actionTypes from './constants/actionTypes';

export default function handleClick({ event, state, ReactResponsiveSelectClassRef }) {
  const { multiselect, isOptionsPanelOpen, isDragging, disabled } = state;

  if (disabled) return;

  if (isDragging === false) {
    /* Disallow natural event flow - don't allow blur to happen from button focus to selected option focus */
    event.preventDefault();

    /* If user is scrolling return TODO add a test for this */
    if (event && containsClassName(event.target, 'rrs__options')) return true;

    /* Select option index, if user selected option */
    if (containsClassName(event.target, 'rrs__option')) {
      return ReactResponsiveSelectClassRef.updateState({
        type: multiselect
          ? actionTypes.SET_MULTISELECT_OPTIONS
          : actionTypes.SET_SINGLESELECT_OPTIONS,
        optionIndex: parseFloat(event.target.getAttribute('data-key'))
      });
    }

    /* Else user clicked close or open the options panel */
    ReactResponsiveSelectClassRef.updateState({
      type: isOptionsPanelOpen
        ? actionTypes.SET_OPTIONS_PANEL_CLOSED
        : actionTypes.SET_OPTIONS_PANEL_OPEN
    }, () => {
      // ReactResponsiveSelectClassRef.focusButton();
    });
  }
}
