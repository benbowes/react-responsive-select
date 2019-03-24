"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes = require("../../constants/actionTypes");
function handleTouchMove(_a) {
    var state = _a.state, ReactResponsiveSelectClassRef = _a.ReactResponsiveSelectClassRef;
    /* if touchmove fired - User is dragging, this disables touchend/click */
    var isDragging = state.isDragging, disabled = state.disabled;
    if (disabled) {
        return;
    }
    if (!isDragging) {
        ReactResponsiveSelectClassRef.updateState({
            type: actionTypes.SET_IS_DRAGGING,
            value: true,
        });
    }
}
exports.default = handleTouchMove;
//# sourceMappingURL=handleTouchMove.js.map