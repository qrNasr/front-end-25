// script_faq.js

console.log("FAQ Script Loaded");

// 1. Select all the summary elements (the questions)
const allSummaries = document.querySelectorAll('.faq-item summary');

console.log(`Found ${allSummaries.length} summary elements.`);

// 2. Loop through each summary element
allSummaries.forEach(summary => {

    // 3. Add a click event listener to each summary
    summary.addEventListener('click', (event) => {
        console.log("Summary clicked:", event.target.textContent);

        // 4. Prevent the default <details> toggling behavior
        // We want to control it fully with our class
        event.preventDefault();

        // 5. Get the parent <details> element (.faq-item)
        const faqItem = summary.parentElement;

        // Safety check
        if (!faqItem) {
            console.error("Could not find parent .faq-item for summary:", summary);
            return; // Stop execution for this click if parent not found
        }

        // --- Optional: Close other open items (Accordion behavior) ---
        // Comment this section out if you want multiple items open at once

        // Find any other faq-item that currently has the 'is-active' class
        const currentlyActiveItem = document.querySelector('.faq-item.is-active');
        // If there is an active item AND it's NOT the one we just clicked...
        if (currentlyActiveItem && currentlyActiveItem !== faqItem) {
            console.log("Closing previously active item.");
            currentlyActiveItem.classList.remove('is-active');
            // Also reset the 'open' attribute if you want strict control
            // currentlyActiveItem.removeAttribute('open');
        }
        // --- End Optional Accordion Behavior ---


        // 6. Toggle the 'is-active' class on the clicked item's parent <details>
        faqItem.classList.toggle('is-active');
        console.log("Toggled 'is-active' class on:", faqItem);

        // 7. Optional: Synchronize the 'open' attribute (though not strictly needed with our CSS)
        // if (faqItem.classList.contains('is-active')) {
        //     faqItem.setAttribute('open', ''); // Add the 'open' attribute
        // } else {
        //     faqItem.removeAttribute('open'); // Remove the 'open' attribute
        // }

    }); // End of event listener function

}); // End of forEach loop