import * as actionTypes from '../../constants/actionTypes';
import ReactResponsiveSelect from '../../ReactResponsiveSelect';
import { IProps, IState } from '../../types/';

interface TArgs {
  event: KeyboardEvent;
  state: IState;
  props: IProps;
  ReactResponsiveSelectClassRef: ReactResponsiveSelect;
}

export default ({
  event,
  state,
  props,
  ReactResponsiveSelectClassRef,
}: TArgs): void => {
  const {
    multiselect,
    isOptionsPanelOpen,
    nextPotentialSelectionIndex,
    disabled,
    options,
  } = state;

  if (disabled) {
    return;
  }

  const value = parseFloat((event.target as any).getAttribute('data-key'));

  if (
    (options[value] && options[value].disabled === true) ||
    (options[value] && options[value].optHeader === true)
  ) {
    return;
  }

  if (multiselect) {
    ReactResponsiveSelectClassRef.updateState({
      type: actionTypes.SET_MULTISELECT_OPTIONS,
      value: nextPotentialSelectionIndex,
    });
  } else {
    ReactResponsiveSelectClassRef.updateState({
      type: actionTypes.SET_SINGLESELECT_OPTIONS,
      value: nextPotentialSelectionIndex,
    });
  }

  if (isOptionsPanelOpen) {
    event.stopPropagation(); // Do not submit form
  } else {
    // tslint:disable-next-line
    props.onSubmit && props.onSubmit(); // Submit the form
  }
};
