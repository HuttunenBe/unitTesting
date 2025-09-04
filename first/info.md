## 1. What is unit testing?

Unit testing checks individual pieces of your code (functions, classes, small modules) to make sure they behave as expected.

In this file, you're not testing a real module (like sum.js) but instead demonstrating how tests, groups, and hooks work.

## 2. Main components in this file
a) test() and it()

These are the main building blocks of Jest.
Each test() defines a single test case.
it() is just an alias for test() (they are the same).

Example:

test('2+2=4', () => {
    expect(2+2).toBe(4);
});


## What happens?

Jest runs the code inside the arrow function.

If the assertion expect(2+2).toBe(4) is true, the test passes.

If it’s false or throws an error, the test fails.

## b) Hooks (beforeAll, afterAll, beforeEach, afterEach)

These are setup and teardown functions.
They run automatically at different times:
beforeAll() → runs once before all tests
afterAll() → runs once after all tests
beforeEach() → runs before every test
afterEach() → runs after every test

## Why?
Useful when your tests need setup (e.g., create a database connection) or cleanup (e.g., close a file).

In your case, they just log messages to show when they run.

## c) describe()

Groups related tests together.

Helps organize tests logically (e.g., "sum tests", "string tests", "exception tests").

You can nest describe() blocks.

## d) Assertions (expect())

Jest uses expect() to check the result of your code.

Common matchers:
.toBe(value) → exact match (for numbers, strings)
.toEqual(obj) → deep match (for objects/arrays)
.toThrow('error message') → checks if a function throws an error
.toBeCloseTo(num) → for floating-point numbers

## 3. What’s actually happening in this code?

Jest starts → runs beforeAll().

Runs each test() or it() one by one:

Before each test: beforeEach()

After each test: afterEach()

Runs afterAll() when all tests are done.

Each test() checks something simple:

Logs "first test", "second test"

Checks 2+2=4, 1+3=4

Tests a concat() function for string/number concatenation

Tests that an error is thrown

This is not testing a real module, but showing Jest structure.

## 4. As a beginner, what should you learn from this?

How to structure tests:

Each test is independent.

Use describe() to group them logically.

How hooks work:

Setup/teardown runs automatically—important when your code depends on initial state.

How to write assertions:

expect() is the heart of testing.

Learn basic matchers (toBe, toThrow, toBeCloseTo).

How to run tests:

Files end with .test.js or .spec.js.

Run with npm test (if Jest is installed and configured).

5. Why is this useful?

Unit testing prevents bugs by checking small pieces of code early.

If one part breaks later, Jest tells you immediately.

It also documents how your code is supposed to behave.