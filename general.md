## Week1

Unit Testing in JavaScript (with Jest)

Unit testing is a way to test small pieces of code (units) — usually functions or modules — to ensure they work correctly. Each test focuses on one specific behavior.

### This guide explains:

What unit testing is
How Jest works
The key functions and structures used (test(), describe(), hooks like beforeAll())
How to write and organize tests (with real examples)

## 1. What is Unit Testing?

Unit tests check individual pieces of code (usually one function at a time).

They help you:
Catch errors early
Make sure future changes don't break existing code
Build confidence in your program’s reliability

### Example:
If you have a function sum(a,b) that adds two numbers, a unit test will check if:

sum(1,1) returns 2
sum(-2,3) returns 1

sum() throws an error if parameters are missing

2. The Testing Framework: Jest

Jest is a popular JavaScript testing framework. It gives you tools to:

Define tests
Group tests
Check if outputs match expectations (assertions)
Handle setup and cleanup (hooks)

### Common Jest functions:

- test(name, fn) – defines a single test.
- expect(value) – creates an expectation for a value.
- toBe() – checks exact equality.
- toBeCloseTo() – checks approximate equality (for floating-point numbers).
- toThrow() – checks if a function throws an error.
- describe(name, fn) – groups related tests together.

### 3. Test File Structure

A typical test file:

Imports the function/module to test
Organizes tests into groups with describe()

Defines tests using test() or it()
Uses hooks (beforeAll, afterAll, beforeEach, afterEach) for setup and cleanup

4. Writing Basic Tests

Example:

test('first test', () => {
    console.log('first test');
});

test('second test', () => {
    console.log('second test');
});


Each test() has:

A name/description ("first test")
A function with the actual code to run

## 5. Hooks: Running Code Before/After Tests

Hooks let you run code automatically at certain stages:

beforeAll() – runs once before all tests
afterAll() – runs once after all tests
beforeEach() – runs before every test
afterEach() – runs after every test

Example:

beforeAll(() => console.log('before all tests'));
afterAll(() => console.log('after all tests'));
beforeEach(() => console.log('before each test'));
afterEach(() => console.log('after each test'));

Prevents repeating the same code in every test (DRY principle).

Ensures tests start clean and consistent, so one test doesn’t affect another.

Handles teardown/cleanup (like resetting objects or closing connections) after tests automatically.

## 6. Grouping Tests with describe()

Use describe() to group related tests:

describe('adding tests', () => {
    test('2+2=4', () => {
        expect(2 + 2).toBe(4);
    });

    it('1+3=4', () => {
        expect(1 + 3).toBe(4);
    });
});


describe() makes tests easier to read and manage.
it() is just an alias for test() (they work the same).

## 7. Testing Functions

Example: testing a concatenation function:

“Concat” is short for concatenate, which basically means to join things together.

In programming, it usually means joining strings (pieces of text) end-to-end.

'Hello' + ' ' + 'World'   // "Hello World"
'foo'.concat('bar')       // "foobar"


const concat = (partA, partB) => '' + partA + partB;

test('concat("first","second") → "firstsecond"', () => {
    expect(concat('first', 'second')).toBe('firstsecond');
});

test('concat(1,2) → "12"', () => {
    expect(concat(1, 2)).toBe('12');
});

Here:
The function converts the inputs to strings ('' + partA + partB)
The tests check if it works for strings and numbers



8. Testing Exceptions (Errors)

Sometimes a function should throw an error.
Example:

function testFunction() {
    throw Error('This is an exception');
}

test('function throws an exception', () => {
    expect(() => testFunction()).toThrow('This is an exception');
});


Wrap the function call in () => testFunction() so Jest can catch the error.

9. Testing with Multiple Values (test.each())

When you want to test the same function with many inputs:

const testValues = [
    [1, 1, 2],
    [2, 3, 5],
    [-2, 4, 2]
];

test.each(testValues)('sum(%s,%s) = %s', (a, b, result) => {
    expect(sum(a, b)).toBe(result);
});


%s is replaced with the values in the array.
This makes tests shorter and easier to expand.

## 10. Handling Special Cases & Errors

From the sum() example:

If parameters are missing → throw 'parameter missing'
If parameters are not numbers → throw 'only numbers allowed'
If numbers are outside -500 to 500 → throw 'numbers not between -500 and 500'

Testing these:

expect(() => sum()).toThrow('parameter missing');
expect(() => sum('1',2)).toThrow('only numbers allowed');
expect(() => sum(600,0)).toThrow('numbers not between -500 and 500');

11. Testing with Floating-Point Numbers

Floating-point arithmetic can cause precision issues.
Use toBeCloseTo() instead of toBe():

expect(sum(2.5, 3)).toBeCloseTo(5.5);
expect(sum(499.9, 500.0)).toBeCloseTo(999.9);

12. Key Takeaways Before Your Next Class

Unit tests = safety net: they ensure each small part of your program works as expected.

Always test for edge cases: missing values, wrong types, extreme numbers.

Group your tests logically using describe().
Use hooks for setup/cleanup.
For numbers with decimals, use toBeCloseTo().
For errors, always wrap the function call: expect(() => fn()).toThrow().

## Week2

Unit testing — detailed guide for beginners

(Copy this as a .md file or read it as plain text — everything you need to follow up from class.)

1. What is unit testing and why it matters

Unit testing checks the smallest parts of your program (a single function or class) in isolation.

It’s automated: once written, tests can be re-run anytime to confirm code still behaves correctly.

Benefits:

Catches bugs early (especially regression bugs when you change code later).

Documents expected behavior (tests describe how the code should work).

Makes refactoring safer — if tests still pass, you likely didn’t break behavior.

2. The environment (quick start)

To run the examples in this guide you’ll typically use Jest (a popular JS testing library).

Commands (run in your project folder):

# create a project (if you don't have package.json)
npm init -y

# install jest as a dev dependency
npm i -D jest


Add a script to package.json so npm test runs Jest:

{
  "scripts": {
    "test": "jest"
  }
}


Put tests in files named *.test.js or inside a __tests__ folder. Run tests with:

npm test

3. Jest basics — vocabulary & structure

describe(name, fn) — groups related tests (optional, but keeps output organized).

test(name, fn) (alias: it) — defines a single test case.

expect(value) — the assertion starter; combine with matchers to test behavior.

Common matchers:

toBe(expected) — strict equality (for primitives: numbers, strings).
toEqual(expected) — deep equality (objects/arrays).
toBeCloseTo(expected[, numDigits]) — numeric closeness for floating-point values.
toThrow('message' | /regex/) — expects a function to throw an exception.

Important: when testing that a function throws, pass a function to expect:

expect(() => myFunc()).toThrow('some message');


Do not write expect(myFunc()).toThrow(...) — the error would be thrown before Jest can catch it.

4. Parameterized tests (run the same logic with many inputs)

Use test.each(table)(name, (args...) => {...}) to keep tests DRY:

const cases = [
  [1,1,2],
  [2,3,5],
  [500,500,1000]
];

test.each(cases)('sum(%s,%s) = %s', (a,b,expected) => {
  expect(sum(a,b)).toBe(expected);
});


Placeholders %s in the test title are replaced per row — makes test output readable.

5. Floating point gotchas — toBeCloseTo

JavaScript uses binary floating point; some sums like 0.1 + 0.2 produce 0.30000000000000004.
For decimal tests use:

expect(sum(a,b)).toBeCloseTo(expected); // default 2 decimal places
// or with stricter precision
expect(sum(a,b)).toBeCloseTo(expected, 10);

## 6. Order of validation matters (why tests check specific messages)

When code performs multiple validations in sequence, the first failing check determines the thrown error. Tests often assert the exact message because that documents which validation failed.

Example (the sum function):

Check: did we receive two parameters?
If no → throw 'parameter missing'
Check: are both parameters numbers?
If not → throw 'only numbers allowed'
Check: are numbers in range [-500, 500]?
If not → throw 'numbers not between -500 and 500'
Else return a + b.

So:

sum('a') (one parameter, non-number) triggers 1 → 'parameter missing'.
sum('1', 2) (two params but not numbers) triggers 2 → 'only numbers allowed'.
sum(501, 0) triggers 3 → 'numbers not between -500 and 500'.
Tests should mirror that order to be precise.

## 7. Example: sum(a, b) — behavior & tests

Specification summary

a and b must be numbers.

-500 <= a <= 500, -500 <= b <= 500.

If missing param(s) → throw 'parameter missing'.
If non-number param(s) → throw 'only numbers allowed'.
If out of range → throw 'numbers not between -500 and 500'.
Else return a + b.

Test groups to write

Integers (exact equality using .toBe).
Floats (use .toBeCloseTo).

Missing parameter tests (expect(() => sum()).toThrow('parameter missing')).
Non-number parameter tests (expect(() => sum('1', 2)).toThrow('only numbers allowed')).

Out-of-range tests (expect(() => sum(1000, 5)).toThrow('numbers not between -500 and 500')).

## Why we test all of these

Happy path (valid inputs) ensures the function returns correct sums.

Unhappy paths ensure your input validation works and produces the exact errors you expect — important for API contract & debugging.

## 8. Testing for thrown errors — the wrapper trick

When you expect a thrown error:

// correct
expect(() => sum()).toThrow('parameter missing');

// WRONG: this throws before expect can catch it
expect(sum()).toThrow('parameter missing');


If you test for exactness use a regex:
expect(() => sum()).toThrow(/^parameter missing$/);


## Week3


1. What is the Dice class?

The Dice class is a blueprint for a dice object you can use in games. Each dice has:

#dotCount (private): Current face of the dice. Starts at 0 → means not rolled yet.
#upperBound (private): Maximum value the dice can show. Default is 6. Must be an integer between 2 and 20.

Minimum value → Always 1.
Maximum value → Whatever you set as upper bound.

The Dice class lets you:

Create dice with default or custom upper bounds.
Read dice properties with getters.
Roll the dice (sets #dotCount randomly from 1 to upperBound).
Convert dice state to text (via toString()).

2. Private fields (#)

Fields with # are private, meaning you cannot access them directly from outside the class.

Examples:
#dotCount
#upperBound


To access them, use getters:

dice.dots        // returns #dotCount
dice.maximumValue // returns #upperBound

3. Constructor
constructor(uBound = 6) {
    this.#upperBound = uBound;
    this.#dotCount = 0;
}


Purpose: Initialize a new dice object.
Parameters: uBound (optional), default 6.

Initial state:
#dotCount = 0 (dice not rolled)
#upperBound = uBound

## Validation rules:

Non-integer → throw 'upper bound must be an integer'
Upper bound < 2 → throw 'upper bound too small'
Upper bound > 20 → throw 'upper bound too big'

4. Getters

A getter is a special type of method in a class that lets you read the value of a property without calling it like a normal function

minimumValue: Always returns 1
maximumValue: Returns #upperBound
dots: Returns #dotCount

console.log(dice.minimumValue); // 1
console.log(dice.maximumValue); // 6
console.log(dice.dots);         // 0

5. Methods (to implement and test later)
roll()

Rolls the dice.
Sets #dotCount to a random number [1, upperBound].
After rolling, dots can never be 0.
toString()
Returns 'not rolled yet' if dots === 0.
Otherwise, returns dots as string:
const dice = new Dice();
dice.toString(); // "not rolled yet"
dice.roll();
dice.toString(); // "4"  (example)

6. Unit Testing Dice
Why test a dice?

Ensure constructor sets correct defaults.
Ensure validation works (throws errors for invalid inputs).
Ensure rolling works correctly (dots between 1 and upper bound).
Ensure toString() returns correct text.

Jest basics

describe() → Groups related tests
test() → Single test
expect(actual).toBe(expected) → Check equality
expect(() => fn()).toThrow('error message') → Check for exceptions

6.1 Constructor tests

Default dice:

const dice = new Dice();
expect(dice.minimumValue).toBe(1);
expect(dice.maximumValue).toBe(6);
expect(dice.dots).toBe(0);

Custom upper bounds:
Check values between 2 and 20.

Invalid inputs:

expect(() => new Dice('a')).toThrow('upper bound must be an integer');
expect(() => new Dice(1)).toThrow('upper bound too small');
expect(() => new Dice(21)).toThrow('upper bound too big');

6.2 Roll tests

After rolling:
dots >= 1 && dots <= maximumValue

Edge cases:

Rolling multiple times should never produce 0.

Randomness can be mocked for predictable tests.

6.3 toString tests

Not rolled: Returns 'not rolled yet'

Rolled: Returns dots.toString()

7. Why unit tests are important

Automates checking your code works correctly.
Helps catch bugs early.
Makes future changes safer.
Allows testing happy paths, edge cases, and invalid inputs.

8. Common beginner mistakes

Forgetting () => fn() for exceptions	Always wrap function calls when expecting a throw

Using .toBe for objects	Use .toEqual

Testing floats with .toBe	Use .toBeCloseTo

Ignoring randomness in roll()	Check ranges or mock random numbers

Combining too many checks in one test	Keep tests focused and readable

10. Tips for writing good tests

One behavior per test → easier to debug failures
Clear names → explain what is being tested
Edge cases → test 0, negative, max, min
Validation/errors → test all invalid inputs
Parameterized tests (test.each) → reduce repetitive code
Isolate unit tests → don’t rely on database or external services

1. Constructor

The constructor is a special function that runs automatically when you create a new Dice object.

Example:

const dice = new Dice(); // calls the constructor
What it does:

Sets the maximum dice value (#upperBound):

If you pass a number: new Dice(10) → upper bound is 10.

If you don’t pass anything: new Dice() → upper bound defaults to 6.

Initializes the current dots (#dotCount) to 0 → means dice hasn’t been rolled yet.

Validation rules:

If upperBound is not a number or not an integer → throw 'upper bound must be an integer'.

If upperBound < 2 → throw 'upper bound too small'.

If upperBound > 20 → throw 'upper bound too big'.

Example:

new Dice(5);   // ✅ works, upperBound=5
new Dice('a'); // ❌ throws "upper bound must be an integer"
new Dice(1);   // ❌ throws "upper bound too small"
new Dice(25);  // ❌ throws "upper bound too big"

2. roll() method

The roll() method simulates rolling the dice.

roll() {
    this.#dotCount = Math.floor(Math.random() * this.#upperBound) + 1;
}

What it does:

Generates a random number between 1 and the upper bound.

Updates #dotCount with that number.

Returns nothing (it just changes the state of the dice).

Example:

const dice = new Dice(6);
dice.roll();
console.log(dice.dots); // 1, 2, 3, 4, 5, or 6 (random)


After rolling, dots cannot be 0 anymore.



