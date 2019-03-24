"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes = require("../../constants/actionTypes");
var containsClassName_1 = require("../containsClassName");
function handleClick(_a) {
    var event = _a.event, state = _a.state, ReactResponsiveSelectClassRef = _a.ReactResponsiveSelectClassRef;
    var multiselect = state.multiselect, isOptionsPanelOpen = state.isOptionsPanelOpen, isDragging = state.isDragging, disabled = state.disabled, options = state.options;
    if (disabled) {
        return;
    }
    if (isDragging === false) {
        /* Disallow natural event flow - don't allow blur to happen from button focus to selected option focus */
        event.preventDefault();
        if (event &&
            containsClassName_1.default(event.target, 'rrs__options')) {
            return;
        }
        var value = parseFloat(event.target.getAttribute('data-key'));
        if ((options[value] && options[value].disabled === true) ||
            (options[value] && options[value].optHeader === true)) {
            return;
        }
        /* Select option index, if user selected option */
        if (containsClassName_1.default(event.target, 'rrs__option')) {
            ReactResponsiveSelectClassRef.updateState({
                type: multiselect
                    ? actionTypes.SET_MULTISELECT_OPTIONS
                    : actionTypes.SET_SINGLESELECT_OPTIONS,
                value: value,
            });
            return;
        }
        // when options panel is open, treat clicking the label/select button as a 'no action'
        if (isOptionsPanelOpen && containsClassName_1.default(event.target, 'rrs__label')) {
            ReactResponsiveSelectClassRef.updateState({ type: actionTypes.SET_OPTIONS_PANEL_CLOSED_NO_SELECTION }, function () { return ReactResponsiveSelectClassRef.focusButton(); });
            return;
        }
        /* Else user clicked close or open the options panel */
        ReactResponsiveSelectClassRef.updateState({
            type: isOptionsPanelOpen
                ? actionTypes.SET_OPTIONS_PANEL_CLOSED
                : actionTypes.SET_OPTIONS_PANEL_OPEN,
        }, function (newState) {
            // After state update, check if focus should be moved to the button
            if (newState.isOptionsPanelOpen === false) {
                ReactResponsiveSelectClassRef.focusButton();
            }
        });
    }
}
exports.default = handleClick;
//# sourceMappingURL=handleClick.js.map