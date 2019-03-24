"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isEqual = require("lodash.isequal");
exports.default = (function (currOptions, altered, fn, prevOptions) {
    if (!fn) {
        return;
    }
    var shouldBroadcastChange = !prevOptions || !isEqual(prevOptions, currOptions);
    if (shouldBroadcastChange) {
        fn({
            options: currOptions.map(function (currOption) { return ({
                name: currOption.name || '',
                text: currOption.text || '',
                value: currOption.value || '',
            }); }),
            altered: altered,
        });
    }
});
//# sourceMappingURL=multiSelectBroadcastChange.js.map