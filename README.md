# Mastering JavaScript Unit Testing

This repository contains all of the examples and exercises for my JavaScript testing course.

- Understand the fundamentals of unit testing and its significance in JavaScript development.
- Master the setup and usage of Vitest for effective JavaScript testing.
- Discover the best practices for writing clean, maintainable, and trustworthy tests.
- Learn various techniques to run and debug tests effectively.
- Explore VSCode shortcuts to boost coding productivity.
- Master working with matchers and crafting precise, effective assertions.
- Practice positive, negative, and boundary testing to cover a wide range of test scenarios.
- Break dependencies in your tests with mocks.
- Improve code quality with static analysis, including TypeScript, ESLint, and Prettier.
- Automate code quality checks with Husky to maintain high coding standards.

You can find the full course at:

https://codewithmosh.com

SHORTCUTS
Ctrl + P => @ symbols
Ctrl - P => : linea
"Alt" + "=>" => Go Forward
"Alt" + "<=" => Go Back

Core unit testing techniques

- Characteristics of good tests
- Using matchers
- Writing good assertions
- Positive and negative testing
- Boundary testing
- Writing parameterized tests
- Testing asynchronous code
- Setup and teardown (Setup: code that runs before each test. Teardown: code that runs after each test.)

No tests > bad tests.
Tests must be maintainable, robust, and trustworthy.

Maintainable:

- Have a clear name.
- Test a single behavior.
- Are small (ideally, less than 10 lines).
- Have clear variables/constants.
- Are properly formatted.

Robust tests:

- A test that is resilient to changes in the code. That means when we refactor our code but keep the functionality, our tests should still pass.
- Test the behavior, not the functionality
- Avoid tight assertions. We should not write assertions against exact texts or error messages, because texts and error messages can change.

Trustworthy:

- A test that can be trusted.
- The code works. If a test fails, we must be sure the problem is in the code, not in the test.
- No false positives.
- Validate the correct behavior.
- Test boundary conditions.
- Are deterministic.
- Are not dependent on random data.
- Are not dependent on the current date/time.
- Are not dependent on global state.
