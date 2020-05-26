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
    let newNode = new DLLNode({ element });
    newNode.prev = this._sentinel;
    newNode.next = this._sentinel.next;
    this._sentinel.next.prev = newNode;
    this._sentinel.next = newNode;
    return newNode;
  }

  insertTail(element) {
    let newNode = new DLLNode({ element });
    let tail = this._tail();
    
    newNode.next = this._sentinel;
    newNode.prev = tail;
    tail.next = newNode;
    this._sentinel.prev = newNode;
    return newNode;
  }

  removeHead() {
   let head = this._head();
   
   if (head == this._sentinel) {
     return;
   }

   return head.remove();
  }

  removeTail() {
    let tail = this._tail();
   
   if (tail == this._sentinel) {
     return;
   }

   return tail.remove();
  }

  remove(node) {
    if (node.remove) {
      return node.remove();
    }
    return undefined;
    // let head = this._head();
    
    // if (head == this._sentinel) {
    //   return;
    // }

    // while (head != this._sentinel) {
    //   if (head == node) {
    //     head.remove();
    //     return head;
    //   } else {
    //     head = head.next;
    //   }
    // } 
    // return undefined;
  }

  forEach(callback) {
    let count = 0;
    let head = this._head();

    if (head == this._sentinel) {
      return;
    }

    while (head != this._sentinel && head._active) {
      callback(head.element, count, this);
      count ++;
      head = head.next;
    }

    // for (let i = 0; i < count; i++) {
    //   callback(head.element, i, this)
    //   head = head.next;
    // }
    // callback(something) //assume callback is constant time/space
  }

  count() {
    let count = 0;
    let head = this._head();

    if (head == this._sentinel) {
      return count;
    }

    // while (head !== this._sentinel) {
    //   count ++;
    //   head = head.next;
    // }

    this.forEach(() => {
      count += 1;
    })

    return count;
  }
}

export default DoublyLinkedList;