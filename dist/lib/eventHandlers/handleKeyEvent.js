"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes = require("../../constants/actionTypes");
var keyCodes_1 = require("../../constants/keyCodes");
var preventDefaultForKeyCodes_1 = require("../preventDefaultForKeyCodes");
var handleAlphaNumerical_1 = require("./handleAlphaNumerical");
var handleClick_1 = require("./handleClick");
var handleEnterPressed_1 = require("./handleEnterPressed");
var handleKeyUpOrDownPressed_1 = require("./handleKeyUpOrDownPressed");
function handleKeyEvent(_a) {
    var event = _a.event, state = _a.state, props = _a.props, ReactResponsiveSelectClassRef = _a.ReactResponsiveSelectClassRef;
    var multiselect = state.multiselect, isOptionsPanelOpen = state.isOptionsPanelOpen, disabled = state.disabled;
    if (disabled) {
        return;
    }
    preventDefaultForKeyCodes_1.default([
        keyCodes_1.default.ENTER,
        keyCodes_1.default.SPACE,
        keyCodes_1.default.ESCAPE,
        keyCodes_1.default.UP,
        keyCodes_1.default.DOWN,
    ], event);
    /* handle alpha-nemeric key press */
    if (/^[a-z0-9]+$/.test(event.key)) {
        handleAlphaNumerical_1.default({ event: event, ReactResponsiveSelectClassRef: ReactResponsiveSelectClassRef, state: state });
    }
    switch (event.keyCode) {
        case keyCodes_1.default.TAB:
            /* Don't shift focus when the panel is open (unless it's a Multiselect) */
            if (isOptionsPanelOpen) {
                event.preventDefault();
                /**
                 * Multiselect does not close on selection. Focus button to blur and close options panel on TAB
                 * TODO add a test for this
                 */
                if (multiselect) {
                    ReactResponsiveSelectClassRef.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED }, function () { return ReactResponsiveSelectClassRef.focusButton(); });
                }
            }
            break;
        case keyCodes_1.default.ENTER:
            /* can close the panel when open and focussed
             * can submit the form when closed and focussed */
            handleEnterPressed_1.default({
                ReactResponsiveSelectClassRef: ReactResponsiveSelectClassRef,
                event: event,
                props: props,
                state: state,
            });
            break;
        case keyCodes_1.default.SPACE:
            /* close the panel and select option when open, or open the panel if closed */
            if (isOptionsPanelOpen) {
                handleClick_1.default({ event: event, state: state, ReactResponsiveSelectClassRef: ReactResponsiveSelectClassRef });
            }
            else {
                ReactResponsiveSelectClassRef.updateState({
                    type: actionTypes.SET_OPTIONS_PANEL_OPEN,
                });
            }
            break;
        case keyCodes_1.default.ESCAPE:
            /* remove focus from the panel when focussed */
            ReactResponsiveSelectClassRef.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED_NO_SELECTION }, function () { return ReactResponsiveSelectClassRef.focusButton(); });
            break;
        case keyCodes_1.default.UP:
            /* will open the options panel if closed
             * will not decrement selection if options panel closed
             * if panel open, will decrement up the options list */
            handleKeyUpOrDownPressed_1.default({
                ReactResponsiveSelectClassRef: ReactResponsiveSelectClassRef,
                state: state,
                type: 'DECREMENT',
            });
            break;
        case keyCodes_1.default.DOWN:
            /* will open the options panel if closed
             * will not increment selection if options panel closed
             * if panel open, will increment down the options list */
            handleKeyUpOrDownPressed_1.default({
                ReactResponsiveSelectClassRef: ReactResponsiveSelectClassRef,
                state: state,
                type: 'INCREMENT',
            });
            break;
        default:
            break;
    }
}
exports.default = handleKeyEvent;
//# sourceMappingURL=handleKeyEvent.js.map