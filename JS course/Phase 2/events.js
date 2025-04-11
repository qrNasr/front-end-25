// This is a comprehensive overview of JavaScript events, including event listeners, the event object, event propagation (bubbling and capturing), and event delegation. It also includes code examples to illustrate each concept.
// JavaScript Events Overview
// Events are a core part of JavaScript programming, especially in web development. They allow you to create interactive and dynamic web applications by responding to user actions and other occurrences in the browser.
// In this overview, we'll cover the following key concepts:
// 1. Event Listeners
// 2. The Event Object
// 3. Bubbling vs. Capturing (Event Propagation)
// 4. Event Delegation
// What are Events?
// Events are actions or occurrences that happen in the browser window. They can be triggered by user interactions, browser actions, or programmatically through JavaScript.
// Examples include clicking a button, pressing a key, submitting a form, or the page finishing loading. Events are essential for creating interactive web applications.
// Think of events as signals that something has happened within the browser window. These signals can be triggered by:
// User actions: Clicking a mouse button (click), pressing a key (keydown, keyup), moving the mouse (mousemove), submitting a form (submit), etc.
// Browser actions: The page finishing loading (load), an error occurring (error), the window being resized (resize), etc.
// Things you trigger yourself with code (custom events).
// We use JavaScript to "listen" for these events and then execute code (a "handler" function) in response.
// Here's the breakdown of the concepts you mentioned:
// 1. Event Listeners
// What: The mechanism you use to tell JavaScript, "Hey, when this specific event happens on this specific element, run this specific function."
// How (The Modern Way): The addEventListener() method is the standard and most flexible way.
// // Get the element you want to listen on
const myButton = document.getElementById('myButton');
// Define the function to run when the event happens (the "handler" or "callback")
function handleClick() {
  console.log('Button was clicked!');
  alert('Ouch!');
}
// Attach the listener
// element.addEventListener('event_type_string', handler_function, [useCapture]);
myButton.addEventListener('click', handleClick);
// You can also use anonymous functions or arrow functions directly:
myButton.addEventListener('mouseover', function() {
  console.log('Mouse is over the button!');
});
const myInput = document.getElementById('myInput');
myInput.addEventListener('keydown', (event) => { // Using an arrow function
    console.log(`Key pressed: ${event.key}`);
});
// Key Parts:
// element: The HTML element you're targeting.
// 'event_type_string': The name of the event you want to listen for (e.g., 'click', 'mouseover', 'keydown', 'submit', 'load'). It's always a string.
// handler_function: The function that will be executed when the event occurs. This function automatically receives the event object (see next point).
// [useCapture] (Optional Boolean): Controls whether to use the capturing phase or bubbling phase (explained below). Defaults to false (bubbling).
// Why addEventListener?
// You can add multiple listeners for the same event type to the same element.
// Gives you control over the event propagation phase (bubbling/capturing).
// Cleaner separation of HTML structure and JavaScript behavior compared to older inline methods (<button onclick="...">).
// 2. The Event Object
// What: When an event occurs and your handler function is called, the browser automatically passes an Event Object as the first argument to that function. This object contains detailed information about the event that just happened.
// Conventionally named: event, evt, or e.
myButton.addEventListener('click', function(event) { // 'event' holds the Event Object
  console.log('Event type:', event.type); // Output: 'click'
  console.log('Target element:', event.target); // Output: The button element itself
  console.log('Timestamp:', event.timeStamp); // Output: Time when the event occurred
  // Prevent the default action (e.g., prevent form submission)
  // event.preventDefault();
  // Stop the event from propagating further (see bubbling/capturing)
  // event.stopPropagation();
});
// Common/Useful Properties & Methods:
// event.type: The type of event (e.g., 'click', 'keydown').
// event.target: The specific element that triggered the event. This is often the most important property, especially in event delegation.
// event.currentTarget: The element that the event listener is attached to. (This can be different from event.target during bubbling/capturing).
// event.preventDefault(): A method to stop the browser's default action for that event (e.g., stopping a link from navigating, stopping a form from submitting).
// event.stopPropagation(): A method to stop the event from traveling further up or down the DOM tree (stops bubbling/capturing).
// event.key / event.code (for keyboard events): Information about the key pressed.
// event.clientX / event.clientY (for mouse events): Mouse pointer coordinates relative to the viewport.
// event.bubbles: Boolean indicating if the event bubbles.
// 3. Bubbling vs. Capturing (Event Propagation)
// When an event happens on an element deep inside the HTML structure (e.g., clicking a <span> inside a <p> inside a <div>), the event doesn't just fire on that one element. It travels through the DOM tree in two phases:
// Capturing Phase (Trickling Down):
// The event starts at the window.
// It travels down the DOM tree, node by node (document -> <html> -> <body> -> ...), until it reaches the event.target (the element where the event originated).
// Event listeners attached with addEventListener(..., ..., true) (the third argument is true) will execute during this phase. This phase is used less commonly.
// Target Phase:
// The event reaches the actual target element (event.target).
// Listeners attached directly to the target element are triggered.
// Bubbling Phase (Bubbling Up):
// The event travels back up the DOM tree from the event.target towards the window.
// It goes through all the ancestor elements (... -> <body> -> <html> -> document -> window).
// Event listeners attached with addEventListener(..., ..., false) (or with the third argument omitted, as false is the default) will execute during this phase. This is the most common phase to listen for events.
// Visual:
// Window
//       |  (Capture Phase ↓)
//   Document
//       |
//     <html>
//       |
//     <body>
//       |
//    <div>  <--- Listener (Bubbling) might catch event here
//       |
//    <p>   <--- Listener (Bubbling) might catch event here
//       |
//   <span>  <--- Target Element (Event originates here)
//       ^
//       |  (Bubbling Phase ↑)
//       +------------------ Listener (Bubbling) catches event here first
// Stopping Propagation: event.stopPropagation() prevents the event from continuing its journey (either down during capture or up during bubbling) beyond the element where stopPropagation() was called.
// 4. Event Delegation
// The Problem: Imagine you have a list (<ul>) with 100 list items (<li>), and you want something to happen when any list item is clicked. Attaching 100 separate event listeners (one for each <li>) is inefficient (uses more memory, can slow things down, pain to manage if items are added/removed dynamically).
// The Solution (Event Delegation): Leverage event bubbling! Instead of attaching listeners to each child (<li>), attach one single event listener to a common parent element (<ul>).
// How it Works:
// Attach a listener (e.g., for click) to the parent (<ul>).
// A user clicks on a child (<li>).
// The click event originates on the <li> (this is the event.target).
// The event bubbles up the DOM tree.
// The event listener on the parent (<ul>) catches the event because it bubbled up from the child.
// Inside the parent's event handler function, you check event.target to see which specific child element was actually clicked.
// Perform your action based on event.target.
const userList = document.getElementById('userList'); // Get the parent <ul>
userList.addEventListener('click', function(event) {
    // Check if the clicked element (event.target) is an <li> element
    // We use .closest() or check tagName/matches() to be robust
    if (event.target && event.target.tagName === 'LI') {
        console.log('Clicked on list item:', event.target.textContent);
        // Maybe toggle a class, fetch data based on the item, etc.
        event.target.classList.toggle('selected');
    }
    // If the click was on the <ul> itself or the space between <li>s,
    // the condition is false, and nothing happens.
});
// Imagine this HTML:
// <ul id="userList">   
//   <li>Alice</li>
//   <li>Bob</li>
//   <li>Charlie</li>
// </ul>
// This single listener handles clicks on Alice, Bob, AND Charlie.
// It will ALSO automatically handle clicks on any NEW <li> elements
// added to the list later by JavaScript!
// Benefits of Delegation:
// Efficiency: Only one listener is needed, regardless of the number of children. Saves memory and potentially improves performance.
// Simplicity: Easier to manage code.
// Dynamic Elements: Works automatically for elements added to the parent after the listener was initially attached. You don't need to add new listeners for new elements.
// These concepts are fundamental to creating dynamic and responsive user interfaces in web development. Understanding how events flow and how to efficiently listen for them using techniques like delegation is key.


// Think of events as signals that something has happened within the browser window. These signals can be triggered by:

// User actions: Clicking a mouse button (click), pressing a key (keydown, keyup), moving the mouse (mousemove), submitting a form (submit), etc.

// Browser actions: The page finishing loading (load), an error occurring (error), the window being resized (resize), etc.

// Things you trigger yourself with code (custom events).

// We use JavaScript to "listen" for these events and then execute code (a "handler" function) in response.

// Here's the breakdown of the concepts you mentioned:

// 1. Event Listeners

// What: The mechanism you use to tell JavaScript, "Hey, when this specific event happens on this specific element, run this specific function."

// How (The Modern Way): The addEventListener() method is the standard and most flexible way.

// // Get the element you want to listen on
// const myButton = document.getElementById('myButton');

// // Define the function to run when the event happens (the "handler" or "callback")
// function handleClick() {
//   console.log('Button was clicked!');
//   alert('Ouch!');
// }

// // Attach the listener
// // element.addEventListener('event_type_string', handler_function, [useCapture]);
// myButton.addEventListener('click', handleClick);

// // You can also use anonymous functions or arrow functions directly:
// myButton.addEventListener('mouseover', function() {
//   console.log('Mouse is over the button!');
// });

// const myInput = document.getElementById('myInput');
// myInput.addEventListener('keydown', (event) => { // Using an arrow function
//     console.log(`Key pressed: ${event.key}`);
// });


// Key Parts:

// element: The HTML element you're targeting.

// 'event_type_string': The name of the event you want to listen for (e.g., 'click', 'mouseover', 'keydown', 'submit', 'load'). It's always a string.

// handler_function: The function that will be executed when the event occurs. This function automatically receives the event object (see next point).

// [useCapture] (Optional Boolean): Controls whether to use the capturing phase or bubbling phase (explained below). Defaults to false (bubbling).

// Why addEventListener?

// You can add multiple listeners for the same event type to the same element.

// Gives you control over the event propagation phase (bubbling/capturing).

// Cleaner separation of HTML structure and JavaScript behavior compared to older inline methods (<button onclick="...">).

// 2. The Event Object

// What: When an event occurs and your handler function is called, the browser automatically passes an Event Object as the first argument to that function. This object contains detailed information about the event that just happened.

// Conventionally named: event, evt, or e.

// myButton.addEventListener('click', function(event) { // 'event' holds the Event Object
//   console.log('Event type:', event.type); // Output: 'click'
//   console.log('Target element:', event.target); // Output: The button element itself
//   console.log('Timestamp:', event.timeStamp); // Output: Time when the event occurred

//   // Prevent the default action (e.g., prevent form submission)
//   // event.preventDefault();

//   // Stop the event from propagating further (see bubbling/capturing)
//   // event.stopPropagation();
// });
// IGNORE_WHEN_COPYING_START
// content_copy
// download
// Use code with caution.
// JavaScript
// IGNORE_WHEN_COPYING_END

// Common/Useful Properties & Methods:

// event.type: The type of event (e.g., 'click', 'keydown').

// event.target: The specific element that triggered the event. This is often the most important property, especially in event delegation.

// event.currentTarget: The element that the event listener is attached to. (This can be different from event.target during bubbling/capturing).

// event.preventDefault(): A method to stop the browser's default action for that event (e.g., stopping a link from navigating, stopping a form from submitting).

// event.stopPropagation(): A method to stop the event from traveling further up or down the DOM tree (stops bubbling/capturing).

// event.key / event.code (for keyboard events): Information about the key pressed.

// event.clientX / event.clientY (for mouse events): Mouse pointer coordinates relative to the viewport.

// event.bubbles: Boolean indicating if the event bubbles.

// 3. Bubbling vs. Capturing (Event Propagation)

// When an event happens on an element deep inside the HTML structure (e.g., clicking a <span> inside a <p> inside a <div>), the event doesn't just fire on that one element. It travels through the DOM tree in two phases:

// Capturing Phase (Trickling Down):

// The event starts at the window.

// It travels down the DOM tree, node by node (document -> <html> -> <body> -> ...), until it reaches the event.target (the element where the event originated).

// Event listeners attached with addEventListener(..., ..., true) (the third argument is true) will execute during this phase. This phase is used less commonly.

// Target Phase:

// The event reaches the actual target element (event.target).

// Listeners attached directly to the target element are triggered.

// Bubbling Phase (Bubbling Up):

// The event travels back up the DOM tree from the event.target towards the window.

// It goes through all the ancestor elements (... -> <body> -> <html> -> document -> window).

// Event listeners attached with addEventListener(..., ..., false) (or with the third argument omitted, as false is the default) will execute during this phase. This is the most common phase to listen for events.

// Visual:

// Window
//       |  (Capture Phase ↓)
//   Document
//       |
//     <html>
//       |
//     <body>
//       |
//      <div>  <--- Listener (Bubbling) might catch event here
//       |
//      <p>   <--- Listener (Bubbling) might catch event here
//       |
//     <span>  <--- Target Element (Event originates here)
//       ^
//       |  (Bubbling Phase ↑)
//       +------------------ Listener (Bubbling) catches event here first
// IGNORE_WHEN_COPYING_START
// content_copy
// download
// Use code with caution.
// IGNORE_WHEN_COPYING_END

// Stopping Propagation: event.stopPropagation() prevents the event from continuing its journey (either down during capture or up during bubbling) beyond the element where stopPropagation() was called.

// 4. Event Delegation

// The Problem: Imagine you have a list (<ul>) with 100 list items (<li>), and you want something to happen when any list item is clicked. Attaching 100 separate event listeners (one for each <li>) is inefficient (uses more memory, can slow things down, pain to manage if items are added/removed dynamically).

// The Solution (Event Delegation): Leverage event bubbling! Instead of attaching listeners to each child (<li>), attach one single event listener to a common parent element (<ul>).

// How it Works:

// Attach a listener (e.g., for click) to the parent (<ul>).

// A user clicks on a child (<li>).

// The click event originates on the <li> (this is the event.target).

// The event bubbles up the DOM tree.

// The event listener on the parent (<ul>) catches the event because it bubbled up from the child.

// Inside the parent's event handler function, you check event.target to see which specific child element was actually clicked.

// Perform your action based on event.target.

// const userList = document.getElementById('userList'); // Get the parent <ul>

// userList.addEventListener('click', function(event) {
//     // Check if the clicked element (event.target) is an <li> element
//     // We use .closest() or check tagName/matches() to be robust
//     if (event.target && event.target.tagName === 'LI') {
//         console.log('Clicked on list item:', event.target.textContent);
//         // Maybe toggle a class, fetch data based on the item, etc.
//         event.target.classList.toggle('selected');
//     }
//     // If the click was on the <ul> itself or the space between <li>s,
//     // the condition is false, and nothing happens.
// });

// Imagine this HTML:
// <ul id="userList">
//   <li>Alice</li>
//   <li>Bob</li>
//   <li>Charlie</li>
// </ul>

// This single listener handles clicks on Alice, Bob, AND Charlie.
// It will ALSO automatically handle clicks on any NEW <li> elements
// added to the list later by JavaScript!
// IGNORE_WHEN_COPYING_START
// content_copy
// download
// Use code with caution.
// JavaScript
// IGNORE_WHEN_COPYING_END

// Benefits of Delegation:

// Efficiency: Only one listener is needed, regardless of the number of children. Saves memory and potentially improves performance.

// Simplicity: Easier to manage code.

// Dynamic Elements: Works automatically for elements added to the parent after the listener was initially attached. You don't need to add new listeners for new elements.

// These concepts are fundamental to creating dynamic and responsive user interfaces in web development. Understanding how events flow and how to efficiently listen for them using techniques like delegation is key.