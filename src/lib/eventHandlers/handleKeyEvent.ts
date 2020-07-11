import * as actionTypes from '../../constants/actionTypes';
import { keyCodes } from '../../constants/keyCodes';
import { Select } from '../../react-responsive-select';
import { IProps, IState } from '../../types/';
import { preventDefaultForKeyCodes } from '../preventDefaultForKeyCodes';
import { handleAlphaNumerical } from './handleAlphaNumerical';
import { handleClick } from './handleClick';
import { handleEnterPressed } from './handleEnterPressed';
import { handleKeyUpOrDownPressed } from './handleKeyUpOrDownPressed';

interface TArgs {
  event: KeyboardEvent;
  state: IState;
  props: IProps;
  RRSClassRef: Select;
}

export function handleKeyEvent({ event, state, props, RRSClassRef }: TArgs): void {
  const { multiselect, isOptionsPanelOpen, disabled } = state;

  if (disabled) return;

  preventDefaultForKeyCodes([keyCodes.ENTER, keyCodes.SPACE, keyCodes.ESCAPE, keyCodes.UP, keyCodes.DOWN], event);

  /* handle alpha-nemeric key press */
  if (/^[a-z0-9]+$/.test(event.key)) {
    handleAlphaNumerical({ event, RRSClassRef, state });
  }

  switch (event.keyCode) {
    case keyCodes.TAB:
      /* Don't shift focus when the panel is open (unless it's a Multiselect) */
      if (isOptionsPanelOpen) {
        event.preventDefault();

        /**
         * Multiselect does not close on selection. Focus button to blur and close options panel on TAB
         * TODO add a test for this
         */
        if (multiselect) {
          RRSClassRef.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED }, () => RRSClassRef.focusButton());
        }
      }
      break;

    case keyCodes.ENTER:
      /* can close the panel when open and focussed
       * can submit the form when closed and focussed */
      handleEnterPressed({
        RRSClassRef,
        event,
        props,
        state,
      });
      break;

    case keyCodes.SPACE:
      /* close the panel and select option when open, or open the panel if closed */
      if (isOptionsPanelOpen) {
        handleClick({ event, state, RRSClassRef, props });
      } else {
        RRSClassRef.updateState({
          type: actionTypes.SET_OPTIONS_PANEL_OPEN,
        });
      }
      break;

    case keyCodes.ESCAPE:
      /* remove focus from the panel when focussed */
      RRSClassRef.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED_NO_SELECTION }, () =>
        RRSClassRef.focusButton()
      );
      break;

    case keyCodes.UP:
      /* will open the options panel if closed
       * will not decrement selection if options panel closed
       * if panel open, will decrement up the options list */
      handleKeyUpOrDownPressed({
        RRSClassRef,
        state,
        type: 'DECREMENT',
      });
      break;

    case keyCodes.DOWN:
      /* will open the options panel if closed
       * will not increment selection if options panel closed
       * if panel open, will increment down the options list */
      handleKeyUpOrDownPressed({
        RRSClassRef,
        state,
        type: 'INCREMENT',
      });
      break;

    default:
      break;
  }
}
