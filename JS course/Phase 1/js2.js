

// ==========================================================================
// === 1. Conditional Statements: if / else if / else ===
// ==========================================================================
console.log("--- if / else if / else ---");

// Use Case: Determine ticket price based on age

let userAge = 28;
let ticketPrice;

console.log(`User Age: ${userAge}`);

if (userAge < 0) {
  console.log("Invalid age entered.");
  ticketPrice = null; // Or handle the error appropriately
} else if (userAge < 13) {
  // Condition 1: Age is less than 13 (Child)
  ticketPrice = 8.00;
  console.log("Ticket Category: Child");
} else if (userAge < 65) {
  // Condition 2: Age is less than 65 (Adult) - runs only if Condition 1 was false
  ticketPrice = 15.00;
  console.log("Ticket Category: Adult");
} else {
  // Default Case: Runs if all preceding conditions were false (Age is 65 or older)
  ticketPrice = 10.00;
  console.log("Ticket Category: Senior");
}

if (ticketPrice !== null) {
  console.log(`Ticket Price: $${ticketPrice.toFixed(2)}`);
}

// When to use: When you need to execute different blocks of code based on whether
// specific conditions evaluate to true or false. 'else if' allows checking multiple
// conditions sequentially, and 'else' provides a fallback.

// ==========================================================================
// === 2. Conditional Statements: switch ===
// ==========================================================================
console.log("\n--- switch ---");

// Use Case: Determine the day of the week based on a number (0 = Sunday, 6 = Saturday)

let dayNumber = new Date().getDay(); // Gets the current day as a number (0-6)
let dayName;

console.log(`Day Number: ${dayNumber}`);

switch (dayNumber) {
  case 0: // Check if dayNumber is exactly 0
    dayName = "Sunday";
    break; // IMPORTANT: Exits the switch statement. Without break, execution would "fall through" to the next case.
  case 1:
    dayName = "Monday";
    break;
  case 2:
    dayName = "Tuesday";
    break;
  case 3:
    dayName = "Wednesday";
    break;
  case 4:
    dayName = "Thursday";
    break;
  case 5:
    dayName = "Friday";
    break;
  case 6:
    dayName = "Saturday";
    break;
  default: // Optional: Executes if none of the cases match
    dayName = "Invalid day number";
    console.log("Something went wrong with getting the day.");
    break; // Good practice to include break even in default
}

console.log(`Today is: ${dayName}`);

// When to use: Often cleaner than multiple 'else if' statements when you are checking
// a single variable or expression against several *specific*, discrete values (cases).
// Remember the 'break' keyword!

// ==========================================================================
// === 3. Loops: for ===
// ==========================================================================
console.log("\n--- for loop ---");

// Use Case: Iterate through a shopping list and display each item with its number.

const shoppingList = ["Apples", "Milk", "Bread", "Coffee"];
console.log("Shopping List:");

// The standard 'for' loop has three parts:
// 1. Initialization (let i = 0): Runs once before the loop starts. Often used to declare a counter.
// 2. Condition (i < shoppingList.length): Checked *before* each iteration. If true, the loop body runs. If false, the loop stops.
// 3. Final Expression (i++): Runs *after* each iteration. Often used to increment the counter.

for (let i = 0; i < shoppingList.length; i++) {
  // 'i' is the index (0, 1, 2, 3)
  // shoppingList[i] accesses the element at the current index
  console.log(`Item ${i + 1}: ${shoppingList[i]}`);
}

// Use Case: Calculate the sum of numbers from 1 to 5
let sum = 0;
for (let num = 1; num <= 5; num++) {
  sum += num; // Add the current number to sum
}
console.log(`Sum of 1 to 5: ${sum}`); // Output: 15 (1+2+3+4+5)

// When to use: When you know roughly how many times you need to loop (e.g., iterating
// over the length of an array, counting up or down to a specific number). It gives you
// access to an index/counter variable.
// Note: For iterating over array *elements* specifically, 'for...of' or array methods like
// 'forEach' are often more modern and readable alternatives.

// ==========================================================================
// === 4. Loops: while ===
// ==========================================================================
console.log("\n--- while loop ---");

// Use Case: Simulate a process that continues until a condition is met,
// like a countdown timer stopping at 0.

let secondsLeft = 5;
console.log("Starting countdown...");

// The 'while' loop checks the condition *before* each iteration.
// If the condition is true, the loop body runs. If false, the loop stops (or never runs).
while (secondsLeft > 0) {
  console.log(`T-${secondsLeft}...`);
  secondsLeft--; // Decrement the counter - crucial to avoid an infinite loop!
}

console.log("Liftoff!");

// When to use: When you don't necessarily know in advance how many times the loop
// will run. The loop continues *as long as* the condition remains true. Make sure
// something inside the loop eventually makes the condition false!

// ==========================================================================
// === 5. Loops: do...while ===
// ==========================================================================
console.log("\n--- do...while loop ---");

// Use Case: Prompting a user for input until valid input is given.
// The prompt *must* happen at least once.

let userGuess;
const correctNumber = 7;
let attempts = 0;

console.log("Guess the number between 1 and 10!");

// The 'do...while' loop executes the loop body *first*, and *then* checks the condition.
// This guarantees the body runs at least once.
do {
  // In a real browser scenario, you might use prompt() here.
  // We'll simulate getting a guess.
  userGuess = Math.floor(Math.random() * 10) + 1; // Random number 1-10
  attempts++;
  console.log(`Attempt ${attempts}: You guessed ${userGuess}`);

  if (userGuess === correctNumber) {
    console.log(`Correct! You got it in ${attempts} attempts.`);
  } else if (attempts >= 5) {
      console.log(`Too many attempts. The number was ${correctNumber}.`);
      break; // Exit the loop if too many attempts
  }

} while (userGuess !== correctNumber && attempts < 5); // Continue looping *while* the guess is wrong AND attempts are less than 5

// When to use: Similar to 'while', but when you need the loop body to execute
// *at least one time*, regardless of whether the condition is initially true or false.


// Key Takeaways:

// if/else if/else: For branching logic based on conditions. Executes the first block whose condition is true.

// switch: Efficiently checks a single value against multiple specific possibilities. Remember break!

// for: Great for loops where the number of iterations is known or easily calculated (like iterating over array indices). Gives you a counter.

// while: Loops as long as a condition is true. Condition is checked before each iteration. Ideal when the number of iterations isn't known beforehand.

// do...while: Loops as long as a condition is true, but the loop body always runs at least once. Condition is checked after the first iteration.