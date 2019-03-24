"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes = require("../../constants/actionTypes");
function handleTouchStart(_a) {
    var state = _a.state, ReactResponsiveSelectClassRef = _a.ReactResponsiveSelectClassRef;
    var disabled = state.disabled;
    if (disabled) {
        return;
    }
    /* initially it's assumed that the user is not dragging */
    ReactResponsiveSelectClassRef.updateState({
        type: actionTypes.SET_IS_DRAGGING,
        value: false,
    });
}
exports.default = handleTouchStart;
//# sourceMappingURL=handleTouchStart.js.map