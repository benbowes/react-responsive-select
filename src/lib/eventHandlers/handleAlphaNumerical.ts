import * as actionTypes from '../../constants/actionTypes';
import ReactResponsiveSelect from '../../ReactResponsiveSelect';
import { IOption, IState } from '../../types/';

interface IArgs {
  event: KeyboardEvent;
  state: IState;
  RRSClassRef: ReactResponsiveSelect;
}

export function handleAlphaNumerical({ event, state, RRSClassRef }: IArgs): void {
  const { options, disabled } = state;

  if (disabled) return;

  const value = options.map((option: IOption) => {
      return !option.optHeader
        && !option.disabled
        && (option.text || '').toLowerCase().charAt(0);
    })
    .indexOf(event.key);

  if (value > -1) {
    RRSClassRef.updateState({
      value,
      type: actionTypes.SET_NEXT_SELECTED_INDEX_ALPHA_NUMERIC,
    });
  }
}
