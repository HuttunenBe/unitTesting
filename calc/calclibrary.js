'use strict'; 
// Enables strict mode to catch common errors like using undeclared variables

// Define the sum function
function sum(a, b) {

    // Check if both parameters are provided
    if (arguments.length < 2) {
        // If fewer than 2 arguments, throw an exception
        throw new Error('parameter missing');
    }

    // Check if both parameters are numbers
    if (typeof a !== 'number' || typeof b !== 'number') {
        // If any parameter is not a number, throw an exception
        throw new Error('only numbers allowed');
    }

    // Check if both numbers are within the allowed range [-500, 500]
    if (a < -500 || a > 500 || b < -500 || b > 500) {
        // If not, throw an exception
        throw new Error('numbers not between -500 and 500');
    }

    // If all checks pass, return the sum
    return a + b;
}

// Export the function so it can be used in other files (like your test file)
module.exports = { sum };
