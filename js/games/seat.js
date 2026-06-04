// js/games/seat.js
import * as Songs from "../../data/songs.js";
import * as Quotes from "../../data/quotes.js";

const KEY = "parisii_seat_state_v2";

/* -------------------------
   Storage
------------------------- */
function loadState() {
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); }
  catch { return {}; }
}
function saveState(s) {
  try { localStorage.setItem(KEY, JSON.stringify(s || {})); }
  catch {}
}

/* -------------------------
   Safe text
------------------------- */
function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* -------------------------
   Better randomness
------------------------- */
function randInt(max) {
  if (max <= 0) return 0;
  const cryptoObj = globalThis.crypto;
  if (cryptoObj && cryptoObj.getRandomValues) {
    const buf = new Uint32Array(1);
    cryptoObj.getRandomValues(buf);
    return buf[0] % max;
  }
  return Math.floor(Math.random() * max);
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick(arr) {
  return arr && arr.length ? arr[randInt(arr.length)] : null;
}

/* -------------------------
   Data adapters
------------------------- */
function getSongNames() {
  const list =
    (Array.isArray(Songs.songList) && Songs.songList) ||
    (Array.isArray(Songs.songs) && Songs.songs) ||
    (Array.isArray(Songs.SONGS100) && Songs.SONGS100) ||
    [];

  const names = list
    .map((x) => (typeof x === "string" ? x : x?.name))
    .filter(Boolean);

  return Array.from(new Set(names));
}

function getQuotes() {
  // expects: export const QUOTES = [{text, author}, ...]
  const q = Array.isArray(Quotes.QUOTES) ? Quotes.QUOTES : [];
  return q
    .map((x) => {
      if (!x) return null;
      const text = (x.text || "").trim();
      const author = (x.author || "").trim();
      if (!text) return null;
      return { text, author };
    })
    .filter(Boolean);
}

function formatQuote(q) {
  if (!q) return "";
  return q.author ? `“${q.text}” — ${q.author}` : `“${q.text}”`;
}

function parseNameList(text) {
  return String(text || "")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function isNameTaken(state, name) {
  return (state.seats || []).some(
    (s) => s.claimed && s.name.toLowerCase() === name.toLowerCase()
  );
}

/* -------------------------
   Seat logic
------------------------- */
const MODES = {
  manual: "Manual (Teacher)",
  auto: "Auto Assign",
  self: "Self-Serve",
};

const DEFAULTS = {
  mode: "manual",
  classSize: 25,
  autoSpeedMs: 2500,
  autoLoop: false,
  autoNameListText: "",
  autoNameIndex: 0,
};

function buildSeats(size) {
  return Array.from({ length: size }, (_, i) => ({
    seat: i + 1,
    name: "",
    song: "",
    claimed: false,
  }));
}

function assignHiddenSong(state, allSongs) {
  const used = new Set(
    (state.seats || [])
      .filter((s) => s.claimed && s.song)
      .map((s) => s.song)
  );
  const remaining = allSongs.filter((s) => !used.has(s));
  return remaining.length ? pick(remaining) : "";
}

function ensureSelfSongs(state, allSongs) {
  // Visible songs only for seats NOT claimed (so claims don't jump around)
  const claimedSongs = new Set(
    (state.seats || [])
      .filter((s) => s.claimed && s.song)
      .map((s) => s.song)
  );

  const availablePool = shuffle(allSongs.filter((x) => !claimedSongs.has(x)));
  let poolIdx = 0;

  for (let i = 0; i < state.seats.length; i++) {
    const seat = state.seats[i];
    if (seat.claimed) continue; // keep its song stable
    seat.song = availablePool[poolIdx++] || "";
    seat.name = ""; // stays empty until claimed
  }
}

function remainingSelfSongs(state) {
  return (state.seats || [])
    .filter((s) => !s.claimed && s.song)
    .map((s) => s.song);
}

/* -------------------------
   UI
------------------------- */
export const seatGame = {
  init(container) {
    const allSongs = getSongNames();
    const quotes = getQuotes();

    // load + normalise
    const persisted = loadState();
    const state = {
      mode: persisted.mode || DEFAULTS.mode,
      classSize: Number(persisted.classSize || DEFAULTS.classSize),
      autoSpeedMs: Number(persisted.autoSpeedMs || DEFAULTS.autoSpeedMs),
      autoLoop: !!persisted.autoLoop,
      autoNameListText: String(persisted.autoNameListText ?? DEFAULTS.autoNameListText),
      autoNameIndex: Number(persisted.autoNameIndex || DEFAULTS.autoNameIndex),
      seats: Array.isArray(persisted.seats) ? persisted.seats : [],
    };

    // build seats if needed
    if (!state.seats.length || state.seats.length !== state.classSize) {
      state.seats = buildSeats(state.classSize);
      state.autoNameIndex = 0;
    }

    // self mode needs visible songs
    if (state.mode === "self" && allSongs.length) {
      ensureSelfSongs(state, allSongs);
    }

    // render
    container.innerHTML = `
      <section class="panel">
        <h2>🎯 Seat Selector</h2>

        <!-- Tutor Settings -->
        <div class="seat-controls">
          <div class="seat-row">
            <label class="field">
              <span>Mode</span>
              <select id="seatMode">
                <option value="manual">${MODES.manual}</option>
                <option value="auto">${MODES.auto}</option>
                <option value="self">${MODES.self}</option>
              </select>
            </label>

            <label class="field">
              <span>Class size</span>
              <select id="seatSize">
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </label>

            <label class="field" id="autoSpeedWrap" style="min-width: 220px; display:none;">
              <span>Auto speed</span>
              <select id="autoSpeed">
                <option value="1500">Fast (1.5s)</option>
                <option value="2500">Normal (2.5s)</option>
                <option value="4000">Slow (4s)</option>
                <option value="6000">Very slow (6s)</option>
              </select>
            </label>

            <button id="seatReset" type="button">↩ Reset</button>
          </div>

          <!-- Mode Controls (only one shows at a time) -->
          <div id="modeControls"></div>

          <div id="songWarn" class="seat-warn" style="display:none">
            Song library not found. Please ensure <code>data/songs.js</code> exports <code>songList</code>.
          </div>

          <div class="seat-quote" id="seatQuote"></div>
        </div>

        <div id="seatGrid" class="seat-grid"></div>
      </section>
    `;

    const modeSel = container.querySelector("#seatMode");
    const sizeSel = container.querySelector("#seatSize");
    const resetBtn = container.querySelector("#seatReset");
    const warn = container.querySelector("#songWarn");
    const quoteEl = container.querySelector("#seatQuote");
    const seatGrid = container.querySelector("#seatGrid");
    const modeControls = container.querySelector("#modeControls");
    const autoSpeedWrap = container.querySelector("#autoSpeedWrap");
    const autoSpeedSel = container.querySelector("#autoSpeed");

    // warn if no songs
    if (!allSongs.length) warn.style.display = "block";

    // set initial values
    modeSel.value = state.mode;
    sizeSel.value = String(state.classSize);
    autoSpeedSel.value = String(state.autoSpeedMs);

    function setRandomQuote() {
      const q = pick(quotes);
      quoteEl.textContent = q ? formatQuote(q) : "";
    }
    setRandomQuote();

    function persist() {
      saveState(state);
    }

    function renderGrid() {
      const showSongsOnSeats = state.mode === "self"; // self mode: always visible
      seatGrid.innerHTML = state.seats.map((s) => {
        const isClaimed = !!s.claimed;

        const songLine =
          (showSongsOnSeats && s.song) || (isClaimed && s.song)
            ? `<div class="seat-song">Song: ${esc(s.song)}</div>`
            : "";

        const statusLine = isClaimed
          ? `<div class="student-name">${esc(s.name)}</div>`
          : `<div class="seat-empty">Available</div>`;

        return `
          <div class="seat ${isClaimed ? "claimed" : ""}">
            ${songLine}
            <div class="seat-number">Seat ${s.seat}</div>
            ${statusLine}
          </div>
        `;
      }).join("");
    }

    // --- Auto loop
    let autoTimer = null;
    function stopAuto() {
      if (autoTimer) clearInterval(autoTimer);
      autoTimer = null;
      const stopBtn = container.querySelector("#autoStop");
      const startBtn = container.querySelector("#autoStart");
      if (stopBtn) stopBtn.disabled = true;
      if (startBtn) startBtn.disabled = false;
      persist();
    }

    function rebuildSeats() {
      stopAuto();
      state.seats = buildSeats(state.classSize);
      state.autoNameIndex = 0;

      if (state.mode === "self" && allSongs.length) {
        ensureSelfSongs(state, allSongs);
      }

      persist();
      setRandomQuote();
      renderModeControls();
      renderGrid();
    }

    function nextNameFromList(list, baseFallback, seatNumber) {
      if (list.length) {
        let idx = state.autoNameIndex || 0;

        if (idx >= list.length) {
          if (!state.autoLoop) return null; // stop condition
          idx = 0;
        }

        const name = list[idx];
        state.autoNameIndex = idx + 1;
        return name;
      }

      // fallback behaviour
      if (baseFallback) return `${baseFallback} ${seatNumber}`;
      return `Student ${seatNumber}`;
    }

    function renderModeControls() {
      autoSpeedWrap.style.display = state.mode === "auto" ? "flex" : "none";
      if (state.mode !== "auto") stopAuto();

      if (state.mode === "manual") {
        modeControls.innerHTML = `
          <div class="seat-row">
            <label class="field grow">
              <span>Student name</span>
              <input id="studentName" type="text" placeholder="Enter student name" autocomplete="off" />
            </label>
            <button id="assignSeat" class="btn-primary" type="button">🎸 Assign Seat</button>
          </div>
        `;

        const nameInput = container.querySelector("#studentName");
        const assignBtn = container.querySelector("#assignSeat");

        assignBtn.addEventListener("click", () => {
          const name = (nameInput.value || "").trim();
          if (!name) return;
          if (isNameTaken(state, name)) {
            alert("Name already taken");
            return;
          }

          const open = state.seats.filter((s) => !s.claimed);
          if (!open.length) return;

          const chosenSeat = pick(open);

          const song = allSongs.length ? (assignHiddenSong(state, allSongs) || pick(allSongs)) : "";
          chosenSeat.claimed = true;
          chosenSeat.name = name;
          chosenSeat.song = song;

          nameInput.value = "";
          persist();
          setRandomQuote();
          renderGrid();
        });

        nameInput.addEventListener("keydown", (e) => {
          if (e.key === "Enter") assignBtn.click();
        });

      } else if (state.mode === "auto") {
        modeControls.innerHTML = `
          <div class="seat-row">
            <label class="field grow">
              <span>Base name (optional)</span>
              <input id="autoBaseName" type="text" placeholder="e.g. Student / Team" autocomplete="off" />
            </label>
            <button id="autoStart" class="btn-primary" type="button">▶ Start Auto</button>
            <button id="autoStop" type="button" disabled>⏸ Stop</button>
          </div>

          <div class="seat-row">
            <label class="field grow">
              <span>Name list (one per line)</span>
              <textarea id="autoNameList" rows="5" placeholder="tina&#10;sam&#10;dave&#10;steve"></textarea>
            </label>

            <label class="field" style="min-width:220px;">
              <span>Behaviour</span>
              <label style="display:flex;gap:10px;align-items:center;font-weight:800">
                <input id="autoLoop" type="checkbox" />
                Loop name list
              </label>
            </label>
          </div>

          <div class="seat-row">
            <div class="muted" id="autoInfo" style="font-weight:800"></div>
          </div>
        `;

        const baseName = container.querySelector("#autoBaseName");
        const startBtn = container.querySelector("#autoStart");
        const stopBtn = container.querySelector("#autoStop");
        const nameListEl = container.querySelector("#autoNameList");
        const loopEl = container.querySelector("#autoLoop");
        const infoEl = container.querySelector("#autoInfo");

        nameListEl.value = state.autoNameListText || "";
        loopEl.checked = !!state.autoLoop;

        function updateInfo() {
          const list = parseNameList(nameListEl.value);
          const remaining = Math.max(0, list.length - (state.autoNameIndex || 0));
          infoEl.textContent = list.length
            ? `Names loaded: ${list.length} • Remaining: ${remaining} • ${loopEl.checked ? "Looping ON" : "Looping OFF"}`
            : `No name list pasted. Auto will use Base name or “Student X”.`;
        }
        updateInfo();

        nameListEl.addEventListener("input", () => {
          state.autoNameListText = nameListEl.value;
          state.autoNameIndex = 0; // less confusing when editing list
          persist();
          updateInfo();
        });

        loopEl.addEventListener("change", () => {
          state.autoLoop = loopEl.checked;
          persist();
          updateInfo();
        });

        startBtn.addEventListener("click", () => {
          stopAuto();

          startBtn.disabled = true;
          stopBtn.disabled = false;

          autoTimer = setInterval(() => {
            const open = state.seats.filter((s) => !s.claimed);
            if (!open.length) {
              stopAuto();
              updateInfo();
              return;
            }

            const chosenSeat = pick(open);

            const list = parseNameList(nameListEl.value);
            const base = (baseName.value || "").trim();
            const name = nextNameFromList(list, base, chosenSeat.seat);

            if (isNameTaken(state, name)) {
              return;
            }

            // stop when list finished and looping off
            if (name === null) {
              stopAuto();
              updateInfo();
              return;
            }

            const song = allSongs.length ? (assignHiddenSong(state, allSongs) || pick(allSongs)) : "";
            chosenSeat.claimed = true;
            chosenSeat.name = name;
            chosenSeat.song = song;

            persist();
            setRandomQuote();
            renderGrid();
            updateInfo();
          }, state.autoSpeedMs);
        });

        stopBtn.addEventListener("click", () => {
          stopAuto();
          updateInfo();
        });

      } else {
        // self
        const remaining = remainingSelfSongs(state);

        modeControls.innerHTML = `
          <div class="seat-row">
            <label class="field" style="min-width:240px;">
              <span>Your name</span>
              <input id="selfName" type="text" placeholder="Enter your name" autocomplete="off" />
            </label>

            <label class="field grow">
              <span>Pick a visible song</span>
              <input id="selfSong" list="selfSongsList" placeholder="Start typing a song..." autocomplete="off" />
              <datalist id="selfSongsList">
                ${remaining.map((n) => `<option value="${esc(n)}"></option>`).join("")}
              </datalist>
            </label>

            <button id="selfAssign" class="btn-primary" type="button">I am here — Assign me</button>
          </div>
          <p class="settings-note">Self-Serve shows songs on seats so students can claim by song.</p>
        `;

        const selfName = container.querySelector("#selfName");
        const selfSong = container.querySelector("#selfSong");
        const selfAssign = container.querySelector("#selfAssign");

        selfAssign.addEventListener("click", () => {
          const name = (selfName.value || "").trim();
          const chosen = (selfSong.value || "").trim();
          if (!name || !chosen) return;
          if (isNameTaken(state, name)) {
            alert("Name already taken");
            return;
          }
          const target = state.seats.find((s) => !s.claimed && s.song === chosen);
          if (!target) return;

          target.claimed = true;
          target.name = name;

          selfName.value = "";
          selfSong.value = "";

          persist();
          setRandomQuote();
          renderModeControls(); // refresh datalist
          renderGrid();
        });

        selfSong.addEventListener("keydown", (e) => {
          if (e.key === "Enter") selfAssign.click();
        });
      }
    }

    // --- top controls handlers
    modeSel.addEventListener("change", () => {
      state.mode = modeSel.value;

      if (state.mode === "self" && allSongs.length) {
        ensureSelfSongs(state, allSongs);
      }

      persist();
      setRandomQuote();
      renderModeControls();
      renderGrid();
    });

    sizeSel.addEventListener("change", () => {
      state.classSize = parseInt(sizeSel.value, 10) || DEFAULTS.classSize;
      rebuildSeats();
    });

    autoSpeedSel.addEventListener("change", () => {
      state.autoSpeedMs = parseInt(autoSpeedSel.value, 10) || DEFAULTS.autoSpeedMs;
      persist();

      // if running, restart at new speed (cleaner)
      if (autoTimer) {
        stopAuto();
        renderModeControls();
      }
    });

    resetBtn.addEventListener("click", rebuildSeats);

    // initial render
    renderModeControls();
    renderGrid();
    persist();
  },
};

