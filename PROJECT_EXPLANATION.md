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
