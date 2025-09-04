## What is this code about?

You're working with a Dice class, which is a blueprint for dice used in games. Each dice object:

Has a number of dots (starts as 0 → meaning not rolled yet).

Has a minimum possible value (1 always).

Has a maximum possible value (default is 6, but can be set between 2 and 20).

And you’re writing unit tests (using Jest) to check if your Dice class works correctly.

The Dice class (library code)
Key parts of the class:
'use strict'; 
module.exports = class Dice {
    #upperBound
    #dotCount

    constructor(uBound = 6) {
        this.#upperBound = uBound;
        this.#dotCount = 0;
    }

    get minimumValue() {
        return 1;
    }

    get maximumValue() {
        return this.#upperBound;
    }

    get dots() {
        return this.#dotCount;
    }
}


#upperBound → private field for the maximum dice value (like 6 for a standard dice).

#dotCount → private field for the current number shown on the dice (starts at 0 meaning not rolled).

constructor(uBound = 6) → creates a new dice. If no value is given, it defaults to 6.

get minimumValue() → always returns 1 (lowest dice face).

get maximumValue() → returns whatever the upper bound is.

get dots() → returns the current number showing on the dice.

Notice: This class doesn’t have roll() or toString() yet. You’ll probably add those later.

The test file

This is a Jest test suite. It tests the constructor behavior when you create a dice without specifying the upper bound.

'use strict';
const Dice = require('../dice');


'use strict' helps catch errors.

require('../dice') imports your Dice class from the parent folder.

The describe blocks

Jest uses describe() to group tests logically.

describe('tests for the constructor', () => {
    describe('a dice with no upper bound given', () => {


The outer group says: “We’re testing the constructor”.

The inner group says: “Specifically when no upper bound is given”.

Creating the Dice object
const dice = new Dice();


This creates a dice with default settings (upperBound = 6, dots = 0).

The individual tests

Each test() checks a specific property:

test('minimumValue is 1', () => {
    expect(dice.minimumValue).toBe(1);
});


Checks if the minimum value is 1.

test('maximumValue is 6', () => {
    expect(dice.maximumValue).toBe(6);
});


Checks if the maximum value is 6 (default because you didn’t pass any upper bound).

test('dots is 0', () => {
    expect(dice.dots).toBe(0);
});


Checks if the dots start at 0 (not rolled yet).

test('state of dice ok', () => {
    expect(dice.minimumValue).toBe(1);
    expect(dice.maximumValue).toBe(6);
    expect(dice.dots).toBe(0);
});


This combines the three checks above into one.

What you need to know (as a beginner)

Unit testing checks small pieces of code (one function or one class) automatically.

Instead of checking manually in the browser or console, you write tests that can be run any time.

The constructor test ensures default behavior works:

When you create a dice without arguments, it should act like a standard 6-sided dice.

Jest syntax basics:

describe('what we are testing', () => { ... }) → group tests.

test('what this test checks', () => { ... }) → individual test.

expect(actual).toBe(expected) → check if values match.

Private fields (#upperBound, #dotCount):

These cannot be accessed directly from outside the class (dice.#upperBound would cause an error).

That’s why you use getters (maximumValue, dots) to read them.

Initial state matters:

Before rolling, the dice shows 0 dots.
Minimum is always 1.
Maximum defaults to 6.

So, what is happening here?

You create a dice with default settings.

You test its properties (min, max, dots) to make sure the constructor sets everything correctly.

You use unit tests to verify expected behavior automatically.

Next steps (what’s coming later)

This is just Part 1 of your Dice tests. Later tests will:

Create dice with custom upper bounds.

Test invalid inputs ('a', 21, 1, etc.).

Test roll() method (random numbers between 1 and upperBound).

Test toString() (returns 'not rolled yet' or the dots as text).