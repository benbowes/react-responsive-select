"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (keyCodes, e) {
    keyCodes.forEach(function (keyCode) {
        if (keyCode === e.keyCode) {
            e.preventDefault();
        }
    });
});
//# sourceMappingURL=preventDefaultForKeyCodes.js.map