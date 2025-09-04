## Top of file
'use strict';

## const { sum } = require('../calclibrary');
Imports the sum function from ../calclibrary.js.

This path means your folder likely looks like:
project/
  calclibrary.js
  __tests__/
    calclibrary.test.js   (this file)



## Group 1: integers
describe('Testing sum with integers', () => {

describe() groups related tests. It’s a label for the report output.

  test('sum(1,1) returns 2', () => {
    expect(sum(1,1)).toBe(2);
  });


## test() defines one test.

expect(actual).toBe(expected) checks exact equality (strict ===)—perfect for integers.

  const testValues = [
    [1, 1, 2],
    [2, 3, 5],
    [-2, -4, -6],
    [2, -4, -2],
    [-2, 4, 2],
    [0, 0, 0],
    [0, 3, 3],
    [3, 0, 3],
    [-3, 0, -3],
    [0, -3, -3],
    [123, 200, 323],
    [500, 500, 1000],
    [-500, -500, -1000],
    [500, -500, 0],
    [-500, 500, 0]
  ];


A table of test cases: each entry is [a, b, expected].

Notice the boundary values (-500, 500) and combinations like (500, -500)—these are classic edge cases.

  test.each(testValues)('sum(%s,%s) = %s', (a,b,result) => {
    expect(sum(a,b)).toBe(result);
  });


test.each() runs the same test for every row in testValues.

The string 'sum(%s,%s) = %s' uses placeholders:

For [1, 1, 2] the test name becomes sum(1,1) = 2 in the report.

Using .toBe is correct here because all expected results are integers.

Group 2: floats
describe('Testing sum with floats', () => {
  const testValues = [
    [10, 11.5, 21.5],
    [2.5, 3, 5.5],
    [-2.5, 3, 0.5],
    [2.4, -2.5, -0.1],
    [499.9, 500.0, 999.9],
    [-499.9, 500.0, 0.1]
  ];


Similar to the integer section, but with floating-point values (including a negative result and near-boundary sums).

  test.each(testValues)('sum(%s,%s)=%s', (a,b,result) => {
    expect(sum(a,b)).toBeCloseTo(result);
  });
});


Key difference: uses .toBeCloseTo() instead of .toBe().

Reason: floating-point arithmetic can introduce tiny rounding errors (IEEE-754).

By default, Jest checks closeness up to 2 decimal digits. If you wanted stricter precision, you could use toBeCloseTo(result, 10).

Group 3: “parameter missing”
describe('Test cases for parameter missing', () => {
  test('sum() throws an exception', () => {
    expect(() => sum()).toThrow('parameter missing');
  });


When you test thrown errors, you must wrap the call in a function: () => sum().
If you wrote expect(sum()).toThrow(...), the error would be thrown before Jest can intercept it.

  test('sum(1) throws an exception', () => {
    expect(() => sum(1)).toThrow('parameter missing');
  });


With only one argument, your implementation checks arguments.length < 2 first, so it throws 'parameter missing'.

  test("sum('a') throws an exception", () => {
    expect(() => sum('a')).toThrow('parameter missing');
  });
});


This may look counter-intuitive (you passed a non-number), but because there’s only one argument, the first failing rule is “missing parameter,” so that’s the message you assert.

Subtle but correct: tests reflect the order of validations in your sum().

Note on .toThrow('message'): passing a string checks that the error message contains that substring. If you ever need exactness, use a regex like /^parameter missing$/.

Group 4: non-number parameters
describe('Testing parameters not numbers', () => {
  const testValues = [
    ["sum('1', '2')", '1', '2'],
    ["sum('1',2)", '1', 2],
    ["sum(1, '2')", 1, '2'],
    ["sum('a','b')", 'a', 'b'],
    ["sum('','')", '', ''],
    ["sum(true,false)", true, false]
  ];


Here you supply two arguments, so you no longer hit the “parameter missing” rule.

Now you expect the type validation to fail.

  test.each(testValues)('%s throws only numbers allowed', (label,a,b) => {
    expect(() => sum(a, b)).toThrow('only numbers allowed');
  });
});


The first parameter label is just for a human-friendly test name (shows up in reports).

Each case asserts that when either a or b isn’t a number, sum throws 'only numbers allowed'.

Group 5: out-of-range numbers
describe('Testing numbers not between -500 and 500', () => {
  const testValues = [
    [1000,500],
    [500,1000],
    [500,501],
    [-500.1,200],
    [300, -500.1]
  ];


Every case supplies two numeric arguments (so we bypass earlier validations).

Each has at least one value outside the allowed interval [-500, 500].

  test.each(testValues)('sum(%s, %s) throws an exception', (a,b) => {
    expect(() => sum(a, b)).toThrow('numbers not between -500 and 500');
  });
});


Confirms your range validation triggers the correct error.

Why the order of checks matters

Your sum function (from your other file) validates in this order:

Missing parameters (arguments.length < 2)

Type check (typeof a/b !== 'number')

Range check (a/b < -500 || a/b > 500)

Because of that:

sum('a') → fails #1 (only one arg), not #2 → throws 'parameter missing'.

sum('1', 2) → passes #1, fails #2 → 'only numbers allowed'.

sum(501, 0) → passes #1 and #2, fails #3 → 'numbers not between -500 and 500'.

Your tests mirror this logic perfectly.

Good testing practices you’re using

Happy paths: valid integers & floats.

Unhappy paths: missing params, wrong types, out-of-range.

Edge cases: boundaries (-500, 500), zeros, mixed signs.

Parameterized tests: test.each() keeps tests DRY and readable.

Correct matchers:

.toBe for integers

.toBeCloseTo for floats

.toThrow for errors (with function wrapper)

How to run these tests (quick guide)

Install Jest:

npm i -D jest


Add a script to package.json:

{
  "scripts": {
    "test": "jest"
  }
}


Put tests in __tests__/calclibrary.test.js (or name files *.test.js).

Run:

npm test


If you use ESM ("type": "module" in package.json), switch require to:

import { sum } from '../calclibrary.js';

Optional refinements

For floats, be explicit about precision:

expect(sum(a,b)).toBeCloseTo(result, 10);


For error messages, use regex if you want exact matches:

expect(() => sum()).toThrow(/^parameter missing$/);


If you want, I can also show: