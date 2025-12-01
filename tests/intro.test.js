import { describe, test, it, expect } from "vitest";
import { max, fizzBuzz } from "../src/intro.js";

describe("max", () => {
  it("should return the first argument if it is greater", () => {
    /// AAA Arrange, Act, Assert
    // Arrange - setup the test data and environment. Turn on the TV
    const a = 2;
    const b = 1;

    // Act - execute the function being tested. Press the power button
    const result = max(a, b);

    // Assert - verify the result. Verify the TV is on
    expect(result).toBe(2);
  });
  it("should return the second argument if it is greater", () => {
    /// AAA Arrange, Act, Assert
    // Arrange - setup the test data and environment. Turn on the TV
    const a = 1;
    const b = 2;

    // Act - execute the function being tested. Press the power button
    const result = max(a, b);

    // Assert - verify the result. Verify the TV is on
    expect(result).toBe(2);
  });

  it("should return the first argument if arguments are equal", () => {
    /// AAA Arrange, Act, Assert
    // Arrange - setup the test data and environment. Turn on the TV
    const a = 1;
    const b = 1;
    // Act - execute the function being tested. Press the power button
    const result = max(a, b);

    // Assert - verify the result. Verify the TV is on
    expect(result).toBe(1);
  });
});

describe("fizzBuzz", () => {
  it('should return "FizzBuzz" if arg is divisible by 3 and 5', () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });
  it('should return "Fizz" if arg is only divisible by 3', () => {
    expect(fizzBuzz(6)).toBe("Fizz");
  });
  it('should return "Buzz" if arg is only divisible by 5', () => {
    expect(fizzBuzz(10)).toBe("Buzz");
  });
  it("should return arg as a string if it is not divisible by 3 or 5", () => {
    expect(fizzBuzz(4)).toBe("4");
  });
});
