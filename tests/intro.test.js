import { describe, test, it, expect } from "vitest";
import { max } from "../src/intro.js";

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
