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
var MultiSelectOption_1 = require("./MultiSelectOption");
var MultiSelect = /** @class */ (function (_super) {
    __extends(MultiSelect, _super);
    function MultiSelect(props) {
        var _this = _super.call(this, props) || this;
        _this.optionsButton = React.createRef();
        _this.optionsContainer = React.createRef();
        return _this;
    }
    MultiSelect.prototype.componentDidUpdate = function (prevProps) {
        /*
          Focus selectBox button if options panel has just closed,
          there has been an interaction or the value has changed
        */
        var _a = this.props, isOptionsPanelOpen = _a.isOptionsPanelOpen, selectBoxRef = _a.selectBoxRef;
        var optionsPanelJustClosed = !isOptionsPanelOpen && prevProps.isOptionsPanelOpen;
        if (optionsPanelJustClosed &&
            selectBoxRef &&
            selectBoxRef.contains(document.activeElement)) {
            // tslint:disable-next-line
            this.optionsButton.current && this.optionsButton.current.focus();
        }
    };
    MultiSelect.prototype.getAriaLabel = function () {
        var _a = this.props, multiSelectSelectedOptions = _a.multiSelectSelectedOptions, prefix = _a.prefix;
        var selectedOptionsLength = multiSelectSelectedOptions.options.length;
        return singleline_next_1.default("\n      Checkbox group " + (prefix ? prefix + " " : '') + " has\n      " + selectedOptionsLength + " item" + (selectedOptionsLength === 1 ? '' : 's') + " selected.\n      Selected option" + (selectedOptionsLength === 1 ? '' : 's') + " " + (selectedOptionsLength === 1 ? 'is' : 'are') + "\n      " + multiSelectSelectedOptions.options
            .map(function (option) { return option.text; })
            .join(' and ') + "\n    ");
    };
    MultiSelect.prototype.render = function () {
        var _this = this;
        var _a = this.props, caretIcon = _a.caretIcon, customLabelText = _a.customLabelText, disabled = _a.disabled, isOptionsPanelOpen = _a.isOptionsPanelOpen, multiSelectSelectedIndexes = _a.multiSelectSelectedIndexes, multiSelectSelectedOptions = _a.multiSelectSelectedOptions, name = _a.name, options = _a.options, nextPotentialSelectionIndex = _a.nextPotentialSelectionIndex, prefix = _a.prefix;
        var optHeaderLabel = '';
        return (React.createElement("div", null,
            React.createElement("div", { role: "button", tabIndex: 0, "aria-disabled": disabled, "aria-haspopup": "true", "aria-expanded": isOptionsPanelOpen, "aria-controls": "rrs-" + name + "-menu", ref: this.optionsButton, className: singleline_next_1.default("\n            rrs__button\n            " + (disabled === true ? 'rrs__button--disabled' : '') + "\n          ") },
                customLabelText && (React.createElement("div", { className: "rrs__label" },
                    React.createElement("span", { "aria-label": this.getAriaLabel(), className: "rrs__label__text", id: "rrs-" + name + "-label" }, customLabelText),
                    caretIcon && caretIcon)),
                !customLabelText && (React.createElement("div", { className: "rrs__label" },
                    React.createElement("span", { "aria-label": this.getAriaLabel(), className: "rrs__label__text", id: "rrs-" + name + "-label" },
                        React.createElement("span", { className: "rrs__multiselect-label" },
                            React.createElement("span", { className: "rrs__multiselect-label__text" }, (prefix ? prefix + " " : '') + "\n                  " + (multiSelectSelectedOptions.options.length > 0
                                ? multiSelectSelectedOptions.options[0].text
                                : '')),
                            multiSelectSelectedOptions.options.length > 1 && (React.createElement("span", { className: "rrs__multiselect-label__badge" }, "+ " + (multiSelectSelectedOptions.options.length - 1))))),
                    caretIcon && caretIcon)),
                name && (React.createElement("input", { type: "hidden", name: name, value: [
                        multiSelectSelectedOptions.options.map(function (v) { return v.value; }),
                    ].join(',') }))),
            React.createElement("ul", { id: "rrs-" + name + "-menu", "aria-labelledby": "rrs-" + name + "-label", role: "menu", className: "rrs__options", ref: this.optionsContainer }, options.length > 0 &&
                options.map(function (option, index) {
                    if (option.optHeader) {
                        optHeaderLabel =
                            option.text ||
                                (option.markup &&
                                    option.markup.textContent) ||
                                '';
                    }
                    return (React.createElement(MultiSelectOption_1.default, { key: index, optHeaderLabel: optHeaderLabel, optionsContainerRef: _this.optionsContainer, index: index, option: option, isOptionsPanelOpen: isOptionsPanelOpen, multiSelectSelectedIndexes: multiSelectSelectedIndexes, nextPotentialSelectionIndex: nextPotentialSelectionIndex }));
                }))));
    };
    return MultiSelect;
}(React.Component));
exports.default = MultiSelect;
//# sourceMappingURL=MultiSelect.js.map