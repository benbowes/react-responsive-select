"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeMultiSelectIndex(state, indexLocation) {
    return state.multiSelectSelectedIndexes.slice(0, indexLocation).concat(state.multiSelectSelectedIndexes.slice(indexLocation + 1));
}
exports.default = removeMultiSelectIndex;
//# sourceMappingURL=removeMultiSelectIndex.js.map