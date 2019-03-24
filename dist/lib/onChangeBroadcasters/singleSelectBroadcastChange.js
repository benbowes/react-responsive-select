"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isEqual = require("lodash.isequal");
exports.default = (function (currValue, altered, fn, prevValue) {
    if (!fn) {
        return;
    }
    var shouldBroadcastChange = !isEqual(prevValue, currValue);
    if (shouldBroadcastChange) {
        fn({
            name: currValue.name,
            text: currValue.text,
            value: currValue.value,
            altered: altered,
        });
    }
});
//# sourceMappingURL=singleSelectBroadcastChange.js.map