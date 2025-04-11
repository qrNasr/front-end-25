// Okay, let's break down the Spread (...) and Rest (...) operators in ES6. They use the same syntax (...) but perform opposite operations depending on the context where they are used. This can be a bit confusing initially, but they are incredibly useful.

// Analogy: Think of the ... like a zipper:

// Spread: Unzips a suitcase (iterable/object) spilling its contents out individually.

// Rest: Zips up loose items (arguments/elements/properties) into a single suitcase (array/object).

// 1. Spread Operator (...)

// The spread operator expands an iterable (like an array, string, Map, Set) into its individual elements or expands the properties of an object into individual key-value pairs.

// Use Cases:

// In Function Calls: Spreads array elements as individual arguments to a function.

// In Array Literals ([]): Creates new arrays by inserting elements from another array or combining arrays. Creates shallow copies.

// In Object Literals ({}): Creates new objects by copying properties from another object or merging objects. Creates shallow copies.

// Examples:

'use strict';
console.log("--- Spread Operator (...) ---");

// --- Spread in Function Calls ---
function sum(x, y, z) {
  return x + y + z;
}
const numbersToAdd = [10, 20, 30];

// Without spread (doesn't work as expected)
// console.log(sum(numbersToAdd)); // Output: 10,20,30undefinedundefined -> NaN or TypeError

// With spread (elements become individual arguments)
console.log("Sum with spread:", sum(...numbersToAdd)); // Equivalent to sum(10, 20, 30) -> Output: 60

// Example with Math.max()
const moreNumbers = [5, -2, 100, 0, 45];
console.log("Max number:", Math.max(...moreNumbers)); // Equivalent to Math.max(5, -2, 100, 0, 45) -> Output: 100

// --- Spread in Array Literals ---
const arr1 = ['a', 'b'];
const arr2 = ['c', 'd'];

// Combining arrays
const combinedArr = [...arr1, ...arr2, 'e'];
console.log("Combined array:", combinedArr); // Output: [ 'a', 'b', 'c', 'd', 'e' ]

// Copying an array (SHALLOW COPY!)
const arr1Copy = [...arr1];
console.log("Array copy:", arr1Copy); // Output: [ 'a', 'b' ]
console.log("Are arrays the same?", arr1 === arr1Copy); // Output: false (different arrays in memory)

// Copying array with nested objects (demonstrates shallow copy)
const nestedOriginal = [{ id: 1 }, { id: 2 }];
const nestedCopy = [...nestedOriginal];
nestedCopy[0].id = 99; // Modify nested object in the copy
console.log("Shallow Copy - Original modified?", nestedOriginal[0].id); // Output: 99 (Yes, original was affected!)

// Inserting elements from an array
const start = [0];
const end = [4, 5];
const complete = [...start, 1, 2, 3, ...end];
console.log("Inserting elements:", complete); // Output: [ 0, 1, 2, 3, 4, 5 ]

// Spreading a string into an array
const greeting = "Hello";
const letters = [...greeting];
console.log("String spread into array:", letters); // Output: [ 'H', 'e', 'l', 'l', 'o' ]

// --- Spread in Object Literals ---
const obj1 = { name: "Alice", age: 30 };
const obj2 = { city: "New York", age: 31 }; // 'age' property conflicts

// Merging objects (properties from later objects overwrite earlier ones)
const mergedObj = { ...obj1, ...obj2, isAdmin: true };
console.log("Merged object:", mergedObj); // Output: { name: 'Alice', age: 31, city: 'New York', isAdmin: true } ('age' from obj2 wins)

// Copying an object (SHALLOW COPY!)
const obj1Copy = { ...obj1 };
console.log("Object copy:", obj1Copy); // Output: { name: 'Alice', age: 30 }
console.log("Are objects the same?", obj1 === obj1Copy); // Output: false

// Copying object with nested objects (demonstrates shallow copy)
const userOriginal = { id: 10, profile: { theme: 'dark' } };
const userCopy = { ...userOriginal };
userCopy.profile.theme = 'light'; // Modify nested object in copy
console.log("Shallow Copy - Original user modified?", userOriginal.profile.theme); // Output: light (Yes!)

// Adding/Updating properties while copying
const updatedUser = { ...userOriginal, id: 11, status: 'active' }; // Update id, add status
console.log("Updated user object:", updatedUser); // Output: { id: 11, profile: { theme: 'light' }, status: 'active' }


// 2. Rest Operator (...)

// The rest operator collects multiple elements or properties into a single variable (an array or an object). It's used in contexts where you need to gather remaining items.

// Use Cases:

// In Function Parameter Lists: Collects all remaining arguments passed to a function into a real array. Must be the last parameter.

// In Destructuring Assignments: Collects remaining array elements or object properties into a new array or object. Must be the last element/property in the destructuring pattern.

// Examples:

'use strict';
console.log("\n--- Rest Operator (...) ---");

// --- Rest in Function Parameter Lists ---
// Collects all arguments into an array called 'numbers'
function sumAll(...numbers) { // 'numbers' is a real array
  console.log("Rest parameters received:", numbers);
  return numbers.reduce((total, num) => total + num, 0);
}

console.log("SumAll(1, 2):", sumAll(1, 2));           // Output: Rest parameters received: [ 1, 2 ] -> 3
console.log("SumAll(10, 20, 30, 5):", sumAll(10, 20, 30, 5)); // Output: Rest parameters received: [ 10, 20, 30, 5 ] -> 65
console.log("SumAll():", sumAll());                 // Output: Rest parameters received: [] -> 0

// Combining named parameters with rest (rest MUST be last)
function logUserInfo(userId, ...permissions) {
  console.log(`User ID: ${userId}`);
  console.log("Permissions:", permissions); // 'permissions' is an array
}

logUserInfo(101, 'read', 'write');
// Output:
// User ID: 101
// Permissions: [ 'read', 'write' ]

logUserInfo(102, 'admin');
// Output:
// User ID: 102
// Permissions: [ 'admin' ]

logUserInfo(103);
// Output:
// User ID: 103
// Permissions: []

// --- Rest in Array Destructuring ---
const colors = ["Red", "Green", "Blue", "Yellow", "Purple"];

const [firstColor, secondColor, ...remainingColors] = colors; // rest must be last

console.log("First color:", firstColor);               // Output: Red
console.log("Second color:", secondColor);             // Output: Green
console.log("Remaining colors (array):", remainingColors); // Output: [ 'Blue', 'Yellow', 'Purple' ]

const [primary, ...everythingElse] = colors;
console.log("Primary:", primary);                     // Output: Red
console.log("Everything else:", everythingElse);     // Output: [ 'Green', 'Blue', 'Yellow', 'Purple' ]

// --- Rest in Object Destructuring ---
const user = {
  id: 42,
  username: "coder_gal",
  email: "gal@example.com",
  isAdmin: false,
  lastLogin: "2023-10-27"
};

const { id, username, ...otherDetails } = user; // rest must be last

console.log("User ID:", id);                     // Output: 42
console.log("Username:", username);               // Output: coder_gal
console.log("Other details (object):", otherDetails); // Output: { email: 'gal@example.com', isAdmin: false, lastLogin: '2023-10-27' }


// Summary Table:

// Feature	Spread Operator (...)	Rest Operator (...)
// Purpose	Expands / Spreads iterables or object properties	Collects / Gathers remaining items
// Used In	Function Calls, Array Literals, Object Literals	Function Parameters (last), Destructuring Assignment (last)
// Input	An iterable (Array, String...) or an Object	A list of arguments or remaining elements/properties
// Output/Result	Individual elements or key-value pairs	A single Array (from arguments/elements) or Object (from props)

// Remember the shallow copy caveat when using spread with arrays and objects containing nested structures!