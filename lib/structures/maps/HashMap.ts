import  * as Interfaces from '../../Interfaces';
import {ES6BaseMap} from './ES6BaseMap';

export class HashMap<K extends Interfaces.IBaseObject, V extends Interfaces.IBaseObject> extends ES6BaseMap<K, V> {

  constructor() {
    super(<any>new Map());
  }

}

