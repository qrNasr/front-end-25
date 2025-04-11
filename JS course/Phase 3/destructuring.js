// Okay, let's explore Destructuring Assignment, a powerful ES6 feature that allows you to unpack values from arrays or properties from objects into distinct variables in a concise way. It makes your code cleaner and easier to read.

// 1. Array Destructuring

// Used to extract values from arrays based on their position (index).

// 'use strict';
// console.log("--- Array Destructuring ---");

const colors = ["Red", "Green", "Blue", "Yellow", "Purple"];
const coordinates = [10, 20];
const shortArray = ["Apple"];

// --- Basic Assignment ---
// Extracts elements by their position
const [firstColor, secondColor, thirdColor] = colors;
console.log("First 3 colors:", firstColor, secondColor, thirdColor); // Output: Red Green Blue

const [x, y] = coordinates;
console.log("Coordinates:", x, y); // Output: 10 20

// --- Skipping Elements ---
// Use commas to skip elements you don't need
const [color1, , color3, , color5] = colors;
console.log("Skipped elements:", color1, color3, color5); // Output: Red Blue Purple

// --- Rest Parameter (`...`) ---
// Collects the remaining elements into a new array. Must be the last element.
const [primary1, primary2, primary3, ...otherColors] = colors;
console.log("Primary colors:", primary1, primary2, primary3); // Output: Red Green Blue
console.log("Other colors (array):", otherColors);         // Output: [ 'Yellow', 'Purple' ]

// --- Default Values ---
// Assign default values if the array element is undefined (missing or explicitly undefined)
const [fruit1, fruit2 = "Banana"] = shortArray; // fruit2 gets default as shortArray[1] is undefined
console.log("Fruits with default:", fruit1, fruit2); // Output: Apple Banana

const [val1 = 0, val2 = 0, val3 = 0] = coordinates; // val3 gets default
console.log("Coordinates with default:", val1, val2, val3); // Output: 10 20 0

// --- Swapping Variables (Classic Use Case) ---
let a = 100;
let b = 200;
console.log("Before swap:", a, b); // Output: 100 200
[a, b] = [b, a]; // Swap using destructuring
console.log("After swap:", a, b);  // Output: 200 100

// --- Destructuring Function Return Values ---
function getDimensions() {
  return [300, 150, 50]; // width, height, depth
}
const [width, height, depth] = getDimensions();
console.log("Dimensions:", width, height, depth); // Output: 300 150 50

// --- Nested Array Destructuring ---
const nestedData = [1, [2, 3], 4];
const [num1, [nestedNum1, nestedNum2], num2] = nestedData;
console.log("Nested destructure:", num1, nestedNum1, nestedNum2, num2); // Output: 1 2 3 4


// 2. Object Destructuring

// Used to extract properties from objects based on their keys.

// 'use strict';
// console.log("\n--- Object Destructuring ---");

const user = {
  id: 42,
  username: "coder_gal",
  email: "gal@example.com",
  isAdmin: false,
  profile: {
    firstName: "Grace",
    lastName: "Hopper",
    avatar: "grace.jpg"
  },
  prefs: {
      theme: "dark"
  }
};

const incompleteUser = {
    id: 99,
    username: "tester"
};

// --- Basic Assignment (Variable name must match key) ---
const { username, email } = user;
console.log("Basic obj destructure:", username, email); // Output: coder_gal gal@example.com

// --- Assigning to New Variable Names ---
// Use `key: newVariableName` syntax
const { username: loginName, email: userEmail } = user;
console.log("Renamed variables:", loginName, userEmail); // Output: coder_gal gal@example.com

// --- Default Values ---
// Provide default values for properties that might be missing or undefined
const { isAdmin = false, lastLogin = "Never" } = incompleteUser; // isAdmin exists, lastLogin does not
console.log("Defaults (incomplete):", isAdmin, lastLogin); // Output: false Never (lastLogin got default)

const { theme = "light" } = user.prefs; // theme exists in prefs
console.log("Theme with default:", theme); // Output: dark (default not used)

// --- Combining Renaming and Default Values ---
const { email: contactEmail = "no-email@example.com" } = incompleteUser;
console.log("Renamed with default:", contactEmail); // Output: no-email@example.com

// --- Rest Parameter (`...`) ---
// Collects the remaining properties into a new object.
const { id, username: uname, ...otherDetails } = user;
console.log("Rest properties:", id, uname);            // Output: 42 coder_gal
console.log("Other details (object):", otherDetails); // Output: { email: 'gal@example.com', isAdmin: false, profile: {...}, prefs: {...} }

// --- Nested Object Destructuring ---
// Use nested curly braces {}
const { profile: { firstName, lastName } } = user;
console.log("Nested destructure:", firstName, lastName); // Output: Grace Hopper

// Nested destructuring with renaming and defaults
const {
  profile: { avatar: profilePic = "default.jpg" },
  prefs: { theme: uiTheme = "light", notifications = true } // notifications uses default
} = user;
console.log("Nested rename/defaults:", profilePic, uiTheme, notifications); // Output: grace.jpg dark true

// --- Destructuring in Function Parameters (Very Common!) ---
// Instead of passing a whole object and accessing properties inside,
// destructure directly in the parameter list.

// Without destructuring:
function displayUserOld(userObj) {
  console.log(`Old way: Name: ${userObj.username}, Email: ${userObj.email}`);
}
displayUserOld(user);

// With destructuring:
function displayUserNew({ username, email, isAdmin = false }) { // Destructure + default for isAdmin
  console.log(`New way: Name: ${username}, Email: ${email}, Admin: ${isAdmin}`);
}
displayUserNew(user);             // Output: New way: Name: coder_gal, Email: gal@example.com, Admin: false
displayUserNew(incompleteUser); // Output: New way: Name: tester, Email: undefined, Admin: false

// Destructuring parameters with default values for the *entire* object parameter
// Useful for optional settings objects
function configureWidget({ speed = 100, color = "blue" } = {}) { // = {} provides default if no arg passed
    console.log(`Widget configured: Speed=${speed}, Color=${color}`);
}
configureWidget();                            // Output: Widget configured: Speed=100, Color=blue (used {} default, then property defaults)
configureWidget({ speed: 250 });              // Output: Widget configured: Speed=250, Color=blue (used color default)
configureWidget({ color: "red", speed: 50 }); // Output: Widget configured: Speed=50, Color=red


// Benefits of Destructuring:

// Readability: Makes it clearer which parts of an object or array are being used.

// Conciseness: Reduces the amount of code needed to access nested data or multiple elements/properties.

// Default Values: Provides an easy way to handle potentially missing data.

// Swapping: Makes variable swapping trivial.

// Function Signatures: Creates cleaner function parameters, especially for functions accepting configuration objects.

// Destructuring is a fundamental tool in modern JavaScript that significantly improves code quality and developer efficiency.