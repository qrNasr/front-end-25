

// Arrays: Ordered Lists of Items

// Arrays store collections of items in a specific order. You access items using a numerical index (starting from 0).

// ==========================================================================
// === Arrays: Literals, Accessing Elements, Basic Methods ===
// ==========================================================================
console.log("--- Arrays ---");

// --- 1. Array Literal (Creating an array) ---
// Use square brackets `[]` to create an array. Items are separated by commas.
const favoriteFoods = ["Pizza", "Sushi", "Tacos", "Chocolate"];
const emptyList = []; // An empty array
const mixedData = [10, "Hello", true, null]; // Arrays can hold different data types

console.log("My favorite foods:", favoriteFoods); // Output: My favorite foods: [ 'Pizza', 'Sushi', 'Tacos', 'Chocolate' ]
console.log("Empty list:", emptyList);         // Output: Empty list: []
console.log("Mixed data array:", mixedData);   // Output: Mixed data array: [ 10, 'Hello', true, null ]

// --- 2. Accessing Elements (Using Index) ---
// Indices start at 0 for the first element.
const firstFood = favoriteFoods[0]; // Access the element at index 0
const thirdFood = favoriteFoods[2]; // Access the element at index 2
const lastFoodIndex = favoriteFoods.length - 1; // Calculate the index of the last item
const lastFood = favoriteFoods[lastFoodIndex];
const nonExistent = favoriteFoods[10]; // Accessing an index that doesn't exist

console.log("First food:", firstFood);       // Output: First food: Pizza
console.log("Third food:", thirdFood);       // Output: Third food: Tacos
console.log("Last food:", lastFood);         // Output: Last food: Chocolate
console.log("Item at index 10:", nonExistent); // Output: Item at index 10: undefined

// --- 3. Modifying Elements ---
console.log("Original list before change:", favoriteFoods);
favoriteFoods[1] = "Ramen"; // Change the item at index 1 from "Sushi" to "Ramen"
console.log("List after changing index 1:", favoriteFoods); // Output: List after changing index 1: [ 'Pizza', 'Ramen', 'Tacos', 'Chocolate' ]

// --- 4. Basic Array Methods ---

// a) .length : Get the number of items in the array
const numberOfFoods = favoriteFoods.length;
console.log("Number of favorite foods:", numberOfFoods); // Output: Number of favorite foods: 4

// b) .push() : Add one or more items to the *end* of the array
favoriteFoods.push("Ice Cream"); // Adds "Ice Cream" to the end
console.log("List after push:", favoriteFoods); // Output: List after push: [ 'Pizza', 'Ramen', 'Tacos', 'Chocolate', 'Ice Cream' ]

// c) .pop() : Remove the *last* item from the array (and returns it)
const removedFood = favoriteFoods.pop(); // Removes "Ice Cream"
console.log("Removed food using pop:", removedFood); // Output: Removed food using pop: Ice Cream
console.log("List after pop:", favoriteFoods);     // Output: List after pop: [ 'Pizza', 'Ramen', 'Tacos', 'Chocolate' ]

// d) .indexOf() : Find the index of the *first* occurrence of an item
const tacosIndex = favoriteFoods.indexOf("Tacos");
const burgerIndex = favoriteFoods.indexOf("Burger"); // Item not in the array
console.log("Index of 'Tacos':", tacosIndex);   // Output: Index of 'Tacos': 2
console.log("Index of 'Burger':", burgerIndex); // Output: Index of 'Burger': -1 (returns -1 if not found)


// Objects: Unordered Collections of Key-Value Pairs

// Objects store collections of related data and functionality using keys (like labels or names) and values. Keys are usually strings, and values can be any data type (including other objects or arrays).

// ==========================================================================
// === Objects: Literals, Accessing Properties ===
// ==========================================================================
console.log("\n--- Objects ---");

// --- 1. Object Literal (Creating an object) ---
// Use curly braces `{}`. Key-value pairs are separated by commas.
// Keys are typically strings (can be written without quotes if valid identifiers).
// Values can be any data type.
const userProfile = {
  username: "CodeNinja", // key: "username", value: "CodeNinja" (string)
  level: 15,             // key: "level", value: 15 (number)
  isActive: true,        // key: "isActive", value: true (boolean)
  "favorite-color": "blue", // key with hyphen requires quotes
  skills: ["JavaScript", "HTML", "CSS"] // value can be an array
};

const emptyObject = {}; // An empty object

console.log("User Profile:", userProfile);
console.log("Empty object:", emptyObject);

// --- 2. Accessing Properties ---

// a) Dot Notation (`object.key`)
// - Easier to read and write.
// - Works only when the key is a valid JavaScript identifier (no spaces, hyphens, doesn't start with a number).
const usersName = userProfile.username;
const userLevel = userProfile.level;

console.log("Username (dot notation):", usersName);     // Output: Username (dot notation): CodeNinja
console.log("User Level (dot notation):", userLevel); // Output: User Level (dot notation): 15
// console.log(userProfile.favorite-color); // SyntaxError! Hyphen means subtraction here.

// b) Bracket Notation (`object['key']`)
// - Required when the key has special characters (spaces, hyphens, etc.).
// - Required when the key name is stored in a variable or determined dynamically.
// - The key inside the brackets is treated as a string.
const favColor = userProfile["favorite-color"];
const activityStatus = userProfile['isActive']; // Also works for valid identifiers

console.log("Favorite Color (bracket notation):", favColor); // Output: Favorite Color (bracket notation): blue
console.log("Activity Status (bracket notation):", activityStatus); // Output: Activity Status (bracket notation): true

// Using a variable to access a property:
let propertyToAccess = "username";
console.log(`Accessing '${propertyToAccess}' via variable:`, userProfile[propertyToAccess]); // Output: Accessing 'username' via variable: CodeNinja

propertyToAccess = "skills";
console.log(`Accessing '${propertyToAccess}' via variable:`, userProfile[propertyToAccess]); // Output: Accessing 'skills' via variable: [ 'JavaScript', 'HTML', 'CSS' ]

// --- 3. Modifying Properties ---
console.log("User level before change:", userProfile.level);
userProfile.level = 16; // Update the value using dot notation
userProfile["isActive"] = false; // Update the value using bracket notation
console.log("User level after change:", userProfile.level); // Output: User level after change: 16
console.log("User profile after changes:", userProfile);

// --- 4. Adding New Properties ---
console.log("User profile before adding city:", userProfile);
userProfile.city = "San Francisco"; // Add a new key-value pair using dot notation
userProfile["joinDate"] = "2023-10-27"; // Add using bracket notation
console.log("User profile after adding properties:", userProfile);

// --- 5. Basic Object Methods (More advanced, but keys() is common) ---
// Object.keys() returns an array of the object's own enumerable property names (keys).
const profileKeys = Object.keys(userProfile);
console.log("Keys in userProfile:", profileKeys); // Output: Keys in userProfile: [ 'username', 'level', 'isActive', 'favorite-color', 'skills', 'city', 'joinDate' ]
// IGNORE_WHEN_COPYING_START
// content_copy
// download
// Use code with caution.
// JavaScript
// IGNORE_WHEN_COPYING_END

// Goal Recap:

// With these basics, you can start writing simple scripts:

// Store lists of data (like items in a game inventory, student names) in Arrays.

// Access specific items in those lists using their index (myArray[2]).

// Add or remove items using .push() and .pop().

// Store structured data with named properties (like a user's details, product information) in Objects.

// Access specific pieces of data within an object using dot (.) or bracket ([]) notation (myObject.name or myObject['name']).

// Modify or add data to objects.

// Understanding how to create, access, and modify arrays and objects is crucial for almost any JavaScript task.