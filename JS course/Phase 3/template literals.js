// Okay, let's explore Template Literals (also sometimes called Template Strings), another powerful feature introduced in ES6. They provide a much more flexible and readable way to create strings compared to traditional single (') or double (") quotes.

// Key Features:

// Syntax: Uses backticks (`) instead of single or double quotes to enclose the string.

// Expression Interpolation: Allows embedding JavaScript expressions directly within the string using the ${expression} syntax. The expression is evaluated, and its result is included in the final string.

// Multi-line Strings: Allows strings to span multiple lines easily without needing special characters like \n or concatenation.

// Let's see them in action:

// 'use strict';

// // ==========================================================================
// // === Basic Syntax & Comparison ===
// // ==========================================================================
// console.log("--- Basic Syntax & Comparison ---");

// let firstName = "Alice";
// let lastName = "Wonderland";
// let items = 3;
// let totalCost = 25.50;

// // --- Traditional String Concatenation (The Old Way) ---
// let messageOld = 'User: ' + firstName + ' ' + lastName + '.\nItems purchased: ' + items + '.\nTotal cost: $' + totalCost.toFixed(2) + '.';
// console.log("Traditional:\n" + messageOld);

// // --- Template Literal (The New Way) ---
let messageNew = `User: ${firstName} ${lastName}.
Items purchased: ${items}.
Total cost: $${totalCost.toFixed(2)}.`; // Note the backticks `` and ${} syntax
console.log("\nTemplate Literal:\n" + messageNew);

// Notice:
// 1. Easier to read - variables are directly inside the string.
// 2. No messy '+' operators for joining strings and variables.
// 3. Multi-line is automatic - just press Enter within the backticks. Newlines are preserved.

// ==========================================================================
// === Feature 1: Expression Interpolation ===
// ==========================================================================
console.log("\n--- Expression Interpolation ---");

let a = 10;
let b = 5;

// Any valid JavaScript expression can go inside ${...}
console.log(`Fifteen is ${a + b} and not ${2 * a + b}.`); // Arithmetic
console.log(`Is ${a} greater than ${b}? ${a > b ? 'Yes' : 'No'}`); // Ternary operator
console.log(`The opposite of true is ${!true}.`); // Logical operation

function getUserRole() {
  return "Administrator";
}

console.log(`Current user role: ${getUserRole().toUpperCase()}`); // Function call and method chaining

let userProfile = { name: "Bob", age: 40 };
console.log(`Profile: Name - ${userProfile.name}, Age - ${userProfile.age}`); // Object property access


// ==========================================================================
// === Feature 2: Multi-line Strings ===
// ==========================================================================
console.log("\n--- Multi-line Strings ---");

// --- Traditional Multi-line (needs \n or concatenation) ---
let addressOld = '123 Main St\n' +
                 'Anytown, CA 90210\n' +
                 'USA';
console.log("Old Multi-line:\n" + addressOld);

// --- Template Literal Multi-line (simple!) ---
let addressNew = `456 Oak Avenue
Somewhere Else, NY 10001
USA`;
console.log("\nNew Multi-line:\n" + addressNew);
// The newline characters are automatically included in the string.

// ==========================================================================
// === Feature 3: Tagged Templates (Advanced) ===
// ==========================================================================
console.log("\n--- Tagged Templates (Advanced) ---");

// This is a more advanced feature where you can process a template literal
// with a function (the "tag"). The tag function receives the string parts
// and the evaluated expressions as arguments.

// Example: A simple tag function that highlights expressions
function highlight(strings, ...values) {
  // strings: An array of the literal parts of the string (split by expressions).
  // values: An array containing the results of the evaluated expressions.
  console.log("Tag Function - Strings:", strings);
  console.log("Tag Function - Values:", values);

  let result = '';
  strings.forEach((str, i) => {
    result += str;
    if (values[i] !== undefined) {
      // Wrap the evaluated value in a <span> or similar
      result += `<span class="highlight">${values[i]}</span>`;
    }
  });
  return result;
}

let item = "Laptop";
let price = 1200;
let quantity = 2;

// Call the tag function by placing its name directly before the template literal
const highlightedOutput = highlight`You ordered ${quantity} of the ${item} item(s) for a total of $${price * quantity}.`;

console.log("Tagged output:", highlightedOutput);
// Output: Tagged output: You ordered <span class="highlight">2</span> of the <span class="highlight">Laptop</span> item(s) for a total of $<span class="highlight">2400</span>.

// Use Cases for Tagged Templates:
// - Sanitizing HTML / Preventing XSS attacks
// - Internationalization (i18n) and localization (l10n) libraries
// - Styling libraries (like `styled-components` in React)
// - Creating domain-specific languages (DSLs)


// Benefits of Template Literals:

// Readability: Makes complex strings with embedded variables and logic much easier to read and understand.

// Conciseness: Reduces the need for verbose string concatenation using the + operator.

// Easier Multi-line: Creating strings that span multiple lines is trivial.

// Expression Power: Allows embedding any valid JavaScript expression directly within the string.

// Tagged Templates: Enables powerful string processing and DSL creation (though used less often in basic scripting).

// In modern JavaScript development, template literals are the preferred way to construct strings, especially when they involve variables or multiple lines.