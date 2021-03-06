import Interfaces = require("../../Interfaces");
import RedBlackTreeHelpers = require("./RedBlackTreeHelpers");
import Error = require("../../Error");
import MapHelpers = require("../maps/MapHelpers")

// TODO: this could use a lot of improvements. Look at CLR more and the gnu opensource implementation
// https://www.opensource.apple.com/source/gcc/gcc-5484/libjava/java/util/TreeMap.java
// TODO: ensure the insert check to replace the value guarantees uniqueness!
class RedBlackTree<K extends Interfaces.IComparableBaseObject, V extends Interfaces.IBaseObject> implements Interfaces.ITree<K, V> {

  private nodeCount = 0;
  private root: RedBlackTreeHelpers.Node<K, V> = null;

  constructor() {
  }

  equals(): boolean {
    Error.notImplemented();
    return null;
  }

  hashCode(): number {
    Error.notImplemented();
    return null;
  }

  // inserts a node with the given key and value
  // if a node with the given key exists, the value will be overwritten with the given value
  // TODO: Return value?
  insert(key: K, value: V) {
    Error.checkNotNull(key);
    Error.checkNotNull(value);

    var returnValue = false;

    if (this.root === null) {
      // empty tree
      this.root = new RedBlackTreeHelpers.Node<K, V>(key, value);
      returnValue = true;
      this.nodeCount++;
    } else {
      var head = new RedBlackTreeHelpers.Node<K, V>(); // fake tree root

      var direction = false;
      var last = false;  //TODO: bad name!

      // setup
      var grandParent: RedBlackTreeHelpers.Node<K, V> = null;
      var grandParentParent = head;
      var parent: RedBlackTreeHelpers.Node<K, V> = null;
      var node = this.root;
      grandParentParent.right = this.root;

      // search down
      while (true) {
        if (node === null) {
          // insert new node at the bottom
          node = new RedBlackTreeHelpers.Node<K, V>(key, value);
          parent.setChild(direction, node);
          returnValue = true;
          this.nodeCount++;
        } else if (this.isRed(node.left) && this.isRed(node.right)) {
          // color flip
          node.red = true;
          node.left.red = false;
          node.right.red = false;
        }

        // fix red violation
        if (this.isRed(node) && this.isRed(parent)) {
          //TODO: dir2 is a terrible name, what is this?
          var dir2 = grandParentParent.right === grandParent;

          if (node === parent.getChild(last)) {
            grandParentParent.setChild(dir2, this.singleRotate(!last, grandParent));
          } else {
            grandParentParent.setChild(dir2, this.doubleRotate(!last, grandParent));
          }
        }

        var cmp = node.key.compareTo(key);

        // stop if found
        if (cmp === 0) {
          node.value = value;
          break;
        }

        last = direction;
        direction = cmp < 0;

        // update helpers
        if (grandParent !== null) {
          grandParentParent = grandParent;
        }
        grandParent = parent;
        parent = node;
        node = node.getChild(direction);
      }

      // update root
      this.root = head.right;
    }

    // make root black
    this.root.red = false;

    return returnValue;
  }

  //TODO: return value?
  remove(key: K): V {
    Error.checkNotNull(key);

    if (this.root === null) {
      return null;
    }

    var head = new RedBlackTreeHelpers.Node<K, V>(); // fake tree root
    var node = head;
    node.right = this.root;
    var parent: RedBlackTreeHelpers.Node<K, V> = null;
    var grandParent: RedBlackTreeHelpers.Node<K, V> = null;
    var found: RedBlackTreeHelpers.Node<K, V> = null;
    var directionRight = true;

    while (node.getChild(directionRight) !== null) {
      var last = directionRight;

      // update helpers
      grandParent = parent;
      parent = node;
      node = node.getChild(directionRight);

      var cmp = key.compareTo(node.key);

      directionRight = cmp > 0;

      // save found node
      if (cmp === 0) {
        found = node;
      }

      // push the red node down
      if (!this.isRed(node) && !this.isRed(node.getChild(directionRight))) {
        if (this.isRed(node.getChild(!directionRight))) {
          var sr = this.singleRotate(directionRight, node);
          parent.setChild(last, sr);
          parent = sr;
        } else if (!this.isRed(node.getChild(!directionRight))) {
          var sibling = parent.getChild(!last);
          if (sibling !== null) {
            if (!this.isRed(sibling.getChild(!last)) && !this.isRed(sibling.getChild(last))) {
              // color flip
              parent.red = false;
              sibling.red = true;
              node.red = true;
            }
            else {
              var dir2 = grandParent.right === parent;

              if (this.isRed(sibling.getChild(last))) {
                grandParent.setChild(dir2, this.doubleRotate(last, parent));
              }
              else if (this.isRed(sibling.getChild(!last))) {
                grandParent.setChild(dir2, this.singleRotate(last, parent));
              }

              // ensure correct coloring
              var gpc = grandParent.getChild(dir2);
              gpc.red = true;
              node.red = true;
              gpc.left.red = false;
              gpc.right.red = false;
            }
          }
        }
      }
    }

    // replace and remove if found
    if (found !== null) {
      found.key = node.key;
      parent.setChild(parent.right === node, node.getChild(node.left === null));
      this.nodeCount--;
    }

    // update root and make it black
    this.root = head.right;
    if (this.root !== null) {
      this.root.red = false;
    }

    return found.value;
  }

  size(): number {
    return this.nodeCount;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  keys(): Interfaces.IIterator<K> {
    return new RedBlackTreeHelpers.Iterator<K>(this.root, this.size(), function (node) {
      return node.key;
    });
  }

  values(): Interfaces.IIterator<V> {
    return new RedBlackTreeHelpers.Iterator<V>(this.root, this.size(), function (node) {
      return node.value;
    });
  }

  clear(): void {
    this.root = null;
    this.nodeCount = 0;
  }

  // return null
  get(key: K): V {
    Error.checkNotNull(key);

    var res = this.root;
    while (res !== null) {

      var comparatorValue = key.compareTo(res.key);
      if (comparatorValue === 0) {
        return res.value;
      } else {
        res = res.getChild(comparatorValue > 0);
      }
    }

    return null;
  }

  // calls cb on each node's data, in order
  // TODO: Type
  forEach(callback: any): void {
    MapHelpers.forEach(<any>this, callback);
  }

  // returns a null iterator
  // call next() or prev() to point to an element
  __iterator__(): Interfaces.IIterator<K> {
    return this.keys();
  }

  private isRed(node: RedBlackTreeHelpers.Node<K, V>): boolean {
    return node !== null && node.red;
  }

  private doubleRotate(right: boolean, root: RedBlackTreeHelpers.Node<K, V>): RedBlackTreeHelpers.Node<K, V> {
    root.setChild(!right, this.singleRotate(!right, root.getChild(!right)));
    return this.singleRotate(right, root);
  }

  private singleRotate(right: boolean, root: RedBlackTreeHelpers.Node<K, V>): RedBlackTreeHelpers.Node<K, V> {
    var save = root.getChild(!right);

    root.setChild(!right, save.getChild(right));
    save.setChild(right, root);

    root.red = true;
    save.red = false;

    return save;
  }

}

export = RedBlackTree;