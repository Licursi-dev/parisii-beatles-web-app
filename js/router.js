// js/router.js

import { homeGame } from "./games/home.js";
import { seatGame } from "./games/seat.js";
import { bingoGame } from "./games/bingo.js";
import { quizGame } from "./games/quiz.js";
import { battleshipsGame } from "./games/battleships.js";
import { settingsGame } from "./games/settings.js";

const games = {
  home: homeGame,
  seat: seatGame,
  bingo: bingoGame,
  quiz: quizGame,
  battleships: battleshipsGame,
  settings: settingsGame,
};

export function loadGame(name = "home") {
  const container = document.getElementById("game-container");
  if (!container) return;

  // Clear current view
  container.innerHTML = "";

  const game = games[name];

  if (!game || typeof game.init !== "function") {
    container.innerHTML = `
      <section class="panel">
        <h2>Page not found</h2>
        <p>The requested section could not be loaded.</p>
      </section>
    `;
    return;
  }

  // Initialize selected game
  game.init(container);
}