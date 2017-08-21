var util = {
    isNaN(obj) {
        return Number.isNaN(obj)
    },
    isArray(obj) {
        return Array.isArray(obj)
    },
    isUndefined(obj) {
        return obj === undefined || obj === null
    },
    isTrue(obj) {
        return obj === true
    },
    isFalse(obj) {
        return obj === false
    },
    isArrayLike(obj) {
        var length = !!obj && 'length'in obj && obj.length;
        var type = typeof obj;
        if (type === 'function' || type === 'string') {
            return false;
        }
        return Array.isArray(obj) || typeof length === 'number' && length >= 0
    }
};

var toString = Object.prototype.toString;

var data_type = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'];

data_type.forEach(function(item) {
    util[`is${item}`] = function(obj) {
        return toString.call(obj) === `[object ${item}]`
    }
})
