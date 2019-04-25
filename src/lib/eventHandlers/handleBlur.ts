import * as actionTypes from '../../constants/actionTypes';
import ReactResponsiveSelect from '../../ReactResponsiveSelect';
import { IProps, IState } from '../../types/';
import {
  multiSelectBroadcastChange,
  singleSelectBroadcastChange,
} from '../onChangeBroadcasters';

interface TArgs {
  state: IState;
  ReactResponsiveSelectClassRef: ReactResponsiveSelect;
  props: IProps;
}

export function handleBlur({
  state,
  ReactResponsiveSelectClassRef,
  props,
}: TArgs): void {
  const {
    isOptionsPanelOpen,
    disabled,
    altered,
    singleSelectSelectedOption,
    multiSelectSelectedOptions,
  } = state;
  const { onBlur, multiselect } = props;

  if (disabled) {
    return;
  }

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
        multiSelectSelectedOptions.options,
        Boolean(altered),
        onBlur,
      );
    } else {
      singleSelectBroadcastChange(
        singleSelectSelectedOption,
        Boolean(altered),
        onBlur,
      );
    }
  }
}
