// Okay, let's dive into Arrow Functions (=>), a feature introduced in ES6 (ECMAScript 2015). They offer a more concise syntax for writing function expressions and have a significant difference in how they handle the this keyword compared to traditional functions.

// 1. Basic Syntax

// Arrow functions provide several syntax variations depending on the number of parameters and the function body complexity:

'use strict'; // Good practice, especially when dealing with 'this'

console.log("--- Arrow Function Syntax ---");

// --- Traditional Function Expression (for comparison) ---
const add_traditional = function(a, b) {
  return a + b;
};
console.log("Traditional:", add_traditional(5, 3)); // Output: 8

// --- Arrow Function Equivalent ---

// a) Multiple Parameters, Multi-line Body (requires curly braces {} and explicit 'return')
const add_arrow = (a, b) => {
  console.log(`Adding ${a} and ${b}...`);
  return a + b;
};
console.log("Arrow (multi-param, multi-line):", add_arrow(5, 3)); // Output: Adding 5 and 3... 8

// b) Single Parameter (parentheses () are optional)
const square_arrow = x => {
  return x * x;
};
// const square_arrow_alt = (x) => { return x * x; }; // Also valid
console.log("Arrow (single param):", square_arrow(4)); // Output: 16

// c) No Parameters (requires empty parentheses ())
const getRandomNumber = () => {
  return Math.random();
};
console.log("Arrow (no params):", getRandomNumber()); // Output: (a random number)

// d) Single Expression Body (Implicit Return - MOST CONCISE)
//    - If the function body is just a single expression, you can omit the
//      curly braces {} and the 'return' keyword. The result of the expression
//      is automatically returned.
const subtract_arrow = (a, b) => a - b; // No {}, no 'return'
console.log("Arrow (implicit return):", subtract_arrow(10, 4)); // Output: 6

const double_arrow = num => num * 2; // Single param, implicit return
console.log("Arrow (single param, implicit return):", double_arrow(7)); // Output: 14

// e) Returning Object Literals with Implicit Return
//    - Requires wrapping the object literal in parentheses () to distinguish
//      it from a function body block {}.
const createUser = (name, age) => ({ name: name, age: age }); // Parentheses around {}
// Shorthand property names: const createUser = (name, age) => ({ name, age });

const user = createUser("Bob", 30);
console.log("Arrow (returning object literal):", user); // Output: { name: 'Bob', age: 30 }

// const wrongUser = name => { name: name }; // WRONG! Interprets {} as function body, returns undefined
// console.log("Incorrect object return:", wrongUser("Charlie"));


// 2. Key Difference: Lexical this Binding

// This is the most crucial difference between arrow functions and traditional functions.

// Traditional Functions: The value of this is determined dynamically based on how the function is called (e.g., global call, object method, constructor, using call/apply/bind).

// Arrow Functions: They do not have their own this binding. Instead, they inherit this from the surrounding (enclosing) lexical scope where the arrow function was defined. call(), apply(), and bind() cannot change the this context of an arrow function once it's created.

console.log("\n--- Lexical 'this' Example ---");

const myObject = {
  value: 42,
  traditionalMethod: function() {
    console.log("Traditional Method 'this':", this); // 'this' refers to myObject
    console.log("Traditional Method value:", this.value); // Output: 42

    // Problem with traditional function callback:
    setTimeout(function() {
      // Inside this callback, 'this' is NOT myObject.
      // In strict mode, it's undefined. In non-strict browser, it's window.
      console.log("setTimeout Trad Callback 'this':", this); // undefined (strict) or window/global
      // console.log("setTimeout Trad Callback value:", this.value); // Throws TypeError!
    }, 50);

    // Solution with arrow function callback:
    setTimeout(() => {
      // Arrow function inherits 'this' from the surrounding 'traditionalMethod' scope.
      // Since 'traditionalMethod' was called on myObject, 'this' inside it is myObject.
      // Therefore, 'this' inside the arrow function callback is ALSO myObject.
      console.log("setTimeout Arrow Callback 'this':", this); // myObject
      console.log("setTimeout Arrow Callback value:", this.value); // Output: 42
    }, 100);
  },

  arrowMethod: () => {
    // Arrow function defined directly as a method inherits 'this' from where
    // 'myObject' was defined (in this case, the global/module scope).
    console.log("Arrow Method 'this':", this); // NOT myObject! (module.exports/window/undefined)
    // console.log("Arrow Method value:", this.value); // Likely undefined or error
  }
};

myObject.traditionalMethod();
myObject.arrowMethod();

// Using bind with an arrow function has no effect on 'this'
const dummyObj = { name: "dummy" };
const boundArrow = myObject.arrowMethod.bind(dummyObj);
console.log("Attempting to bind 'this' to arrowMethod:");
boundArrow(); // 'this' inside arrowMethod remains the global/module scope, not dummyObj


// 3. No arguments Object

// Traditional functions have access to a special, array-like arguments object that contains all the arguments passed to the function. Arrow functions do not have their own arguments object. They inherit it from the enclosing scope, if one exists.

console.log("\n--- No 'arguments' Object ---");

function traditionalArgs() {
  console.log("Traditional arguments:", arguments); // Output: Arguments [ 1, 2, 3, callee: ..., Symbol(Symbol.iterator): ... ]
  return arguments.length;
}
console.log("Trad args length:", traditionalArgs(1, 2, 3)); // Output: 3


const arrowArgs = (...args) => { // Use rest parameters instead!
  // console.log("Arrow arguments:", arguments); // ReferenceError: arguments is not defined (or refers to outer scope's arguments)
  console.log("Arrow rest parameters:", args); // Output: Arrow rest parameters: [ 'a', 'b', 'c' ]
  return args.length;
};
console.log("Arrow args length:", arrowArgs('a', 'b', 'c')); // Output: 3

// Modern Best Practice: Use Rest Parameters (`...args`) for both types of functions
// when you need to work with an indefinite number of arguments as a real array.


// 4. Cannot Be Used as Constructors

// Arrow functions cannot be invoked with the new keyword. Attempting to do so will throw a TypeError. This is because they lack the necessary internal methods ([[Construct]]) and don't have their own this binding required for object construction.

console.log("\n--- Cannot Be Used as Constructors ---");

const ArrowPerson = (name) => {
  this.name = name; // 'this' would be lexical, not a new instance
};

try {
  const person = new ArrowPerson("Eve");
} catch (error) {
  console.error("Error using 'new' with arrow function:", error.name, error.message);
  // Output: Error using 'new' with arrow function: TypeError ArrowPerson is not a constructor
}
// Traditional function can be used as a constructor
function TraditionalPerson(name) {
  this.name = name; // 'this' refers to the new instance
}
const person2 = new TraditionalPerson("Eve");
console.log("Traditional Person:", person2); // Output: Traditional Person: TraditionalPerson { name: 'Eve' }
// 5. No Prototype
// Arrow functions do not have a prototype property. This means you cannot add methods to an arrow function's prototype.
// This is a fundamental difference from traditional functions, which can have prototype methods.

// Use Cases for Arrow Functions:

// Callbacks (Especially Array Methods): Perfect for short, concise callbacks where you often want to maintain the this value of the surrounding context.

const numbers = [1, 2, 3, 4, 5];
const squares = numbers.map(n => n * n); // Concise and clear
const evens = numbers.filter(n => n % 2 === 0);
console.log("Squares:", squares); // Output: [ 1, 4, 9, 16, 25 ]
console.log("Evens:", evens);   // Output: [ 2, 4 ]


// setTimeout, setInterval, Promises (.then, .catch): Any situation where a traditional function callback might lose its intended this context.

// Simple Functions: For any function expression where conciseness is desired and the lexical this behavior is acceptable or preferred.

// When Not to Use Arrow Functions:

// Object Methods: If a method needs to access the object instance using this.propertyName, use a traditional function or the shorthand method syntax. Using an arrow function here will cause this to refer to the wrong scope.

const counter = {
  count: 0,
  incrementRegular: function() { this.count++; }, // Correct 'this'
  incrementArrow: () => { /* this.count++; */ }, // WRONG 'this', won't work as intended
  incrementShorthand() { this.count++; }      // Correct 'this' (ES6 shorthand)
};


// Constructors: They cannot be used with new. Use traditional functions or ES6 class syntax.

// Event Handlers (if you need this to be the element): In DOM event listeners, this in a traditional function callback usually refers to the element that triggered the event. An arrow function will inherit this from the surrounding scope, which might not be what you want.

// button.addEventListener('click', function() { console.log(this); }); // 'this' is the button
// button.addEventListener('click', () => { console.log(this); });      // 'this' is NOT the button


// In summary, arrow functions are a powerful and concise addition to JavaScript, especially useful for callbacks and maintaining lexical this, but it's essential to understand their differences from traditional functions to use them correctly.