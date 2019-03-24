"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function containsClassName(element, classNameStr) {
    return (String(element.className)
        .split(' ')
        .indexOf(classNameStr) > -1);
}
exports.default = containsClassName;
//# sourceMappingURL=containsClassName.js.map