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
var SingleSelectOption_1 = require("./SingleSelectOption");
var SingleSelect = /** @class */ (function (_super) {
    __extends(SingleSelect, _super);
    function SingleSelect(props) {
        var _this = _super.call(this, props) || this;
        _this.optionsButton = React.createRef();
        _this.optionsContainer = React.createRef();
        return _this;
    }
    SingleSelect.prototype.componentDidUpdate = function (prevProps) {
        /*
          Focus selectBox button if options panel has just closed,
          there has been an interaction,
          or isOptionsPanelOpen and nextPotentialSelectionIndex === -1
        */
        var _a = this.props, isOptionsPanelOpen = _a.isOptionsPanelOpen, nextPotentialSelectionIndex = _a.nextPotentialSelectionIndex, selectBoxRef = _a.selectBoxRef;
        var optionsPanelJustClosed = !isOptionsPanelOpen && prevProps.isOptionsPanelOpen;
        if (this.optionsButton.current) {
            if (optionsPanelJustClosed &&
                selectBoxRef &&
                selectBoxRef.contains(document.activeElement)) {
                this.optionsButton.current.focus();
            }
            if (isOptionsPanelOpen && nextPotentialSelectionIndex === -1) {
                this.optionsButton.current.focus();
            }
        }
    };
    SingleSelect.prototype.getCustomLabel = function () {
        var _a = this.props, prefix = _a.prefix, name = _a.name, singleSelectSelectedOption = _a.singleSelectSelectedOption, caretIcon = _a.caretIcon, customLabelText = _a.customLabelText;
        return (React.createElement("div", { className: "rrs__label" },
            React.createElement("span", { "aria-label": "" + (prefix ? prefix + " " : '') + singleSelectSelectedOption.text + " selected", className: "rrs__label__text", id: "rrs-" + name + "-label" }, customLabelText),
            caretIcon && caretIcon));
    };
    SingleSelect.prototype.getDefaultLabel = function () {
        var _a = this.props, prefix = _a.prefix, singleSelectSelectedOption = _a.singleSelectSelectedOption, name = _a.name, caretIcon = _a.caretIcon, singleSelectSelectedIndex = _a.singleSelectSelectedIndex, noSelectionLabel = _a.noSelectionLabel;
        if (singleSelectSelectedIndex === -1) {
            return (React.createElement("div", { className: "rrs__label" },
                React.createElement("span", { "aria-label": noSelectionLabel, className: "rrs__label__text", id: "rrs-" + name + "-label" },
                    prefix && React.createElement("span", null, prefix),
                    noSelectionLabel),
                caretIcon && caretIcon));
        }
        return (React.createElement("div", { className: "rrs__label" },
            React.createElement("span", { "aria-label": "" + (prefix ? prefix + " " : '') + singleSelectSelectedOption.text + " selected", className: "rrs__label__text", id: "rrs-" + name + "-label" },
                prefix && React.createElement("span", null, prefix),
                singleSelectSelectedOption.text ? (singleSelectSelectedOption.text) : (React.createElement("div", null, "\u00A0"))),
            caretIcon && caretIcon));
    };
    SingleSelect.prototype.render = function () {
        var _this = this;
        var _a = this.props, customLabelText = _a.customLabelText, disabled = _a.disabled, isOptionsPanelOpen = _a.isOptionsPanelOpen, name = _a.name, nextPotentialSelectionIndex = _a.nextPotentialSelectionIndex, options = _a.options, singleSelectSelectedIndex = _a.singleSelectSelectedIndex, singleSelectSelectedOption = _a.singleSelectSelectedOption;
        var optHeaderLabel = '';
        return (React.createElement("div", null,
            React.createElement("div", { role: "button", tabIndex: 0, "aria-disabled": disabled, "aria-haspopup": "true", "aria-expanded": isOptionsPanelOpen, "aria-controls": "rrs-" + name + "-menu", ref: this.optionsButton, className: singleline_next_1.default("\n            rrs__button\n            " + (disabled === true ? 'rrs__button--disabled' : '') + "\n          ") },
                customLabelText ? this.getCustomLabel() : this.getDefaultLabel(),
                name && (React.createElement("input", { type: "hidden", name: name, value: singleSelectSelectedOption.value }))),
            React.createElement("ul", { id: "rrs-" + name + "-menu", "aria-labelledby": "rrs-" + name + "-label", role: "menu", className: "rrs__options", ref: this.optionsContainer }, options.length > 0 &&
                options.map(function (option, index) {
                    if (option.optHeader) {
                        optHeaderLabel =
                            option.text ||
                                (option.markup &&
                                    option.markup.textContent) ||
                                '';
                    }
                    return (React.createElement(SingleSelectOption_1.default, { key: index, optHeaderLabel: optHeaderLabel, optionsContainerRef: _this.optionsContainer, index: index, isOptionsPanelOpen: isOptionsPanelOpen, option: option, singleSelectSelectedIndex: singleSelectSelectedIndex, nextPotentialSelectionIndex: nextPotentialSelectionIndex }));
                }))));
    };
    return SingleSelect;
}(React.Component));
exports.default = SingleSelect;
//# sourceMappingURL=SingleSelect.js.map