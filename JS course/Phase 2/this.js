// ==========================================================================
// === Understanding 'this' in JavaScript ===
// ==========================================================================
// This file is a comprehensive guide to understanding the 'this' keyword in JavaScript.
// It covers the different contexts in which 'this' can be used, including:
// - Global context
// - Object methods
// - Constructor functions
// - Explicit binding using call, apply, and bind
// - Arrow functions and their lexical scoping behavior
// The code examples demonstrate how 'this' behaves in each context and the implications of using strict mode.
'use strict'; // Use strict mode! It prevents 'this' from defaulting to the global object (window)
              // in simple function calls, making behavior more predictable (it becomes undefined).

// ==========================================================================
// === Understanding Context ('this') ===
// ==========================================================================
console.log("--- The 'this' Keyword ---");

// --- Rule 1: Global Context (Default Binding - influenced by strict mode) ---
// Outside any function, 'this' refers to the global object.
// In browsers, this is usually `window`.
// In Node.js modules, 'this' at the top level is `module.exports` (or `{}` initially).
// *In strict mode*, inside a simple function call (not a method, constructor, etc.),
// 'this' is `undefined`. Without strict mode, it would default to the global object.

console.log("Global 'this':", this); // In Node modules, often {} or module.exports. In browser top-level, window.

function showGlobalThis() {
  console.log("Inside simple function call 'this':", this); // Output: undefined (due to 'use strict')
                                                          // Output: window (in browser, non-strict)
                                                          // Output: global object (in Node, non-strict)
}
showGlobalThis();

// --- Rule 2: Object Method (Implicit Binding) ---
// When a function is called *as a method* of an object (using `object.method()`),
// 'this' inside that function refers to the object the method was called on.

const user = {
  name: "Alice",
  greet: function() {
    // 'this' refers to the 'user' object because greet() is called via user.greet()
    console.log(`Method call: Hello, my name is ${this.name}.`);
  },
  showDetails: function() {
    console.log("Details 'this':", this); // 'this' is the 'user' object
  }
};

user.greet();      // Output: Method call: Hello, my name is Alice.
user.showDetails(); // Output: Details 'this': { name: 'Alice', greet: [Function: greet], showDetails: [Function: showDetails] }

// --- Important Distinction: Losing 'this' Context ---
// If you extract the method and call it without the object context, 'this' changes!
const standaloneGreet = user.greet; // Get a reference to the function itself
standaloneGreet(); // Output: Method call: Hello, my name is undefined. (TypeError in strict mode if accessing this.name)
                   // Because 'this' is now 'undefined' (strict mode) or the global object (non-strict).
                   // The connection to the 'user' object is lost in *this specific call*.

// --- Rule 3: Constructor Call ('new' Binding) ---
// When a function is called with the `new` keyword (as a constructor):
// 1. A new empty object `{}` is created.
// 2. This new object is set as the `this` context for the function call.
// 3. The function executes, potentially modifying `this`.
// 4. If the function doesn't explicitly return another object, the new object (`this`) created in step 1 is returned.

function Person(name, age) {
  // Inside the constructor, 'this' refers to the new object being created.
  console.log("Constructor 'this' (initially empty):", this);
  this.name = name;
  this.age = age;
  console.log("Constructor 'this' (after assignment):", this);
  // Implicitly returns 'this'
}

const person1 = new Person("Bob", 30);
const person2 = new Person("Charlie", 25);

console.log("Instance 1:", person1); // Output: Instance 1: Person { name: 'Bob', age: 30 }
console.log("Instance 2:", person2); // Output: Instance 2: Person { name: 'Charlie', age: 25 }


// ==========================================================================
// === Explicit Binding: call, apply, bind ===
// ==========================================================================
console.log("\n--- Explicit Binding: call, apply, bind ---");

// These methods allow you to *manually* set the value of `this` when calling a function,
// regardless of how the function is defined or usually called.

const car = {
  make: "Toyota",
  model: "Camry"
};

function displayInfo(year, color) {
  console.log(`Info: ${year} ${this.make} ${this.model} (${color})`);
  console.log("'this' inside displayInfo:", this);
}

// --- .call(thisArg, arg1, arg2, ...) ---
// - Invokes the function *immediately*.
// - Sets `this` to the first argument (`thisArg`).
// - Passes subsequent arguments individually to the function.

console.log("\nUsing .call():");
displayInfo.call(car, 2022, "Red");
// Output: Info: 2022 Toyota Camry (Red)
// Output: 'this' inside displayInfo: { make: 'Toyota', model: 'Camry' }

displayInfo.call(user, 2023, "Blue"); // Can use ANY object for 'this'
// Output: Info: 2023 Alice undefined (Blue)  -> user object doesn't have 'model'
// Output: 'this' inside displayInfo: { name: 'Alice', greet: [Function: greet], showDetails: [Function: showDetails] }


// --- .apply(thisArg, [argsArray]) ---
// - Invokes the function *immediately*.
// - Sets `this` to the first argument (`thisArg`).
// - Passes arguments to the function as an *array* (or array-like object).

console.log("\nUsing .apply():");
const carArgs = [2021, "Silver"];
displayInfo.apply(car, carArgs);
// Output: Info: 2021 Toyota Camry (Silver)
// Output: 'this' inside displayInfo: { make: 'Toyota', model: 'Camry' }

displayInfo.apply(user, [2020, "Black"]);
// Output: Info: 2020 Alice undefined (Black)
// Output: 'this' inside displayInfo: { name: 'Alice', greet: [Function: greet], showDetails: [Function: showDetails] }

// Use case for apply: When you have arguments already in an array.


// --- .bind(thisArg, arg1, arg2, ...) ---
// - Does *NOT* invoke the function immediately.
// - Creates and *returns a new function* where `this` is *permanently bound* to `thisArg`.
// - Optionally, you can also pre-set ("partially apply") initial arguments.

console.log("\nUsing .bind():");
const displayCarInfo = displayInfo.bind(car); // Creates a NEW function with 'this' fixed to 'car'

// Now, calling displayCarInfo will *always* have 'this' set to 'car'
displayCarInfo(2024, "White");
// Output: Info: 2024 Toyota Camry (White)
// Output: 'this' inside displayInfo: { make: 'Toyota', model: 'Camry' }

displayCarInfo(2020, "Gray");
// Output: Info: 2020 Toyota Camry (Gray)
// Output: 'this' inside displayInfo: { make: 'Toyota', model: 'Camry' }

// Binding 'this' AND pre-setting arguments:
const display2025CarInfo = displayInfo.bind(car, 2025); // 'this' = car, year = 2025
display2025CarInfo("Pearl"); // Only need to provide the remaining argument (color)
// Output: Info: 2025 Toyota Camry (Pearl)
// Output: 'this' inside displayInfo: { make: 'Toyota', model: 'Camry' }

// Use case for bind: Event handlers, callbacks, ensuring function context is maintained
// when passing functions around (like we saw with `standaloneGreet`).

const boundGreet = user.greet.bind(user);
boundGreet(); // Output: Method call: Hello, my name is Alice. ('this' is correctly bound back to 'user')


// ==========================================================================
// === Rule 4: Arrow Functions (`=>`) & Lexical 'this' ===
// ==========================================================================
console.log("\n--- Arrow Functions & Lexical 'this' ---");

// Arrow functions DO NOT have their own `this` binding.
// Instead, they *inherit* `this` from the surrounding (enclosing) *lexical* scope
// where the arrow function was *defined*. `call`, `apply`, and `bind` have NO effect
// on the `this` value of an arrow function after it's created.

const lexicalExample = {
  name: "Lexical Test",
  regularFunction: function() {
    console.log("Regular function 'this':", this.name); // 'this' determined by how regularFunction is called

    // Using setTimeout with a regular function callback creates a problem:
    setTimeout(function() {
       // Inside this callback, 'this' is NOT lexicalExample (it's Timeout object in Node, window/undefined in browser)
       console.log("setTimeout regular callback 'this':", this); // undefined in strict mode
       // console.log(this.name); // This would cause an error in strict mode
    }, 50); // Delay slightly for clarity

    // Using setTimeout with an arrow function callback solves the problem:
    setTimeout(() => {
      // Arrow function inherits 'this' from the surrounding 'regularFunction' scope.
      // Since regularFunction was called as a method of lexicalExample, 'this' inside it is lexicalExample.
      // Therefore, 'this' inside the arrow function is ALSO lexicalExample.
      console.log("setTimeout ARROW callback 'this':", this); // lexicalExample object
      console.log(`setTimeout ARROW callback name: ${this.name}`); // Works! Output: Lexical Test
    }, 100); // Delay slightly more
  },

  arrowFunctionMethod: () => {
      // Arrow function defined directly as a method. It inherits 'this' from the scope
      // *where lexicalExample object was defined* (in this case, the global/module scope).
      console.log("Arrow function METHOD 'this':", this); // NOT lexicalExample! It's the outer scope's 'this'.
                                                          // (module.exports or window or undefined)
  }
};

lexicalExample.regularFunction();
lexicalExample.arrowFunctionMethod(); // Demonstrates why arrow functions are usually not suitable for object *methods* that need access to the object itself via 'this'.


// Summary of `this` binding precedence (highest to lowest):
// 1. `new` binding
// 2. Explicit binding (`call`, `apply`, `bind`) - Note: A function bound with `bind` cannot have its `this` overridden by call/apply.
// 3. Implicit binding (object method call `obj.method()`)
// 4. Default binding (global object or `undefined` in strict mode)
// *Arrow functions bypass these rules entirely and use lexical scoping for `this`.*


// Key Takeaways for this:

// Dynamic Context: this isn't fixed; it depends on how the function is invoked.

// 'use strict';: Use it! It makes the default binding (undefined) less error-prone than the global object.

// Object Methods: obj.method() sets this to obj for that call.

// Losing Context: Passing methods as callbacks often loses the original this. bind is the common solution.

// new Keyword: Sets this to the newly created object instance.

// call/apply/bind: Your tools to explicitly control this. call/apply invoke immediately; bind returns a new function with this locked in.

// Arrow Functions (=>): No this of their own. They inherit this lexically from where they are defined. Great for callbacks (like in setTimeout, event listeners, array methods) where you want to preserve the outer context's this. Avoid them for object methods that need to reference the object itself via this.