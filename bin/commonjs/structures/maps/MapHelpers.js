var Error = require("../../Error");

function equals(map, otherMap) {
    return false;
}
exports.equals = equals;

function forEach(map, callback) {
    Error.checkNotNull(map);
    Error.checkNotNull(callback);

    if (map.size() > 0) {
        var keys = map.keys();
        var values = map.values();
        var key;
        do {
            key = keys.next();
            var value = values.next();
            callback(key.value, value.value);
        } while(!key.done);
    }
}
exports.forEach = forEach;
