"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes = require("../../constants/actionTypes");
var onChangeBroadcasters_1 = require("../onChangeBroadcasters");
function handleBlur(_a) {
    var state = _a.state, ReactResponsiveSelectClassRef = _a.ReactResponsiveSelectClassRef, props = _a.props;
    var isOptionsPanelOpen = state.isOptionsPanelOpen, disabled = state.disabled, altered = state.altered, singleSelectSelectedOption = state.singleSelectSelectedOption, multiSelectSelectedOptions = state.multiSelectSelectedOptions;
    var onBlur = props.onBlur, multiselect = props.multiselect;
    if (disabled) {
        return;
    }
    var isOutsideSelectBox = ReactResponsiveSelectClassRef.selectBox &&
        !ReactResponsiveSelectClassRef.selectBox.contains(document.activeElement);
    /* Handle click outside of selectbox */
    if (isOptionsPanelOpen && isOutsideSelectBox) {
        ReactResponsiveSelectClassRef.updateState({
            type: actionTypes.SET_OPTIONS_PANEL_CLOSED_ONBLUR,
        });
    }
    if (isOutsideSelectBox && onBlur) {
        if (multiselect) {
            onChangeBroadcasters_1.multiSelectBroadcastChange(multiSelectSelectedOptions.options, Boolean(altered), onBlur);
        }
        else {
            onChangeBroadcasters_1.singleSelectBroadcastChange(singleSelectSelectedOption, Boolean(altered), onBlur);
        }
    }
}
exports.default = handleBlur;
//# sourceMappingURL=handleBlur.js.map