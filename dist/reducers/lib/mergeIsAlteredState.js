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
var isEqual = require("lodash.isequal");
function isAltered(newState) {
    return !newState.multiselect
        ? newState.singleSelectSelectedIndex !== newState.singleSelectInitialIndex
        : !isEqual(newState.multiSelectInitialSelectedIndexes, newState.multiSelectSelectedIndexes);
}
exports.isAltered = isAltered;
function mergeIsAlteredState(newState) {
    return __assign({}, newState, { altered: isAltered(newState) });
}
exports.default = mergeIsAlteredState;
//# sourceMappingURL=mergeIsAlteredState.js.map