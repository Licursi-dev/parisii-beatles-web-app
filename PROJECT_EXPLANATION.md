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



settings.js – Global Preferences and Accessibility Controls

The settings.js file manages the global user preference system for the application. It controls appearance settings such as theme, font size and contrast mode.

Purpose

This file allows the application to remember and apply user accessibility preferences across sessions. It also connects the quick-access buttons in the header to the preference system.

Saved Preferences

Preferences are stored in the browser using localStorage under the key:

parisii_prefs_v1

The default preferences are:

* Theme: dark
* Font size: normal
* Contrast: normal

Main Functions

loadPrefs()

Loads saved preferences from localStorage. If no saved preferences exist, or if the stored data cannot be read, the function returns the default preferences.

savePrefs()

Saves the current preferences to localStorage so they can be remembered when the user returns to the application.

applyPrefs()

Applies the selected preferences to the page by adding or removing CSS classes on the body element.

The classes controlled by this function are:

* theme-dark
* font-large
* contrast-high

These classes allow the CSS file to change the visual appearance of the whole application.

setPrefs()

Updates one or more preferences, saves the new preferences, applies them to the page and returns the updated preference object.

wireQuickButtons()

Connects the header accessibility buttons to the preference system. These buttons allow the user to quickly change:

* Theme
* Contrast
* Font size
* Font size reset

Accessibility Support

The file updates the aria-pressed attribute on the quick-access buttons. This helps assistive technologies understand whether a button is currently active.

Event System

When preferences are applied, the file dispatches a custom event:

parisii:prefs

This allows other parts of the application, such as the Settings page, to stay synchronised with the current preference state.

Why This Is Useful

Separating the preference system into its own file keeps accessibility logic reusable across the whole application. It also makes the project easier to maintain because appearance and accessibility behaviour are handled in one central place.



games/settings.js – Settings Page Module

The games/settings.js file controls the Settings page that appears inside the main application area.

Purpose

This module gives users a central place to adjust appearance settings and game settings. It connects the visible Settings page to the wider preference and storage systems.

Difference Between settings.js and games/settings.js

There are two settings-related files in the project:

* settings.js manages global preferences such as theme, font size and contrast.
* games/settings.js displays the Settings page and lets users change those preferences through dropdown controls.

This separation keeps the global preference logic separate from the page interface.

Game Settings Storage

Game-specific settings are saved in localStorage under the key:

parisii_game_settings_v1

The default game settings are:

* Quiz timer: 10 seconds
* Quiz question count: 10
* Bingo calling speed: 5 seconds
* Bingo number pool: 75

How It Works

When the Settings page loads, the module:

1. Loads the current appearance preferences.
2. Loads the saved game settings.
3. Builds the Settings page interface.
4. Sets each dropdown to match the saved values.
5. Adds event listeners to detect user changes.
6. Saves updated settings to localStorage.

Appearance Settings

The Settings page allows users to change:

* Theme
* Font size
* Contrast

These changes are passed to the global preference system using setPrefs() from settings.js.

Game Settings

The Settings page also allows users to configure:

* Time per quiz question
* Number of quiz questions
* Bingo calling speed
* Bingo number pool size

These values are saved separately from the appearance preferences because they affect gameplay rather than the visual theme.

Synchronising Controls

The setSelectValue() helper updates dropdowns when saved settings need to be pushed into live controls elsewhere in the application. This helps keep settings consistent if related controls already exist on another page.

Why This Is Useful

This module improves user control by allowing the app to remember both accessibility choices and gameplay preferences. It also makes the project easier to expand because future settings can be added to this page without changing the main application structure.



state.js

A placeholder file reserved for future development.

The original design anticipated the possible need for a central state management module to share data between different parts of the application. During development this was not required, so the file currently remains unused.

Keeping the file in the project leaves a clear location for future shared state functionality if the application grows in complexity.


games/home.js – Home Module

The home.js file controls the application’s landing page.

Purpose

The Home page acts as the entry point to the application and provides users with an overview of the available features before they begin interacting with the toolkit.

How It Works

When the router loads the Home module, the init() function inserts the Home page content into the application’s main content area.

The page introduces the four main activities:

* Seat Selector
* Bingo
* Quiz
* Battleships

Each activity is displayed using a card-based layout with a short explanation of its purpose.

Accessibility Information

The Home page also highlights the accessibility features available throughout the application, including:

* Dark mode
* Scalable text
* High-contrast mode

This helps communicate the application’s accessibility-first design approach from the moment the user enters the system.

Design Approach

The Home page was designed as an information dashboard rather than a simple menu. Its purpose is to explain the application’s capabilities and help users understand the available activities before navigation takes place.

Why This Is Useful

Providing a dedicated landing page improves usability by introducing the application’s features and accessibility options in a clear and structured way. It also creates a more professional user experience than immediately presenting users with individual tools or games.



games/seat.js – Seat Selector Module

The seat.js file controls the Seat Selector activity. This is one of the more complex modules in the application because it manages user input, saved seat data, random seat allocation and different operating modes.

Purpose

The Seat Selector was designed to help a teacher or classroom leader assign seats in a more interactive way. It uses Beatles songs as part of the allocation process, making a normal classroom task more engaging.

Data Used

This module imports data from two files:

* data/songs.js
* data/quotes.js

The song data is used when assigning seats. The quote data is used to display random Beatles-related quotes during the activity.

Local Storage

Seat data is saved in localStorage using the key:

parisii_seat_state_v2

This means the seat state can be remembered even if the page is refreshed.

Saved information includes:

* Current mode
* Class size
* Auto assignment speed
* Name list
* Seat assignments
* Claimed seats
* Assigned songs

Main Modes

The Seat Selector supports three modes.

Manual Mode

In Manual mode, the teacher enters a student name and the app randomly assigns that student to an available seat.

Auto Assign Mode

In Auto Assign mode, the app automatically assigns students at timed intervals. The user can provide a name list or allow the app to generate fallback names such as Student 1, Student 2 and so on.

Self-Serve Mode

In Self-Serve mode, students can choose from visible Beatles songs and claim their own seat by entering their name.

Randomisation

The module includes helper functions for random selection and shuffling. Where available, it uses the browser’s crypto API for stronger randomness, falling back to Math.random() if needed.

This is used for:

* Picking random seats
* Assigning songs
* Displaying random quotes
* Shuffling song choices in Self-Serve mode

Safety and Validation

The module includes an esc() helper function to safely display user-entered text in the page. This reduces the risk of unwanted HTML being inserted through names or song values.

It also checks whether a name has already been used, helping prevent duplicate student entries.

Dynamic Rendering

The Seat Selector does not use separate HTML pages. Instead, it builds the interface dynamically inside the main application container. The visible controls change depending on the selected mode.

For example:

* Manual mode shows a student name input.
* Auto mode shows name list and timing controls.
* Self-Serve mode shows name and song selection controls.

Why This Is Useful

This module demonstrates several important front-end development ideas:

* Working with imported data
* Saving and loading state with localStorage
* Updating the page dynamically
* Handling user input
* Preventing duplicate entries
* Using different modes within one feature
* Keeping data and interface behaviour connected

The Seat Selector is a good example of how the project combines classroom usefulness with interactive JavaScript logic.



games/bingo.js – Bingo Caller Module

The bingo.js file controls the Bingo Caller activity. It creates an interactive bingo experience using Beatles-themed facts attached to each numbered ball.

Purpose

The Bingo Caller was designed as a classroom activity tool. Instead of only calling numbers, each ball is connected to a Beatles or Liverpool-related fact, making the activity more engaging and educational.

Ball Data

The module contains a fixed set of 75 bingo balls. Each ball has:

* A number
* A short Beatles or Liverpool-related fact

The user can choose whether to play with:

* 25 balls
* 50 balls
* 75 balls

Bingo Buckets

The module uses traditional bingo letter groups:

* B: 1–15
* I: 16–30
* N: 31–45
* G: 46–60
* O: 61–75

The bucketFor() function works out which letter group a number belongs to.

Randomisation

The bingo deck is shuffled before play begins. The module uses the browser crypto API where available for stronger random number generation, with Math.random() as a fallback.

This means each game produces a different calling order.

Game State

The module tracks:

* The shuffled deck
* Drawn balls
* The current ball
* Whether the game is idle, counting down, running or finished
* Auto-play timers
* Countdown timers

Manual and Automatic Play

The module supports both manual and automatic play.

In manual mode, the user clicks “Next Ball” to call each number.

In automatic mode, the user starts the caller and the app calls balls at timed intervals after an optional countdown.

Countdown System

Before automatic play begins, the app can show a countdown. The available countdown options include:

* 10 seconds
* 30 seconds
* 1 minute
* 5 minutes

This gives a class time to get ready before the bingo caller starts.

Audio Feedback

The module uses the Web Audio API to create simple sound effects for:

* Ball calls
* Starting countdown
* Game finish celebration

These sounds are generated directly in JavaScript rather than relying on external audio files.

User Interface

The Bingo interface includes:

* Ball set selector
* Auto speed selector
* Countdown selector
* Start, stop, next ball and reset buttons
* Large current ball display
* Beatles/Liverpool fact display
* Called balls history
* End-of-game overlay

Reset and Finish Behaviour

The resetBoard() function clears the current game and prepares a fresh shuffled deck.

When all balls have been drawn, the game enters a finished state and displays a BINGO celebration overlay.

Why This Is Useful

This module demonstrates several important front-end development concepts:

* Dynamic interface rendering
* State management within a module
* Timers using setInterval
* Manual and automatic control modes
* Audio generation with the Web Audio API
* Randomisation and shuffling
* Defensive UI control disabling
* Game reset and completion logic

The Bingo Caller shows how a simple classroom game can be turned into a more interactive and themed learning activity.



games/quiz.js – Magical Mystery Quiz Module

The quiz.js file controls the team-based quiz section of the application. It is one of the most complex modules because it manages teams, players, questions, scoring, timers and leaderboard storage.

Purpose

The quiz was designed as a classroom team activity. It allows a teacher or group leader to run a Beatles-themed quiz with multiple teams, optional player names, timed questions and a scoring system.

Question Data

The module imports quiz questions from:

data/quizQuestions.js

Each question can include:

* Question text
* Answer options
* Correct answer index
* Difficulty level
* Supporting fact

Team System

The quiz uses a fixed list of themed teams, including:

* Sun Kings
* The Beatles
* Maxwell’s Silver Hammers
* Sgt Peppers
* Mean Mr Mustards
* Octopuses
* Magical Mysteries
* Cavern Club
* Let It Bees
* Abbey Road Zebras
* Strawberry Fields
* Walruses

Users can select between 2 and 12 teams before starting the quiz.

Player Names

Each selected team can have optional player names. The number of players per team can be adjusted, with a maximum of five players per team.

This makes the quiz suitable for group classroom use rather than just single-player use.

Quiz Settings

The top control bar allows the user to configure:

* Number of questions
* Difficulty level
* Timer length
* Shuffle on or off
* Players per team

These settings are applied before the quiz starts.

Leaderboard Storage

The quiz saves recent results in localStorage using the key:

parisii_quiz_leaderboard_v1

The leaderboard stores recent game results and keeps the latest 20 entries. This allows the setup screen to show previous winners.

Game Flow

The quiz has three main views:

* Setup
* Play
* End

In the setup view, users choose teams and enter player names.

In the play view, users answer questions, reveal the correct answer and assign scores to teams.

In the end view, the quiz displays the final ranking and podium.

Question Deck

The buildQuestionDeck() function creates the list of questions for a game.

It can:

* Filter questions by difficulty
* Shuffle the question order
* Limit the number of questions
* Fall back to the full question list if no filtered questions are found

Timer System

The quiz includes an optional countdown timer. If enabled, the timer decreases during each question and updates the timer bar visually.

When time runs out, the answer is automatically revealed and teams are marked as having no answer unless scored otherwise.

Scoring System

After the answer is revealed, the user can click teams to assign scoring marks.

The scoring system supports:

* Correct answer
* Fastest correct answer
* Wrong answer
* No answer

The fastest correct team receives extra points, while wrong or missed answers lose points.

End Screen

At the end of the quiz, teams are sorted by score. The module displays:

* Top three podium
* Full team ranking
* Final scores
* Player names
* Options to play again, return to setup or clear the leaderboard

Dynamic Styling

The quiz injects its own CSS into the document once. This keeps the quiz-specific layout and visual design close to the module that uses it.

The injected CSS controls areas such as:

* Team chips
* Score tiles
* Question cards
* Answer buttons
* Timer bar
* Podium cards

Why This Is Useful

This module demonstrates several front-end development concepts:

* Importing external question data
* Dynamic interface rendering
* Team selection and roster management
* Local storage leaderboard
* Question filtering and shuffling
* Timer-based behaviour
* Score tracking
* Conditional rendering between setup, play and end views
* Keyboard-accessible team selection
* Safe rendering of user-entered text

The quiz module is a strong example of how the project combines classroom interaction, game logic and state management in a browser-based application.








