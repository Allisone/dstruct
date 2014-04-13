/// <reference path="../References.d.ts"/>

declare module tsds.collections {

    export interface forEachCollectionCallback<E> {
        (value: E): void;
    }

    export interface Collection<E> {
        size: number;
        clear(): void;
        has(value: E);
        add(value: E): void;
        isEmpty(): boolean;
        delete(value: E);
        forEach(callback: forEachCollectionCallback<E>, thisArg: any): void;
    }

}