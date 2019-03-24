"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes = require("../../constants/actionTypes");
exports.default = (function (_a) {
    var event = _a.event, state = _a.state, ReactResponsiveSelectClassRef = _a.ReactResponsiveSelectClassRef;
    var options = state.options, disabled = state.disabled;
    if (disabled) {
        return;
    }
    var value = options
        .map(function (option) { return option.text.toLowerCase().charAt(0); })
        .indexOf(event.key);
    if (value > -1) {
        ReactResponsiveSelectClassRef.updateState({
            value: value,
            type: actionTypes.SET_NEXT_SELECTED_INDEX_ALPHA_NUMERIC,
        });
    }
});
//# sourceMappingURL=handleAlphaNumerical.js.map