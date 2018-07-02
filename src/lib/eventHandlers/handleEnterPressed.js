import * as actionTypes from '../../constants/actionTypes';

export default ({
  event, state, props, ReactResponsiveSelectClassRef,
}) => {
  const {
    multiselect, isOptionsPanelOpen, nextPotentialSelectionIndex, disabled, options,
  } = state;

  if (disabled) return;

  const optionIndex = parseFloat(event.target.getAttribute('data-key'));

  if (options[optionIndex] && options[optionIndex].disabled === true) {
    return;
  }

  if (multiselect) {
    ReactResponsiveSelectClassRef.updateState({
      type: actionTypes.SET_MULTISELECT_OPTIONS,
      optionIndex: nextPotentialSelectionIndex,
    });
  } else {
    ReactResponsiveSelectClassRef.updateState({
      type: actionTypes.SET_SINGLESELECT_OPTIONS,
      optionIndex: nextPotentialSelectionIndex,
    });
  }

  if (isOptionsPanelOpen) {
    event.stopPropagation(); // Do not submit form
  } else {
    props.onSubmit(); // Submit the form
  }
};
