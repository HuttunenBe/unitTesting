'use strict';
// Enables strict mode to catch common mistakes

// Import the Dice class from the parent folder
const Dice = require('../dice');

// Top-level describe block for grouping tests related to the constructor
describe('tests for the constructor', () => {

    // Nested describe block for the case where no upper bound is provided
    describe('a dice with no upper bound given', () => {

        // Create a new Dice object with default parameters
        const dice = new Dice();

        // Test: the default minimum value should be 1
        test('minimumValue is 1', () => {
            expect(dice.minimumValue).toBe(1);
        });

        // Test: the default maximum value should be 6
        test('maximumValue is 6', () => {
            expect(dice.maximumValue).toBe(6);
        });

        // Test: the dice dots (current face) should start at 0
        test('dots is 0', () => {
            expect(dice.dots).toBe(0);
        });

        // Test: combined check to verify all properties at once
        test('state of dice ok', () => {
            expect(dice.minimumValue).toBe(1);
            expect(dice.maximumValue).toBe(6);
            expect(dice.dots).toBe(0);
        });
    });
});
