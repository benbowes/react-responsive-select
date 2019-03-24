"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var singleline_next_1 = require("singleline-next");
var SingleSelectOption = /** @class */ (function (_super) {
    __extends(SingleSelectOption, _super);
    function SingleSelectOption(props) {
        var _this = _super.call(this, props) || this;
        _this.optionRef = React.createRef();
        return _this;
    }
    SingleSelectOption.prototype.getScrollOffset = function () {
        var el = document.querySelector('.rrs__option--header');
        return Math.ceil((el && el.getBoundingClientRect().height) || 0);
    };
    SingleSelectOption.prototype.componentDidUpdate = function () {
        var _a = this.props, index = _a.index, isOptionsPanelOpen = _a.isOptionsPanelOpen, nextPotentialSelectionIndex = _a.nextPotentialSelectionIndex, optionsContainerRef = _a.optionsContainerRef, optHeaderLabel = _a.optHeaderLabel;
        if (index === nextPotentialSelectionIndex && isOptionsPanelOpen) {
            if (this.optionRef.current && optionsContainerRef.current) {
                this.optionRef.current.focus();
                if (optHeaderLabel !== '') {
                    var scrollDiff = Math.ceil(this.optionRef.current.getBoundingClientRect().top -
                        optionsContainerRef.current.getBoundingClientRect().top);
                    this.scrollOffset = this.scrollOffset || this.getScrollOffset();
                    if (scrollDiff < this.scrollOffset) {
                        optionsContainerRef.current.scroll(0, Math.floor(optionsContainerRef.current.scrollTop - this.scrollOffset));
                    }
                }
            }
        }
    };
    SingleSelectOption.prototype.isDisabled = function (option) {
        return Boolean(option.disabled || option.optHeader);
    };
    SingleSelectOption.prototype.render = function () {
        var _a = this.props, index = _a.index, nextPotentialSelectionIndex = _a.nextPotentialSelectionIndex, option = _a.option, singleSelectSelectedIndex = _a.singleSelectSelectedIndex, optHeaderLabel = _a.optHeaderLabel;
        return (React.createElement("li", { role: "menuitem", tabIndex: -1, "aria-disabled": this.isDisabled(option) ? 'true' : 'false', "aria-label": "\n          " + (option.text ||
                (option.markup && option.markup.textContent)) + " " + (optHeaderLabel !== '' ? " of " + optHeaderLabel : '') + "\n        ", "data-key": index, 
            // index={index}
            ref: this.optionRef, className: singleline_next_1.default("\n          rrs__option\n          " + (singleSelectSelectedIndex === index ? 'rrs__option--selected' : '') + "\n          " + (nextPotentialSelectionIndex === index
                ? 'rrs__option--next-selection'
                : '') + "\n          " + (option.disabled === true ? 'rrs__option--disabled' : '') + "\n          " + (option.optHeader === true ? 'rrs__option--header' : '') + "\n        ") }, option.markup || option.text));
    };
    return SingleSelectOption;
}(React.Component));
exports.default = SingleSelectOption;
//# sourceMappingURL=SingleSelectOption.js.map