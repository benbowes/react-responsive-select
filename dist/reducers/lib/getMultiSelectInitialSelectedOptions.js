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
  Use existing state.singleSelectSelectedOption, or first possible option to use as a selection
*/
function findClosestValidOption(state) {
    if (state.multiSelectSelectedOptions &&
        state.multiSelectSelectedOptions.options.length) {
        return state.multiSelectSelectedOptions.options[0];
    }
    var possibleOptions = state.options.reduce(function (acc, option) {
        if (!option.optHeader) {
            acc.push(option);
        }
        return acc;
    }, []);
    // Note: Will fail if no non-optHeader options exist
    return {
        name: state.name,
        text: possibleOptions[0].text,
        value: possibleOptions[0].value,
    };
}
function getMultiSelectInitialSelectedOptions(state, selectedValues) {
    var selectedOptionsToReturn;
    if (!state.noSelectionLabel) {
        // Preselect the first item in the list when if no noSelectionLabel exists
        if (selectedValues && selectedValues.length > 0) {
            // Grab selected options by matching option.value with selectedValues, and merge in `name`
            selectedOptionsToReturn = state.options
                .filter(function (option) {
                return selectedValues.some(function (selectedValue) { return selectedValue === option.value; });
            })
                .map(function (option) { return (__assign({ name: state.name }, option)); });
        }
        else {
            // ELSE - Grab first option and merge in `name`
            var option = state.options[0] && state.options[0].optHeader
                ? findClosestValidOption(state)
                : state.options[0];
            selectedOptionsToReturn = [
                {
                    name: state.name,
                    text: option.text,
                    value: option.value,
                },
            ];
        }
        return selectedOptionsToReturn;
    }
    selectedOptionsToReturn =
        selectedValues && selectedValues.length > 0
            ? state.options
                .filter(function (option) {
                return selectedValues.some(function (selectedValue) { return selectedValue === option.value; });
            })
                .map(function (option) { return (__assign({ name: state.name }, option)); })
            : [
                {
                    name: state.name,
                    text: state.noSelectionLabel,
                    value: 'null',
                },
            ];
    return selectedOptionsToReturn;
}
exports.default = getMultiSelectInitialSelectedOptions;
//# sourceMappingURL=getMultiSelectInitialSelectedOptions.js.map