// Okay, let's explore error handling in JavaScript using the try...catch...finally block. This structure allows you to gracefully manage runtime errors that might occur in your code, preventing your entire script from crashing.

// The Structure:

// try {
//   // Code that might potentially throw an error
//   // (e.g., accessing undefined properties, network requests, invalid operations)
// } catch (error) { // The 'error' variable holds the error object if one occurs
//   // Code to execute *only* if an error occurs in the 'try' block
//   // (e.g., log the error, display a user-friendly message, fallback logic)
// } finally {
//   // Code that will *always* execute, regardless of whether an error
//   // occurred or not (both after 'try' succeeds or after 'catch' handles an error).
//   // (e.g., cleanup tasks like closing files, releasing resources, resetting state)
// }


// Explanation:

// try block: You place the code that you anticipate might cause an error within this block. JavaScript executes this code normally.

// catch (error) block: If (and only if) an error is thrown within the try block, the execution immediately jumps to the catch block. The error object (you can name the variable anything, but error or e is convention) contains information about the error (like its name, message, and sometimes a stack trace). The code inside catch is then executed. If no error occurs in try, the catch block is skipped entirely.

// finally block: This block is optional, but very useful. The code inside finally is guaranteed to execute after the try block finishes, regardless of the outcome:

// If the try block completes without errors, finally runs.

// If an error occurs in the try block and is caught by catch, finally runs after the catch block finishes.

// Even if there's a return, break, or continue statement in try or catch, the finally block will still execute before control leaves the structure.

// It's primarily used for cleanup operations that must happen whether the main operation succeeded or failed.

// Examples:

'use strict'; // Helps catch some errors earlier

// ==========================================================================
// === Example 1: Basic try...catch for a likely error ===
// ==========================================================================
console.log("--- Example 1: Basic try...catch ---");

try {
  console.log("Attempting to access a property of null...");
  let user = null;
  console.log(user.name); // This will throw a TypeError
  console.log("This line will NOT execute."); // Skipped due to the error above
} catch (error) {
  console.error("An error occurred!");
  console.error("Error Name:", error.name);       // e.g., "TypeError"
  console.error("Error Message:", error.message); // e.g., "Cannot read properties of null (reading 'name')"
  // console.error("Error Stack:", error.stack); // Provides a detailed stack trace (useful for debugging)
  console.log("Gracefully handled the error. Script continues.");
}

console.log("Program continues after the try...catch block.");

// ==========================================================================
// === Example 2: Using try...catch...finally ===
// ==========================================================================
console.log("\n--- Example 2: try...catch...finally ---");

function simulateResourceOperation(shouldSucceed) {
  let resource = null; // Simulate a resource like a file handle or network connection
  try {
    console.log("Attempting to open resource...");
    resource = { id: 123, status: "open" }; // Simulate successfully opening
    console.log("Resource opened successfully.");

    if (!shouldSucceed) {
      throw new Error("Simulated operation failure!"); // Intentionally cause an error
    }

    console.log("Operation using resource completed successfully.");
    // If successful, return a result
    return "Operation Result: Success";

  } catch (error) {
    console.error("Operation failed:", error.message);
    // Handle the error, maybe return a specific failure status
    return "Operation Result: Failed";

  } finally {
    // This *always* runs, perfect for cleanup
    console.log("Executing finally block...");
    if (resource && resource.status === "open") {
      resource.status = "closed"; // Simulate closing the resource
      console.log("Resource closed.");
    } else {
      console.log("No resource to close or already closed.");
    }
  }
}

// Scenario 1: Success
console.log("\nRunning successful operation:");
let resultSuccess = simulateResourceOperation(true);
console.log("Final result from function:", resultSuccess);

// Scenario 2: Failure
console.log("\nRunning failing operation:");
let resultFailure = simulateResourceOperation(false);
console.log("Final result from function:", resultFailure);


// ==========================================================================
// === Example 3: Throwing Custom Errors ===
// ==========================================================================
console.log("\n--- Example 3: Throwing Custom Errors ---");

function calculateDiscount(price, percentage) {
  if (typeof price !== 'number' || price <= 0) {
    throw new Error("Invalid price provided. Price must be a positive number.");
  }
  if (typeof percentage !== 'number' || percentage < 0 || percentage > 100) {
    throw new RangeError("Invalid discount percentage. Must be between 0 and 100.");
  }

  const discountAmount = price * (percentage / 100);
  return price - discountAmount;
}

try {
  let finalPrice1 = calculateDiscount(100, 10); // Valid
  console.log(`Final price (100, 10%): ${finalPrice1}`);

  let finalPrice2 = calculateDiscount(50, 110); // Invalid percentage
  console.log(`Final price (50, 110%): ${finalPrice2}`); // This won't run

} catch (error) {
  console.error(`Calculation Error [${error.name}]: ${error.message}`);
  // You might want to provide specific feedback based on error.name
  if (error instanceof RangeError) {
      console.log("Hint: Please check the percentage value.");
  } else {
      console.log("Hint: Please check the input values.");
  }
}

try {
    let finalPrice3 = calculateDiscount("abc", 20); // Invalid price type
    console.log(`Final price ("abc", 20%): ${finalPrice3}`); // This won't run
} catch (error) {
    console.error(`Calculation Error [${error.name}]: ${error.message}`);
}

console.log("Discount calculation attempts finished.");

// Key Takeaways:

// Use try...catch to handle expected errors that might occur during normal operation (e.g., invalid user input, network failures, issues with external APIs).

// Don't overuse try...catch to simply suppress all errors – this can hide bugs in your code. Let unexpected programmer errors crash during development so you can fix them.

// The error object in the catch block provides valuable information (name, message, stack) for logging and debugging.

// Use finally for crucial cleanup tasks (releasing resources, closing connections, resetting state) that must happen whether the operation succeeded or failed.

// You can throw your own Error objects (or specific types like TypeError, RangeError) to signal problems based on your application's logic, and then catch these custom errors.