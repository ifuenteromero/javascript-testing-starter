import { describe, expect, it } from "vitest";
import { calculateAverage } from "../src/intro2";

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
