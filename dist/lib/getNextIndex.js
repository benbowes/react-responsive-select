"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nextValidIndex_1 = require("./nextValidIndex");
function getNextIndex(mode, state) {
    var isOptionsPanelOpen = state.isOptionsPanelOpen, nextPotentialSelectionIndex = state.nextPotentialSelectionIndex, options = state.options;
    switch (mode) {
        case 'INCREMENT':
            // Hold selection on current selected option when options panel first opens
            if (isOptionsPanelOpen === false) {
                return nextValidIndex_1.nextValidIndex(state, nextPotentialSelectionIndex, 'INCREMENT');
            }
            // User is at the end of the options so cycle back to start
            if (nextPotentialSelectionIndex === options.length - 1) {
                return nextValidIndex_1.nextValidIndex(state, 0, 'INCREMENT');
            }
            // Else increment
            return nextValidIndex_1.nextValidIndex(state, nextPotentialSelectionIndex + 1, 'INCREMENT');
        case 'DECREMENT':
            // Hold selection on current selected option when options panel first opens
            if (isOptionsPanelOpen === false) {
                return nextValidIndex_1.nextValidIndex(state, nextPotentialSelectionIndex, 'DECREMENT');
            }
            // User is at start of the options so cycle around to end
            if (nextPotentialSelectionIndex === 0) {
                return nextValidIndex_1.nextValidIndex(state, options.length - 1, 'DECREMENT');
            }
            // Else decrement
            return nextValidIndex_1.nextValidIndex(state, nextPotentialSelectionIndex - 1, 'DECREMENT');
        default:
            return nextValidIndex_1.nextValidIndex(state, 0, 'DECREMENT');
    }
}
exports.default = getNextIndex;
//# sourceMappingURL=getNextIndex.js.map