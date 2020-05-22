class DLLNode {
  constructor({ element = undefined, next = this, prev = this, isSentinel = false }) {
    this.element = element;
    this.next = next;
    this.prev = prev;
    this._active = !isSentinel;
  }

  remove() {
    if (this._active) {
      this.prev.next = this.next;
      this.next.prev = this.prev;
      this._active = false;
      return this.element;
    }
  }
}

class DoublyLinkedList {
  constructor(Node = DLLNode) {
    this.Node = Node;
    this._sentinel = new this.Node({ isSentinel: true });
  }

  _head() {
    return this._sentinel.next;
  }

  _tail() {
    return this._sentinel.prev;
  }

  insertHead(element) {
    let newNode = new DLLNode(element);
    let head = this._head();

    if (head == this._sentinel) {
      newNode.prev = this._sentinel;
      newNode.next = this._sentinel;
      this._sentinel.next = newNode;
      this._sentinel.prev = newNode;
    }
    
    if (head != this._sentinel) {
      let curr = head;
      while (curr.next != this._sentinel) {
        curr = curr.next;
      }
      curr.next = newNode;
      newNode.prev = curr;
      newNode.next = this._sentinel;
      this._sentinel.prev = newNode;
    }
  }

  insertTail(element) {
    let newNode = new DLLNode(element);
    let tail = this._tail();

    if (tail == this._sentinel) {
      newNode.prev = this._sentinel;
      newNode.next = this._sentinel;
      this._sentinel.next = newNode;
      this._sentinel.prev = newNode;
    }
    
    if (tail != this._sentinel) {
      newNode.next = this._sentinel;
      newNode.prev = tail;
      tail.next = newNode;
      this._sentinel.prev = newNode;
      // while (curr.next != this._sentinel) {
      //   curr = curr.next;
      // }

      // curr.next = newNode;
      // newNode.prev = curr;
      // newNode.next = this._sentinel;
      // this._sentinel.prev = newNode;
    }
  }

  removeHead() {
   let head = this._head();
   if (head == this._sentinel) {
     return;
   }

   return head.remove();
  }

  // removeTail() {
  // }

  // remove(node) {
  // }

  // forEach(callback) {
  // }

  count() {
    let count = 0;
    let head = this._head();

    if (head == this._sentinel) {
      return count;
    }

    while (head !== this._sentinel) {
      count += 1;
      head = head.next;
    }
    return count;
  }
}

export default DoublyLinkedList;