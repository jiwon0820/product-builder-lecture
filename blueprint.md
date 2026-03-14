
# **Project Blueprint: Lotto Number Generator**

## **Overview**

This document outlines the design and development plan for a modern, interactive Lotto Number Generator web application. The application is built using HTML, CSS, and JavaScript, following modern web standards and best practices. It features a clean, user-friendly, and visually appealing interface for generating lottery numbers.

## **Core Features & Design**

This section documents all style, design, and features implemented in the application.

*   **Application:** A single-page web application to generate lottery numbers.
*   **Layout & Design:**
    *   **Modern Aesthetics:** The application boasts a sleek, modern design with a "glassmorphism" effect for the main container, creating a sense of depth and translucency.
    *   **Responsive Design:** The layout is fully responsive, ensuring a seamless experience on both mobile and desktop devices.
    *   **Dynamic Color Palette:** The app features distinct light and dark modes. The color schemes are vibrant and chosen for visual appeal and readability.
    *   **Expressive Typography:** A clean, modern font is used with a clear visual hierarchy. Generated numbers are displayed prominently.
    *   **Interactive Elements:** Buttons and other interactive elements have refined styles, including subtle shadows, gradients, and hover effects to enhance user experience.
*   **Components:**
    *   **Header:** Contains the application title and a theme toggle button.
    *   **Number Display:** A dedicated area to showcase the 6 generated lottery numbers, implemented as a Web Component (`<lotto-numbers>`).
    *   **Generate Button:** A primary call-to-action button to generate a new set of numbers.
*   **Functionality:**
    *   **Number Generation:** Clicking the "Generate Numbers" button produces a set of 6 unique random numbers between 1 and 45, sorted in ascending order.
    *   **Dynamic Theme Toggle:** Users can switch between a light and dark mode. The button text dynamically updates to "Dark Mode" or "Light Mode" to reflect the available action. The user's preference is saved in `localStorage` and applied on subsequent visits.

## **Current Development Plan**

This section outlines the steps for the current requested change: "Remove History, update theme toggle text, and implement a modern style."

1.  **Update `blueprint.md`:** Reflect the removal of the history feature and the implementation of a new modern UI and dynamic theme toggle button text.
2.  **Update `index.html`:**
    *   Remove the entire `div.history` element.
3.  **Update `style.css`:**
    *   Completely overhaul the styling to implement a modern design.
    *   Introduce a "glassmorphism" effect for the container.
    *   Update color variables for a more vibrant and appealing look in both light and dark modes.
    *   Redesign the buttons, title, and overall layout for a cleaner, more professional feel.
    *   Ensure the design is centered and vertically aligned on the page.
4.  **Update `main.js`:**
    *   Remove all code related to the history functionality (`historyList`, `addToHistory`).
    *   Update the theme toggle logic to change the button's `textContent` to "Dark Mode" or "Light Mode" based on the current theme.
    *   Update the `LottoNumbers` web component's internal styles to match the new modern design.

