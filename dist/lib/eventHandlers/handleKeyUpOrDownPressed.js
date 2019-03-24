"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes = require("../../constants/actionTypes");
var getNextIndex_1 = require("../getNextIndex");
function handleKeyUpOrDownPressed(_a) {
    var state = _a.state, ReactResponsiveSelectClassRef = _a.ReactResponsiveSelectClassRef, type = _a.type;
    var isOptionsPanelOpen = state.isOptionsPanelOpen, disabled = state.disabled;
    if (disabled) {
        return;
    }
    ReactResponsiveSelectClassRef.updateState({
        type: actionTypes.SET_NEXT_SELECTED_INDEX,
        value: getNextIndex_1.default(type, state),
    });
    /* Open the options panel */
    if (isOptionsPanelOpen === false) {
        ReactResponsiveSelectClassRef.updateState({
            type: actionTypes.SET_OPTIONS_PANEL_OPEN,
        });
    }
}
exports.default = handleKeyUpOrDownPressed;
//# sourceMappingURL=handleKeyUpOrDownPressed.js.map