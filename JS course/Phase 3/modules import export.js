// Okay, let's explore ES6 Modules (import / export). This is the standard, built-in way JavaScript handles code organization across different files, crucial for building any non-trivial application. It helps avoid polluting the global scope and explicitly manages dependencies between files.

// Core Concepts:

// Module Scope: Each file is treated as a separate module. Variables, functions, and classes declared within a module are local to that module by default. They are not accessible outside unless explicitly exported.

// export: Makes variables, functions, or classes available for use in other modules.

// import: Brings exported variables, functions, or classes from another module into the current module.

// Static Structure: Imports and exports must occur at the top level of the module (not inside functions, loops, or conditionals). This allows JavaScript engines to analyze dependencies statically (before running the code), which helps with optimization and error checking.

// Types of Exports:

// 1. Named Exports

// Export multiple specific items from a module.

// Items are exported using their original names (unless aliased).

// Imported using curly braces {} with matching names.

// Example (mathUtils.js):

// mathUtils.js

console.log('mathUtils module loaded'); // Log to see when module executes

// Exporting variables/constants
export const PI = 3.14159;
export let counter = 0;

// Exporting functions
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// Exporting classes
export class Calculator {
  constructor() {
    this.result = 0;
  }
  add(val) {
    this.result += val;
    return this.result;
  }
  subtract(val) {
    this.result -= val;
    return this.result;
  }
}

// Can also export existing variables/functions later in the file
const SECRET_MULTIPLIER = 2;
function multiplyBySecret(val) {
    return val * SECRET_MULTIPLIER;
}
// Export list at the end (alternative syntax)
export { SECRET_MULTIPLIER, multiplyBySecret as multiplyHidden }; // Export with an alias


// 2. Default Export

// Export a single, primary value from a module (often a class, function, or object).

// A module can have only one default export.

// Imported without curly braces, and you can choose any name for it during import.

// Example (messageFormatter.js):

// messageFormatter.js

console.log('messageFormatter module loaded');

// Often used for the main function/class of the module
export default function formatMessage(user, message) {
  const timestamp = new Date().toLocaleTimeString();
  return `[${timestamp}] ${user}: ${message}`;
}

// You could also export a class or object as default:
// export default class Logger { ... }
// export default { configValue: 'abc' };

// Less common: export existing variable as default
// const defaultGreeting = "Hello Default";
// export { defaultGreeting as default };


// Importing Modules

// Example (main.js - This file will use the exported code):

// main.js
console.log('main module starting...');

// --- Importing Named Exports ---
// Must use the exact exported names inside { }
// Use './' to indicate a relative path in the same directory.
import { PI, add, subtract, Calculator, multiplyHidden } from './mathUtils.js';

// --- Importing with Aliases ---
// Rename imports if needed (e.g., avoid name conflicts)
import { add as sumNumbers } from './mathUtils.js';

// --- Importing the Default Export ---
// You can choose any name for the default import (formatMsg here). No { } needed.
import formatMsg from './messageFormatter.js'; // Commonly use a name related to the module

// --- Importing Everything into a Namespace Object ---
// Useful if a module has many named exports
import * as math from './mathUtils.js'; // 'math' is now an object holding all named exports

// --- Using the Imported Code ---

console.log(`Value of PI: ${PI}`);          // Output: 3.14159
console.log(`Add 5 + 3: ${add(5, 3)}`);      // Output: 8
console.log(`Subtract 10 - 4: ${subtract(10, 4)}`);// Output: 6
console.log(`Sum 2 + 9: ${sumNumbers(2, 9)}`); // Output: 11 (using alias)
console.log(`Multiply hidden: ${multiplyHidden(10)}`); // Output: 20 (using alias export)

const calc = new Calculator();
calc.add(10);
calc.subtract(3);
console.log(`Calculator result: ${calc.result}`); // Output: 7

console.log(formatMsg("Alice", "Hello modules!")); // Output: [current time] Alice: Hello modules!

// Using the namespace import
console.log(`Namespace PI: ${math.PI}`);             // Output: 3.14159
console.log(`Namespace Add: ${math.add(100, 200)}`); // Output: 300
const nsCalc = new math.Calculator();
nsCalc.add(5);
console.log(`Namespace Calc: ${nsCalc.result}`);    // Output: 5
// console.log(math.default); // Default export is NOT included in namespace import


console.log('main module finished.');


// How to Run This:

// 1. In the Browser:

// You MUST load the main JavaScript file using <script type="module">. This tells the browser to treat the file (and any files it imports) as ES6 modules.

// Modules loaded this way are automatically deferred (they run after the HTML is parsed).

// Important: Due to security restrictions (CORS), browsers often cannot load modules directly from the file:// protocol. You'll likely need to run a simple local web server.

// index.html:

// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <title>ES6 Modules Example</title>
// </head>
// <body>
//     <h1>ES6 Modules Example</h1>
//     <p>Check the browser console (F12) for output.</p>

//     <!-- Load the main script as a module -->
//     <!-- './main.js' assumes it's in the same directory as index.html -->
//     <script type="module" src="./main.js"></script>

//     <!-- mathUtils.js and messageFormatter.js are loaded automatically by main.js -->
// </body>
// </html>
// // Open index.html in your browser to see the output in the console.
// // Note: Make sure to open the browser console (F12) to see the output.
// // Note: Ensure all JavaScript files are in the same directory or adjust paths accordingly.
// // Note: You may need to adjust the file paths based on your directory structure.
// // Note: If you see CORS errors, you need to run a local server as described below.
{/* To run using a simple server (requires Node.js/npm):

cd into the directory containing your files.

Install a simple server: npm install -g live-server (or use Python's http.server, etc.)

Run the server: live-server

Open the provided URL (e.g., http://127.0.0.1:8080) in your browser.

2. In Node.js:

Node.js supports ES6 modules in two primary ways:

Option A: Use .mjs file extension: Rename your .js files containing ES6 module syntax to .mjs. Then run node main.mjs. Node will automatically treat .mjs files as ES modules.

Option B: Set "type": "module" in package.json:

Create a package.json file in your project directory: npm init -y

Add the line "type": "module" to your package.json.

You can now use .js extensions for your modules. Run node main.js.

Key Benefits of ES6 Modules:

Organization: Breaks code into smaller, manageable, reusable units.

No Global Scope Pollution: Variables/functions are local unless explicitly exported.

Clear Dependencies: import statements make it obvious what other code a module relies on.

Reusability: Well-defined modules can be easily shared across projects.

Static Analysis: Enables better tooling (like tree-shaking in bundlers to remove unused code). */}