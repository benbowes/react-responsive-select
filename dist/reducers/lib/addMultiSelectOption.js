"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addMultiSelectOption(state, index) {
    return {
        options: state.multiSelectSelectedOptions.options.concat([
            {
                name: state.name,
                text: state.options[index].text,
                value: state.options[index].value,
            },
        ]),
    };
}
exports.default = addMultiSelectOption;
//# sourceMappingURL=addMultiSelectOption.js.map