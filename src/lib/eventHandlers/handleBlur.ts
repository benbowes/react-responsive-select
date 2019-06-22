import * as actionTypes from '../../constants/actionTypes';
import ReactResponsiveSelect from '../../ReactResponsiveSelect';
import { IProps, IState } from '../../types/';
import {
  multiSelectBroadcastChange,
  singleSelectBroadcastChange,
} from '../onChangeBroadcasters';

interface TArgs {
  state: IState;
  RRSClassRef: ReactResponsiveSelect;
  props: IProps;
}

export function handleBlur({ state, RRSClassRef, props }: TArgs): void {
  const { onBlur, multiselect } = props;
  const {
    isOptionsPanelOpen,
    disabled,
    altered,
    singleSelectSelectedOption,
    multiSelectSelectedOptions,
  } = state;

  if (disabled) return;

  const isOutsideSelectBox =
    RRSClassRef.selectBox &&
    !RRSClassRef.selectBox.contains(document.activeElement);

  /* Handle click outside of selectbox */
  if (isOptionsPanelOpen && isOutsideSelectBox) {
    RRSClassRef.updateState({
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
