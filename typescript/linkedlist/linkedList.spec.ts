import DoublyLinkedList from "./linkedlist";

describe("LinkedList", () => {
  let list: DoublyLinkedList<number>;
  const LOOPS = 500;
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

  test("randomized indexOf", () => {
    for (let loops = 0; loops < LOOPS; loops++) {
      const jsList: number[] = [];
      list.clear();

      const randNums = genUniqueRandList(TEST_SZ);

      randNums.forEach((val) => {
        jsList.push(val);
        list.add(val);
      });

      shuffle(randNums);

      randNums.forEach((val) => {
        expect(list.indexOf(val)).toBe(jsList.indexOf(val));
        expect(list.size).toBe(jsList.length);
        expect([...list]).toEqual(jsList);
      });
    }
  });

  test("randomized removing", () => {
    for (let loops = 0; loops < LOOPS; loops++) {
      const jsList: number[] = [];
      list.clear();

      const randNums = genRandList(TEST_SZ);
      for (const value of randNums) {
        jsList.push(value);
        list.add(value);
      }

      shuffle(randNums);

      for (let i = 0; i < randNums.length; i++) {
        const valToRemove = randNums[i];

        const jsRemoved = removeFirst(jsList, valToRemove);
        const listRemoved = list.remove(valToRemove);

        expect(jsRemoved).toBe(listRemoved);
        expect(jsList.length).toBe(list.size);
        expect([...list]).toEqual(jsList);
      }

      jsList.length = 0;
      list.clear();

      for (const value of randNums) {
        jsList.push(value);
        list.add(value);
      }

      for (let i = 0; i < randNums.length; i++) {
        const rm_val = Math.floor(Math.random() * MAX_RAND_NUM);

        const jsRemoved = removeFirst(jsList, rm_val);
        const customRemoved = list.remove(rm_val);

        expect(jsRemoved).toBe(customRemoved);
        expect(jsList.length).toBe(list.size);
        expect([...list]).toEqual(jsList);
      }
    }
  });

  test("randomized removeAt", () => {
    for (let loops = 0; loops < LOOPS; loops++) {
      const jsList: number[] = [];
      list.clear();

      const randNums = genRandList(TEST_SZ);

      for (const value of randNums) {
        jsList.push(value);
        list.add(value);
      }

      for (let i = 0; i < randNums.length; i++) {
        const rm_index = Math.floor(Math.random() * list.size);

        const num1 = jsList.splice(rm_index, 1)[0];
        const num2 = list.removeAt(rm_index);

        expect(num1).toBe(num2);
        expect(jsList.length).toBe(list.size);
        expect([...list]).toEqual(jsList);
      }
    }
  });

  function genRandList(size: number): (number | null)[] {
    const list: (number | null)[] = Array.from({ length: size }, () =>
      Math.floor(Math.random() * MAX_RAND_NUM)
    );

    for (let i = 0; i < NUM_NULLS; i++) {
      list.push(null);
    }

    shuffle(list);

    return list;
  }

  function genUniqueRandList(size: number): (number | null)[] {
    const list: (number | null)[] = Array.from({ length: size }, (_, i) => i);

    for (let i = 0; i < NUM_NULLS; i++) {
      list.push(null);
    }

    shuffle(list);

    return list;
  }

  function removeFirst<T>(arr: T[], value: T): boolean {
    const index = arr.indexOf(value);

    if (index >= 0) {
      arr.splice(index, 1);
      return true;
    }

    return false;
  }

  function shuffle(array: any[]) {
    let currentIndex = array.length;

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }
});
