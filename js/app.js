// js/app.js

import { wireQuickButtons, applyPrefs, loadPrefs } from "./settings.js";
import { loadGame } from "./router.js";

function initNavigation() {
  document.querySelectorAll("[data-game]").forEach((button) => {
    if (button.__parisiiNavWired) return;
    button.__parisiiNavWired = true;

    button.addEventListener("click", () => {
      const game = button.dataset.game;
      if (game) loadGame(game);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Apply saved preferences immediately
  applyPrefs(loadPrefs());

  // Wire accessibility header buttons
  wireQuickButtons();

  // Initialize navigation
  initNavigation();

  // Load default route
  loadGame("home");
});