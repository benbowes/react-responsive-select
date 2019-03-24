"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    // Constants
    multiselect: false,
    // Universal
    name: '',
    options: [],
    isDragging: false,
    isOptionsPanelOpen: false,
    altered: false,
    // Single select
    singleSelectInitialIndex: 0,
    singleSelectSelectedIndex: 0,
    singleSelectSelectedOption: { name: '', value: '', text: '' },
    // For determining highlighted item on Keyboard navigation
    nextPotentialSelectionIndex: 0,
    // Multi select
    multiSelectInitialSelectedIndexes: [0],
    multiSelectSelectedOptions: {
        altered: false,
        options: [{ name: '', value: '', text: '' }],
    },
    multiSelectSelectedIndexes: [],
};
//# sourceMappingURL=initialState.js.map