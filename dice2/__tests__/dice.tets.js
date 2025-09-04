'use strict'; 
// Strict mode helps catch common mistakes in JavaScript, like using undeclared variables
// It's good practice to always use it in modern JS code

const Dice = require('../dice'); 
// Import the Dice class from dice.js
// We need this because we are testing this class. Without importing it, we can't create Dice objects

// Create an array of upper bounds from 2 to 20 for testing
const testUpperBounds = new Array(19).fill(2).map((value, ind) => [value + ind]);
// Explanation: 
// - new Array(19) creates an array with 19 empty slots
// - fill(2) fills all slots with 2
// - map((value, ind) => [value + ind]) transforms each element into [2 + index] 
//   which gives [[2],[3],[4],...[20]]
// We use this to test dice with all valid upper bounds (2 to 20)


// ======================================
// TEST CONSTRUCTOR
// ======================================
describe('tests for the constructor', () => { 
// "describe" is a Jest function used to group related tests together
// Here we are grouping all tests related to creating a new Dice

    // Test dice created with no upper bound (should default to 6)
    describe('a dice with no upper bound given', () => { 
        const dice = new Dice(); 
        // We create a new Dice instance
        // No upper bound passed, so it should default to 6

        test('minimumValue is 1', () => {
            expect(dice.minimumValue).toBe(1); 
            // Check that minimumValue is correct
            // Important because all dice should have minimumValue=1
        });

        test('maximumValue is 6', () => {
            expect(dice.maximumValue).toBe(6); 
            // Check that maximumValue is correct (default upper bound)
            // Ensures the constructor sets the default correctly
        });

        test('dots is 0', () => {
            expect(dice.dots).toBe(0); 
            // When a dice is first created, it shouldn't have been rolled
            // dots should be 0, not a random number
        });

        test('state of dice ok', () => {
            // Extra check combining all properties
            expect(dice.minimumValue).toBe(1);
            expect(dice.maximumValue).toBe(6);
            expect(dice.dots).toBe(0);
        });
    });

    // Test dice with all valid upper bounds from 2 to 20
    describe('Test a dice with upper bounds 2-20', () => {
        const testValues = new Array(19).fill(2).map((value, ind) => value + ind); 
        // Recreate array of valid upper bounds

        testValues.forEach(ubound => { 
            // Loop through all upper bounds and test each one
            describe(`test ubound ${ubound}`, () => {
                const dice = new Dice(ubound); 
                // Create dice with custom upper bound

                test('minimum value is 1', () => {
                    expect(dice.minimumValue).toBe(1); 
                    // Minimum is always 1
                });

                test(`maximum value is ${ubound}`, () => {
                    expect(dice.maximumValue).toBe(ubound); 
                    // Check that maximumValue matches what we passed
                    // Ensures constructor correctly sets upper bound
                });

                test('dots is 0', () => {
                    expect(dice.dots).toBe(0); 
                    // Dice starts unrolled
                });
            });
        })
    });

    // Another way to test upper bounds using Jest's test.each
    describe('Test a dice with upper bounds 2-20 testEach', () => {
        test.each(testUpperBounds)('test upper bound %s', ubound => {
            const dice = new Dice(ubound);
            expect(dice.minimumValue).toBe(1);
            expect(dice.maximumValue).toBe(ubound);
            expect(dice.dots).toBe(0);
        });
        // test.each runs the same test with multiple inputs
        // Important because it avoids repetitive code and ensures all valid upper bounds work
    });

    // ======================================
    // TEST EXCEPTIONS
    // ======================================
    describe('Test the exceptions', () => {
        const testValues = [
            ['a', 'upper bound must be an integer'], 
            ['1', 'upper bound must be an integer'], 
            [2.5, 'upper bound must be an integer'], 
            [null, 'upper bound must be an integer'], 
            [true, 'upper bound must be an integer'], 
            [false, 'upper bound must be an integer'], 
            [1, 'upper bound too small'], 
            [0, 'upper bound too small'], 
            [-1, 'upper bound too small'], 
            [-12, 'upper bound too small'], 
            [21, 'upper bound too big'] 
        ];

        test.each(testValues)('upper bound %s throws %s', (ub, text) => {
            expect(() => new Dice(ub)).toThrow(text); 
            // Important: ensures invalid input throws correct errors
            // This prevents creating dice with invalid upper bounds
        });
    });

    // Same exceptions but with labels for clarity in test output
    describe('Test the exceptions with labels', () => {
        const testValues = [
            ["'a'", 'a', 'upper bound must be an integer'],
            ["'1'", '1', 'upper bound must be an integer'],
            [2.5, 2.5, 'upper bound must be an integer'],
            [null, null, 'upper bound must be an integer'],
            [true, true, 'upper bound must be an integer'],
            [false, false, 'upper bound must be an integer'],
            [1, 1, 'upper bound too small'],
            [0, 0, 'upper bound too small'],
            [-1, -1, 'upper bound too small'],
            [-12, -12, 'upper bound too small'],
            [21, 21, 'upper bound too big']
        ];

        test.each(testValues)('upper bound %s throws an exception', (label, ub, text) => {
            expect(() => new Dice(ub)).toThrow(text);
            // The 'label' is just for readable test output
            // Important: shows exactly which invalid input fails
        });
    });
});

// ======================================
// TEST ROLL METHOD
// ======================================
describe('Testing the roll', () => {

    // Test default dice roll
    describe('Create a dice with no upper bound given', () => {
        const dice = new Dice();
        test('when rolled', () => {
            dice.roll(); // Roll the dice
            expect(dice.dots).toBeGreaterThanOrEqual(1); // Should be at least 1
            expect(dice.dots).toBeLessThanOrEqual(6); // Should not exceed 6
            // Important: ensures dice rolls are valid
        });
    });

    // Another way to test the default dice roll
    describe('Create a dice with no upper bound given separate tests', () => {
        const dice = new Dice();
        dice.roll();
        test('dots>=1', () => {
            expect(dice.dots).toBeGreaterThanOrEqual(1);
        });
        test('dots<=6', () => {
            expect(dice.dots).toBeLessThanOrEqual(6);
        });
    });

    // Test roll for dice with custom upper bounds 2-20
    describe('test roll with a dice with upperBounds 2...20', () => {
        test.each(testUpperBounds)('test upper bound %s', ub => {
            const dice = new Dice(ub);
            dice.roll();
            expect(dice.dots).toBeGreaterThanOrEqual(1); 
            expect(dice.dots).toBeLessThanOrEqual(ub); 
            // Important: ensures dice respects its upper bound
        });
    });
});

// ======================================
// TEST TOSTRING METHOD
// ======================================
describe('Test the toString', () => {
    let dice;

    beforeEach(() => {
        dice = new Dice(); // Fresh dice before each test
    });

    test('Dice rolled', () => {
        dice.roll();
        expect(dice.toString()).toBe(`${dice.dots}`);
        // Important: when dice has been rolled, toString should return number as string
    });

    test('Dice not rolled', () => {
        expect(dice.toString()).toBe('not rolled yet');
        // Important: when dice not rolled, should return 'not rolled yet'
    });
});

// ======================================
// TEST DOT DISTRIBUTION (FAIRNESS)
// ======================================
describe('test the distributing of dots', () => {
    describe('create dice with no upper bound given', () => {
        const dice = new Dice();

        // Roll 20 times and check each roll is in 1-6
        for (let i = 0; i < 20; i++) {
            test('dots in right interval', () => {
                dice.roll();
                expect(dice.dots).toBeGreaterThanOrEqual(1);
                expect(dice.dots).toBeLessThanOrEqual(6);
                // Important: ensures dice never rolls an invalid number
            });
        }

        // Test that all possible numbers (1-6) appear in multiple rolls
        const dotCounts = [];
        test('dot distribution ok', () => {
            for (let i = 0; i < 60; i++) {
                dice.roll();
                dotCounts.push(dice.dots);
            }
            expect(new Set(dotCounts).size).toBe(6); 
            // Important: ensures dice is fair, all numbers can appear
        });
    });
});
