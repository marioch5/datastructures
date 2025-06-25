class ListNode<T> {
  public data: T;
  public prev: ListNode<T> | null;
  public next: ListNode<T> | null;

  constructor(data: T, prev: ListNode<T> | null, next: ListNode<T> | null) {
    this.data = data;
    this.prev = prev;
    this.next = next;
  }
}

export default class DoublyLinkedList<T> implements Iterable<T> {
  private _size: number = 0;
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;

  public get size(): number {
    return this._size;
  }

  public clear() {
    let node = this.head;

    while (node !== null) {
      const next = node.next;

      node.next = null;
      node.prev = null;

      node = next;
    }

    this.head = null;
    this.tail = null;

    this._size = 0;
  }

  public isEmpty(): boolean {
    return this._size === 0;
  }

  public add(element: T) {
    return this.addLast(element);
  }

  public addFirst(element: T) {
    if (this.isEmpty()) {
      this.head = new ListNode<T>(element, null, null);
      this.tail = this.head;
    } else {
      const newHead = new ListNode<T>(element, null, this.head);
      this.head.prev = newHead;
      this.head = newHead;
    }

    this._size++;
  }

  public addLast(element: T) {
    if (this.isEmpty()) {
      this.head = new ListNode<T>(element, null, null);
      this.tail = this.head;
    } else {
      const newTail = new ListNode<T>(element, this.tail, null);
      this.tail.next = newTail;
      this.tail = newTail;
    }

    this._size++;
  }

  public addAt(index: number, data: T) {
    if (index < 0 || index > this._size) {
      throw new Error("Index out of bounds");
    }

    if (index === 0) return this.addFirst(data);
    if (index === this._size) return this.addLast(data);

    let temp = this.head;

    for (let i = 0; i < index - 1; i++) {
      temp = temp ? temp.next : null;
    }

    if (temp) {
      const newNode = new ListNode<T>(data, temp, temp.next);
      if (temp.next) {
        temp.next.prev = newNode;
      }
      temp.next = newNode;

      this._size++;
    }
  }

  public peekFirst(): T {
    if (!this.head) {
      throw new Error("Empty list. It is not possible to peek any element");
    }

    return this.head.data;
  }

  public peekLast(): T {
    if (!this.tail) {
      throw new Error("Empty list. It is not possible to peek any element");
    }

    return this.tail.data;
  }

  public removeFirst(): T {
    if (!this.head) {
      throw new Error("Empty list. It is not possible to remove any element");
    }

    const removeData = this.head.data;

    this.head = this.head.next;
    this._size--;

    if (this.isEmpty()) {
      this.tail = null;
    } else {
      this.head.prev = null;
    }

    return removeData;
  }

  public removeLast(): T {
    if (!this.tail) {
      throw new Error("Empty list. It is not possible to remove any element");
    }

    const removeData = this.tail.data;

    this.tail = this.tail.prev;
    this._size--;

    if (this.isEmpty()) {
      this.head = null;
    } else {
      this.tail.next = null;
    }

    return removeData;
  }

  public removeNode(node: ListNode<T>): T | null {
    if (node.prev === null) return this.removeFirst();
    if (node.next === null) return this.removeLast();

    node.next.prev = node.prev;
    node.prev.next = node.next;

    this._size--;

    const valueToReturn = node.data;

    node.prev = null;
    node.next = null;

    return valueToReturn;
  }

  public remove(data: any): boolean {
    let nodeToRemove = this.head;

    for (let i = 0; i <= this._size; i++) {
      if (nodeToRemove && nodeToRemove.data === data) {
        this.removeNode(nodeToRemove);
        return true;
      }

      nodeToRemove = nodeToRemove ? nodeToRemove.next : null;
    }

    return false;
  }

  public removeAt(index: number): T {
    if (index < 0 || index >= this._size) {
      throw new Error("Index out of bounds");
    }

    if (index === 0) return this.removeFirst();
    if (index === this._size - 1) return this.removeLast();

    let trav: ListNode<T> | null;

    if (index < this.size / 2) {
      trav = this.head;
      for (let i = 0; i < index; i++) {
        if (trav) {
          trav = trav.next;
        }
      }
    } else {
      trav = this.tail;
      for (let i = this.size - 1; i > index; i--) {
        if (trav) {
          trav = trav.prev;
        }
      }
    }

    if (!trav) {
      throw new Error(`Element not found on index ${index}`);
    }

    return this.removeNode(trav);
  }

  public indexOf(data: any): number {
    let node = this.head;

    for (let i = 0; i < this._size; i++) {
      if (node && node.data === data) {
        return i;
      }

      node = node ? node.next : null;
    }

    return -1;
  }

  public contains(data: any) {
    return this.indexOf(data) > -1;
  }

  [Symbol.iterator](): Iterator<T> {
    let current = this.head;

    return {
      next(): IteratorResult<T> {
        if (current) {
          const data = current.data;

          current = current.next;

          return {
            value: data,
            done: false,
          };
        }

        return {
          value: undefined,
          done: true,
        };
      },
      return(value?: T): IteratorResult<T> {
        return { value, done: true };
      },
      throw(e?: any): IteratorResult<T> {
        if (e === undefined) {
          throw new Error("Iterator aborted with no error provided");
        }
        throw e;
      },
    };
  }

  public toString(): string {
    let stringRes = "[ ";
    let node = this.head;

    while (node !== null) {
      stringRes += `${node.data}`;

      if (node.next !== null) {
        stringRes += ", ";
      }

      node = node.next;
    }

    stringRes += " ]";

    return stringRes;
  }
}
