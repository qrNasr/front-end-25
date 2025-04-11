// Okay, let's cover JSON (JavaScript Object Notation) and how to work with it in JavaScript using JSON.stringify() and JSON.parse().

// What is JSON?

// Format: A lightweight, text-based data-interchange format.

// Purpose: Primarily used to transmit data between a server and a web application (e.g., in API responses/requests), or for storing configuration data.

// Syntax: Based on a subset of JavaScript object literal syntax, but it's language-independent. Many programming languages can parse and generate JSON.

// Human-Readable: Easy for humans to read and write.

// Structure: Consists of key-value pairs (like JavaScript objects) and ordered lists (like JavaScript arrays).

// Keys: MUST be strings enclosed in double quotes (").

// Values: Can be strings (in double quotes), numbers, booleans (true/false), arrays ([]), objects ({}), or null.

// Key Difference: Although it looks like JavaScript objects/arrays, JSON is fundamentally a string when being transmitted or stored.

// Why Convert?

// JavaScript applications work directly with JavaScript objects and arrays in memory.

// When you need to send this data over a network (e.g., to an API) or store it in a text file or localStorage, you need to convert the JavaScript object/array into a JSON string. -> JSON.stringify()

// When you receive data as a JSON string (e.g., from an API), you need to convert that string back into a usable JavaScript object or array. -> JSON.parse()

// 1. JSON.stringify(value[, replacer[, space]])

// Converts a JavaScript value (object, array, primitive) into a JSON string.

// value: The JavaScript value to convert.

// replacer (Optional): A function or an array of strings/numbers that alters the behavior of the stringification process.

// Function: Called for each key/value pair. Can transform values or exclude them (by returning undefined).

// Array: Only properties whose keys are in the array will be included in the JSON string.

// space (Optional): Adds indentation, white space, and line breaks to the output JSON string, making it more readable (pretty-printing).

// Number: Specifies the number of spaces to use for indentation (max 10).

// String: Uses the given string for indentation (e.g., '\t').

// Rules & Behavior:

// Object keys are converted to strings (if not already).

// undefined, Functions, and Symbols are not valid JSON values:

// If found as an object property value, the property is omitted entirely from the JSON string.

// If found in an array, they are converted to null.

// If passed directly as the value to stringify, returns undefined.

// Date objects are converted to their string representation using toISOString().

// Circular references (objects that refer back to themselves) will cause a TypeError.

// Examples:

'use strict';
console.log("--- JSON.stringify() ---");

// --- Basic Object ---
const user = {
  id: 123,
  name: "Alice",
  isAdmin: true,
  hobbies: ["reading", "hiking"],
  address: null,
  joinDate: new Date(), // Date object
  sayHello: function() { console.log("Hi"); }, // Function (will be omitted)
  tempId: undefined, // undefined value (will be omitted)
  [Symbol('secret')]: 'some secret' // Symbol key (will be omitted)
};

// Basic Stringification
const jsonString = JSON.stringify(user);
console.log("Basic stringify:", jsonString);
// Output: Basic stringify: {"id":123,"name":"Alice","isAdmin":true,"hobbies":["reading","hiking"],"address":null,"joinDate":"2023-10-27T...Z"}
// Note: sayHello, tempId, and the Symbol property are gone. Date is a string.

// --- Pretty-Printing (using space) ---
const prettyJsonString = JSON.stringify(user, null, 2); // Use 2 spaces for indentation
console.log("\nPretty-printed stringify (2 spaces):\n", prettyJsonString);
/* Output:
Pretty-printed stringify (2 spaces):
 {
  "id": 123,
  "name": "Alice",
  "isAdmin": true,
  "hobbies": [
    "reading",
    "hiking"
  ],
  "address": null,
  "joinDate": "2023-10-27T...Z"
}
*/

const prettyJsonStringTab = JSON.stringify(user, null, '\t'); // Use tab for indentation
console.log("\nPretty-printed stringify (tab):\n", prettyJsonStringTab);

// --- Using 'replacer' Array ---
const filteredJson = JSON.stringify(user, ['id', 'name', 'hobbies']); // Only include these keys
console.log("\nStringify with replacer array:", filteredJson);
// Output: Stringify with replacer array: {"id":123,"name":"Alice","hobbies":["reading","hiking"]}

// --- Using 'replacer' Function ---
function censorAdmin(key, value) {
  if (key === 'isAdmin') {
    return '***CENSORED***'; // Change the value for 'isAdmin'
  }
  if (typeof value === 'function') {
      return undefined; // Explicitly exclude functions (already default, but shows usage)
  }
  return value; // Return other values unchanged
}
const censoredJson = JSON.stringify(user, censorAdmin, 2);
console.log("\nStringify with replacer function:\n", censoredJson);
/* Output:
Stringify with replacer function:
 {
  "id": 123,
  "name": "Alice",
  "isAdmin": "***CENSORED***",
  "hobbies": [
    "reading",
    "hiking"
  ],
  "address": null,
  "joinDate": "2023-10-27T...Z"
}
*/

// --- Stringifying Primitives ---
console.log("\nStringifying primitives:");
console.log(JSON.stringify("hello"));   // Output: "hello" (string gets quoted)
console.log(JSON.stringify(100));     // Output: 100
console.log(JSON.stringify(true));    // Output: true
console.log(JSON.stringify(null));    // Output: null
console.log(JSON.stringify(undefined)); // Output: undefined (the value, not the string "undefined")
console.log(JSON.stringify([1, undefined, 3])); // Output: [1,null,3] (undefined in array becomes null)


// 2. JSON.parse(text[, reviver])

// Parses a JSON string, constructing the JavaScript value or object described by the string.

// text: The string to parse as JSON. MUST be a valid JSON string.

// reviver (Optional): A function that prescribes how the value originally produced by parsing is transformed, before being returned. It's called for each key/value pair of the parsed object, from the innermost pairs outward.

// Rules & Behavior:

// The input text MUST strictly adhere to JSON syntax (double quotes for keys and strings, no trailing commas, etc.).

// If the string is not valid JSON, a SyntaxError will be thrown. You should often wrap JSON.parse() in a try...catch block.

// Examples:

console.log("\n--- JSON.parse() ---");

const validJsonString = '{"id": 456, "item": "Laptop", "inStock": true, "specs": {"cpu": "i7", "ram": 16}, "purchaseDate": "2023-01-15T10:00:00.000Z"}';
const invalidJsonString = '{\'item\': \'Phone\', "price": 999,}'; // Invalid: single quotes, trailing comma

// --- Basic Parsing ---
try {
  const parsedObject = JSON.parse(validJsonString);
  console.log("Parsed Object:", parsedObject);
  console.log("Accessing property:", parsedObject.item);        // Output: Laptop
  console.log("Accessing nested property:", parsedObject.specs.ram); // Output: 16
  console.log("Type of purchaseDate:", typeof parsedObject.purchaseDate); // Output: string (Dates are parsed as strings by default)

} catch (error) {
  console.error("Error parsing valid JSON (should not happen):", error);
}

// --- Parsing Invalid JSON ---
try {
  const invalidParsed = JSON.parse(invalidJsonString);
  console.log("Parsed Invalid Object (won't reach here):", invalidParsed);
} catch (error) {
  console.error("\nError parsing invalid JSON:");
  console.error("Error Name:", error.name);       // Output: SyntaxError
  console.error("Error Message:", error.message); // Output: e.g., "Unexpected token ' in JSON at position 1" or similar
}

// --- Using 'reviver' Function (Commonly used for Dates) ---
function dateReviver(key, value) {
  // Check if the value looks like an ISO date string
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
    return new Date(value); // Convert it back to a Date object
  }
  return value; // Return other values unchanged
}

try {
  const parsedWithReviver = JSON.parse(validJsonString, dateReviver);
  console.log("\nParsed Object with Date Reviver:", parsedWithReviver);
  console.log("Type of purchaseDate (revived):", typeof parsedWithReviver.purchaseDate); // Output: object
  console.log("Is purchaseDate a Date object?", parsedWithReviver.purchaseDate instanceof Date); // Output: true
  // Now you can use Date methods:
  console.log("Purchase Year:", parsedWithReviver.purchaseDate.getFullYear()); // Output: 2023

} catch (error) {
    console.error("Error parsing with reviver:", error);
}
// --- Parsing JSON Arrays ---
const jsonArrayString = '[{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]';
try {
  const parsedArray = JSON.parse(jsonArrayString);
  console.log("\nParsed JSON Array:", parsedArray);
  console.log("First item name:", parsedArray[0].name); // Output: Alice
}
catch (error) {
  console.error("Error parsing JSON array:", error);
}
// --- Parsing JSON with Circular References (will throw an error) ---
const circularObject = {};
circularObject.self = circularObject; // Circular reference
try {
  const circularJsonString = JSON.stringify(circularObject); // This will work
  const parsedCircular = JSON.parse(circularJsonString); // This will throw an error
}
catch (error) {
  console.error("Error parsing circular reference:", error); // Output: TypeError: Converting circular structure to JSON
}
// --- Summary of JSON.stringify() and JSON.parse() ---
console.log("\n--- Summary of JSON.stringify() and JSON.parse() ---");
console.log("JSON.stringify() converts JavaScript values to JSON strings.");
console.log("JSON.parse() converts JSON strings back to JavaScript values.");
console.log("Use JSON.stringify() to send data to APIs or store it in localStorage.");
console.log("Use JSON.parse() to read data from APIs or localStorage.");
console.log("Always handle potential errors when parsing JSON strings.");
console.log("Use 'replacer' in JSON.stringify() for custom transformations.");
console.log("Use 'reviver' in JSON.parse() for custom transformations.");
console.log("JSON.stringify() can pretty-print JSON with indentation.");

// Common Use Cases:

// APIs: Sending data to an API (often requires JSON.stringify) and receiving data from an API (usually comes as a JSON string, requiring JSON.parse).

// localStorage / sessionStorage: These browser storage mechanisms can only store strings. Use stringify before saving objects/arrays and parse after retrieving them.

// Configuration Files: Storing application settings in .json files.

// Web Workers / Service Workers: Passing complex data as messages often involves stringifying and parsing.

// Key Takeaways:

// JSON is a text format for data exchange, derived from JavaScript object syntax but with stricter rules (double quotes!).

// JSON.stringify(): Converts JS values -> JSON strings (for sending/storing). Watch out for omitted values (undefined, functions, symbols). Use the space argument for readability.

// JSON.parse(): Converts JSON strings -> JS values (for using received/read data). Wrap in try...catch to handle potential SyntaxErrors. Use the reviver argument for custom transformations (like restoring Date objects).