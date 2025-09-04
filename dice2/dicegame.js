'use strict'; // Enable strict mode: helps catch errors like using undeclared variables

const Dice = require('./dice'); // Import the Dice class from the dice.js file

// Create two dice instances
const diceA = new Dice(); // Dice A, default upper bound 6
const diceB = new Dice(); // Dice B, default upper bound 6

// Print the current state of diceA and diceB
// At this point, both dice have dots = 0, so toString() will return 'not rolled yet'
console.log(`diceA: ${diceA}, diceB: ${diceB}`);

// Roll both dice (randomly assign dots between 1 and maximumValue)
diceA.roll(); 
diceB.roll();

// Print the dice after rolling to see the new values
console.log(`diceA: ${diceA}, diceB: ${diceB}`);

// Compare the dots and determine who wins
if (diceA.dots > diceB.dots) { 
    console.log('A wins'); // Dice A has more dots than Dice B
} else if (diceB.dots > diceA.dots) {
    console.log('B wins'); // Dice B has more dots than Dice A
} else {
    console.log('Nobody wins'); // Both dice have the same dots → tie
}

console.log('########################'); // Separator for clarity in output

// Create an array of 3 new dice
const diceArray = [new Dice(), new Dice(), new Dice()];

// Print the current state of each dice in the array
// At this point, none of the dice have been rolled
diceArray.forEach(dice => console.log(dice.toString()));

// Roll each dice in the array
diceArray.forEach(dice => dice.roll());

// Print the state of each dice after rolling
diceArray.forEach(dice => console.log(dice.toString()));
