console.log("\n--- Starting More DOM Examples ---");

// === Example 11: Mouse Events ===
console.log("--- Mouse Events ---");
const hoverBox = document.getElementById('hover-box');
const mouseOutputDiv = document.getElementById('mouse-output');

if (hoverBox && mouseOutputDiv) {
    hoverBox.addEventListener('mouseover', () => {
        hoverBox.textContent = 'Mouse IN!';
        hoverBox.style.backgroundColor = 'lightgreen';
        displayOutput('mouse-output', 'Mouse entered the box.');
        console.log('Mouse Over Event');
    });

    hoverBox.addEventListener('mouseout', () => {
        hoverBox.textContent = 'Hover over me!';
        hoverBox.style.backgroundColor = 'lightcoral';
        displayOutput('mouse-output', 'Mouse left the box.');
        console.log('Mouse Out Event');
    });

    // Other common mouse events: click, dblclick, mousedown, mouseup, mousemove
    // hoverBox.addEventListener('mousemove', (event) => {
    //     console.log(`Mouse moving at X: ${event.offsetX}, Y: ${event.offsetY}`);
    // });
}

// === Example 12: Keyboard Events ===
console.log("--- Keyboard Events ---");
const keyInput = document.getElementById('key-input');
const keyOutputDiv = document.getElementById('key-output');

if (keyInput && keyOutputDiv) {
    // 'keydown' fires when key is pressed down
    keyInput.addEventListener('keydown', (event) => {
        const message = `Key Down: Key='${event.key}', Code='${event.code}' ${event.ctrlKey ? '(Ctrl)' : ''} ${event.shiftKey ? '(Shift)' : ''}`;
        displayOutput('key-output', message);
        console.log(message);
        // Example: Prevent typing 'x'
        // if (event.key === 'x') {
        //     event.preventDefault();
        //     displayOutput('key-output', 'Typing "x" is prevented!', 'error');
        // }
    });

    // 'keyup' fires when key is released
    keyInput.addEventListener('keyup', (event) => {
         console.log(`Key Up: Key='${event.key}' released.`);
    });

    // 'keypress' is deprecated but was used for character keys. Use 'keydown' or 'input'.
}

// === Example 13: Cloning and Replacing Nodes ===
console.log("--- Cloning & Replacing Nodes ---");
const btnCloneNode = document.getElementById('btn-clone-node');
const btnReplaceNode = document.getElementById('btn-replace-node');
const cloneSource = document.getElementById('clone-source');
const cloneTarget = document.getElementById('clone-target');
const replaceMeP = document.getElementById('replace-me');

if (btnCloneNode && cloneSource && cloneTarget) {
    btnCloneNode.addEventListener('click', () => {
        // Clone the node. 'true' means deep clone (includes children).
        const clonedNode = cloneSource.cloneNode(true);

        // Optional: Modify the clone (e.g., change ID, text)
        clonedNode.id = ''; // Remove or change ID to avoid duplicates
        const cloneP = clonedNode.querySelector('p');
        if(cloneP) {
            cloneP.innerHTML = "This is a <strong>CLONED</strong> element.";
        }

        cloneTarget.appendChild(clonedNode);
        console.log('Cloned node appended.');
    });
}

if (btnReplaceNode && replaceMeP) {
    btnReplaceNode.addEventListener('click', () => {
        const newNode = document.createElement('h3');
        newNode.textContent = 'I am the replacement Heading!';
        newNode.style.color = 'purple';

        replaceMeP.replaceWith(newNode); // Modern way to replace
        // Older way: replaceMeP.parentNode.replaceChild(newNode, replaceMeP);
        console.log('Paragraph replaced with heading.');
    });
}

// === Example 14: CSS Variables (Custom Properties) ===
console.log("--- CSS Variables ---");
const btnChangeCssVar = document.getElementById('btn-change-css-var');
const btnReadCssVar = document.getElementById('btn-read-css-var');
const cssVarBox = document.getElementById('css-var-box');
const cssVarOutputDiv = document.getElementById('css-var-output');

if (btnChangeCssVar && cssVarBox) {
    btnChangeCssVar.addEventListener('click', () => {
        const randomColor = `hsl(${Math.random() * 360}, 70%, 80%)`;
        // Set the CSS variable using style.setProperty
        cssVarBox.style.setProperty('--box-bg-color', randomColor);
        console.log(`CSS variable --box-bg-color set to ${randomColor}`);
    });
}

if (btnReadCssVar && cssVarBox && cssVarOutputDiv) {
    btnReadCssVar.addEventListener('click', () => {
        // Get the computed style of the element
        const styles = window.getComputedStyle(cssVarBox);
        // Read the value of the CSS variable
        const paddingValue = styles.getPropertyValue('--box-padding').trim(); // .trim() removes extra whitespace
        const bgColorValue = styles.getPropertyValue('--box-bg-color').trim();

        const message = `Current Box Styles: Padding='${paddingValue}', Background='${bgColorValue}'`;
        displayOutput('css-var-output', message);
        console.log(message);
    });
}

// === Example 15: Element Dimensions & Position ===
console.log("--- Element Dimensions & Position ---");
const btnGetDimensions = document.getElementById('btn-get-dimensions');
const measurementBox = document.getElementById('measurement-box');
const dimensionsOutputDiv = document.getElementById('dimensions-output');

if (btnGetDimensions && measurementBox && dimensionsOutputDiv) {
    btnGetDimensions.addEventListener('click', () => {
        // offsetWidth/offsetHeight: includes padding and border, but not margin
        const offsetW = measurementBox.offsetWidth;
        const offsetH = measurementBox.offsetHeight;

        // clientWidth/clientHeight: includes padding, but NOT border or scrollbars
        const clientW = measurementBox.clientWidth;
        const clientH = measurementBox.clientHeight;

        // getBoundingClientRect(): provides size and position relative to viewport
        const rect = measurementBox.getBoundingClientRect();

        const output = `
            <strong>Measurement Box Dimensions:</strong><br>
            offsetWidth: ${offsetW}px, offsetHeight: ${offsetH}px<br>
            clientWidth: ${clientW}px, clientHeight: ${clientH}px<br>
            --- Bounding Rect (relative to viewport) ---<br>
            Top: ${rect.top.toFixed(2)}px, Left: ${rect.left.toFixed(2)}px<br>
            Width: ${rect.width.toFixed(2)}px, Height: ${rect.height.toFixed(2)}px<br>
            Right: ${rect.right.toFixed(2)}px, Bottom: ${rect.bottom.toFixed(2)}px
        `;
        displayOutput('dimensions-output', output);
        console.log("Dimensions measured:", { offsetW, offsetH, clientW, clientH, rect });
    });
}


// === Example 16: Window Events ===
console.log("--- Window Events ---");
const windowOutputDiv = document.getElementById('window-output');

function updateWindowInfo() {
    if (windowOutputDiv) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const scrollX = window.scrollX.toFixed(0);
        const scrollY = window.scrollY.toFixed(0);
        windowOutputDiv.textContent = `Window Size: ${width} x ${height} | Scroll Position: X=${scrollX}, Y=${scrollY}`;
    }
}

// Initial call
updateWindowInfo();

// Attach listeners to the window object
// Note: 'resize' and 'scroll' can fire very frequently. For performance-critical
// applications, you'd typically "throttle" or "debounce" these listeners.
window.addEventListener('resize', () => {
    console.log('Window resized');
    updateWindowInfo();
});

window.addEventListener('scroll', () => {
    console.log('Window scrolled');
    updateWindowInfo();
});

// Other window events: load, unload, beforeunload, focus, blur, online, offline

// === Example 17: HTML Template Tag ===
console.log("--- HTML Template Tag ---");
const btnAddFromTemplate = document.getElementById('btn-add-from-template');
const itemTemplate = document.getElementById('item-template');
const templateList = document.getElementById('template-list');
let templateItemCount = 0;

if (btnAddFromTemplate && itemTemplate && templateList) {
    btnAddFromTemplate.addEventListener('click', () => {
        templateItemCount++;

        // 1. Get the content fragment from the template
        const templateContent = itemTemplate.content;

        // 2. Clone the fragment (use deep clone 'true')
        const newItemFragment = templateContent.cloneNode(true);

        // 3. Select elements *within the cloned fragment* and modify them
        const nameSpan = newItemFragment.querySelector('.item-name');
        const descSpan = newItemFragment.querySelector('.item-desc');
        const deleteBtn = newItemFragment.querySelector('.btn-delete-template-item');

        if (nameSpan) nameSpan.textContent = `Item ${templateItemCount}`;
        if (descSpan) descSpan.textContent = `Generated at ${new Date().toLocaleTimeString()}`;

        // Important: Attach event listener for the delete button *before* appending
        if (deleteBtn) {
            deleteBtn.addEventListener('click', (event) => {
                // Find the list item (parent of the button) and remove it
                event.target.closest('.template-item')?.remove(); // .closest finds the nearest ancestor matching the selector
                console.log('Template item removed');
            });
        }

        // 4. Append the populated fragment to the list
        templateList.appendChild(newItemFragment); // Append the whole fragment
        console.log(`Added item ${templateItemCount} from template.`);
    });
}

console.log("--- End of More DOM Examples ---");
// Helper function to display output in a specific div
function displayOutput(divId, message, type = 'info') {
    const outputDiv = document.getElementById(divId);
    if (outputDiv) {
        outputDiv.innerHTML = `<span class="${type}">${message}</span>`;
    }
}
// <!--     <div id="mouse-events-container" class="container"> -->
// <!--         <h2>Mouse Events</h2> -->
// <!--         <div id="hover-box" style="width: 200px; height: 100px; background-color: lightcoral; border: 1px solid black; text-align: center; line-height: 100px;"> -->       
// <!--             Hover over me! -->
// <!--         </div> -->
// <!--         <div id="mouse-output"></div> -->
// <!--     </div> -->
// <!--  -->
// <!--     <div id="keyboard-events-container" class="container"> -->
// <!--         <h2>Keyboard Events</h2> -->
// <!--         <label for="key-input">Type here:</label> -->
// <!--         <input type="text" id="key-input" placeholder="Press keys in this field"> -->
// <!--         <div id="key-output"></div> -->
// <!--     </div> -->
// <!--  -->
// <!--     <div id="clone-replace-container" class="container"> -->
// <!--         <h2>Cloning & Replacing Nodes</h2> -->
// <!--         <div id="clone-source" style="border: 1px dashed green; padding: 10px; margin-bottom: 10px;"> -->
// <!--             <p>This is the <strong>original</strong> element to clone.</p> -->
// <!--             <button>A button inside</button> -->
// <!--         </div> -->
// <!--         <div id="clone-target" style="border: 1px solid blue; padding: 10px; min-height: 50px;"> -->
// <!--             Clones will appear here... -->
// <!--         </div> -->
// <!--         <button id="btn-clone-node">Clone the Element</button> -->
// <!--  -->
// <!--         <p id="replace-me" style="margin-top: 15px; color: orange;">Replace me with something new!</p> --> 
// <!--         <button id="btn-replace-node">Replace Paragraph</button> -->
// <!--     </div> -->
// <!--  -->
// <!--     <div id="css-vars-container" class="container"> -->
// <!--         <h2>CSS Variables (Custom Properties)</h2> -->
// <!--         <div id="css-var-box" style="--box-bg-color: lightblue; --box-padding: 15px; background-color: var(--box-bg-color); padding: var(--box-padding);"> -->
// <!--             This box uses CSS Variables. -->
// <!--         </div> -->
// <!--         <button id="btn-change-css-var">Change Box Color (via JS)</button> -->
// <!--         <button id="btn-read-css-var">Read Box Padding</button> -->
// <!--         <div id="css-var-output"></div> -->
// <!--     </div> -->
// <!--  -->
// <!--     <div id="dimensions-container" class="container"> -->
// <!--         <h2>Element Dimensions & Position</h2> -->
// <!--         <div id="measurement-box" style="width: 250px; height: 80px; padding: 10px; border: 2px solid purple; background-color: lavender; margin: 10px;"> -->  
// <!--             Measure Me! -->
// <!--         </div> -->
// <!--         <button id="btn-get-dimensions">Get Dimensions</button> -->
// <!--         <div id="dimensions-output"></div> -->
// <!--     </div> -->
// <!--  -->
// <!--     <div id="window-events-container" class="container"> -->
// <!--         <h2>Window Events</h2> -->
// <!--         <p>Resize or scroll the window.</p> -->
// <!--         <div id="window-output">Window Size: ? x ? | Scroll Position: X= ?, Y= ?</div> -->
// <!--     </div> -->
// <!--  -->
// <!--     <div id="template-container" class="container"> -->
// <!--         <h2>HTML Template Tag</h2> -->
// <!--         <template id="item-template"> -->
// <!--             <li class="template-item"> -->
// <!--                 <strong>Item Name:</strong> <span class="item-name">Default Name</span><br> -->
// <!--                 <em>Description:</em> <span class="item-desc">Default Desc</span> -->  

// <!-- What's New:

// Mouse Events (mouseover, mouseout): Demonstrates changing styles and text when the mouse enters or leaves an element.

// Keyboard Events (keydown, keyup): Shows how to capture key presses within an input field, access key information (event.key, event.code), and potentially prevent default actions.

// Cloning Nodes (cloneNode): Creates duplicates of existing DOM elements (including children if true is passed). Useful for repeating structures.

// Replacing Nodes (replaceWith): Swaps an existing DOM node with a new one.

// CSS Variables (Custom Properties): Shows how JavaScript can interact with CSS variables defined in your styles, allowing for dynamic theming or styling adjustments.

// Element Dimensions/Position: Demonstrates how to get the size (offsetWidth, clientWidth, getBoundingClientRect) and position (getBoundingClientRect) of elements, essential for layout calculations or effects.

// Window Events (resize, scroll): Shows how to react to browser window resizing and scrolling. Includes a note about performance considerations (throttling/debouncing).

// HTML <template> Tag: Introduces a standard way to declare inert HTML fragments that can be cloned and used repeatedly, often for list items or components. Shows how to populate and append template content. Includes an example of adding event listeners within the template's cloned content (like a delete button).

// Refresh index.html in your browser and interact with the new sections to see these examples in action! Remember to check the console. --></template>