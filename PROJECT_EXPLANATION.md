Application Architecture

index.html – Application Shell

Purpose

How It Works

1. The browser loads index.html.
2. styles.css is loaded.
3. The page header and navigation bar are displayed.
4. app.js loads as a JavaScript module.
5. Accessibility preferences are applied.
6. Navigation controls are connected.
7. The Home page is loaded into the game container.

Page Structure

* Header containing the application title
* Accessibility controls
* Navigation menu
* Main game container

Navigation System

* Home
* Seat Selector
* Bingo
* Quiz
* Battleships
* Settings

Each navigation button contains a data-game attribute which is used by router.js to determine which module should be displayed.

Main Content Area

The game-container element acts as the application's display area. Individual modules are dynamically rendered into this container by the router.

Accessibility Support

The page includes:

* Semantic HTML elements
* aria-label attributes
* aria-pressed state tracking
* Responsive viewport settings

Why This Is Useful

The index.html file provides the foundation for the entire application. It creates a consistent layout while allowing JavaScript modules to load content dynamically, supporting the single-page application architecture used throughout the project.


css/styles.css – Global Styling System

The styles.css file controls the visual design of the Parisii Beatles Web App. It provides the main layout, colour system, responsive behaviour, accessibility styling and game-specific interface design.

Purpose

The file acts as the central styling system for the entire application. It keeps the visual design consistent across the Home page, Settings page, Seat Selector, Bingo Caller and Battleships game.

Core Design System

The stylesheet uses CSS custom properties to define the main design values.

These include:

* Background colour
* Surface colour
* Text colour
* Muted text colour
* Border colour
* Accent colours
* Border radius
* Shadow styles
* Maximum content width
* Font sizing

Using shared variables helps keep the interface consistent and makes future design changes easier.

Theme Support

The stylesheet supports multiple appearance modes:

* Light theme
* Dark theme
* High-contrast mode
* Larger text mode

These modes are controlled by CSS classes added to the body element:

* theme-dark
* contrast-high
* font-large

These classes are applied by the JavaScript preferences system.

Accessibility Styling

The stylesheet includes accessibility-focused styling for:

* Focus states
* Keyboard navigation
* Button hover states
* aria-pressed active states
* Larger text scaling
* High-contrast borders
* Reduced motion support

The reduced motion section allows animations and transitions to be disabled if a low-motion class is applied.

Layout System

The file defines the main layout for:

* Header
* Navigation bar
* Main game container
* Shared panels
* Cards
* Forms
* Buttons

The layout uses flexible spacing, maximum widths and wrapping behaviour to help the app work across different screen sizes.

Header and Navigation

The header contains the application title and accessibility controls.

The navigation bar uses flexible wrapping so buttons can move onto new lines on smaller screens.

This helps keep navigation usable on desktop, tablet and mobile layouts.

Shared Components

Several reusable UI styles are defined for use across the application.

These include:

* Panels
* Cards
* Buttons
* Primary buttons
* Form fields
* Select menus
* Text inputs
* Warning messages
* Muted text

This avoids repeating the same styling rules across each game module.

Home Page Styling

The Home page uses a responsive card grid.

Each activity is displayed inside a card, allowing the homepage to act as a clear dashboard for the application.

Settings Page Styling

The Settings page uses grouped blocks and grid layouts to organise appearance and game settings.

This makes the controls easier to read and keeps related options grouped together.

Seat Selector Styling

The Seat Selector section includes styles for:

* Seat controls
* Mode controls
* Name input fields
* Warning messages
* Random quote display
* Seat grid
* Claimed and available seats

The seat grid uses responsive columns so the layout adapts to the available screen width.

Bingo Styling

The Bingo section includes the largest amount of specialised styling.

It controls:

* Bingo top bar
* Ball selectors
* Action buttons
* Main bingo stage
* Large current ball
* Called balls history
* Countdown overlay
* Finish overlay
* Bingo letter animation
* Confetti-style finish effect
* B/I/N/G/O colour groups

The styling helps make the Bingo Caller feel more interactive and visually engaging.

Battleships Styling

The Battleships section includes custom layout and visual rules for:

* Game board layout
* Board wrappers
* Grid cells
* Hit and miss markers
* Revealed ships
* Team input panels
* Scoreboard
* Fleet status displays
* Torpedo animation
* Yellow submarine animation
* Win effects
* Cheat sheet panel

These styles support the custom image-based Battleships game interface.

Responsive Design

The stylesheet includes responsive rules for smaller screens.

Examples include:

* Smaller bingo ball sizing on mobile screens
* Flexible navigation wrapping
* Responsive card grids
* Mobile-friendly watermark scaling
* Board sizing using max-width values

This helps the application remain usable across different screen sizes.

Branding

The stylesheet includes a small fixed licursi.dev watermark.

This acts as a portfolio-style signature without interfering with the main content.

Why This Is Useful

This file provides the visual foundation for the whole project. It keeps the application consistent, accessible and responsive while supporting the different requirements of each game module.

The stylesheet demonstrates:

* CSS custom properties
* Theme switching
* Responsive layout design
* Reusable component styling
* Accessibility-aware focus states
* Animation effects
* Game-specific interface design
* Clear visual organisation

By keeping the styling in one main file, the project has a single source of truth for its visual design.





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


## games/battleships.js – Battleships Module

### Purpose

The Battleships module is a Beatles-themed adaptation of the classic Battleships game. Instead of firing at grid coordinates directly, players use their knowledge of Beatles song release years and chart performance to locate and sink enemy ships.

### Main Responsibilities

This module is responsible for:

* Building the game boards
* Creating fleets for both teams
* Managing turn-based gameplay
* Converting song data into board coordinates
* Handling hits, misses and ship destruction
* Tracking scores
* Saving team names and scores
* Displaying animations and game feedback

### Asset Management

The game uses a central ASSETS object to manage all visual resources.

These include:

* Board background images
* Hit markers
* Miss markers
* Torpedo animations
* Yellow submarine graphics
* Red fleet ship images
* Blue fleet ship images

Using a single asset configuration makes the game easier to maintain because image paths only need to be updated in one place.

### Song Data

The module contains a collection of Beatles songs with:

* Song title
* Release year
* Number of chart weeks

Example:

javascript {   name: "Hey Jude",   year: 1968,   weeks: 16 } 

These values are used to generate coordinates on the game board.

### Coordinate System

The game board consists of a 10 × 10 grid.

Columns represent years:

* 1961
* 1962
* 1963
* 1964
* 1965
* 1966
* 1967
* 1968
* 1969
* 1970

Rows represent chart-week ranges:

* 0 weeks
* 1–3 weeks
* 4–6 weeks
* 7–9 weeks
* 10–12 weeks
* 13–15 weeks
* 16–18 weeks
* 19–21 weeks
* 22–24 weeks
* 25–33 weeks

The getIndex() function converts a song's year and chart weeks into a unique board position.

### Fleet Creation

Each team receives a fleet containing:

* Carrier (5 spaces)
* Battleship (4 spaces)
* Cruiser (3 spaces)
* Submarine (3 spaces)
* Destroyer (2 spaces)

The createFleet() function randomly assigns song coordinate groups to each ship.

This ensures that every game starts with a different fleet layout.

### Board Generation

The buildBoard() function dynamically creates the 100 board cells used during gameplay.

This allows the board to be rebuilt easily when a new game starts.

### Team Management

The game supports two teams:

* Red Team
* Blue Team

Users can customise team names before playing.

The module updates:

* Fleet labels
* Scoreboard labels
* Turn indicators

whenever team names change.

### Local Storage

The game uses localStorage to save:

#### Scores

Stored using:

text bb-scores 

#### Team Names

Stored using:

text bb-team-names 

This allows scores and team names to persist between browser sessions.

### Turn System

Gameplay alternates between:

* Red Team
* Blue Team

The active team enters:

* Release year
* Chart weeks

The game converts these values into a board coordinate and checks whether it matches the current target location.

### Hit Detection

The handleShot() function manages attacks.

When a player fires:

1. Input values are validated.
2. Coordinates are calculated.
3. A torpedo animation is launched.
4. The target cell is checked.
5. A hit or miss marker is displayed.
6. Ship status is updated.

### Ship Destruction

When every part of a ship has been hit:

* The ship is marked as sunk.
* The ship image becomes visible in the fleet panel.
* A status message is displayed.

The allShipsSunk() function checks whether an entire fleet has been destroyed.

### Final Turn Rule

To keep matches fair, the game includes a final-turn system.

When one fleet is destroyed:

* The opposing team receives one final shot.
* Scores are updated.
* The winner is determined after the final turn is completed.

### Animations

The module includes several visual effects:

* Torpedo launch animation
* Yellow submarine animation
* Hit markers
* Miss markers
* Ship reveal animations
* Victory flash effects

These features help make the game feel more interactive and engaging.

### Cheat Sheet

A built-in cheat sheet provides reference information for:

* Song names
* Release years
* Chart weeks

This allows the game to be used as both a competition and a learning activity.

### Why This Module Is Important

This module demonstrates:

* Dynamic board generation
* Data-driven game design
* Turn-based game logic
* State management
* Animation handling
* Local storage persistence
* DOM manipulation
* User input validation
* Educational gamification

The Battleships module is one of the most technically complex sections of the Parisii Beatles Web App because it combines historical Beatles data, game mechanics, animations and persistent scoring into a single interactive experience.


songs.js – Beatles Song Library

The songs.js file stores the Beatles song data used throughout the application. It provides a central collection of song titles that can be accessed by multiple modules without duplicating information.

Responsibilities

Stores Beatles song titles in a structured format.
Provides song data to other modules.
Supports random song selection within games.
Separates application data from application logic.
Makes future updates to the song library easier.

How It Works

The file exports a single array called songList.

Each entry contains the name of a Beatles song:

{
  name: "Hey Jude"
}

Other modules can import songList and use the data when required.

For example, the Seat Selector module imports songs.js and randomly assigns songs to students. Because the song data is stored separately from the game logic, new songs can be added without changing the code that uses them.

This file acts as a reusable data source for the application and helps keep the project organised and maintainable.



data/quizQuestions.js – Quiz Question Database

The data/quizQuestions.js file stores all quiz questions used by the Magical Mystery Quiz activity. It acts as the central question database for the quiz system.

Purpose

The file provides a structured collection of Beatles-themed multiple-choice questions that can be loaded by the quiz module during gameplay.

Separating the question data from the quiz logic makes the application easier to maintain and expand.

Question Structure

Each question is stored as an object containing:

* Unique question ID
* Difficulty level
* Question text
* Four answer options
* Correct answer index
* Supporting fact

This structure allows the quiz module to display questions, validate answers and provide educational feedback after each round.

Question Categories

Questions cover a wide range of Beatles-related topics, including:

* Band history
* Albums
* Songs
* Films
* Members
* Recording sessions
* Chart achievements
* Liverpool history
* Solo careers
* Famous events

This variety helps keep the quiz engaging while testing different areas of Beatles knowledge.

Difficulty Levels

Questions are assigned difficulty ratings:

* Easy
* Medium

The quiz module can use these values when filtering questions by difficulty before a game begins.

Question Organisation

The question bank is divided into two sections:

* QUIZ_QUESTIONS_PART1
* QUIZ_QUESTIONS_PART2

This improves readability and makes the large dataset easier to manage during development.

At the end of the file, both sections are combined into a single exported array:

quizQuestions

This provides a single source of quiz data for the rest of the application.

Educational Facts

Every question includes a fact field.

After a question is answered, the quiz can display this fact to provide additional Beatles knowledge and context.

Examples include:

* Recording information
* Historical events
* Chart achievements
* Songwriting details
* Album background information

This transforms the quiz from a simple game into a learning activity.

Integration With Quiz Module

The primary user of this file is:

* games/quiz.js

The quiz module imports quizQuestions and uses the data to:

* Build question decks
* Filter by difficulty
* Shuffle questions
* Display answer options
* Reveal correct answers
* Show supporting facts

Design Benefits

This approach provides several advantages:

* Separates data from game logic
* Simplifies maintenance
* Makes adding new questions easier
* Supports difficulty filtering
* Supports question shuffling
* Improves code organisation
* Encourages future expansion

Why This Is Useful

Keeping quiz content inside a dedicated data file makes the application easier to update and maintain. New questions can be added without changing the quiz engine itself, allowing the question database to grow independently of the gameplay logic.



data/quotes.js – Quotes Database

The data/quotes.js file stores the collection of quotes used throughout the application. It acts as a reusable source of motivational, philosophical and historical quotations.

Purpose

The file provides a central database of quotes that can be displayed by other modules without duplicating content throughout the project.

Separating quote data from application logic improves organisation and makes future updates easier.

Quote Structure

Each quote is stored as an object containing:

* Quote text
* Author name

This structure allows the application to display both the quotation and its attribution when required.

Quote Categories

The collection includes quotes from a variety of historical figures, philosophers and writers, including:

* Socrates
* Aristotle
* Marcus Aurelius
* Seneca
* Confucius
* Lao Tzu
* Albert Einstein
* Theodore Roosevelt
* Martin Luther King Jr.
* Mahatma Gandhi
* Oscar Wilde
* Mark Twain

The wide variety of authors helps provide diverse and engaging content.

How It Works

The module exports a single array called:

QUOTES

Other modules can import this array and select quotes for display.

The data can be used for:

* Random quote generation
* Motivational messages
* Educational content
* Classroom engagement features

Random Selection

The quotes are designed to work well with randomisation systems.

Modules can select a random entry from the array whenever a new quote needs to be displayed, helping ensure variety for users.

Integration With Other Modules

The primary user of this file is:

* games/seat.js

The Seat Selector module displays random quotes during seat assignment activities to provide additional interest and engagement.

Design Benefits

This approach provides several advantages:

* Separates content from application logic
* Simplifies maintenance
* Makes adding new quotes easier
* Supports random quote generation
* Encourages reuse across modules
* Improves project organisation

Why This Is Useful

Keeping quote data in a dedicated module makes the application easier to maintain and expand. New quotations can be added without changing the code that displays them, allowing content updates to be made independently from application functionality.


assets/board and assets/markers – Battleships Visual Assets

The assets/board and assets/markers folders contain the visual resources used by the Battleships module.

Purpose

These assets provide the graphical game board and the visual feedback shown when players successfully hit or miss a target.

Board Asset

Folder:

assets/board

File:

* bb_board.png

The board image forms the background of the Battleships game.

It contains:

* The 10 × 10 game grid
* Year labels from 1961–1970
* Chart-week labels
* Beatles-themed underwater artwork
* Decorative Yellow Submarine styling

The board image is displayed underneath the dynamically generated grid cells created by the Battleships module.

Marker Assets

Folder:

assets/markers

Files:

* bb_marker_hit.png
* bb_marker_miss.png

These images provide visual feedback after a player takes a shot.

Hit Marker

The hit marker is displayed when a player successfully strikes part of an enemy ship.

It shows:

* An underwater explosion effect
* A damaged submarine symbol
* A bright highlighted impact graphic

This makes successful attacks immediately visible to both teams.

Miss Marker

The miss marker is displayed when a player's shot does not hit a ship.

It shows:

* A water splash effect
* Ripple animations
* A calmer visual indicator than the hit marker

This clearly distinguishes missed shots from successful attacks.

How They Work Together

During gameplay:

1. The board image provides the playing surface.
2. The Battleships module converts player inputs into coordinates.
3. The selected grid cell is checked for a ship.
4. A hit or miss marker is placed onto the board.
5. The marker remains visible for the remainder of the game.

Why These Assets Are Important

These visual resources improve the user experience by:

* Making the game easier to understand
* Providing immediate visual feedback
* Reinforcing the Beatles-themed presentation
* Supporting the Battleships gameplay mechanics
* Creating a more engaging and professional appearance

assets/ships – Battleships Fleet Assets

The assets/ships folder contains the ship graphics used by the Battleships module.

Purpose

These images visually represent the fleets used during gameplay. Ships remain hidden while the game is in progress and are revealed when they are sunk.

Fleet Structure

Each team receives a fleet consisting of five ship types:

* Carrier
* Battleship
* Cruiser
* Submarine
* Destroyer

To support both teams, each ship is provided in two colour variations:

* Blue Fleet
* Red Fleet

Ship Files

Battleship

* bb_ship_battleship_blue.png
* bb_ship_battleship_red.png

Carrier

* bb_ship_carrier_blue.png
* bb_ship_carrier_red.png

Cruiser

* bb_ship_cruiser_blue.png
* bb_ship_cruiser_red.png

Destroyer

* bb_ship_destroyer_blue.png
* bb_ship_destroyer_red.png

Submarine

* bb_ship_submarine_blue.png
* bb_ship_submarine_red.png

How They Are Used

At the start of a game, each team is assigned a randomly generated fleet location.

Ships are initially hidden from view.

When all coordinate positions belonging to a ship have been successfully hit:

1. The ship is marked as sunk.
2. The corresponding ship image is revealed.
3. The fleet display updates to show the destroyed vessel.
4. Players receive visual confirmation of their progress.

Visual Design

The ship graphics use a simple stylised design that matches the Beatles-themed naval appearance of the game.

The separate red and blue versions help players quickly identify which fleet each ship belongs to.

Why These Assets Are Important

These assets improve gameplay by:

* Providing visual feedback when ships are destroyed.
* Making fleet progress easier to track.
* Supporting the team-based game structure.
* Improving player engagement.
* Reinforcing the Battleships theme throughout the application.

assets/theme – Battleships Animation Assets

The assets/theme folder contains the animated visual assets used during Battleships gameplay.

Purpose

These assets help transform a traditional Battleships game into a Beatles-themed experience by replacing standard military-style effects with custom Beatles-inspired animations.

Files

* bb_torpedo.png
* bb_yellow_submarine.png

Torpedo Asset

File:

* bb_torpedo.png

The torpedo image is used during attack sequences.

When a player enters a release year and chart-week combination, the Battleships module converts those values into a board coordinate.

After the coordinate is calculated:

1. A torpedo animation is launched.
2. The torpedo moves toward the target location.
3. The board checks whether the coordinate contains a ship.
4. A hit or miss marker is displayed.

This animation provides visual feedback before the attack result is revealed.

Yellow Submarine Asset

File:

* bb_yellow_submarine.png

The Yellow Submarine graphic is used as the central Beatles-themed animation within the game.

Rather than using traditional naval imagery, the application uses the famous Yellow Submarine to reinforce the Beatles theme.

During gameplay, the Yellow Submarine appears as part of the attack sequence and visual effects system.

It helps create a stronger connection between the game mechanics and the Beatles content used throughout the application.

How These Assets Work Together

When a team enters attack coordinates:

1. The coordinate is validated.
2. The Battleships module converts the values into a board location.
3. The Yellow Submarine animation is triggered.
4. A torpedo is launched toward the target.
5. The game determines whether the attack is a hit or a miss.
6. The appropriate marker is displayed.
7. Ship status is updated if damage has occurred.

Why These Assets Are Important

These assets improve the game by:

* Reinforcing the Beatles theme.
* Providing visual feedback during attacks.
* Making gameplay feel more interactive.
* Supporting the animation system.
* Creating a more engaging player experience.
* Distinguishing the game from a traditional Battleships implementation.

* Development Notes

Responsive Layout

The game is fully playable on desktop and mobile devices, but I experimented with several desktop layouts to improve the user experience.

One challenge was balancing the information panel (team controls, fleet status and game messages) with the two game boards. Although CSS Grid made it possible to rearrange elements, changing the panel layout often affected the surrounding page because the grid sizing also influenced the main game layout.

CSS Grid Challenges

During development I explored several layouts including:

* Stacking the team controls vertically.
* Displaying fleet status panels to the left and right of the controls.
* Placing the Red and Blue team input panels side-by-side.
* Using CSS Grid columns to reduce scrolling on desktop.

While some layouts worked individually, they introduced unexpected spacing and alignment issues elsewhere in the page. Rather than over-complicate the CSS, I chose the layout that provided the best balance between readability and stability.

Asset Scaling

The game uses custom PNG graphics for ships, torpedoes and hit markers.

During testing I found that increasing CSS width and height values did not always visually enlarge the ship graphics as expected. This highlighted that image appearance depends not only on CSS sizing but also on the original image dimensions and transparent padding within the PNG assets.

Future Improvements

Potential future improvements include:

* Refining the desktop control panel to make better use of horizontal screen space.
* Creating larger ship and marker assets specifically for gameplay.
* Separating the panel layout from the board layout to make responsive adjustments easier.
* Introducing additional CSS breakpoints for widescreen monitors.

  





