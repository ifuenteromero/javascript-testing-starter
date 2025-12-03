import { describe, expect, it } from "vitest";
import { calculateAverage, factorial } from "../src/intro2";

describe("calculateAverage", () => {
  it("should return NaN if given an empty array", () => {
    expect(calculateAverage([])).toBe(NaN);
  });
  it("should calculate the average of an array with a single element", () => {
    expect(calculateAverage([1])).toBe(1);
  });
  it("should calculate the average of an array with two elements", () => {
    expect(calculateAverage([1, 3])).toBe(2);
  });
  it("should calculate the average of an array with three elements", () => {
    expect(calculateAverage([8, 23, 11])).toBe(14);
  });
  it("should calculate the average of an array with four non-integer elements", () => {
    expect(calculateAverage([6.2, 5.6, 9.1, 3.3])).toBe(6.05);
  });
});

describe("factorial", () => {
  it("should return 1 if given 0", () => {
    expect(factorial(0)).toBe(1);
  });
  it("should return 1 if given 1", () => {
    expect(factorial(1)).toBe(1);
  });
  it("should return 2 if given 2", () => {
    expect(factorial(2)).toBe(2);
  });
  it("should return 6 if given 3", () => {
    expect(factorial(3)).toBe(6);
  });
  it("should return undefined if given a negative number", () => {
    expect(factorial(-1)).toBeUndefined();
  });
  it("should return undefined if given a non-integer number", () => {
    expect(factorial(1.2)).toBeUndefined();
  });
  it("should return 24 if given number is 4", () => {
    expect(factorial(4)).toBe(24);
  });
  it("should return 3_628_800 if given number is 10", () => {
    expect(factorial(10)).toBe(3_628_800);
  });
});
