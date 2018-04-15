import * as actionTypes from './constants/actionTypes';

export default ({ event, state, ReactResponsiveSelectClassRef }) => {
  const { options, disabled } = state;

  if (disabled) return;

  const optionIndex = options.map(v => v.text.toLowerCase().charAt(0)).indexOf(event.key);

  if (optionIndex > -1) {
    ReactResponsiveSelectClassRef.updateState({
      type: actionTypes.SET_NEXT_SELECTED_INDEX_ALPHA_NUMERIC,
      optionIndex
    });
  }
};
