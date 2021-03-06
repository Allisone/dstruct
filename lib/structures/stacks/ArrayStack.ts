import Interfaces = require("../../Interfaces");
import ArrayList = require("../lists/ArrayList");

class ArrayStack<E extends Interfaces.IBaseObject> extends ArrayList<E> implements Interfaces.IStack<E> {

  peek(): E {
    return this.get(this.size() - 1);
  }

  pop(): E {
    return this.removeAtIndex(this.size() - 1);
  }

  push(element: E): void {
    this.add(element);
  }

}

export = ArrayStack;
