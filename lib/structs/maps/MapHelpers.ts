/// <reference path="../../../References.d.ts"/>

import Interfaces = require("../../Interfaces");
import Error = require("../../Error");

export function equals<K extends Interfaces.BaseObject, V extends Interfaces.BaseObject>(
    map:Interfaces.Map<K, V>,
    otherMap:Interfaces.Map<K, V>):boolean {
    return false; //TODO! implement
    /*
    return iterableEquals<K>(map, otherMap, (mapIterator) => {
        var mapKey = <any>mapIterator.next(); //TODO: remove any
        var mapValue = <any>map.get(mapKey.value);
        var otherMapValue = <any>otherMap.get(mapKey.value);

        return mapValue.value.equals(otherMapValue.value);
    })*/
}

export function forEach<K extends Interfaces.BaseObject, V extends Interfaces.BaseObject>(map:Interfaces.Map<K, V>, callback:Interfaces.ForEachMapCallback<K, V>):void {
    Error.checkNotNull(map);
    Error.checkNotNull(callback);

    if (map.size() > 0) {
        var keys = map.keys();
        var values = map.values();
        var key: Interfaces.IteratorReturn<K>;
        do {
            key = keys.next();
            var value = values.next();
            callback(<any>key.value, <any>value.value); //TODO: remove any,
        } while (!key.done);
    }
}
