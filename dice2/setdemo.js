const a = [2, 3, 4, 2, 3, 4, 4, 4, 4];
// Create an array `a` with some repeated numbers
// a = [2, 3, 4, 2, 3, 4, 4, 4, 4]

const b = new Set(a);
// Create a Set from array `a`
// Sets in JavaScript **only store unique values**
// So duplicates are automatically removed
// b = Set {2, 3, 4}

console.log(b);
// Prints the Set object: Set { 2, 3, 4 }

console.log(b.size);
// Prints the number of unique elements in the Set
// b.size = 3 because there are 3 unique numbers: 2, 3, 4

const c = [...b];
// Use the spread operator `...` to convert the Set back into an array
// This gives you an array of the unique elements
// c = [2, 3, 4]

console.log(c);
// Prints: [2, 3, 4]

console.log([...new Set(a)]);
// Shortcut version: create a Set from `a` and immediately convert it back to an array
// This removes duplicates in one line
// Output: [2, 3, 4]
