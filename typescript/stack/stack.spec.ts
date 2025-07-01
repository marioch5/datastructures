import Stack from "./stack";

describe("Stack<number> Tests", () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack();
  });

  test("testEmptyStack", () => {
    expect(stack.isEmpty()).toBe(true);
    expect(stack.size()).toBe(0);
  });

  test("testPopOnEmpty", () => {
    expect(() => stack.pop()).toThrow();
  });

  test("testPeekOnEmpty", () => {
    expect(() => stack.peek()).toThrow();
  });

  test("testPush", () => {
    stack.push(2);
    expect(stack.size()).toBe(1);
  });

  test("testPeek", () => {
    stack.push(2);
    expect(stack.peek()).toBe(2);
    expect(stack.size()).toBe(1);
  });

  test("testPop", () => {
    stack.push(2);
    expect(stack.pop()).toBe(2);
    expect(stack.size()).toBe(0);
  });

  test("testExhaustively", () => {
    expect(stack.isEmpty()).toBe(true);
    stack.push(1);
    expect(stack.isEmpty()).toBe(false);
    stack.push(2);
    expect(stack.size()).toBe(2);
    expect(stack.peek()).toBe(2);
    expect(stack.size()).toBe(2);
    expect(stack.pop()).toBe(2);
    expect(stack.size()).toBe(1);
    expect(stack.peek()).toBe(1);
    expect(stack.size()).toBe(1);
    expect(stack.pop()).toBe(1);
    expect(stack.size()).toBe(0);
    expect(stack.isEmpty()).toBe(true);
  });
});
