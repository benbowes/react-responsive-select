"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var addon_info_1 = require("@storybook/addon-info");
var wInfoStyle = {};
exports.wInfo = function (text) { return (addon_info_1.withInfo({
    inline: true,
    source: true,
    styles: wInfoStyle,
    text: text,
})); };
//# sourceMappingURL=wInfo.js.map