import * as actionTypes from '../../constants/actionTypes';
import { Select } from '../../react-responsive-select';
import { IOption, IState } from '../../types/';

interface IArgs {
  event: KeyboardEvent;
  state: IState;
  RRSClassRef: Select;
}

let stringMatch: string = '';
let timeoutActive: boolean;

/**
 * User types some keys in quick successsion whilst focused on a select - search for this combonation in their options
 */
export function handleAlphaNumerical({ event, state, RRSClassRef }: IArgs): void {
  const { options, disabled } = state;

  if (disabled) return;

  // Accumulate users key presses
  stringMatch = stringMatch + event.key;

  if (!timeoutActive) {
    timeoutActive = true;

    // Eventually (after 250ms) check if the accumulation of their keypresses matches the text of an option
    setTimeout(() => {
      const foundIndexes: number[] = options.reduce((acc: number[], option: IOption, index: number) => {
        if (
          !option.optHeader &&
          !option.disabled &&
          option.text &&
          option.text.toLowerCase().indexOf(stringMatch) !== -1
        ) {
          acc.push(index);
        }
        return acc;
      }, []);

      if (foundIndexes.length > 0) {
        RRSClassRef.updateState({
          value: foundIndexes[0],
          type: actionTypes.SET_NEXT_SELECTED_INDEX_ALPHA_NUMERIC,
        });
      }

      // allow for the creation of a new search
      timeoutActive = false;
      stringMatch = '';
    }, 250);
  }
}
