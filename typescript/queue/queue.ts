export default class Queue<T> {
  private data: (T | null)[] = [];
  private front: number = 0;
  private rear: number = 0;
  private count: number = 0;
  private capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.data = Array.from({ length: capacity }, () => null as any);
  }

  public offer(elem: T): void {
    if (this.isFull()) throw new Error("Queue is full");

    this.data[this.rear] = elem;
    this.rear = (this.rear + 1) % this.capacity;

    this.count++;
  }

  public poll(): T {
    if (this.isEmpty()) throw new Error("Queue is empty");

    const val = this.data[this.front];
    this.data[this.front] = null;

    this.front = (this.front + 1) % this.capacity;

    this.count--;

    return val;
  }

  public peek(): T {
    if (this.isEmpty()) throw new Error("Queue is empty");
    return this.data[this.front];
  }

  public size(): number {
    return this.count;
  }

  public isEmpty(): boolean {
    return this.count === 0;
  }

  private isFull() {
    return this.count === this.capacity;
  }
}
