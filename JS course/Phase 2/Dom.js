'use strict';

console.log("Script loaded. DOM is ready.");

// ==========================================================================
// === 1. Selecting Elements ===
// ==========================================================================
console.log("--- Selecting Elements ---");

// --- By ID (most specific, returns single element or null) ---
const mainHeading = document.getElementById('main-heading');
console.log("Selected by ID:", mainHeading);

// --- By Class Name (returns an HTMLCollection - live, array-like) ---
const contentParagraphs = document.getElementsByClassName('content');
console.log("Selected by Class Name (HTMLCollection):", contentParagraphs);
console.log("First paragraph by class:", contentParagraphs[0]); // Access like an array

// --- By Tag Name (returns an HTMLCollection) ---
const listItems = document.getElementsByTagName('li');
console.log("Selected by Tag Name (HTMLCollection):", listItems);

// --- Using CSS Selectors (Modern & Versatile) ---

// querySelector (returns the *first* matching element or null)
const firstParagraph = document.querySelector('.content'); // Selects the first element with class 'content'
const containerDiv = document.querySelector('#container');   // Selects the element with ID 'container'
const specialParagraph = document.querySelector('p.special'); // Selects first 'p' with class 'special'
console.log("querySelector (.content):", firstParagraph);
console.log("querySelector (#container):", containerDiv);
console.log("querySelector (p.special):", specialParagraph);

// querySelectorAll (returns a NodeList - static usually, array-like)
const allParagraphs = document.querySelectorAll('p');       // Selects all <p> elements
const allContentParagraphs = document.querySelectorAll('.content'); // Selects all elements with class 'content'
const allListItemsAgain = document.querySelectorAll('#item-list li'); // Selects all <li> inside #item-list
console.log("querySelectorAll ('p') (NodeList):", allParagraphs);
console.log("querySelectorAll ('.content') (NodeList):", allContentParagraphs);

// You often need to loop through NodeLists or HTMLCollections:
allParagraphs.forEach((paragraph, index) => {
    console.log(`Paragraph ${index + 1} (forEach):`, paragraph);
});


// ==========================================================================
// === 2. Changing Content and Styles ===
// ==========================================================================
console.log("\n--- Changing Content & Styles ---");

// --- Changing Text Content ---
const changeContentBtn = document.getElementById('change-content-btn');

changeContentBtn.addEventListener('click', () => {
    console.log("Changing content...");
    if (firstParagraph) {
        // .textContent: Sets the plain text content (safer, generally preferred)
        firstParagraph.textContent = "The text content of this paragraph was changed!";
    }
    if (specialParagraph) {
        // .innerHTML: Sets the content as HTML (can be risky if using user input!)
        specialParagraph.innerHTML = "This paragraph now has <strong>bold text</strong> using innerHTML.";
    }
});

// --- Changing Styles ---
const changeStyleBtn = document.getElementById('change-style-btn');

changeStyleBtn.addEventListener('click', () => {
    console.log("Changing heading style...");
    if (mainHeading) {
        // Direct style modification (adds inline styles)
        mainHeading.style.color = 'blue';
        mainHeading.style.backgroundColor = '#eee';
        mainHeading.style.padding = '10px';
        mainHeading.style.borderBottom = '2px solid darkblue';
    }
});

// --- Changing Attributes (e.g., class) ---
const toggleClassBtn = document.getElementById('toggle-class-btn');

toggleClassBtn.addEventListener('click', () => {
    console.log("Toggling highlight class on container...");
    if (containerDiv) {
        // classList is the preferred way to manage classes
        containerDiv.classList.toggle('highlight');

        // Other classList methods:
        // containerDiv.classList.add('another-class');
        // containerDiv.classList.remove('box');
        // if (containerDiv.classList.contains('highlight')) {
        //    console.log("Container has highlight class");
        // }
    }
    // You can also set other attributes:
    // mainHeading.setAttribute('data-custom', 'some-value');
    // let customAttr = mainHeading.getAttribute('data-custom');
    // mainHeading.removeAttribute('data-custom');
});


// ==========================================================================
// === 3. Creating and Removing Elements ===
// ==========================================================================
console.log("\n--- Creating & Removing Elements ---");

// --- Creating and Adding Elements ---
const addItemBtn = document.getElementById('add-item-btn');
const itemList = document.getElementById('item-list');

addItemBtn.addEventListener('click', () => {
    console.log("Adding new list item...");
    if (itemList) {
        // 1. Create the new element
        const newItem = document.createElement('li');

        // 2. Set its content and attributes (optional)
        newItem.textContent = `New List Item ${itemList.children.length + 1}`;
        newItem.classList.add('new-item', 'important'); // Add multiple classes

        // 3. Append it to the parent element
        itemList.appendChild(newItem); // Adds it as the last child
    }
     // Other ways to insert:
     // parentElement.insertBefore(newNode, referenceNode); // Inserts before referenceNode
     // element.prepend(newNode); // Inserts at the beginning of element's children
     // element.append(newNode); // Inserts at the end (similar to appendChild)
});

// --- Removing Elements ---
const removeItemBtn = document.getElementById('remove-item-btn');

removeItemBtn.addEventListener('click', () => {
    console.log("Removing specific list item...");
    // Select the element to remove
    const itemToRemove = document.querySelector('#item-list .removable');

    if (itemToRemove) {
        // Modern way: just call .remove() on the element itself
        itemToRemove.remove();

        // Older way (still works):
        // itemToRemove.parentNode.removeChild(itemToRemove);
        console.log("Item removed.");
    } else {
        console.log("Item to remove not found (already removed?).");
    }
});