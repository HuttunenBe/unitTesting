// const ubounds=[];
// for(let i=2; i<=20; i++){
//     ubounds.push([i]);
// }
// console.log(ubounds);

// Explanation:
// - Creates an empty array `ubounds`
// - The for loop goes from 2 to 20 (inclusive)
// - Each number is wrapped in an array `[i]` and pushed into `ubounds`
//   So you end up with: [[2],[3],[4],...,[20]]
// - console.log prints it
// - This is one way to generate test values for upper bounds

// const temp=new Array(19).fill(2);
// console.log(temp);

// Explanation:
// - Creates a new array of length 19
// - fill(2) sets every element to 2
// - So temp = [2,2,2,...,2] (19 times)
// - console.log prints it
// - This is just a simpler starting array for mapping later

// const mapped=temp.map(value=>value+5);
// console.log(mapped);

// Explanation:
// - map goes through each element of temp
// - adds 5 to each element
// - So mapped = [7,7,7,...,7] (19 times)
// - console.log prints it
// - Shows how map can transform an array

// const mapped=temp.map((value,ind)=>[value+ind]);
// console.log(mapped);

// Explanation:
// - map goes through each element of temp
// - `value+ind` adds the index to the value
// - wraps the result in an array: [value + index]
// - So result: [[2+0],[2+1],[2+2],..., [2+18]] → [[2],[3],[4],..., [20]]
// - console.log prints it
// - This is a common pattern to generate numbers in a range in JS

// The final, active line:
const testValues = new Array(19).fill(2).map((value, ind) => [value + ind]);
console.log(testValues);

// Explanation:
// - Creates an array of length 19
// - Fill each element with 2
// - Map over each element, adding its index and wrapping in an array
// - Result: [[2],[3],[4],...,[20]]
// - console.log prints it
// - This is a compact way to create a **list of upper bounds** for testing dice
