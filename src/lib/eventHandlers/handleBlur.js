import * as actionTypes from '../../constants/actionTypes';
import {
  multiSelectBroadcastChange,
  singleSelectBroadcastChange,
} from '../onChangeBroadcasters';

/* TODO add a test for this */
export default function handleBlur({
  state,
  ReactResponsiveSelectClassRef,
  props,
}) {
  const {
    isOptionsPanelOpen,
    disabled,
    altered,
    singleSelectSelectedOption,
    multiSelectSelectedOptions,
  } = state;
  const { onBlur, multiselect } = props;

  if (disabled) return;

  const isOutsideSelectBox =
    ReactResponsiveSelectClassRef.selectBox &&
    !ReactResponsiveSelectClassRef.selectBox.contains(document.activeElement);

  /* Handle click outside of selectbox */
  if (isOptionsPanelOpen && isOutsideSelectBox) {
    ReactResponsiveSelectClassRef.updateState({
      type: actionTypes.SET_OPTIONS_PANEL_CLOSED_ONBLUR,
    });
  }

  if (isOutsideSelectBox && onBlur) {
    if (multiselect) {
      multiSelectBroadcastChange(
        undefined,
        multiSelectSelectedOptions.options,
        altered,
        onBlur,
      );
    } else {
      singleSelectBroadcastChange(
        undefined,
        singleSelectSelectedOption,
        altered,
        onBlur,
      );
    }
  }
}
