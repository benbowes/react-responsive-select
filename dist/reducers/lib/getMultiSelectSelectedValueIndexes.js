"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nextValidIndex_1 = require("../../lib/nextValidIndex");
function getMultiSelectSelectedValueIndexes(state, selectedValues, noSelectionLabel) {
    if (selectedValues === void 0) { selectedValues = []; }
    var options = state.options;
    var emptyResult = noSelectionLabel ? [] : [nextValidIndex_1.nextValidIndex(state, 0)];
    /* return the index of the found item, if found */
    var result = options.reduce(function (acc, option, value) {
        if (selectedValues.some(function (selected) { return option.value === selected; })) {
            acc.push(value);
        }
        return acc;
    }, []);
    /* If something found return that, else return the first item */
    return result.length > 0 ? result : emptyResult;
}
exports.default = getMultiSelectSelectedValueIndexes;
//# sourceMappingURL=getMultiSelectSelectedValueIndexes.js.map