import * as actionTypes from '../../constants/actionTypes';
import { Select } from '../../react-responsive-select';
import { IProps, IState } from '../../types/';

interface IArgs {
  event: KeyboardEvent;
  state: IState;
  props: IProps;
  RRSClassRef: Select;
}

export function handleEnterPressed({ event, state, props, RRSClassRef }: IArgs): void {
  const { disabled, isOptionsPanelOpen, multiselect, nextPotentialSelectionIndex, options } = state;

  if (disabled) return;

  const value = parseFloat((event.target as any).getAttribute('data-key'));

  if (options[value] && (options[value].disabled === true || options[value].optHeader === true)) {
    return;
  }

  if (multiselect) {
    const isExistingSelection = state.multiSelectSelectedOptions.options.some(
      option => options[value] && options[value].hasOwnProperty('value') && option.value === options[value].value
    );

    if (!isExistingSelection && props.onSelect) {
      props.onSelect(options[value]);
    } else if (isExistingSelection && props.onDeselect) {
      props.onDeselect(options[value]);
    }

    RRSClassRef.updateState({
      type: actionTypes.SET_MULTISELECT_OPTIONS,
      value: nextPotentialSelectionIndex,
    });
  } else {
    if (props.onSelect) {
      props.onSelect(options[value]);
    }

    RRSClassRef.updateState({
      type: actionTypes.SET_SINGLESELECT_OPTIONS,
      value: nextPotentialSelectionIndex,
    });
  }

  if (isOptionsPanelOpen) {
    event.stopPropagation(); // Do not submit form
  } else {
    // tslint:disable-next-line
    props.onSubmit && props.onSubmit(event); // Submit the form
  }
}
