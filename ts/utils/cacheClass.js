(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Cache = /** @class */ (function () {
        function Cache() {
            this.cache_ = {};
        }
        Cache.prototype.setCache = function (key, value) {
            this.cache_[key] = value;
        };
        Cache.prototype.tryGetCache = function (key) {
            try {
                return this.cache_[key];
            }
            catch (e) {
                return null;
            }
        };
        Cache.prototype.clear = function () {
            this.cache_ = {};
        };
        return Cache;
    }());
    exports.Cache = Cache;
});
