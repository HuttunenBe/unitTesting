'use strict'; 

const MyModule = require('./mymodule'); // Import the code you want to test

test('description of test', () => { // Description
    expect(actual).toBe(expected); // Checks if actual equals expected
});

// Example

test('2 + 2 equals 4', () => {
    expect(2 + 2).toBe(4);
});

// Use describe() to group related tests:

describe('math operations', () => {
    test('2+2=4', () => { expect(2+2).toBe(4); });
    test('3+3=6', () => { expect(3+3).toBe(6); });
});


function willThrow() { throw new Error('error happened'); }

test('throws an error', () => {
    expect(() => willThrow()).toThrow('error happened'); 
});


const testValues = [
    [1,1,2],
    [2,3,5],
    [0,0,0]
];

test.each(testValues)('sum(%s,%s) = %s', (a,b,expected) => {
    expect(a + b).toBe(expected);
});

const testValues2 = [
    ["adding positive numbers", 2, 3, 5],
    ["adding negatives", -1, -1, -2]
];

test.each(testValues2)('%s', (label,a,b,expected) => {
    expect(a+b).toBe(expected);
});

// % is a placeholder

// Testing floats
expect(0.1 + 0.2).toBeCloseTo(0.3);
