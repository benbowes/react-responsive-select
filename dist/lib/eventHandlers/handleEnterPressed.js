"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes = require("../../constants/actionTypes");
exports.default = (function (_a) {
    var event = _a.event, state = _a.state, props = _a.props, ReactResponsiveSelectClassRef = _a.ReactResponsiveSelectClassRef;
    var multiselect = state.multiselect, isOptionsPanelOpen = state.isOptionsPanelOpen, nextPotentialSelectionIndex = state.nextPotentialSelectionIndex, disabled = state.disabled, options = state.options;
    if (disabled) {
        return;
    }
    var value = parseFloat(event.target.getAttribute('data-key'));
    if ((options[value] && options[value].disabled === true) ||
        (options[value] && options[value].optHeader === true)) {
        return;
    }
    if (multiselect) {
        ReactResponsiveSelectClassRef.updateState({
            type: actionTypes.SET_MULTISELECT_OPTIONS,
            value: nextPotentialSelectionIndex,
        });
    }
    else {
        ReactResponsiveSelectClassRef.updateState({
            type: actionTypes.SET_SINGLESELECT_OPTIONS,
            value: nextPotentialSelectionIndex,
        });
    }
    if (isOptionsPanelOpen) {
        event.stopPropagation(); // Do not submit form
    }
    else {
        // tslint:disable-next-line
        props.onSubmit && props.onSubmit(); // Submit the form
    }
});
//# sourceMappingURL=handleEnterPressed.js.map