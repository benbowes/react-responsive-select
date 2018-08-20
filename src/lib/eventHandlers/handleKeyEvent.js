import keyCodes from '../../constants/keyCodes';
import * as actionTypes from '../../constants/actionTypes';
import preventDefaultForKeyCodes from '../preventDefaultForKeyCodes';
import handleAlphaNumerical from './handleAlphaNumerical';
import handleEnterPressed from './handleEnterPressed';
import handleClick from './handleClick';
import handleKeyUpOrDownPressed from './handleKeyUpOrDownPressed';

export default function handleKeyEvent({
  event,
  state,
  props,
  ReactResponsiveSelectClassRef,
}) {
  const { multiselect, isOptionsPanelOpen, disabled } = state;

  if (disabled) return;

  preventDefaultForKeyCodes(
    [
      keyCodes.ENTER,
      keyCodes.SPACE,
      keyCodes.ESCAPE,
      keyCodes.UP,
      keyCodes.DOWN,
    ],
    event,
  );

  /* handle alpha-nemeric key press */
  if (/^[a-z0-9]+$/.test(event.key)) {
    handleAlphaNumerical({ event, ReactResponsiveSelectClassRef, state });
  }

  switch (event.keyCode) {
    case keyCodes.TAB:
      /* Don't shift focus when the panel is open (unless it's a Multiselect) */
      if (isOptionsPanelOpen) {
        event.preventDefault();

        /** Multiselect does not close on selection. Focus button to blur and close options panel on TAB
         * TODO add a test for this
         */
        if (multiselect) {
          ReactResponsiveSelectClassRef.updateState(
            { type: actionTypes.SET_OPTIONS_PANEL_CLOSED },
            () => ReactResponsiveSelectClassRef.focusButton(),
          );
        }
      }
      break;

    case keyCodes.ENTER:
      /* can close the panel when open and focussed
       * can submit the form when closed and focussed */
      handleEnterPressed({
        event,
        state,
        props,
        ReactResponsiveSelectClassRef,
      });
      break;

    case keyCodes.SPACE:
      /* close the panel and select option when open, or open the panel if closed */
      if (isOptionsPanelOpen) {
        handleClick({ event, state, ReactResponsiveSelectClassRef });
      } else {
        ReactResponsiveSelectClassRef.updateState({
          type: actionTypes.SET_OPTIONS_PANEL_OPEN,
        });
      }
      break;

    case keyCodes.ESCAPE:
      /* remove focus from the panel when focussed */
      ReactResponsiveSelectClassRef.updateState(
        { type: actionTypes.SET_OPTIONS_PANEL_CLOSED_NO_SELECTION },
        () => ReactResponsiveSelectClassRef.focusButton(),
      );
      break;

    case keyCodes.UP:
      /* will open the options panel if closed
       * will not decrement selection if options panel closed
       * if panel open, will decrement up the options list */
      handleKeyUpOrDownPressed({
        state,
        ReactResponsiveSelectClassRef,
        type: 'decrement',
      });
      break;

    case keyCodes.DOWN:
      /* will open the options panel if closed
       * will not increment selection if options panel closed
       * if panel open, will increment down the options list */
      handleKeyUpOrDownPressed({
        state,
        ReactResponsiveSelectClassRef,
        type: 'increment',
      });
      break;

    default:
      break;
  }
}
