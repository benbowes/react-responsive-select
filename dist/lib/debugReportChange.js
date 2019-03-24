"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function debugReportChange(name, action, nextState) {
    var knownCircularKeys = ["markup"];
    if (process.env.NODE_ENV === "development" &&
        typeof window !== "undefined" &&
        window.top.location.search.indexOf("debug=true") > -1) {
        var removeCircular = function (obj) {
            var cache = [];
            var result = JSON.stringify(obj, function (key, value) {
                if (typeof value === "object" && value !== null) {
                    // If circular reference found then discard it
                    if ((cache && cache.indexOf(value) !== -1) ||
                        knownCircularKeys.some(function (k) { return key === k; })) {
                        return;
                    }
                    cache && cache.push(value);
                }
                // eslint-disable-next-line
                return value;
            }, 2);
            cache = null;
            return result;
        };
        console.log("\nname:", "\"" + name + "'", "\naction:", JSON.parse(removeCircular(action)), "\nnextState:", JSON.parse(removeCircular(nextState)));
    }
}
exports.default = debugReportChange;
/* tslint:enable */
//# sourceMappingURL=debugReportChange.js.map