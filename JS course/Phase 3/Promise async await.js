// Okay, let's break down Promise, async, and await. These are fundamental concepts in modern JavaScript for handling asynchronous operations (like network requests, file operations, timers) in a cleaner and more manageable way than traditional callbacks.

// The Problem: Asynchronous Operations & Callback Hell

// JavaScript is single-threaded, meaning it can only do one thing at a time. To avoid blocking the main thread while waiting for long operations (like fetching data from a server), JavaScript uses an asynchronous model.

// Historically, this was handled primarily with callback functions: you'd pass a function (the callback) to an asynchronous operation, and that function would be executed later when the operation completed.

// --- The Old Way: Callbacks (Simplified Example) ---
/*
function step1(callback) {
  console.log("Starting Step 1...");
  setTimeout(() => {
    console.log("Step 1 finished.");
    callback(null, 'Result from Step 1'); // null for error, then result
  }, 1000);
}

function step2(dataFromStep1, callback) {
  console.log("Starting Step 2 with:", dataFromStep1);
  setTimeout(() => {
    console.log("Step 2 finished.");
    const result = dataFromStep1 + ' + Result from Step 2';
    callback(null, result);
  }, 500);
}

function step3(dataFromStep2, callback) {
  console.log("Starting Step 3 with:", dataFromStep2);
  setTimeout(() => {
    console.log("Step 3 finished.");
    const finalResult = dataFromStep2 + ' + Final Result';
    callback(null, finalResult);
  }, 800);
}

// --- "Callback Hell" or "Pyramid of Doom" ---
step1((error1, data1) => {
  if (error1) {
    console.error("Error in Step 1:", error1);
  } else {
    step2(data1, (error2, data2) => {
      if (error2) {
        console.error("Error in Step 2:", error2);
      } else {
        step3(data2, (error3, data3) => {
          if (error3) {
            console.error("Error in Step 3:", error3);
          } else {
            console.log("FINAL RESULT (Callbacks):", data3);
          }
        });
      }
    });
  }
});
*/
// This nesting becomes hard to read, manage, and handle errors in complex scenarios.


// Solution Part 1: Promises

// A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. It acts as a placeholder for a future result.

// A Promise has three states:

// pending: Initial state, neither fulfilled nor rejected. The operation is still ongoing.

// fulfilled (or resolved): The operation completed successfully, and the Promise has a resulting value.

// rejected: The operation failed, and the Promise has a reason (an error object).

// Once a Promise is fulfilled or rejected, it's considered settled, and its state/value will not change again.

// Working with Promises:

// You interact with promises primarily using the .then(), .catch(), and .finally() methods.

// .then(onFulfilled, onRejected): Attaches callbacks to handle the settled state.

// onFulfilled: A function called if the Promise is fulfilled. It receives the resolved value as an argument.

// onRejected: (Optional) A function called if the Promise is rejected. It receives the rejection reason (error) as an argument.

// Crucially, .then() itself returns a new Promise. This allows you to chain asynchronous operations sequentially in a much flatter structure than callbacks.

// .catch(onRejected): Syntactic sugar for .then(null, onRejected). Specifically designed to handle rejected Promises (errors). It also returns a new Promise.

// .finally(onFinally): Attaches a callback that executes when the Promise settles, regardless of whether it was fulfilled or rejected. Useful for cleanup tasks (like hiding a loading spinner). It returns a new Promise.

// Example using Promises:

// Let's rewrite the previous example using functions that return Promises.
'use strict';
console.log("--- Using Promises ---");

function step1Promise() {
  console.log("Starting Step 1 (Promise)...");
  return new Promise((resolve, reject) => { // Create a Promise
    setTimeout(() => {
      const success = true; // Simulate success/failure
      if (success) {
        console.log("Step 1 (Promise) finished successfully.");
        resolve('Result from Step 1'); // Fulfill the promise with a value
      } else {
        reject(new Error("Step 1 Failed!")); // Reject the promise with an error
      }
    }, 1000);
  });
}

function step2Promise(dataFromStep1) {
  console.log("Starting Step 2 (Promise) with:", dataFromStep1);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Step 2 (Promise) finished.");
      const result = dataFromStep1 + ' + Result from Step 2';
      resolve(result); // Always succeeds for this example
    }, 500);
  });
}

function step3Promise(dataFromStep2) {
  console.log("Starting Step 3 (Promise) with:", dataFromStep2);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Step 3 (Promise) finished.");
      const finalResult = dataFromStep2 + ' + Final Result';
      resolve(finalResult);
    }, 800);
  });
}

// --- Chaining Promises ---
step1Promise()
  .then(data1 => { // Handles successful fulfillment of step1Promise
    // The value returned here (or a Promise returned here)
    // determines the outcome of the next .then()
    return step2Promise(data1); // Return the next Promise in the chain
  })
  .then(data2 => { // Handles successful fulfillment of the Promise returned by step2Promise
    return step3Promise(data2);
  })
  .then(data3 => { // Handles successful fulfillment of the Promise returned by step3Promise
    console.log("FINAL RESULT (Promises):", data3);
  })
  .catch(error => { // Catches any rejection from step1Promise OR step2Promise OR step3Promise
    console.error("PROMISE CHAIN ERROR:", error.message);
  })
  .finally(() => { // Executes regardless of success or failure
    console.log("Promise chain finished execution (finally).");
  });

console.log("Promise chain initiated (this logs before steps complete).");


// Notice how much flatter and more readable the chaining is compared to callback nesting. Error handling is centralized with .catch().

// Solution Part 2: async/await

// async/await is syntactic sugar built on top of Promises. It makes asynchronous code look and behave a little more like synchronous code, which can significantly improve readability, especially for complex sequences.

// async keyword:

// Used before a function declaration (async function myFunc() {} or const myFunc = async () => {}).

// It automatically makes the function return a Promise.

// If the function returns a value, the Promise returned by the async function will resolve with that value.

// If the function throws an error, the Promise returned by the async function will reject with that error.

// await keyword:

// Can only be used inside an async function.

// It pauses the execution of the async function until the Promise placed after it settles (resolves or rejects).

// If the Promise fulfills, await returns the resolved value.

// If the Promise rejects, await throws the rejected error (which can then be caught using try...catch).

// Example using async/await:

console.log("\n--- Using async/await ---");

// Assume step1Promise, step2Promise, step3Promise functions are defined as above

async function runAllSteps() {
  console.log("Async function starting...");
  try {
    // 'await' pauses execution until the promise resolves, then gives the value
    const data1 = await step1Promise();

    // Execution continues here only after step1Promise resolves
    const data2 = await step2Promise(data1);

    // Execution continues here only after step2Promise resolves
    const data3 = await step3Promise(data2);

    // Execution continues here only after step3Promise resolves
    console.log("FINAL RESULT (async/await):", data3);
    return data3; // The promise returned by runAllSteps resolves with this value

  } catch (error) {
    // If any awaited promise rejects, execution jumps to the catch block
    console.error("ASYNC/AWAIT ERROR:", error.message);
    // The promise returned by runAllSteps rejects with this error
    throw error; // Optional: re-throw error if needed further up the call stack

  } finally {
    console.log("Async function finished execution (finally).");
  }
}

// Call the async function and handle its returned Promise
runAllSteps()
  .then(finalResultFromAsync => {
      if (finalResultFromAsync) { // Check if it didn't end in the catch block
          console.log("Async function call succeeded with result:", finalResultFromAsync);
      }
  })
  .catch(error => {
      console.error("Error caught from calling async function:", error.message);
  });

console.log("Async function call initiated (this logs before steps complete).");
// Key Differences Between Callbacks, Promises, and async/await:
// Callbacks: Functions passed as arguments to handle asynchronous results. Can lead to "callback hell" with deeply nested callbacks.   
// Promises: Objects representing the eventual completion (or failure) of an asynchronous operation. They allow chaining with .then(), .catch(), and .finally() methods for better readability and error handling.
// async/await: Syntactic sugar over Promises. Makes asynchronous code look synchronous, using await to pause execution until a Promise resolves or rejects. Error handling is done with try...catch blocks, making it more intuitive for many developers.  
//
// Key Points to Remember:
// - Promises are a cleaner way to handle asynchronous operations than callbacks.
// - async/await is built on top of Promises and allows writing asynchronous code that looks synchronous.
// - async functions always return a Promise, and await pauses execution until the Promise resolves or rejects.
// - Error handling with async/await is done using try...catch, making it more intuitive for many developers.
// - Promises and async/await are now the standard for handling asynchronous operations in modern JavaScript development.

// Key Advantages of async/await:

// Readability: Code looks much more like standard synchronous code, making complex asynchronous flows easier to follow.

// Error Handling: Uses standard try...catch blocks, which many developers find more intuitive than .catch() chains for handling errors within the sequence.

// Debugging: Stepping through asynchronous code in debuggers can be easier with async/await as it resembles synchronous execution flow more closely.

// In Summary:

// Callbacks: The old way, leads to "Callback Hell" for sequential operations.

// Promises: An object representing a future result. Enables chaining (.then(), .catch(), .finally()) to manage asynchronous sequences more cleanly.

// async/await: Syntactic sugar built on Promises. Allows writing asynchronous code that looks synchronous, using await to pause for Promises and try...catch for error handling within async functions.

// Modern JavaScript development heavily relies on Promises and async/await for managing asynchronous tasks effectively.