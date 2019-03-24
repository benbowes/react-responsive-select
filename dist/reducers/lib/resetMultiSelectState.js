"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var initialState_1 = require("../initialState");
function resetMultiSelectState(state) {
    return __assign({}, state, { multiSelectSelectedIndexes: initialState_1.default.multiSelectSelectedIndexes.slice(), multiSelectSelectedOptions: __assign({}, initialState_1.default.multiSelectSelectedOptions) });
}
exports.default = resetMultiSelectState;
//# sourceMappingURL=resetMultiSelectState.js.map