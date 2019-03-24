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
var actionTypes = require("../constants/actionTypes");
var nextValidIndex_1 = require("../lib/nextValidIndex");
var lib_1 = require("./lib");
function reducer(state, action) {
    switch (action.type) {
        case actionTypes.UPDATE_VIA_PROPS:
        case actionTypes.INITIALISE: {
            var initialSelectedIndex = lib_1.getSelectedValueIndex(action.value);
            var initialSelectedIndexes = lib_1.getMultiSelectSelectedValueIndexes(action.value, action.value.selectedValues, action.value.noSelectionLabel);
            return __assign({}, state, { hasOptHeaders: action.value.options.some(function (option) { return option.optHeader === true; }), 
                // Constants
                multiselect: action.value.multiselect || false, 
                // Optional nothing selected label
                noSelectionLabel: action.value.noSelectionLabel, 
                // Universal
                name: action.value.name, options: action.value.options, altered: action.value.altered || false, disabled: action.value.disabled || false, 
                // Single select
                singleSelectInitialIndex: initialSelectedIndex, singleSelectSelectedIndex: initialSelectedIndex, singleSelectSelectedOption: lib_1.getSingleSelectSelectedOption(action.value, initialSelectedIndex), 
                // For determining highlighted item on Keyboard navigation and selection via UPDATE_VIA_PROPS
                // If UPDATE_VIA_PROPS and state exists, re-select nextPotentialSelectionIndex from state
                nextPotentialSelectionIndex: state.nextPotentialSelectionIndex
                    ? state.nextPotentialSelectionIndex
                    : initialSelectedIndex, 
                // Multi select
                multiSelectInitialSelectedIndexes: initialSelectedIndexes, multiSelectSelectedIndexes: initialSelectedIndexes, multiSelectSelectedOptions: {
                    options: lib_1.getMultiSelectInitialSelectedOptions(action.value, action.value.selectedValues),
                } });
        }
        case actionTypes.SET_IS_DRAGGING:
            return __assign({}, state, { isDragging: action.value });
        case actionTypes.SET_OPTIONS_PANEL_OPEN: {
            var newState = __assign({}, state, { isOptionsPanelOpen: true, 
                // For determining highlighted item on Keyboard navigation
                nextPotentialSelectionIndex: (function () {
                    if (state.multiselect) {
                        return state.multiSelectSelectedIndexes.length
                            ? nextValidIndex_1.nextValidIndex(state, state.multiSelectSelectedIndexes[0])
                            : nextValidIndex_1.nextValidIndex(state, 0);
                    }
                    return nextValidIndex_1.nextValidIndex(state, state.nextPotentialSelectionIndex);
                })(), singleSelectSelectedOption: lib_1.getSingleSelectSelectedOption(state, state.nextPotentialSelectionIndex) });
            return lib_1.mergeIsAlteredState(newState);
        }
        case actionTypes.SET_OPTIONS_PANEL_CLOSED: {
            var newState = __assign({}, state, { isOptionsPanelOpen: false, singleSelectSelectedIndex: state.nextPotentialSelectionIndex, singleSelectSelectedOption: lib_1.getSingleSelectSelectedOption(state, state.nextPotentialSelectionIndex) });
            return lib_1.mergeIsAlteredState(newState);
        }
        case actionTypes.SET_OPTIONS_PANEL_CLOSED_NO_SELECTION:
        case actionTypes.SET_OPTIONS_PANEL_CLOSED_ONBLUR:
            return __assign({}, state, { isOptionsPanelOpen: false });
        case actionTypes.SET_NEXT_SELECTED_INDEX:
            return __assign({}, state, { nextPotentialSelectionIndex: action.value });
        case actionTypes.SET_NEXT_SELECTED_INDEX_ALPHA_NUMERIC:
            return __assign({}, state, { isOptionsPanelOpen: true, nextPotentialSelectionIndex: action.value });
        case actionTypes.SET_SINGLESELECT_OPTIONS: {
            var nextState = __assign({}, state, { nextPotentialSelectionIndex: action.value, singleSelectSelectedIndex: action.value, isOptionsPanelOpen: false, singleSelectSelectedOption: lib_1.getSingleSelectSelectedOption(state, action.value) });
            // Set altered state
            return lib_1.mergeIsAlteredState(nextState);
        }
        case actionTypes.SET_MULTISELECT_OPTIONS: {
            if (!state.noSelectionLabel) {
                var isFirstOptionInListSelected = state.multiSelectSelectedIndexes[0] === 0 &&
                    state.multiSelectSelectedIndexes.length === 1;
                // If anything selected and first option was requested, deselect all, then select first option
                var shouldDeselectAllAndSelectFirstOption = state.multiSelectSelectedIndexes.length > 0 &&
                    !isFirstOptionInListSelected &&
                    action.value === 0;
                // Deselect first option when any other value is requested
                var shouldDeselectFirstOptionAndSelectRequestedOption = isFirstOptionInListSelected && action.value !== 0;
                // If any thing selected and first option was requested, deselect all, and return first option
                if (shouldDeselectAllAndSelectFirstOption) {
                    return lib_1.mergeIsAlteredState(lib_1.getInitialMultiSelectOption(state));
                }
                // Deselect first option when first option selected and another option is requested
                if (shouldDeselectFirstOptionAndSelectRequestedOption) {
                    // eslint-disable-next-line no-param-reassign
                    state = lib_1.resetMultiSelectState(state);
                }
            }
            // Remove noSelectionLabel from selected options if something is selected
            if (state.noSelectionLabel &&
                state.multiSelectSelectedOptions.options[0].text ===
                    state.noSelectionLabel) {
                // eslint-disable-next-line no-param-reassign
                state.multiSelectSelectedOptions.options = [];
            }
            // With optHeader, action.value can go out of bounds - check and adjust the value of value when requried
            var actionOptionIndexAdjusted = nextValidIndex_1.nextValidIndex(state, action.value);
            // Find index of requested option
            var indexLocation = state.multiSelectSelectedIndexes.indexOf(actionOptionIndexAdjusted);
            // If requested item does not exist, add it. Else remove it
            var nextState = __assign({}, state, { nextPotentialSelectionIndex: actionOptionIndexAdjusted, multiSelectSelectedIndexes: indexLocation === -1
                    ? lib_1.addMultiSelectIndex(state, actionOptionIndexAdjusted)
                    : lib_1.removeMultiSelectIndex(state, indexLocation), multiSelectSelectedOptions: indexLocation === -1
                    ? lib_1.addMultiSelectOption(state, actionOptionIndexAdjusted)
                    : lib_1.removeMultiSelectOption(state, indexLocation) });
            if (nextState.multiSelectSelectedOptions.options.length === 0) {
                // Reset to noSelectionLabel if user has deselected all items and has set a `noSelectionLabel` prop
                if (state.noSelectionLabel) {
                    nextState = __assign({}, nextState, { nextPotentialSelectionIndex: state.hasOptHeaders
                            ? nextValidIndex_1.nextValidIndex(state, -1)
                            : -1, multiSelectSelectedOptions: {
                            options: lib_1.getMultiSelectInitialSelectedOptions(state),
                        } });
                }
                else {
                    // Select first option if user has deselected all items
                    nextState = lib_1.getInitialMultiSelectOption(state);
                }
            }
            // Set altered state
            return lib_1.mergeIsAlteredState(nextState);
        }
        default:
            return state;
    }
}
exports.default = reducer;
//# sourceMappingURL=reducer.js.map