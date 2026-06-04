// js/settings.js
const PREFS_KEY = "parisii_prefs_v1";

const DEFAULT_PREFS = {
  theme: "dark",     // light | dark
  font: "normal",     // normal | large
  contrast: "normal", // normal | high
};

// ----- Load / Save -----
export function loadPrefs() {
  try {
    const stored = JSON.parse(localStorage.getItem(PREFS_KEY) || "{}");
    return { ...DEFAULT_PREFS, ...stored };
  } catch {
    return { ...DEFAULT_PREFS };
  }
}

export function savePrefs(prefs) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs || {}));
  } catch {}
}

// ----- Apply to DOM -----
export function applyPrefs(prefs) {
  const p = { ...DEFAULT_PREFS, ...(prefs || {}) };

  document.body.classList.toggle("theme-dark", p.theme === "dark");
  document.body.classList.toggle("font-large", p.font === "large");
  document.body.classList.toggle("contrast-high", p.contrast === "high");

  document.dispatchEvent(new CustomEvent("parisii:prefs", { detail: p }));
}

export function setPrefs(patch) {
  const current = loadPrefs();
  const next = { ...current, ...(patch || {}) };
  savePrefs(next);
  applyPrefs(next);
  return next;
}

// ----- Header quick buttons (YOUR IDs) -----
function syncQuickButtonsUI(prefs) {
  const p = { ...DEFAULT_PREFS, ...(prefs || {}) };

  const themeBtn = document.getElementById("btn-theme");
  const fontBtn = document.getElementById("btn-font");
  const contrastBtn = document.getElementById("btn-contrast");

  if (themeBtn) themeBtn.setAttribute("aria-pressed", (p.theme === "dark").toString());
  if (fontBtn) fontBtn.setAttribute("aria-pressed", (p.font === "large").toString());
  if (contrastBtn) contrastBtn.setAttribute("aria-pressed", (p.contrast === "high").toString());
}

export function wireQuickButtons() {
  const themeBtn = document.getElementById("btn-theme");
  const contrastBtn = document.getElementById("btn-contrast");
  const fontBtn = document.getElementById("btn-font");
  const fontResetBtn = document.getElementById("btn-font-reset");

  const initial = loadPrefs();
  applyPrefs(initial);
  syncQuickButtonsUI(initial);

  if (themeBtn && !themeBtn.__wired) {
    themeBtn.__wired = true;
    themeBtn.addEventListener("click", () => {
      const p = loadPrefs();
      const next = setPrefs({ theme: p.theme === "dark" ? "light" : "dark" });
      syncQuickButtonsUI(next);
    });
  }

  if (contrastBtn && !contrastBtn.__wired) {
    contrastBtn.__wired = true;
    contrastBtn.addEventListener("click", () => {
      const p = loadPrefs();
      const next = setPrefs({ contrast: p.contrast === "high" ? "normal" : "high" });
      syncQuickButtonsUI(next);
    });
  }

  if (fontBtn && !fontBtn.__wired) {
    fontBtn.__wired = true;
    fontBtn.addEventListener("click", () => {
      const p = loadPrefs();
      const next = setPrefs({ font: p.font === "large" ? "normal" : "large" });
      syncQuickButtonsUI(next);
    });
  }

  if (fontResetBtn && !fontResetBtn.__wired) {
    fontResetBtn.__wired = true;
    fontResetBtn.addEventListener("click", () => {
      const next = setPrefs({ font: "normal" });
      syncQuickButtonsUI(next);
    });
  }

  // If Settings page changes prefs, keep header buttons synced
  document.addEventListener("parisii:prefs", (e) => {
    syncQuickButtonsUI((e && e.detail) || loadPrefs());
  });
}