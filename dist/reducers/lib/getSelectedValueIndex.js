"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSelectedValueIndex(_a) {
    var options = _a.options, selectedValue = _a.selectedValue, noSelectionLabel = _a.noSelectionLabel;
    var index = selectedValue
        ? options.map(function (option) { return option.value; }).indexOf(selectedValue)
        : -1;
    // Allow a negative index if user wants to display a noSelectionLabel
    // Keyboard will not focus on an option when first opened
    // Select the first option when panel opens if !noSelectionLabel
    return index > -1 || noSelectionLabel ? index : 0;
}
exports.default = getSelectedValueIndex;
//# sourceMappingURL=getSelectedValueIndex.js.map