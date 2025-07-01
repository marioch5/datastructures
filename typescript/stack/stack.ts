export default class Stack<T> implements Iterable<T> {
  private list: T[] = [];

  constructor(initialEl?: T) {
    if (initialEl) {
      this.list.push(initialEl);
    }
  }

  public size(): number {
    return this.list.length;
  }

  public isEmpty(): boolean {
    return this.list.length === 0;
  }

  public push(element: T): void {
    this.list.push(element);
  }

  public pop(): T {
    if (this.isEmpty()) throw new Error("Empty Stack");
    return this.list.pop();
  }

  public peek(): T {
    if (this.isEmpty()) throw new Error("Empty Stack");
    return this.list[this.list.length - 1];
  }

  public search(element: T) {
    return this.list.findLastIndex((el) => el === element);
  }

  [Symbol.iterator](): Iterator<T> {
    return this.list[Symbol.iterator]();
  }
}
