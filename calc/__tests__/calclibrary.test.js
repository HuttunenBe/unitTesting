'use strict'; 
// Enables strict mode, helping catch common mistakes in JS

// Import the `sum` function from your library
const { sum } = require('../calclibrary'); 
// Make sure the path is correct. This assumes `calclibrary.js` is one folder up.

// ---------------- TESTING SUM WITH INTEGERS ----------------
describe('Testing sum with integers', () => {

    // Single test example: sum(1,1) should return 2
    test('sum(1,1) returns 2', () => {
        expect(sum(1,1)).toBe(2); 
        // `toBe` checks for exact equality
    });

    // Array of test cases for integers
    const testValues = [
        // a, b, expected result
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

    // `test.each()` allows running the same test with multiple inputs
    test.each(testValues)('sum(%s,%s) = %s', (a,b,result) => {
        expect(sum(a,b)).toBe(result); 
    });
});

// 'sum(%s,%s) = %s placeholder for value

// ---------------- TESTING SUM WITH FLOATS ----------------
describe('Testing sum with floats', () => {

    const testValues = [
        [10, 11.5, 21.5],
        [2.5, 3, 5.5],
        [-2.5, 3, 0.5],
        [2.4, -2.5, -0.1],
        [499.9, 500.0, 999.9],
        [-499.9, 500.0, 0.1]
    ];

    // Use `toBeCloseTo` for floats to avoid precision issues
    test.each(testValues)('sum(%s,%s)=%s', (a,b,result) => {
        expect(sum(a,b)).toBeCloseTo(result);
    });
});

// ---------------- TESTING PARAMETER MISSING ----------------
describe('Test cases for parameter missing', () => {

    test('sum() throws an exception', () => {
        expect(() => sum()).toThrow('parameter missing'); 
        // Expect an error if no parameters are provided
    });

    test('sum(1) throws an exception', () => {
        expect(() => sum(1)).toThrow('parameter missing'); 
        // Only one parameter triggers the same exception
    });

    test("sum('a') throws an exception", () => {
        expect(() => sum('a')).toThrow('parameter missing'); 
        // Non-number single parameter also triggers this
    });
});

// ---------------- TESTING NON-NUMBER PARAMETERS ----------------
describe('Testing parameters not numbers', () => {

    const testValues = [
        // label, a, b
        ["sum('1', '2')", '1', '2'],
        ["sum('1',2)", '1', 2],
        ["sum(1, '2')", 1, '2'],
        ["sum('a','b')", 'a', 'b'],
        ["sum('','')", '', ''],
        ["sum(true,false)", true, false]
    ];

    // `test.each()` for multiple non-number tests
    test.each(testValues)('%s throws only numbers allowed', (label,a,b) => {
        expect(() => sum(a, b)).toThrow('only numbers allowed');
    });
});

// ---------------- TESTING NUMBERS OUT OF RANGE ----------------
describe('Testing numbers not between -500 and 500', () => {

    const testValues = [
        [1000,500],
        [500,1000],
        [500,501],
        [-500.1,200],
        [300, -500.1]
    ];

    // These inputs should trigger the "numbers not between -500 and 500" exception
    test.each(testValues)('sum(%s, %s) throws an exception', (a,b) => {
        expect(() => sum(a, b)).toThrow('numbers not between -500 and 500');
    });
});


test('sum of 2 + 3 is 5'), () => {
    expect(sum(2, 3)).toBe(5);
}

test ('sum() throw parameter missing', () => {
    expect(() => sum()).toThro('parameter missing')
})