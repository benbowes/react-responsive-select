"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function nextValidIndex(state, nextPotentialSelectionIndex, mode) {
    if (mode === void 0) { mode = 'INCREMENT'; }
    var options = state.options;
    var possibleOptionIndexes = options.reduce(function (acc, option, index) {
        if (!option.optHeader) {
            acc.push(index);
        }
        return acc;
    }, []);
    var indexNotFocusable = possibleOptionIndexes.indexOf(nextPotentialSelectionIndex) === -1;
    if (indexNotFocusable && mode === 'INCREMENT') {
        var nextSelectionPossible = options[nextPotentialSelectionIndex + 1] &&
            !options[nextPotentialSelectionIndex + 1].optHeader;
        return nextSelectionPossible
            ? nextPotentialSelectionIndex + 1
            : possibleOptionIndexes[0];
    }
    if (indexNotFocusable && mode === 'DECREMENT') {
        var nextSelectionPossible = options[nextPotentialSelectionIndex - 1] &&
            !options[nextPotentialSelectionIndex - 1].optHeader;
        return nextSelectionPossible
            ? nextPotentialSelectionIndex - 1
            : possibleOptionIndexes[possibleOptionIndexes.length - 1];
    }
    return nextPotentialSelectionIndex;
}
exports.nextValidIndex = nextValidIndex;
//# sourceMappingURL=nextValidIndex.js.map