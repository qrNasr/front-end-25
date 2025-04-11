// Browser APIs. These are interfaces built into web browsers, accessible via JavaScript, that allow your web pages to interact with the browser environment, device capabilities, and external resources beyond the core JavaScript language itself.

// 1. Fetch API / XMLHttpRequest (XHR) - Making Network Requests

// What: These APIs allow your JavaScript code to send HTTP requests (like GET, POST, PUT, DELETE) to a server and receive responses without needing a full page reload. This is the foundation of AJAX (Asynchronous JavaScript and XML - though we mostly use JSON now) and modern dynamic web applications.

// Why:

// Loading data from APIs (e.g., weather data, user profiles, search results).

// Submitting form data in the background.

// Updating parts of a web page without refreshing everything.

// Building Single Page Applications (SPAs).

// Fetch API (Modern Standard):

// Promise-based, making asynchronous code cleaner to write, especially with async/await.

// More flexible and powerful request/response objects.

// The recommended approach for new development.

// --- Simple GET Request using Fetch ---
const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1'; // Example API

fetch(apiUrl)
  .then(response => {
    // Check if the request was successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Parse the response body as JSON (returns another promise)
    return response.json();
  })
  .then(data => {
    // Work with the JSON data
    console.log('Data received:', data);
    // Example: document.getElementById('title').textContent = data.title;
  })
  .catch(error => {
    // Handle network errors or errors thrown above
    console.error('Fetch error:', error);
  });

// --- Simple POST Request using Fetch (with async/await) ---
async function postData(url = '', data = {}) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indicate we're sending JSON
            },
            body: JSON.stringify(data) // Convert JS object to JSON string
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json(); // Parse the JSON response from server
        console.log('Success:', responseData);
        return responseData; // Return the data if needed

    } catch (error) {
        console.error('Error posting data:', error);
    }
}

// Example usage:
// postData('https://jsonplaceholder.typicode.com/posts', { title: 'foo', body: 'bar', userId: 1 });


// XMLHttpRequest (XHR) (Older):

// The original method for AJAX.

// Event-based (onload, onerror, onreadystatechange).

// More verbose syntax compared to Fetch.

// Still used, especially if you need features like upload progress tracking (which Fetch handles differently) or support for very old browsers.

// --- Simple GET Request using XHR ---
const xhr = new XMLHttpRequest();
const url = 'https://jsonplaceholder.typicode.com/posts/1';

xhr.open('GET', url); // Configure the request: method, URL

xhr.onload = function() { // Function to run when request successfully completes
    if (xhr.status >= 200 && xhr.status < 300) {
        // Success! Parse the response (usually JSON)
        const data = JSON.parse(xhr.responseText);
        console.log('XHR Data:', data);
    } else {
        // Reached the server, but it returned an error
        console.error('XHR Request failed with status:', xhr.status);
    }
};

xhr.onerror = function() { // Function to run on network errors
    console.error('XHR Network error occurred');
};

// xhr.send(); // Send the request
// IGNORE_WHEN_COPYING_START
// content_copy
// download
// Use code with caution.
// JavaScript
// IGNORE_WHEN_COPYING_END

// 2. Web Storage: LocalStorage & SessionStorage

// What: Mechanisms to store key-value pairs (as strings) directly in the user's browser.

// Why:

// Persisting simple user preferences (e.g., theme choice 'dark'/'light').

// Saving application state (e.g., contents of a shopping cart before login).

// Caching non-sensitive data to reduce server requests.

// Important: Stores only strings. If you want to store objects or arrays, you must convert them to JSON strings first (JSON.stringify) and parse them back when retrieving (JSON.parse).

// Security Note: Web Storage is not secure for sensitive data (like tokens, passwords). It's easily accessible via JavaScript (XSS attacks). Use HttpOnly cookies for sensitive session information.

// LocalStorage:

// Persistence: Data persists even after the browser window/tab is closed and reopened. It remains until explicitly cleared by the user or the web application.

// Scope: Bound to the specific origin (protocol + domain + port). http://example.com has different storage than https://example.com or http://sub.example.com.
// API: Uses the same methods as SessionStorage (setItem, getItem, removeItem, clear).
// Example: Storing user preferences
// Store data
localStorage.setItem('username', 'Alice');
localStorage.setItem('preferences', JSON.stringify({ theme: 'dark', notifications: true }));

// Retrieve data
const username = localStorage.getItem('username'); // 'Alice'
const prefsString = localStorage.getItem('preferences');
const preferences = prefsString ? JSON.parse(prefsString) : null; // Remember to parse JSON

console.log(username, preferences);

// Remove a specific item
localStorage.removeItem('username');

// Clear all items for this origin
// localStorage.clear();
// IGNORE_WHEN_COPYING_START
// content_copy
// download
// Use code with caution.
// JavaScript
// IGNORE_WHEN_COPYING_END

// SessionStorage:

// Persistence: Data persists only for the duration of the browser tab/window session. When the tab/window is closed, the data is automatically cleared. Reloading or navigating within the same tab keeps the data.

// Scope: Bound to the origin and the specific browser tab/window instance. Data in one tab is not accessible from another tab, even if it's the same origin.

// API: Uses the exact same methods as LocalStorage (setItem, getItem, removeItem, clear).

// Store data (will be gone when tab closes)
sessionStorage.setItem('temporaryToken', 'xyz789');
sessionStorage.setItem('currentStep', '3');

// Retrieve data
const step = sessionStorage.getItem('currentStep'); // '3'
console.log(step);

// Clears automatically on tab close, or manually:
// sessionStorage.removeItem('temporaryToken');
// sessionStorage.clear();
// IGNORE_WHEN_COPYING_START
// content_copy
// download
// Use code with caution.
// JavaScript
// IGNORE_WHEN_COPYING_END

// 3. Timers: setTimeout & setInterval

// What: Functions to schedule code execution after a delay or at regular intervals.

// Why:

// Delaying actions (e.g., showing a tooltip after a brief hover).

// Creating simple animations or periodic updates (though requestAnimationFrame is often better for smooth animations).

// Polling a server for updates (checking for new messages every few seconds).

// Implementing debouncing or throttling for event handlers.

// setTimeout(callbackFunction, delayInMilliseconds, [arg1, arg2, ...]):

// Executes the callbackFunction once after the specified delayInMilliseconds.

// Returns a numeric ID which can be used with clearTimeout(id) to cancel the execution before it happens.

// Any additional arguments [arg1, arg2, ...] are passed to the callbackFunction.

console.log('Starting timer...');

const timeoutId = setTimeout(() => {
  console.log('Timeout finished after 2 seconds!');
  // Perform some action here
}, 2000); // 2000 milliseconds = 2 seconds

// To cancel it before 2 seconds pass (e.g., based on user action):
// clearTimeout(timeoutId);
// console.log('Timer cancelled.');
// IGNORE_WHEN_COPYING_START
// content_copy
// download
// Use code with caution.
// JavaScript
// IGNORE_WHEN_COPYING_END

// setInterval(callbackFunction, intervalInMilliseconds, [arg1, arg2, ...]):

// Executes the callbackFunction repeatedly every intervalInMilliseconds.

// Returns a numeric ID which can be used with clearInterval(id) to stop the repetitions.

// Be cautious: If the callbackFunction takes longer to run than the intervalInMilliseconds, calls can stack up, potentially causing performance issues.

let count = 0;
console.log('Starting interval...');

const intervalId = setInterval(() => {
  count++;
  console.log(`Interval tick #${count}`);
  // Update something on the page, check for updates, etc.

  if (count >= 5) {
    console.log('Stopping interval.');
    clearInterval(intervalId); // IMPORTANT: Stop the interval eventually!
  }
}, 1000); // Run every 1 second
// IGNORE_WHEN_COPYING_START
// content_copy
// download
// Use code with caution.
// JavaScript
// IGNORE_WHEN_COPYING_END

// 4. Geolocation API

// What: Allows web applications to access the user's geographical location (latitude and longitude), with their explicit permission.

// Why:

// Displaying the user's location on a map.

// Providing location-based recommendations (nearby restaurants, stores).

// Tagging content with location data.

// Privacy: This API requires explicit user permission for privacy reasons. Browsers will prompt the user before sharing location data. It also often requires the page to be served over HTTPS for security.

// How: Accessed via the navigator.geolocation object.

function handleLocationSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const accuracy = position.coords.accuracy; // Accuracy in meters

    console.log(`Latitude: ${latitude}`);
    console.log(`Longitude: ${longitude}`);
    console.log(`Accuracy: ${accuracy} meters`);

    // Example: Update the UI
    // document.getElementById('location-info').textContent = `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;

    // Maybe display on a map using a mapping library (Leaflet, Google Maps)
}

function handleLocationError(error) {
    let errorMessage = 'Unknown error';
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            errorMessage = "An unknown error occurred.";
            break;
    }
    console.error('Geolocation Error:', errorMessage);
    // Example: Update the UI
    // document.getElementById('location-info').textContent = `Error: ${errorMessage}`;
}

// Check if Geolocation is supported by the browser
if ('geolocation' in navigator) {
    console.log('Geolocation is available.');

    // Get the current position once
    navigator.geolocation.getCurrentPosition(
        handleLocationSuccess, // Function to call on success
        handleLocationError,   // Function to call on error
        { // Optional options object
            enableHighAccuracy: true, // Request more accurate position (can use more power)
            timeout: 10000,          // Maximum time (ms) to wait for a position
            maximumAge: 0            // Don't use a cached position
        }
    );

    // --- Alternatively, watch for position changes ---
    // const watchId = navigator.geolocation.watchPosition(handleLocationSuccess, handleLocationError);
    // To stop watching: navigator.geolocation.clearWatch(watchId);

} else {
    console.log('Geolocation is not available in this browser.');
    // Update the UI to inform the user
}
// IGNORE_WHEN_COPYING_START
// content_copy
// download
// Use code with caution.
// JavaScript
// IGNORE_WHEN_COPYING_END

// These APIs significantly expand what you can do within a web page, enabling rich, interactive, and connected user experiences. Remember to always consider error handling, browser compatibility (though these are widely supported now), and especially the privacy/security implications (like with Geolocation and Web Storage).