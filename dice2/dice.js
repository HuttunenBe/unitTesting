'use strict'; // Strict mode helps catch common errors like using undeclared variables

// Export a Dice class so other files (like your game script) can use it
module.exports = class Dice {

    // Private fields (cannot be accessed directly outside the class)
    #upperBound   // Maximum value the dice can roll
    #dotCount     // Current value of the dice (dots)

    // Constructor initializes a new Dice object
    constructor(uBound = 6) { // Default upper bound is 6 (standard dice)
        
        // Validate input: upper bound must be an integer
        if (!Number.isInteger(uBound)) {
            throw new Error('upper bound must be an integer');
        }

        // Validate input: upper bound must be at least 2
        if (uBound < 2) {
            throw new Error('upper bound too small');
        }

        // Validate input: upper bound must not exceed 20
        if (uBound > 20) {
            throw new Error('upper bound too big');
        }

        // Store validated upper bound
        this.#upperBound = uBound;

        // Initialize dot count to 0 (dice has not been rolled yet)
        this.#dotCount = 0;
    }

    // Getter: minimum value a dice can roll (always 1)
    get minimumValue() {
        return 1;
    }

    // Getter: maximum value a dice can roll (the upper bound)
    get maximumValue() {
        return this.#upperBound;
    }

    // Getter: current number of dots
    get dots() {
        return this.#dotCount;
    }

    // Method to roll the dice
    roll() {
        // Generate a random integer between 1 and #upperBound
        this.#dotCount = Math.floor(Math.random() * this.#upperBound) + 1;
    }

    // Convert the dice to a string for printing
    toString() {
        // If the dice hasn't been rolled yet, show "not rolled yet"
        // Otherwise, return the current number of dots as a string
        return this.#dotCount === 0 ? 'not rolled yet' : `${this.#dotCount}`;
    }
}
