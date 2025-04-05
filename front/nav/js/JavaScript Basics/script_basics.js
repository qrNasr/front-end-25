// script_basics.js

// --- 1. Basic Output ---

// console.log() is your BEST friend for debugging!
// It prints messages to the browser's Developer Console (F12).
console.log("External script 'script_basics.js' loaded!");
console.log("Hello from JavaScript!");
console.log(5 + 3); // You can log calculations

// --- 2. Variables ---

// 'let' declares variables whose value might change later.
let message = "This is a message stored in a variable.";
console.log(message);

message = "The message has been updated!"; // Reassigning the variable
console.log(message);

// 'const' declares constants whose value CANNOT be reassigned.
// Use 'const' by default unless you know you need to change the value.
const greeting = "Welcome";
const year = 2023;
// year = 2024; // This would cause an error (Uncomment to see!)

console.log(greeting + " to " + year + "!"); // String concatenation

// Basic Data Types
let score = 100; // Number
let playerName = "Alice"; // String
let isActive = true; // Boolean (true or false)

console.log("Player:", playerName, "Score:", score, "Active:", isActive);


// --- 3. Selecting HTML Elements ---

// Get element by its unique ID
const myBoxElement = document.getElementById('myBox');
const logButton = document.getElementById('logButton');
const alertButton = document.getElementById('alertButton');
const changeTextButton = document.getElementById('changeTextButton');
const changeStyleButton = document.getElementById('changeStyleButton');
const outputDiv = document.getElementById('output');

// Check if elements were found (good practice)
console.log("Elements selected:", myBoxElement, logButton, alertButton, outputDiv); // etc.

// --- 4. Events & Manipulation (Putting it together) ---

// Check if the button elements actually exist before adding listeners
if (logButton && alertButton && changeTextButton && myBoxElement && outputDiv && changeStyleButton) {

    // Add an EVENT LISTENER for a 'click' event on the Log Button
    logButton.addEventListener('click', function() {
        // This function runs when logButton is clicked
        console.log("Log Button was clicked!");
        outputDiv.textContent = "Check the Developer Console (F12) for a message!";
    });

    // Add listener for the Alert Button
    alertButton.addEventListener('click', function() {
        console.log("Alert Button clicked!");
        // alert() shows a simple browser popup message (use sparingly)
        alert("You clicked the alert button!");
        outputDiv.textContent = "Alert box shown.";
    });

    // Add listener for the Change Text Button
    changeTextButton.addEventListener('click', function() {
        console.log("Change Text Button clicked!");
        // Change the text content INSIDE the div with id="myBox"
        myBoxElement.textContent = "The text inside the box was changed by JavaScript!";
        outputDiv.textContent = "Box text updated.";
    });

    // Add listener for the Change Style Button
    changeStyleButton.addEventListener('click', function() {
        console.log("Change Style Button clicked!");
        // Change the CSS style of the box
        myBoxElement.style.backgroundColor = 'lightcoral';
        myBoxElement.style.borderColor = 'darkred';
        myBoxElement.style.color = 'white';
        // Add a class using classList
        myBoxElement.classList.add('highlight');
        outputDiv.textContent = "Box style updated.";
    });

} else {
    console.error("One or more elements needed for event listeners were not found!");
}

console.log("JavaScript execution finished.");