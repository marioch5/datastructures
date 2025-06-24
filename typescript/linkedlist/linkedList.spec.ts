import DoublyLinkedList from "./linkedlist";

describe("LinkedList", () => {
  let list: DoublyLinkedList<number>;
  const LOOPS = 1000;
  const TEST_SZ = 40;
  const NUM_NULLS = Math.floor(TEST_SZ / 5);
  const MAX_RAND_NUM = 250;

  beforeEach(() => {
    list = new DoublyLinkedList<number>();
  });

  test("is initially empty", () => {
    expect(list.isEmpty()).toBe(true);
    expect(list.size).toBe(0);
  });

  test("removeFirst on empty list throws", () => {
    expect(() => list.removeFirst()).toThrow();
  });

  test("removeLast on empty list throws", () => {
    expect(() => list.removeLast()).toThrow();
  });

  test("peekFirst on empty list throws", () => {
    expect(() => list.peekFirst()).toThrow();
  });

  test("peekLast on empty list throws", () => {
    expect(() => list.peekLast()).toThrow();
  });

  test("addFirst", () => {
    list.addFirst(3);
    expect(list.size).toBe(1);
    list.addFirst(5);
    expect(list.size).toBe(2);
  });

  test("addLast", () => {
    list.addLast(3);
    expect(list.size).toBe(1);
    list.addLast(5);
    expect(list.size).toBe(2);
  });

  test("addAt", () => {
    list.addAt(0, 1);
    list.addAt(1, 2);
    list.addAt(1, 3);
    list.addAt(2, 4);
    list.addAt(1, 8);

    expect(list.size).toBe(5);
  });

  test("removeFirst and removeLast", () => {
    list.addFirst(3);
    expect(list.removeFirst()).toBe(3);
    expect(list.isEmpty()).toBe(true);

    list.addLast(4);
    expect(list.removeLast()).toBe(4);
    expect(list.isEmpty()).toBe(true);
  });

  test("peekFirst and peekLast", () => {
    list.addFirst(4);
    expect(list.peekFirst()).toBe(4);
    expect(list.size).toBe(1);

    list.addLast(5);
    expect(list.peekLast()).toBe(5);
    expect(list.size).toBe(2);
  });

  test("peeking and removing sequence", () => {
    list.addFirst(5);
    expect(list.peekFirst()).toBe(5);
    expect(list.peekLast()).toBe(5);

    list.addFirst(6);
    expect(list.peekFirst()).toBe(6);
    expect(list.peekLast()).toBe(5);

    list.addFirst(7);
    expect(list.peekFirst()).toBe(7);
    expect(list.peekLast()).toBe(5);

    list.addLast(8);
    expect(list.peekFirst()).toBe(7);
    expect(list.peekLast()).toBe(8);

    list.removeLast();
    expect(list.peekLast()).toBe(5);

    list.removeLast();
    expect(list.peekLast()).toBe(6);

    list.removeFirst();
    expect(list.peekFirst()).toBe(6);
    expect(list.peekLast()).toBe(6);
  });

  test("removing specific elements", () => {
    const strs = new DoublyLinkedList<string>();
    strs.add("a");
    strs.add("b");
    strs.add("c");
    strs.add("d");
    strs.add("e");
    strs.add("f");
    strs.remove("b");
    strs.remove("a");
    strs.remove("d");
    strs.remove("e");
    strs.remove("c");
    strs.remove("f");
    expect(strs.size).toBe(0);
  });

  test("removeAt", () => {
    list.add(1);
    list.add(2);
    list.add(3);
    list.add(4);
    list.removeAt(1);
    list.removeAt(1);
    expect(list.peekFirst()).toBe(1);
    expect(list.peekLast()).toBe(4);
    list.removeAt(1);
    list.removeAt(0);
    expect(list.size).toBe(0);
  });

  test("clear", () => {
    list.add(22);
    list.add(33);
    list.add(44);
    expect(list.size).toBe(3);
    list.clear();
    expect(list.size).toBe(0);
    list.add(22);
    list.add(33);
    list.add(44);
    expect(list.size).toBe(3);
    list.clear();
    expect(list.size).toBe(0);
  });

  test("toString", () => {
    const strs = new DoublyLinkedList<string>();
    expect(strs.toString()).toBe("[  ]");
    strs.add("a");
    expect(strs.toString()).toBe("[ a ]");
    strs.add("b");
    expect(strs.toString()).toBe("[ a, b ]");
    strs.add("c");
    strs.add("d");
    strs.add("e");
    strs.add("f");
    expect(strs.toString()).toBe("[ a, b, c, d, e, f ]");
  });
});
