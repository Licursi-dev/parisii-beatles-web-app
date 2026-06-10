Application Architecture

app.js – Application Entry Point

The app.js file acts as the central controller for the application. It is responsible for initialising the website when the page loads.

Responsibilities

* Loads and applies saved accessibility preferences.
* Connects the accessibility controls to their functionality.
* Initialises navigation between sections of the application.
* Loads the default Home page when the application starts.

How It Works

When the browser finishes loading the page, app.js:

1. Loads any saved user preferences from browser storage.
2. Applies those preferences (such as theme or accessibility settings).
3. Activates the accessibility control buttons.
4. Connects navigation buttons using data-game attributes.
5. Loads the Home page by default.

This file does not contain the game logic itself. Instead, it coordinates other modules such as router.js and settings.js, making the application easier to maintain and extend.




router.js – Application Router

The router.js file controls navigation throughout the application.

Purpose

The application is designed as a single-page application (SPA). Rather than loading a new HTML page for each section, the router dynamically loads content into a central display area.

How It Works

The router imports each application module:

* Home
* Seat Selector
* Bingo
* Quiz
* Battleships
* Settings

These modules are stored in a lookup object which maps navigation names to their corresponding game modules.

When a user selects a section, the loadGame() function:

1. Locates the main content container.
2. Clears any existing content.
3. Finds the requested module.
4. Verifies the module contains an initialisation function.
5. Calls the module’s init() function to render the selected view.

Design Benefits

This approach provides several advantages:

* Faster navigation without page refreshes.
* Clear separation of responsibilities.
* Easier maintenance and future expansion.
* Consistent user experience across all sections.

The router acts as the central navigation controller for the entire application.



