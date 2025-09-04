'use strict'; 
// Enables strict mode to help catch common coding mistakes and unsafe actions.

// ---------- BASIC TESTS ----------

// A simple test case named "first test"
// Jest's `test()` defines a unit test.
// The arrow function is the actual test code.
test('first test', () => {
    console.log('first test');
});

// Another test named "second test"
test('second test', () => {
    console.log('second test');
});

// ---------- HOOKS (SETUP & TEARDOWN) ----------

// Runs ONCE before all tests in this file start running
beforeAll(() => {
    console.log('before All tests');
});

// Runs ONCE after all tests in this file finish running
afterAll(() => {
    console.log('after All tests');
});

// Runs BEFORE EACH test (every single one, before execution)
beforeEach(() => {
    console.log('before each test');
});

// Runs AFTER EACH test (every single one, after execution)
afterEach(() => {
    console.log('after each test');
});

// ---------- TEST GROUPING WITH describe() ----------

// Group of tests related to adding numbers
describe('adding tests', () => {

    // Test: check if 2 + 2 equals 4
    test('test 2+2=4', () => {
        // `expect()` is a Jest assertion: it checks if the given value matches the expectation
        expect(2 + 2).toBe(4);
    });

    // Same as `test()`, but using Jest's alias `it()`
    it('test 1+3=4', () => {
        expect(1 + 3).toBe(4);
    });
});


// ---------- NESTED DESCRIBE BLOCKS ----------

describe('actual tests', () => { // this groups related test together

    // Group of tests for a concatenation function
    describe('test concatenation function', () => {

       
        const concat = (partA, partB) => '' + partA + partB; // To sring and and joins

        // Test: concatenates two strings
        test('testing concat("first", "second") returns "firstsecond"', () => {
            expect(concat('first', 'second')).toBe('firstsecond');
        });

        // Test: concatenates two different strings
        test('testing concat("first", "secondx") returns "firstsecondx"', () => {
            expect(concat('first', 'secondx')).toBe('firstsecondx');
        });

        // Test: concatenates two numbers (1 and 2) to produce "12"
        test('testing concat(1,2) returns "12"', () => {
            expect(concat(1, 2)).toBe('12');
        });
    });

    // Group of tests for handling exceptions
    describe('testing exceptions', () => {

        // Function that always throws an error when called
        function testFunction() {
            throw Error('This is an exception');
        }

        // Test: checks if testFunction throws the correct exception
        test('function throws an exception', () => {
            // We wrap the function call in another function `() => testFunction()`
            // so Jest can catch the thrown error
            expect(() => testFunction()).toThrow('This is an exception');
        });
    });
});
