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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var isEqual = require("lodash.isequal");
var React = require("react");
var singleline_next_1 = require("singleline-next");
var actionTypes = require("./constants/actionTypes");
var debugReportChange_1 = require("./lib/debugReportChange");
var eventHandlers_1 = require("./lib/eventHandlers");
var getCustomLabelText_1 = require("./lib/getCustomLabelText");
var onChangeBroadcasters_1 = require("./lib/onChangeBroadcasters");
var initialState_1 = require("./reducers/initialState");
var reducer_1 = require("./reducers/reducer");
var MultiSelect_1 = require("./components/MultiSelect");
var SingleSelect_1 = require("./components/SingleSelect");
var ReactResponsiveSelect = /** @class */ (function (_super) {
    __extends(ReactResponsiveSelect, _super);
    function ReactResponsiveSelect(props) {
        var _this = _super.call(this, props) || this;
        _this.state = initialState_1.default;
        _this.reducer = reducer_1.default;
        return _this;
    }
    ReactResponsiveSelect.prototype.componentDidMount = function () {
        var _a = this.props, options = _a.options, noSelectionLabel = _a.noSelectionLabel, selectedValue = _a.selectedValue, selectedValues = _a.selectedValues, name = _a.name, multiselect = _a.multiselect, disabled = _a.disabled;
        this.updateState({
            type: actionTypes.INITIALISE,
            value: {
                options: options,
                noSelectionLabel: noSelectionLabel,
                selectedValue: selectedValue,
                selectedValues: selectedValues,
                name: name,
                multiselect: multiselect,
                disabled: disabled,
            },
        });
    };
    /**
     * Allow for the component to be updated/controlled via props after componentDidMount
     */
    ReactResponsiveSelect.prototype.componentWillReceiveProps = function (nextProps) {
        if (!isEqual(nextProps, this.props)) {
            this.updateState({
                type: actionTypes.UPDATE_VIA_PROPS,
                value: __assign({}, this.props, nextProps),
            });
        }
    };
    /* Broadcast change when there has been one */
    ReactResponsiveSelect.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _a = this.state, singleSelectSelectedOption = _a.singleSelectSelectedOption, multiSelectSelectedOptions = _a.multiSelectSelectedOptions, multiselect = _a.multiselect, altered = _a.altered;
        var onChange = this.props.onChange;
        if (multiselect) {
            onChangeBroadcasters_1.multiSelectBroadcastChange(multiSelectSelectedOptions.options, Boolean(altered), onChange, prevState.multiSelectSelectedOptions.options);
        }
        else {
            onChangeBroadcasters_1.singleSelectBroadcastChange(singleSelectSelectedOption, Boolean(altered), onChange, prevState.singleSelectSelectedOption);
        }
        return true;
    };
    ReactResponsiveSelect.prototype.updateState = function (action, callback) {
        var nextState = this.reducer(this.state, action);
        this.setState(nextState, function () {
            if (callback) {
                callback(nextState);
            }
        });
        /* To debug actions plus their resulting state whilst developing, add ?debug=true */
        debugReportChange_1.default(this.props.name, action, nextState);
    };
    ReactResponsiveSelect.prototype.focusButton = function () {
        var el = this.selectBox && this.selectBox.querySelector('.rrs__button');
        // tslint:disable-next-line
        el && el.focus();
    };
    ReactResponsiveSelect.prototype.render = function () {
        var _this = this;
        var _a = this.props, prefix = _a.prefix, caretIcon = _a.caretIcon, disabled = _a.disabled;
        var _b = this.state, altered = _b.altered, hasOptHeaders = _b.hasOptHeaders, isOptionsPanelOpen = _b.isOptionsPanelOpen, isDragging = _b.isDragging, noSelectionLabel = _b.noSelectionLabel, multiSelectSelectedIndexes = _b.multiSelectSelectedIndexes, multiSelectSelectedOptions = _b.multiSelectSelectedOptions, name = _b.name, nextPotentialSelectionIndex = _b.nextPotentialSelectionIndex, options = _b.options, singleSelectSelectedIndex = _b.singleSelectSelectedIndex, singleSelectSelectedOption = _b.singleSelectSelectedOption, multiselect = _b.multiselect;
        var customLabelText = getCustomLabelText_1.default({
            props: this.props,
            state: this.state,
        });
        return (React.createElement("div", { "data-name": name, className: singleline_next_1.default("\n          rrs\n          " + (isOptionsPanelOpen === true ? 'rrs--options-visible' : '') + "\n          " + (altered ? 'rrs--has-changed' : '') + "\n          " + (hasOptHeaders ? 'rrs--has-opt-headers' : '') + "\n        "), ref: function (r) {
                _this.selectBox = r;
            }, tabIndex: -1, onKeyDown: function (e) {
                eventHandlers_1.handleKeyEvent({
                    event: e,
                    ReactResponsiveSelectClassRef: _this,
                    state: _this.state,
                    props: _this.props,
                });
            }, onTouchStart: function () {
                return eventHandlers_1.handleTouchStart({
                    ReactResponsiveSelectClassRef: _this,
                    state: _this.state,
                });
            }, onTouchMove: function () {
                return eventHandlers_1.handleTouchMove({
                    ReactResponsiveSelectClassRef: _this,
                    state: _this.state,
                });
            }, onTouchEnd: function (e) {
                return eventHandlers_1.handleClick({
                    event: e,
                    ReactResponsiveSelectClassRef: _this,
                    state: _this.state,
                });
            }, onMouseDown: function (e) {
                return eventHandlers_1.handleClick({
                    event: e,
                    ReactResponsiveSelectClassRef: _this,
                    state: _this.state,
                });
            }, onBlur: function () {
                return eventHandlers_1.handleBlur({
                    ReactResponsiveSelectClassRef: _this,
                    state: _this.state,
                    props: _this.props,
                });
            } }, multiselect ? (React.createElement(MultiSelect_1.default, { disabled: Boolean(disabled), isDragging: isDragging, caretIcon: caretIcon, customLabelText: customLabelText, prefix: prefix || '', name: name, multiSelectSelectedOptions: multiSelectSelectedOptions, multiSelectSelectedIndexes: multiSelectSelectedIndexes, nextPotentialSelectionIndex: nextPotentialSelectionIndex, isOptionsPanelOpen: isOptionsPanelOpen, options: options, selectBoxRef: this.selectBox })) : (React.createElement(SingleSelect_1.default, { noSelectionLabel: noSelectionLabel || '', disabled: Boolean(disabled), caretIcon: caretIcon, prefix: prefix || '', name: name, customLabelText: customLabelText, singleSelectSelectedOption: singleSelectSelectedOption, singleSelectSelectedIndex: singleSelectSelectedIndex, nextPotentialSelectionIndex: nextPotentialSelectionIndex, isOptionsPanelOpen: isOptionsPanelOpen, options: options, selectBoxRef: this.selectBox }))));
    };
    return ReactResponsiveSelect;
}(React.Component));
exports.default = ReactResponsiveSelect;
//# sourceMappingURL=ReactResponsiveSelect.js.map