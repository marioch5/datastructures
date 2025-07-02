import Queue from "./queue";

describe("Queue Tests", () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>(2);
  });

  test("testEmptyQueue", () => {
    expect(queue.isEmpty()).toBe(true);
    expect(queue.size()).toBe(0);
  });

  test("testPollOnEmpty", () => {
    expect(() => queue.poll()).toThrow("Queue is empty");
  });

  test("testPeekOnEmpty", () => {
    expect(() => queue.peek()).toThrow("Queue is empty");
  });

  test("testOffer", () => {
    queue.offer(2);
    expect(queue.size()).toBe(1);
  });

  test("testPeek", () => {
    queue.offer(2);
    expect(queue.peek()).toBe(2);
    expect(queue.size()).toBe(1);
  });

  test("testPoll", () => {
    queue.offer(2);
    expect(queue.poll()).toBe(2);
    expect(queue.size()).toBe(0);
  });

  test("testExhaustively", () => {
    expect(queue.isEmpty()).toBe(true);

    queue.offer(1);
    expect(queue.isEmpty()).toBe(false);

    queue.offer(2);
    expect(queue.size()).toBe(2);

    expect(queue.peek()).toBe(1);
    expect(queue.size()).toBe(2);

    expect(queue.poll()).toBe(1);
    expect(queue.size()).toBe(1);

    expect(queue.peek()).toBe(2);
    expect(queue.size()).toBe(1);

    expect(queue.poll()).toBe(2);
    expect(queue.size()).toBe(0);

    expect(queue.isEmpty()).toBe(true);
  });
});
