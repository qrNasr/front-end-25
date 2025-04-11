

// ==========================================================================
// === 1. Variables (var, let, const) & Basic Scope Introduction ===
// ==========================================================================

console.log("--- Variables & Scope ---");

// --- 'var' (Avoid in modern JS) ---
// - Function-scoped or globally-scoped.
// - Can be re-declared and updated.
// - Hoisted (declarations are moved to the top, but not initializations).

function varExample() {
  if (true) {
    var message = "Hello from var!"; // Declared inside 'if' block
  }
  console.log(message); // Accessible OUTSIDE the 'if' block (function scope)

  var count = 10;
  console.log("Initial var count:", count); // Output: 10
  var count = 20; // Re-declaration is allowed (bad practice)
  console.log("Re-declared var count:", count); // Output: 20
  count = 30; // Updating is allowed
  console.log("Updated var count:", count); // Output: 30
}
varExample();
// console.log(message); // Error! message is function-scoped to varExample

// --- 'let' (Preferred for variables that might change) ---
// - Block-scoped (scoped to the nearest { } block).
// - Cannot be re-declared in the same scope.
// - Can be updated.
// - Hoisted, but cannot be accessed before declaration (Temporal Dead Zone).

function letExample() {
  let score = 100;
  console.log("Initial let score:", score); // Output: 100

  if (true) {
    let innerValue = "Inside block";
    console.log(innerValue); // Output: Inside block
    score = 110; // Can update 'score' from outer scope
    // let score = 150; // Error! Cannot re-declare 'score' in this scope (though it's allowed in the inner block)
    let blockScopedVar = "Only in block";
    console.log(blockScopedVar); // Output: Only in block
  }

  // console.log(innerValue); // Error! innerValue is block-scoped to the 'if'
  // console.log(blockScopedVar); // Error! blockScopedVar is block-scoped to the 'if'
  console.log("Updated let score:", score); // Output: 110

  // let score = 120; // Error! Cannot re-declare 'score' in the *same* scope
}
letExample();

// --- 'const' (Preferred for variables that SHOULD NOT be reassigned) ---
// - Block-scoped.
// - Cannot be re-declared OR reassigned after initialization.
// - Must be initialized when declared.
// - Hoisted, but cannot be accessed before declaration (Temporal Dead Zone).

const PI = 3.14159;
console.log("Constant PI:", PI); // Output: 3.14159
// PI = 3.14; // Error! Cannot reassign a const variable.

// Important nuance: const applies to the variable *binding*, not the *value* itself.
// If the const variable holds an object or array, the object's properties or array's elements CAN be changed.
const userProfile = {
  id: 1,
  name: "Alice",
};
console.log("Initial const object:", userProfile);

// userProfile = { id: 2, name: "Bob" }; // Error! Cannot reassign the whole object.

userProfile.name = "Alice Smith"; // This IS allowed! We are modifying the object's property.
userProfile.email = "alice@example.com"; // Adding a property is also allowed.
console.log("Modified const object:", userProfile);

// General Rule: Use `const` by default. Use `let` only when you know the variable's value needs to change. Avoid `var`.

// ==========================================================================
// === 2. Data Types (Primitive vs. Object, typeof) ===
// ==========================================================================

console.log("\n--- Data Types ---");

// --- Primitive Types (Immutable - their values cannot be changed directly) ---
let greeting = "Hello, World!"; // String
let age = 30; // Number
let isActive = true; // Boolean
let noValue = null; // Null (intentional absence of any object value)
let notAssigned; // Undefined (variable declared but not assigned a value)
const uniqueId = Symbol("userId"); // Symbol (unique identifier)
const veryLargeNumber = 9007199254740991n; // BigInt (for numbers larger than Number.MAX_SAFE_INTEGER)

console.log(`greeting: ${greeting} (Type: ${typeof greeting})`); // string
console.log(`age: ${age} (Type: ${typeof age})`); // number
console.log(`isActive: ${isActive} (Type: ${typeof isActive})`); // boolean
console.log(`noValue: ${noValue} (Type: ${typeof noValue})`); // object (This is a historical quirk of JS!)
console.log(`notAssigned: ${notAssigned} (Type: ${typeof notAssigned})`); // undefined
console.log(`uniqueId: ${String(uniqueId)} (Type: ${typeof uniqueId})`); // symbol (need String() to log description)
console.log(`veryLargeNumber: ${veryLargeNumber} (Type: ${typeof veryLargeNumber})`); // bigint

// --- Object Types (Mutable - their values/properties can be changed) ---
// Includes Objects, Arrays, Functions, Dates, etc.

// Object Literal
let product = {
  sku: "XYZ-123",
  name: "Wireless Mouse",
  price: 29.99,
  inStock: true,
};

// Array
let shoppingCart = ["Milk", "Bread", "Eggs", product.name]; // Can contain mixed types

// Function (Functions are first-class objects in JS)
function calculateTotal(price, quantity) {
  return price * quantity;
}

console.log(`product:`, product, `(Type: ${typeof product})`); // object
console.log(`shoppingCart:`, shoppingCart, `(Type: ${typeof shoppingCart})`); // object (typeof array is 'object')
console.log(`Is shoppingCart actually an array? ${Array.isArray(shoppingCart)}`); // true (Use Array.isArray to check specifically for arrays)
console.log(`calculateTotal function (Type: ${typeof calculateTotal})`); // function

// ==========================================================================
// === 3. Operators ===
// ==========================================================================
console.log("\n--- Operators ---");

// --- Arithmetic Operators ---
let quantity = 5;
let itemPrice = 10.5;
let subtotal = quantity * itemPrice; // Multiplication
let taxRate = 0.07; // 7% tax
let taxAmount = subtotal * taxRate; // Multiplication
let total = subtotal + taxAmount; // Addition
let itemsPerBox = 6;
let numberOfBoxes = Math.floor(quantity / itemsPerBox); // Division (Math.floor rounds down)
let remainingItems = quantity % itemsPerBox; // Modulo (remainder)

console.log(`Quantity: ${quantity}, Price: ${itemPrice}`);
console.log(`Subtotal: ${subtotal}`);
console.log(`Tax: ${taxAmount.toFixed(2)}`); // .toFixed(2) formats to 2 decimal places
console.log(`Total: ${total.toFixed(2)}`);
console.log(`Boxes needed: ${numberOfBoxes}, Remaining items: ${remainingItems}`);

// --- Comparison Operators (Result in true or false) ---
let userAge = 25;
let minimumAge = 18;
let discountAge = 65;

let isAdult = userAge >= minimumAge; // Greater than or equal to
let hasSeniorDiscount = userAge >= discountAge; // Greater than or equal to
let exactAgeMatch = userAge === 25; // Strict equality (checks value AND type - preferred!)
let looseAgeMatch = userAge == "25"; // Loose equality (checks value after type coercion - avoid if possible!)
let isNotMinor = userAge !== 17; // Strict inequality

console.log(`User age: ${userAge}`);
console.log(`Is adult? ${isAdult}`); // true
console.log(`Has senior discount? ${hasSeniorDiscount}`); // false
console.log(`Age is exactly 25? ${exactAgeMatch}`); // true
console.log(`Age loosely equals "25"? ${looseAgeMatch}`); // true (Because "25" is coerced to 25)
console.log(`Is not 17? ${isNotMinor}`); // true

// --- Logical Operators ---
let isLoggedIn = true;
let hasAdminRights = false;
let cartHasItems = shoppingCart.length > 0; // Check if the array has elements

let canCheckout = isLoggedIn && cartHasItems; // AND (&&): Both must be true
let showAdminPanel = isLoggedIn && hasAdminRights; // AND
let canEnterSite = isLoggedIn || hasAdminRights; // OR (||): At least one must be true
let showGuestMessage = !isLoggedIn; // NOT (!): Inverts the boolean value

console.log(`Is logged in: ${isLoggedIn}, Has admin rights: ${hasAdminRights}, Cart has items: ${cartHasItems}`);
console.log(`Can checkout? ${canCheckout}`); // true (true && true)
console.log(`Show admin panel? ${showAdminPanel}`); // false (true && false)
console.log(`Can enter site? ${canEnterSite}`); // true (true || false)
console.log(`Show guest message? ${showGuestMessage}`); // false (!true)

// --- Assignment Operators ---
let currentScore = 0;
console.log(`Initial score: ${currentScore}`);

currentScore = currentScore + 10; // Basic assignment
console.log(`Score after adding 10: ${currentScore}`); // 10

currentScore += 5; // Shorthand for: currentScore = currentScore + 5;
console.log(`Score after adding 5 (shorthand): ${currentScore}`); // 15

currentScore -= 3; // Shorthand for: currentScore = currentScore - 3;
console.log(`Score after subtracting 3: ${currentScore}`); // 12

currentScore *= 2; // Shorthand for: currentScore = currentScore * 2;
console.log(`Score after multiplying by 2: ${currentScore}`); // 24

currentScore /= 4; // Shorthand for: currentScore = currentScore / 4;
console.log(`Score after dividing by 4: ${currentScore}`); // 6


// Explanation:

// Variables & Scope:

// var: Shows how it "leaks" out of the if block into the function scope. Also demonstrates re-declaration and update. We note it's generally avoided.

// let: Shows it's contained within the if block (block scope). Demonstrates it can be updated but not re-declared in the same scope.

// const: Shows it cannot be reassigned (PI = 3.14 fails). Crucially, it shows that while the userProfile variable binding cannot change, the properties of the object it points to can be modified. This is a common point of confusion.

// Data Types:

// Lists examples of each primitive type (string, number, boolean, null, undefined, symbol, bigint) and uses typeof to show what JavaScript reports them as. The typeof null === 'object' quirk is highlighted.

// Shows an object literal (product) and an array (shoppingCart). typeof reports both as 'object'. Array.isArray() is shown as the correct way to identify arrays.

// A function is included to show its typeof is 'function'.

// Operators:

// Arithmetic: Uses a simple shopping cart calculation to show *, +, /, and % (modulo for remainder). toFixed() is used for formatting currency.

// Comparison: Uses age checks to demonstrate >= (greater/equal), === (strict equality - best practice), == (loose equality - avoid), and !== (strict inequality).

// Logical: Uses user status and permissions to show && (AND), || (OR), and ! (NOT) in combining boolean conditions.

// Assignment: Uses a score counter to show basic assignment (=) and the common shorthand operators (+=, -=, *=, /=).

// This set of examples provides a practical starting point for understanding these core JavaScript building blocks.