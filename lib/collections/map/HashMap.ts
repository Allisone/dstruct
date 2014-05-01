/// <reference path="../../../../References.d.ts"/>
CollectionHelpers
module dsa.structs {

    export class HashMap<K, V> extends ES6BaseMap<K, V> {

        constructor(comparator:Comparator<K> = DefaultComparator) {
            super(<any>new Map(), comparator);
        }

    }

}