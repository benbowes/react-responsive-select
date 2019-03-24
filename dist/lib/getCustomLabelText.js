"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCustomLabelText(_a) {
    var state = _a.state, props = _a.props;
    var multiselect = props.multiselect, customLabelRenderer = props.customLabelRenderer;
    var multiSelectSelectedOptions = state.multiSelectSelectedOptions, singleSelectSelectedOption = state.singleSelectSelectedOption;
    if (!customLabelRenderer) {
        return false;
    }
    if (multiselect) {
        return customLabelRenderer(multiSelectSelectedOptions);
    }
    return customLabelRenderer(singleSelectSelectedOption);
}
exports.default = getCustomLabelText;
//# sourceMappingURL=getCustomLabelText.js.map