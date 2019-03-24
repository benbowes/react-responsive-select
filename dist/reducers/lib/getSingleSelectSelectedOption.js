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
/*
  use existing state.singleSelectSelectedOption, or first possible option to use as a selection
*/
function closestValidOption(state) {
    if (state.singleSelectSelectedOption) {
        return state.singleSelectSelectedOption;
    }
    var possibleOptions = state.options.reduce(function (acc, option) {
        if (!option.optHeader) {
            acc.push(option);
        }
        return acc;
    }, []);
    // Note: Will fail if no non-optHeader options exist
    return __assign({}, possibleOptions[0], { name: state.name });
}
function getSingleSelectSelectedOption(state, initialSelectedIndex) {
    if (initialSelectedIndex === void 0) { initialSelectedIndex = 0; }
    var selectionIndex = (initialSelectedIndex === -1 && !state.noSelectionLabel)
        ? 0
        : initialSelectedIndex;
    // if optHeader, then use existing state.singleSelectSelectedOption, or findClosestValidOption
    if (state.options[selectionIndex] &&
        state.options[selectionIndex].optHeader) {
        return closestValidOption(state);
    }
    // Has selection, has no selection use default noSelectionLabel (if exists) and nullify value
    if (!state.noSelectionLabel) {
        // Preselect the first item in the list when if no noSelectionLabel exists
        return __assign({ name: state.name }, state.options[selectionIndex]);
    }
    return initialSelectedIndex > -1
        ? __assign({ name: state.name }, state.options[initialSelectedIndex]) : {
        name: state.name,
        text: state.noSelectionLabel,
        value: 'null',
    };
}
exports.default = getSingleSelectSelectedOption;
//# sourceMappingURL=getSingleSelectSelectedOption.js.map