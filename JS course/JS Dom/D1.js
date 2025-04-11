'use strict';

console.log("DOM Script Loaded!");

// --- Helper Function for Output ---
function displayOutput(elementId, message, type = 'info') {
    const outputDiv = document.getElementById(elementId);
    if (outputDiv) {
        const className = type === 'error' ? 'error' : (type === 'success' ? 'success' : '');
        outputDiv.innerHTML = `<div class="${className}">${message}</div>`; // Use innerHTML to render the class
    }
}

// === Example 1: Selecting Elements ===
console.log("--- Selecting Elements ---");
const mainHeading = document.getElementById('main-heading');
const subtitle = document.querySelector('.subtitle'); // First element with class
const paragraphs = document.querySelectorAll('#content-area p'); // All <p> inside #content-area
const specialItem = document.querySelector('.special-item');
const itemList = document.getElementById('item-list');
const imageContainer = document.getElementById('image-container');

console.log("Main Heading:", mainHeading);
console.log("Subtitle:", subtitle);
console.log("Content Paragraphs (NodeList):", paragraphs);
console.log("Special List Item:", specialItem);

// === Example 2: Modifying Text Content ===
console.log("--- Modifying Text Content ---");
const btnChangeHeading = document.getElementById('btn-change-heading');
const btnChangeSpan = document.getElementById('btn-change-span');
const dynamicSpan = document.getElementById('dynamic-span');

if (btnChangeHeading && mainHeading) {
    btnChangeHeading.addEventListener('click', () => {
        mainHeading.textContent = 'DOM Manipulation Mastery!';
        console.log('Heading text changed.');
    });
}

if (btnChangeSpan && dynamicSpan) {
    btnChangeSpan.addEventListener('click', () => {
        dynamicSpan.textContent = '***UPDATED DYNAMICALLY***';
        console.log('Span text changed.');
    });
}

// === Example 3: Modifying HTML Content ===
// (Use with caution, especially with user input - textContent is safer)
// We'll use the helper function displayOutput which uses innerHTML

// === Example 4: Modifying Styles & Classes ===
console.log("--- Modifying Styles & Classes ---");
const btnToggleSubtitle = document.getElementById('btn-toggle-subtitle');
const btnStyleParagraph = document.getElementById('btn-style-paragraph');
const secondParagraph = document.querySelector('.extra-info'); // Find the second paragraph
const btnHighlightSpecial = document.getElementById('btn-highlight-special');

if (btnToggleSubtitle && subtitle) {
    btnToggleSubtitle.addEventListener('click', () => {
        subtitle.classList.toggle('hidden'); // Toggle visibility using CSS class
        console.log(`Subtitle visibility toggled. Hidden: ${subtitle.classList.contains('hidden')}`);
    });
}

if (btnStyleParagraph && secondParagraph) {
    btnStyleParagraph.addEventListener('click', () => {
        // Using direct style manipulation
        secondParagraph.style.fontWeight = 'bold';
        secondParagraph.style.border = '2px solid green';
        secondParagraph.style.padding = '10px';
        // Using classList
        secondParagraph.classList.add('text-blue');
        console.log('Second paragraph styled.');
    });
}

if (btnHighlightSpecial && specialItem) {
    btnHighlightSpecial.addEventListener('click', () => {
        specialItem.classList.toggle('highlight');
        console.log('Special item highlight toggled.');
    });
}

// === Example 5: Modifying Attributes ===
console.log("--- Modifying Attributes ---");
const btnChangeImage = document.getElementById('btn-change-image');
const btnChangeLink = document.getElementById('btn-change-link');
const btnToggleTarget = document.getElementById('btn-toggle-target');
const mainImage = document.getElementById('main-image');
const mainLink = document.getElementById('main-link');
const btnGetDataId = document.getElementById('btn-get-data-id');

if (btnChangeImage && mainImage) {
    btnChangeImage.addEventListener('click', () => {
        const newSrc = 'https://via.placeholder.com/200x100/00f/fff?text=New+Image!';
        mainImage.setAttribute('src', newSrc); // Use setAttribute for standard attributes
        mainImage.alt = "A different placeholder image"; // Direct property access works too
        console.log('Image source and alt text changed.');
    });
}

if (btnChangeLink && mainLink) {
    btnChangeLink.addEventListener('click', () => {
        mainLink.href = 'https://developer.mozilla.org'; // Direct property access
        mainLink.textContent = 'Visit MDN';
        console.log('Link URL and text changed.');
    });
}

if (btnToggleTarget && mainLink) {
    btnToggleTarget.addEventListener('click', () => {
        if (mainLink.hasAttribute('target')) {
            mainLink.removeAttribute('target');
            console.log('Link target attribute removed.');
        } else {
            mainLink.setAttribute('target', '_blank');
            console.log('Link target attribute set to _blank.');
        }
    });
}

// Data attributes
if (btnGetDataId && specialItem) {
    btnGetDataId.addEventListener('click', () => {
        // Access using dataset property (camelCases the attribute name)
        const itemId = specialItem.dataset.id; // data-id becomes dataset.id
        // const itemIdAlt = specialItem.getAttribute('data-id'); // Alternative way
        console.log(`Data ID of special item: ${itemId}`);
        displayOutput('list-container', `Special item's data-id is: <strong>${itemId}</strong>`);
    });
}


// === Example 6: Creating and Adding Elements ===
console.log("--- Creating & Adding Elements ---");
const btnAddItem = document.getElementById('btn-add-item');

if (btnAddItem && itemList) {
    let newItemCounter = 4; // Start counting from the next item number
    btnAddItem.addEventListener('click', () => {
        // 1. Create new element
        const newItem = document.createElement('li');

        // 2. Set its content and attributes/classes
        newItem.textContent = `New Item ${newItemCounter}`;
        newItem.classList.add('dynamic-item'); // Add a class
        // newItem.style.fontStyle = 'italic'; // Add inline style

        // 3. Append to the parent
        itemList.appendChild(newItem);
        console.log(`Added list item: ${newItem.textContent}`);
        newItemCounter++;

        // Example: Insert before the second item
        // const secondItem = itemList.children[1]; // Get the current second item
        // if (secondItem) {
        //    const insertedItem = document.createElement('li');
        //    insertedItem.textContent = 'INSERTED ITEM';
        //    itemList.insertBefore(insertedItem, secondItem);
        //    console.log('Inserted item before second item.');
        // }
    });
}

// === Example 7: Removing Elements ===
console.log("--- Removing Elements ---");
const btnRemoveLast = document.getElementById('btn-remove-last');

if (btnRemoveLast && itemList) {
    btnRemoveLast.addEventListener('click', () => {
        const lastItem = itemList.lastElementChild; // Get the last <li> element
        if (lastItem) {
            lastItem.remove(); // Modern and simple way to remove
            // Or: itemList.removeChild(lastItem); // Older way
            console.log('Removed last list item.');
        } else {
            console.log('No items left to remove.');
        }
    });
}

// === Example 8: Event Handling - Form Interaction ===
console.log("--- Form Interaction ---");
const sampleForm = document.getElementById('sample-form');
const btnReadForm = document.getElementById('btn-read-form');
const usernameInput = document.getElementById('username');
const subscribeCheckbox = document.getElementById('subscribe');
const optionsSelect = document.getElementById('options');
const commentsTextarea = document.getElementById('comments');
const formOutputDiv = document.getElementById('form-output');

if (btnReadForm) {
    btnReadForm.addEventListener('click', () => {
        const username = usernameInput.value;
        const isSubscribed = subscribeCheckbox.checked; // Use .checked for checkboxes/radios
        const selectedOption = optionsSelect.value; // Use .value for select elements
        const comments = commentsTextarea.value;

        const output = `
            <strong>Current Form Values:</strong><br>
            Username: ${username}<br>
            Subscribed: ${isSubscribed}<br>
            Selected Option: ${selectedOption}<br>
            Comments: ${comments || '(empty)'}
        `;
        displayOutput('form-output', output);
        console.log('Read form values:', { username, isSubscribed, selectedOption, comments });
    });
}

// Form submission handling
if (sampleForm) {
    sampleForm.addEventListener('submit', (event) => {
        event.preventDefault(); // IMPORTANT: Prevent the default form submission (page reload)
        console.log('Form submitted!');
        const formData = new FormData(sampleForm); // Easy way to get all form data

        let output = '<strong>Form Submitted Data (FormData):</strong><br>';
        for (const [key, value] of formData.entries()) {
            output += `${key}: ${value}<br>`;
        }
        // Manually add checkbox state if needed (FormData only includes checked ones)
        output += `Subscribed (manual check): ${subscribeCheckbox.checked}<br>`;

        displayOutput('form-output', output, 'success');
        console.log('Form data submitted:', Object.fromEntries(formData)); // Log as object
    });
}

// Listening to input changes
if (usernameInput) {
    usernameInput.addEventListener('input', (event) => {
        // event.target refers to the input element itself
        console.log(`Username input changed: ${event.target.value}`);
        if(event.target.value.length < 3 && event.target.value.length > 0) {
             displayOutput('form-output', 'Username is too short!', 'error');
        } else if (document.querySelector('#form-output .error')) {
             // Clear error message if it exists and length is okay now
             displayOutput('form-output', '');
        }
    });
}

// === Example 9: Event Handling - Event Delegation ===
console.log("--- Event Delegation ---");
const delegationContainer = document.getElementById('event-delegation-container');
const delegationOutputDiv = document.getElementById('delegation-output');

if (delegationContainer) {
    // Attach ONE listener to the parent container
    delegationContainer.addEventListener('click', (event) => {
        // Check if the clicked element is a button AND has a data-action attribute
        if (event.target.tagName === 'BUTTON' && event.target.dataset.action) {
            const action = event.target.dataset.action;
            const message = `Delegated click detected! Action: <strong>${action}</strong>`;
            displayOutput('delegation-output', message);
            console.log(`Delegated click: ${action}`);

            // Perform action based on the button clicked
            // switch(action) {
            //    case 'action1': // do something... break;
            //    case 'action2': // do something else... break;
            // }
        }
    });
}

// === Example 10: DOM Traversing ===
console.log("--- DOM Traversing ---");
if (specialItem) {
    // Find parent
    const parentList = specialItem.parentElement; // Or .parentNode
    console.log("Special item's parent:", parentList);

    // Find siblings
    const nextSibling = specialItem.nextElementSibling;
    const prevSibling = specialItem.previousElementSibling;
    console.log("Special item's next sibling:", nextSibling);
    console.log("Special item's previous sibling:", prevSibling);

    // Find closest ancestor matching a selector
    const container = specialItem.closest('.container');
    console.log("Special item's closest '.container' ancestor:", container);
}

if(itemList) {
    // Get children
    const childrenItems = itemList.children; // HTMLCollection (live)
    console.log("Item list children (HTMLCollection):", childrenItems);
    console.log("Number of list items:", childrenItems.length);
}

console.log("--- All DOM Examples Setup Complete ---");


// How to Use:

// Save both files (index.html, script.js) in the same folder.

// Open index.html in your web browser.

// Open the Developer Console (F12) to see console.log messages.

// Click the various buttons on the page to see the DOM manipulations happen live and observe the console output.

// This set of examples covers a wide range of common DOM tasks, providing a solid foundation for building interactive web interfaces. Remember to check the console for detailed logs as you interact with the page!