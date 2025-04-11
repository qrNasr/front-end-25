

// Functions are fundamental building blocks in JavaScript. They allow you to encapsulate a block of code that performs a specific task, making your code reusable, organized, and easier to manage.

// ==========================================================================
// === 1. Function Declaration ===
// ==========================================================================
console.log("--- Function Declaration ---");

// Syntax: function functionName(parameter1, parameter2, ...) { ... code ...; return value; }
// - Uses the 'function' keyword followed by the function name.
// - Hoisted: You can call a declared function *before* it appears in your code
//   because JavaScript moves the declaration (but not necessarily initialization)
//   to the top of its scope during compilation.

// --- Example 1: Simple Greeting (No parameters, no return value) ---
function showWelcomeMessage() {
  console.log("Welcome to our amazing JavaScript examples!");
  // Implicitly returns 'undefined' because there's no 'return' statement.
}

// Calling the function:
showWelcomeMessage(); // Output: Welcome to our amazing JavaScript examples!

// --- Example 2: Greeting with a Parameter ---
function greetUser(username) { // 'username' is a parameter
  // Parameters act like local variables within the function.
  if (!username) { // Basic check if a username was provided
    console.log("Hello, guest!");
  } else {
    console.log(`Hello, ${username}!`); // Using the parameter value
  }
}

// Calling the function with an argument:
greetUser("Alice"); // Output: Hello, Alice!  ("Alice" is the argument passed to the username parameter)
greetUser("Bob");   // Output: Hello, Bob!
greetUser();        // Output: Hello, guest! (No argument passed, so username is undefined inside the function)

// --- Example 3: Function with Parameters and a Return Value ---
function calculateRectangleArea(width, height) { // width and height are parameters
  if (width <= 0 || height <= 0) {
    console.error("Width and height must be positive numbers.");
    return null; // Return null to indicate an error or invalid input
  }
  const area = width * height; // Perform the calculation
  return area; // The 'return' keyword sends a value back to where the function was called.
               // Execution stops here within the function.
}

// Calling the function and using its return value:
let roomWidth = 10;
let roomHeight = 5;
let roomArea = calculateRectangleArea(roomWidth, roomHeight); // Assign the returned value (50) to roomArea

if (roomArea !== null) {
  console.log(`The area of a ${roomWidth}x${roomHeight} room is: ${roomArea}`); // Output: The area of a 10x5 room is: 50
}

let invalidArea = calculateRectangleArea(10, -2); // Call with invalid input
console.log(`Result of invalid calculation: ${invalidArea}`); // Output: Result of invalid calculation: null (plus the error message from the function)


// ==========================================================================
// === 2. Function Expression ===
// ==========================================================================
console.log("\n--- Function Expression ---");

// Syntax: let/const variableName = function(parameter1, ...) { ... code ... };
// - A function is created and assigned to a variable.
// - The function itself can be anonymous (no name after 'function') or named.
// - NOT Hoisted (in the same way as declarations): You cannot call the function
//   using the variable name *before* the line where it's assigned. (The variable
//   declaration itself might be hoisted depending on let/const/var, but the
//   assignment of the function happens only when that line is reached).

// --- Example 1: Simple Expression ---
const logSeparator = function() { // Anonymous function assigned to logSeparator
  console.log("--------------------");
};

logSeparator(); // Output: --------------------

// --- Example 2: Expression with Parameters and Return ---
const addNumbers = function(num1, num2) { // Anonymous function
  return num1 + num2;
};

let sum = addNumbers(15, 7); // Call the function via the variable name
console.log(`15 + 7 = ${sum}`); // Output: 15 + 7 = 22

// --- Example 3: Named Function Expression (Less common, useful for debugging/recursion) ---
const factorial = function calculateFactorial(n) { // Named function 'calculateFactorial'
  if (n < 0) return undefined; // Factorial not defined for negative numbers
  if (n === 0) return 1;
  return n * calculateFactorial(n - 1); // Can use the *internal* name for recursion
};

console.log(`Factorial of 5: ${factorial(5)}`); // Output: Factorial of 5: 120
// console.log(calculateFactorial(4)); // Error! calculateFactorial is generally not accessible outside the function expression itself.

// When to use Expressions vs Declarations?
// - Declarations are often simpler for defining standalone, reusable functions. Hoisting can be convenient (or confusing!).
// - Expressions are required when passing functions as arguments to other functions (callbacks),
//   returning functions from functions, or conditionally defining functions.
// - Many modern patterns (like modules, immediately invoked functions) rely on expressions.
// - Arrow Functions (a more concise syntax for expressions) are very common in modern JS.

// ==========================================================================
// === Key Concepts Recap ===
// ==========================================================================

// --- Parameters vs. Arguments ---
// - Parameters: The variable names listed inside the parentheses in the function *definition*. (e.g., 'username', 'width', 'height', 'num1', 'num2')
// - Arguments: The actual *values* passed into the function when it is *called*. (e.g., "Alice", 10, 5, 15, 7)

// --- The 'return' statement ---
// - Specifies the value the function should output or "send back".
// - When a 'return' statement is executed, the function stops immediately, and that value is passed back to the caller.
// - If a function reaches its end without hitting a 'return' statement, it implicitly returns `undefined`.

function checkValue(value) {
  if (value > 10) {
    return "Value is greater than 10";
    console.log("This line will NOT run if value > 10"); // Unreachable code
  }
  // No 'else' needed here, if the 'if' condition was true, we already returned.
  console.log("Value was 10 or less.");
  // Implicitly returns 'undefined' if we reach here
}

let result1 = checkValue(20);
let result2 = checkValue(5);
console.log(`Result 1: ${result1}`); // Output: Result 1: Value is greater than 10
console.log(`Result 2: ${result2}`); // Output: Value was 10 or less. \n Result 2: undefined


// Summary:

// Function Declaration (function name() {}): Standard way, hoisted.

// Function Expression (const name = function() {}): Assigned to variable, not hoisted (in the same way), flexible for callbacks etc.

// Parameters: Variables defined in the function signature to receive input.

// Arguments: Actual values passed to the function when called.

// return: Sends a value back from the function and stops its execution. If omitted, returns undefined.