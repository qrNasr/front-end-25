// JavaScript Functions: Scope, Closures, Hoisting, IIFE, Callbacks, Higher-Order Functions
// ==========================================================================
// === 1. Scope (Global, Function, Block) ===
// ==========================================================================
console.log("--- Scope ---");

// Scope determines the accessibility (visibility) of variables and functions.

// --- Global Scope ---
// Variables declared outside any function or block {} are in the global scope.
// They are accessible from anywhere in your code. Avoid polluting the 
//global scope!
const globalMessage = "I'm global!";

function checkGlobal() {
  console.log("Inside function:", globalMessage); // Accessible here
}
checkGlobal();
console.log("Outside function:", globalMessage); // Accessible here

// --- Function Scope ---
// Variables declared with 'var' *inside* a function are scoped to that function.
// They are not accessible outside the function.
function functionScopeExample() {
  var functionScopedVar = "Only inside the function (var)";
  console.log(functionScopedVar);
}
functionScopeExample();
// console.log(functionScopedVar); // ReferenceError: functionScopedVar is not defined

// --- Block Scope ---
// Variables declared with 'let' and 'const' *inside* a block ({}) are scoped to that block.
// This includes blocks like if, for, while, or even standalone {}.
if (true) {
  let blockScopedLet = "Only inside this block (let)";
  const blockScopedConst = "Only inside this block (const)";
  var blockScopedVar = "This leaks out! (var)"; // 'var' is NOT block-scoped
  console.log(blockScopedLet);
  console.log(blockScopedConst);
}
// console.log(blockScopedLet);   // ReferenceError: blockScopedLet is not defined
// console.log(blockScopedConst); // ReferenceError: blockScopedConst is not defined
console.log(blockScopedVar);    // Output: This leaks out! (var) - Avoid this behavior!

// Lexical Scoping: Scope is determined by where variables/functions are *written* in the code,
// not where they are called. Inner scopes can access variables from outer scopes.
let outerVar = "I'm outer";
function outerFunction() {
  let innerVar = "I'm inner";
  function innerFunction() {
    console.log(outerVar); // Accesses outerVar from outer scope
    console.log(innerVar); // Accesses innerVar from its parent scope (outerFunction)
  }
  innerFunction();
}
outerFunction();

// ==========================================================================
// === 2. Closures ===
// ==========================================================================
console.log("\n--- Closures ---");

// A closure is the combination of a function bundled together (enclosed) with
// references to its surrounding state (the lexical environment).
// In other words, a closure gives you access to an outer function's scope
// from an inner function, *even after the outer function has finished executing*.

function createCounter() {
  let count = 0; // This variable exists within the createCounter scope

  // This inner function is returned. It "closes over" the 'count' variable.
  function incrementAndLog() {
    count++; // Accessing and modifying 'count' from the outer scope
    console.log(`Current count: ${count}`);
  }

  return incrementAndLog; // Return the inner function itself
}

// Call createCounter. It executes, sets count=0, and returns the inner function.
const counter1 = createCounter();
// The 'count' variable inside createCounter technically no longer "exists" in the
// normal execution flow, BUT the 'counter1' function maintains a *closure* over it.

const counter2 = createCounter(); // Creates a *separate* closure with its own 'count'

// Call the returned function multiple times. Each call accesses the *same* 'count'
// that was captured when 'createCounter' was initially called for 'counter1'.
counter1(); // Output: Current count: 1
counter1(); // Output: Current count: 2
counter1(); // Output: Current count: 3

// counter2 has its own independent 'count'
counter2(); // Output: Current count: 1
counter2(); // Output: Current count: 2

// Use Case: Data privacy (creating "private" variables), function factories, maintaining state.

// ==========================================================================
// === 3. Hoisting ===
// ==========================================================================
console.log("\n--- Hoisting ---");

// Hoisting is JavaScript's default behavior of moving declarations to the top
// of the current scope (global scope or current function scope) *before* code execution.

// --- Function Declarations are Fully Hoisted ---
// You can call a function declaration before it appears in the code.
sayHello(); // Works! Output: Hello there!

function sayHello() {
  console.log("Hello there!");
}

// --- 'var' Variables are Hoisted (but only the declaration, not the initialization) ---
console.log(myVar); // Output: undefined (The declaration 'var myVar' was hoisted, but the assignment '= 10' was not)
var myVar = 10;
console.log(myVar); // Output: 10

// --- 'let' and 'const' Variables are Hoisted BUT NOT Initialized ---
// They are hoisted to the top of the block, but entering the scope before the
// declaration line puts them in the "Temporal Dead Zone" (TDZ). Accessing them
// in the TDZ causes a ReferenceError.
// console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization
let myLet = 20;
console.log(myLet); // Output: 20

// console.log(myConst); // ReferenceError: Cannot access 'myConst' before initialization
const myConst = 30;
console.log(myConst); // Output: 30

// --- Function Expressions are NOT Hoisted (like 'var' variables) ---
// If assigned using var, the variable is hoisted (as undefined), leading to a TypeError.
// If assigned using let/const, you get a ReferenceError due to the TDZ.

// sayGoodbyeVar(); // TypeError: sayGoodbyeVar is not a function (because sayGoodbyeVar is undefined at this point)
var sayGoodbyeVar = function() {
  console.log("Goodbye (var)!");
};
sayGoodbyeVar();

// sayGoodbyeLet(); // ReferenceError: Cannot access 'sayGoodbyeLet' before initialization
let sayGoodbyeLet = function() {
  console.log("Goodbye (let)!");
};
sayGoodbyeLet();

// Best Practice: Declare functions and variables at the top of their scope
// (especially using let/const) to avoid confusion related to hoisting.

// ==========================================================================
// === 4. IIFE (Immediately Invoked Function Expression) ===
// ==========================================================================
console.log("\n--- IIFE ---");

// An IIFE is a function expression that is defined and executed immediately.
// Primary Use Case: Create a private scope to avoid polluting the global scope,
// especially common before ES6 modules became standard.

(function() {
  // All variables and functions defined here are local to this IIFE's scope.
  const privateMessage = "This is private to the IIFE";
  let counter = 0;

  function increment() {
    counter++;
    console.log("IIFE Counter:", counter);
  }

  console.log(privateMessage);
  increment();
})(); // The final parentheses () immediately execute the function expression

// console.log(privateMessage); // ReferenceError: privateMessage is not defined
// increment(); // ReferenceError: increment is not defined

// IIFE with parameters:
(function(name) {
  console.log(`Hello from the IIFE, ${name}!`);
})("World"); // Pass arguments in the final parentheses

// ==========================================================================
// === 5. Callbacks ===
// ==========================================================================
console.log("\n--- Callbacks ---");

// A callback function is a function passed into another function as an argument,
// which is then invoked ("called back") inside the outer function to complete
// some kind of routine or action.

// --- Example 1: Asynchronous Operations (like timers) ---
console.log("Setting a timeout...");

function handleTimeout() { // This is the callback function
  console.log("Timeout finished after 2 seconds!");
}

// setTimeout is a built-in function that takes a callback and a delay (ms).
// It executes the callback *after* the delay.
setTimeout(handleTimeout, 2000); // Pass the 'handleTimeout' function itself

console.log("Timeout has been set (this logs before the timeout finishes).");

// --- Example 2: Custom Function Using a Callback ---
function processUserInput(input, successCallback, errorCallback) {
  if (input && input.length > 3) {
    // Simulate successful processing
    const processedData = input.toUpperCase();
    successCallback(processedData); // Call the success callback with the result
  } else {
    // Simulate an error
    const errorMsg = "Input must be longer than 3 characters.";
    errorCallback(errorMsg); // Call the error callback with the error message
  }
}

// Define the specific functions to be used as callbacks
function handleSuccess(data) {
  console.log(`SUCCESS: Processed data is "${data}"`);
}

function handleError(message) {
  console.error(`ERROR: ${message}`);
}

// Call the main function, passing our handler functions as arguments
processUserInput("JavaScript", handleSuccess, handleError); // SUCCESS: Processed data is "JAVASCRIPT"
processUserInput("Hi", handleSuccess, handleError);        // ERROR: Input must be longer than 3 characters.

// Use Case: Asynchronous operations (AJAX/fetch, timers, event listeners),
// customization (e.g., Array.sort takes an optional comparison callback), dependency injection.

// ==========================================================================
// === 6. Higher-Order Functions (HOFs) ===
// ==========================================================================
console.log("\n--- Higher-Order Functions ---");

// A Higher-Order Function is a function that does at least one of the following:
// 1. Takes one or more functions as arguments (uses callbacks).
// 2. Returns a function as its result (often utilizes closures).

// --- Example 1: Taking a function as an argument (Callbacks) ---
// Built-in array methods like map, filter, reduce are HOFs.
const numbers = [1, 2, 3, 4, 5];

// '.map()' takes a callback function and applies it to each element, returning a new array.
const double = (n) => n * 2; // Arrow function syntax (concise function expression)
const doubledNumbers = numbers.map(double); // 'map' is the HOF, 'double' is the callback
console.log("Original numbers:", numbers);
console.log("Doubled numbers:", doubledNumbers); // Output: [ 2, 4, 6, 8, 10 ]

// The 'processUserInput' function from the Callbacks section is also an HOF
// because it takes 'successCallback' and 'errorCallback' as arguments.

// --- Example 2: Returning a function ---
// The 'createCounter' function from the Closures section is an HOF because it returns
// the 'incrementAndLog' function.

function createMultiplier(factor) {
  // This outer function takes a factor...
  return function(number) { // ...and returns a new function that multiplies by that factor.
    return number * factor;
  };
}

const multiplyByFive = createMultiplier(5); // createMultiplier is the HOF
const multiplyByTen = createMultiplier(10);

console.log(`7 multiplied by 5: ${multiplyByFive(7)}`); // Output: 35
console.log(`7 multiplied by 10: ${multiplyByTen(7)}`); // Output: 70

// Use Case: Abstraction, code reuse, creating configurable functions, functional programming patterns.


// Summary:

// Scope: Controls where variables are accessible (Global, Function, Block - prefer Block with let/const).

// Closures: Inner functions retaining access to their outer function's scope, even after the outer function has run. Essential for data hiding and state management.

// Hoisting: Declarations being moved up; function declarations are fully hoisted, var partially (undefined), let/const enter TDZ. Best to declare before use.

// IIFE: Execute functions immediately, mainly for creating private scopes in older code.

// Callbacks: Functions passed as arguments to be called later, crucial for async operations and customization.

// Higher-Order Functions: Functions that operate on other functions (take them as arguments or return them). Enables powerful abstractions and functional patterns.

// Mastering these concepts is key to writing clean, efficient, and maintainable JavaScript code like a professional.