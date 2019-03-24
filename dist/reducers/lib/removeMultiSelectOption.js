"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeMultiSelectOption(state, indexLocation) {
    return {
        options: state.multiSelectSelectedOptions.options.slice(0, indexLocation).concat(state.multiSelectSelectedOptions.options.slice(indexLocation + 1)),
    };
}
exports.default = removeMultiSelectOption;
//# sourceMappingURL=removeMultiSelectOption.js.map