'use strict'; 
// Enables strict mode, helps catch mistakes like undeclared variables

// Export the Dice class so it can be used in other files
module.exports = class Dice {

    // Private fields (can only be accessed inside the class)
    #upperBound   // the maximum number the dice can show
    #dotCount     // the current number showing on the dice

    // Constructor runs when you create a new dice
    // uBound = 6 means default is a 6-sided dice
    constructor(uBound = 6) {
        this.#upperBound = uBound;  // set the max number for this dice
        this.#dotCount = 0;          // dice hasn't been rolled yet, so 0
    }

    // Getter for minimumValue
    get minimumValue() {
        return 1;                   // the minimum number a dice can have is always 1
    }

    // Getter for maximumValue
    get maximumValue() {
        return this.#upperBound;     // return the max number of this dice
    }

    // Getter for dots
    get dots() {
        return this.#dotCount;       // return the current face of the dice
    }
}
