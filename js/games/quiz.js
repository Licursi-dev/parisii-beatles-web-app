// js/games/quiz.js
import { quizQuestions } from "../../data/quizQuestions.js";

export const quizGame = {
  init(container) {
    /* ===============================
       Locked Teams (do not change)
       (ONLY changes made here:)
       - Added Strawberry Fields 🍓
       - Added Walruses 🦭
       - Mustards emoji set to 🍯
    =============================== */
    const LOCKED_TEAMS = [
      { id: "sun_kings", label: "Sun Kings", emoji: "☀️" },
      { id: "the_beatles", label: "The Beatles", emoji: "🪲" },
      { id: "maxwells", label: "Maxwell’s Silver Hammers", emoji: "🔨" },
      { id: "sgt_peppers", label: "Sgt Peppers", emoji: "🎖️" },
      { id: "mustards", label: "Mean Mr Mustards", emoji: "🍯" }, // FIXED
      { id: "octopuses", label: "Octopuses", emoji: "🐙" },
      { id: "mysteries", label: "Magical Mysteries", emoji: "🚌" },
      { id: "cavern", label: "Cavern Club", emoji: "🧱" },
      { id: "bees", label: "Let It Bees", emoji: "🐝" },
      { id: "zebras", label: "Abbey Road Zebras", emoji: "🦓" },
      { id: "strawberry_fields", label: "Strawberry Fields", emoji: "🍓" }, // ADDED
      { id: "walruses", label: "Walruses", emoji: "🦭" }, // ADDED
    ];

    /* ===============================
       Quiz-only CSS (Injected once)
       (ONLY fix here: make team chips consistent and non-messy)
       - Removed hard height that caused mess
       - Use min-height + tidy layout
    =============================== */
    const STYLE_ID = "parisii-quiz-style-v1";
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = `
        .quiz-wrap{ display:grid; gap:14px; }

        .quiz-topbar{
          display:flex; flex-wrap:wrap; gap:10px; align-items:end;
          padding:12px;
          border:1px solid var(--border);
          border-radius:14px;
          background: var(--bg);
        }
        .quiz-topbar .field{
          display:flex; flex-direction:column; gap:6px;
          font-weight:900; min-width: 160px;
        }
        .quiz-topbar .field span{
          color: var(--muted); font-size:.95rem; font-weight:850;
        }
        .quiz-topbar select, .quiz-topbar input{
          border:1px solid var(--border);
          background: var(--surface);
          color: var(--text);
          border-radius:10px;
          padding:10px 10px;
          font-weight:900;
        }
        .quiz-actions{ display:flex; gap:10px; margin-left:auto; flex-wrap:wrap; }
        .quiz-actions button{
          border:1px solid rgba(255,204,0,.55);
          background: var(--surface);
          color: var(--text);
          padding:10px 14px;
          border-radius: 12px;
          font-weight:1000;
          cursor:pointer;
          transition: transform .12s ease, box-shadow .2s ease, border-color .2s ease, opacity .2s ease;
        }
        .quiz-actions button:hover{
          transform: translateY(-1px);
          border-color: rgba(255,204,0,.9);
          box-shadow: 0 0 0 4px rgba(255,204,0,.14);
        }
        .quiz-actions button:disabled{ opacity:.5; cursor:not-allowed; transform:none; box-shadow:none; }

        .quiz-stage{
          border:1px solid var(--border);
          border-radius: var(--radius);
          background: linear-gradient(180deg, var(--surface), rgba(0,0,0,0));
          box-shadow: var(--shadow);
          padding: 16px;
          overflow:hidden;
          position:relative;
          min-height: 520px;
        }

        /* setup */
        .team-picker{
          display:grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 10px;
          margin-top: 10px;
        }

        .team-chip{
          border: 1px solid rgba(255,204,0,.45);
          border-radius: 14px;
          padding: 12px;
          background: rgba(0,0,0,.05);
          cursor:pointer;
          user-select:none;

          display:flex;
          align-items:center;
          justify-content:space-between;
          gap: 10px;

          min-height: 78px; /* stable tile size, no mess */
          overflow: hidden;

          transition: transform .12s ease, border-color .2s ease, box-shadow .2s ease;
        }
        body:not(.theme-dark) .team-chip{ background: rgba(0,0,0,.02); }
        .team-chip:hover{ transform: translateY(-1px); border-color: rgba(255,204,0,.85); box-shadow: 0 0 0 4px rgba(255,204,0,.10); }
        .team-chip.selected{
          border-color: rgba(255,204,0,.95);
          box-shadow: 0 0 0 4px rgba(255,204,0,.16);
          background: rgba(255,204,0,.06);
        }
        .team-chip strong{
          font-weight:1000;
          display:-webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow:hidden;
        }
        .team-chip .emoji{ font-size: 1.35rem; }

        .setup-note{ margin-top: 10px; color: var(--muted); font-weight:800; }
        .rosters{ margin-top: 12px; display:grid; gap: 10px; }
        .roster-card{
          border:1px solid var(--border);
          border-radius: 14px;
          padding: 12px;
          background: rgba(0,0,0,.04);
        }
        body:not(.theme-dark) .roster-card{ background: rgba(0,0,0,.02); }
        .roster-head{
          display:flex; align-items:center; justify-content:space-between; gap:10px;
          margin-bottom: 8px;
          font-weight: 1000;
        }
        .roster-grid{
          display:grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 8px;
        }
        .roster-grid input{ width:100%; }

        /* gameplay */
        .score-strip{
          display:flex;
          flex-wrap:wrap;
          gap:10px;
          align-items:stretch;
          margin-bottom: 12px;
        }
        .score-tile{
          border: 1px solid rgba(255,204,0,.45);
          border-radius: 14px;
          padding: 10px 12px;
          background: rgba(0,0,0,.05);
          min-width: 210px;
          flex: 1;
          cursor: pointer;
          user-select:none;
          position:relative;
          transition: transform .12s ease, box-shadow .2s ease, border-color .2s ease;
        }
        body:not(.theme-dark) .score-tile{ background: rgba(0,0,0,.02); }
        .score-tile:hover{ transform: translateY(-1px); border-color: rgba(255,204,0,.85); box-shadow: 0 0 0 4px rgba(255,204,0,.10); }

        .score-top{
          display:flex; align-items:center; justify-content:space-between; gap:10px;
          font-weight:1000;
        }
        .score-name{ display:flex; gap:10px; align-items:center; }
        .score-name .emoji{ font-size: 1.2rem; }
        .score-points{ font-size: 1.05rem; font-weight: 1100; }
        .score-players{
          margin-top: 6px;
          color: var(--muted);
          font-weight: 800;
          font-size: .92rem;
          display:flex;
          flex-wrap:wrap;
          gap: 6px;
        }
        .pill{
          border:1px solid var(--border);
          background: rgba(255,255,255,.02);
          padding: 3px 8px;
          border-radius: 999px;
        }

        /* leader visuals */
        .score-tile.leader{
          border-color: rgba(255,204,0,.95);
          box-shadow: 0 0 0 4px rgba(255,204,0,.16);
          background: rgba(255,204,0,.07);
        }
        .crown{
          position:absolute;
          top: -10px;
          right: -8px;
          font-size: 1.3rem;
          filter: drop-shadow(0 10px 22px rgba(0,0,0,.35));
        }

        /* scoring status badges */
        .badge{
          position:absolute;
          bottom: 8px;
          right: 10px;
          font-weight: 1000;
          font-size: .9rem;
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid rgba(255,204,0,.45);
          background: rgba(0,0,0,.18);
        }
        .badge.correct{ border-color: rgba(47,213,106,.75); background: rgba(47,213,106,.12); }
        .badge.fastest{ border-color: rgba(255,204,0,.95); background: rgba(255,204,0,.12); }
        .badge.wrong{ border-color: rgba(255,77,95,.75); background: rgba(255,77,95,.12); }
        .badge.noanswer{ border-color: rgba(79,124,255,.6); background: rgba(79,124,255,.10); }

        .question-card{
          border:1px solid var(--border);
          border-radius: 14px;
          padding: 14px 12px;
          background: rgba(0,0,0,.04);
          position:relative;
          overflow:hidden;
        }
        body:not(.theme-dark) .question-card{ background: rgba(0,0,0,.02); }

        .q-meta{
          display:flex; flex-wrap:wrap; gap:10px;
          align-items:center; justify-content:space-between;
          margin-bottom: 10px;
          color: var(--muted);
          font-weight: 900;
        }
        .q-text{
          font-size: 1.25rem;
          font-weight: 1100;
          letter-spacing: .2px;
          margin: 8px 0 12px;
        }

        /* timer bar */
        .timerbar{
          position:absolute;
          top:0; left:0; right:0;
          height: 6px;
          background: rgba(255,204,0,.14);
        }
        .timerbar > div{
          height:100%;
          width:100%;
          background: rgba(255,204,0,.85);
          transform-origin: left center;
          transform: scaleX(1);
          transition: transform 0.1s linear;
        }

        .answers{
          display:grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 10px;
          margin-top: 10px;
        }
        .ans-btn{
          border:1px solid rgba(255,204,0,.45);
          background: rgba(0,0,0,.10);
          color: var(--text);
          border-radius: 14px;
          padding: 12px;
          cursor:pointer;
          text-align:left;
          font-weight: 950;
          transition: transform .12s ease, box-shadow .2s ease, border-color .2s ease, opacity .2s ease;
          position:relative;
        }
        body:not(.theme-dark) .ans-btn{ background: rgba(0,0,0,.03); }
        .ans-btn:hover{ transform: translateY(-1px); border-color: rgba(255,204,0,.85); box-shadow: 0 0 0 4px rgba(255,204,0,.10); }
        .ans-btn:disabled{ opacity:.6; cursor:not-allowed; transform:none; box-shadow:none; }
        .ans-btn.correct{
          border-color: rgba(47,213,106,.85);
          box-shadow: 0 0 0 4px rgba(47,213,106,.12);
        }
        .ans-btn.wrongpick{
          border-color: rgba(255,77,95,.75);
          box-shadow: 0 0 0 4px rgba(255,77,95,.10);
        }

        .phase-bar{
          margin-top: 12px;
          display:flex;
          flex-wrap:wrap;
          gap: 10px;
          align-items:center;
          justify-content:space-between;
        }
        .phase-left{
          display:flex;
          gap: 10px;
          flex-wrap:wrap;
          align-items:center;
        }
        .mode-btn{
          border: 1px solid rgba(255,204,0,.55);
          background: rgba(255,204,0,.10);
          color: var(--text);
          border-radius: 999px;
          padding: 8px 12px;
          font-weight: 1000;
          cursor:pointer;
          transition: transform .12s ease, box-shadow .2s ease, border-color .2s ease, opacity .2s ease;
        }
        .mode-btn:hover{ transform: translateY(-1px); border-color: rgba(255,204,0,.9); box-shadow: 0 0 0 4px rgba(255,204,0,.12); }
        .mode-btn.active{
          border-color: rgba(255,204,0,.95);
          background: rgba(255,204,0,.16);
          box-shadow: 0 0 0 4px rgba(255,204,0,.14);
        }

        .fact-card{
          margin-top: 12px;
          border:1px solid var(--border);
          border-radius: 14px;
          padding: 12px;
          background: rgba(255,204,0,.06);
          font-weight: 900;
        }
        .fact-card .muted{ font-weight: 850; color: var(--muted); }

        .podium{
          margin-top: 12px;
          display:grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 10px;
        }
        .podium-card{
          border: 1px solid rgba(255,204,0,.45);
          border-radius: 14px;
          padding: 12px;
          background: rgba(0,0,0,.05);
        }
        body:not(.theme-dark) .podium-card{ background: rgba(0,0,0,.02); }
        .podium-card h3{ margin: 0 0 6px; font-size: 1.05rem; }
        .podium-card .big{ font-weight: 1100; font-size: 1.25rem; }
      `;
      document.head.appendChild(style);
    }
        /* ===============================
       Storage: Leaderboard
    =============================== */
    const LB_KEY = "parisii_quiz_leaderboard_v1";

    function loadLeaderboard() {
      try {
        const raw = JSON.parse(localStorage.getItem(LB_KEY) || "[]");
        return Array.isArray(raw) ? raw : [];
      } catch {
        return [];
      }
    }

    function saveLeaderboard(entries) {
      try {
        localStorage.setItem(LB_KEY, JSON.stringify(entries || []));
      } catch {}
    }

    function addLeaderboardEntry(entry) {
      const lb = loadLeaderboard();
      lb.unshift(entry);
      saveLeaderboard(lb.slice(0, 20)); // keep last 20
    }

    /* ===============================
       Helpers
    =============================== */
    function randInt(max) {
      if (max <= 0) return 0;
      const c = globalThis.crypto;
      if (c && c.getRandomValues) {
        const buf = new Uint32Array(1);
        c.getRandomValues(buf);
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

    function clamp(n, lo, hi) {
      return Math.max(lo, Math.min(hi, n));
    }

    function esc(s) {
      return String(s ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    function nowStamp() {
      const d = new Date();
      return d.toLocaleString();
    }

    /* ===============================
       State
    =============================== */
    let view = "setup"; // setup | play | end
    let selectedTeamIds = new Set();
    let playersPerTeam = 5;
    let leaderboardSaved = false;

    let settings = {
      count: 10,
      timer: 0, // seconds (0=off)
      difficulty: "all",
      shuffle: true,
    };

    let teams = []; // runtime teams: {id,label,emoji,players[],score}
    let questionDeck = [];
    let qIndex = 0;

    // per-question runtime
    let phase = "question"; // question | scoring | fact
    let currentQ = null;
    let currentOptions = []; // {text, originalIndex}
    let revealed = false;

    let countdownTimer = null;
    let countdownLeft = 0;

    // scoring selection for current question
    // teamId => "correct" | "wrong" | "noanswer"
    let scoreMarks = {};
    let fastestCorrectTeamId = null; // first correct clicked

    /* ===============================
       Render Shell
    =============================== */
    container.innerHTML = `
      <section class="panel">
        <h2>🧠 Magical Mystery Quiz</h2>
        <div class="quiz-wrap">
          <div class="quiz-topbar" id="topbar"></div>
          <div class="quiz-stage" id="stage"></div>
        </div>
      </section>
    `;

    const topbar = container.querySelector("#topbar");
    const stage = container.querySelector("#stage");

    /* ===============================
       Topbar
    =============================== */
    function renderTopbar() {
      topbar.innerHTML = `
        <label class="field">
          <span>Question count</span>
          <select id="qc">
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>
        </label>

        <label class="field">
          <span>Difficulty</span>
          <select id="diff">
            <option value="all">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <label class="field">
          <span>Timer</span>
          <select id="timer">
            <option value="0">Off</option>
            <option value="5">5s</option>
            <option value="10">10s</option>
            <option value="20">20s</option>
          </select>
        </label>

        <label class="field">
          <span>Shuffle</span>
          <select id="shuf">
            <option value="on">On</option>
            <option value="off">Off</option>
          </select>
        </label>

        <label class="field">
          <span>Players / team</span>
          <input id="ppt" type="number" min="1" max="5" value="5" />
        </label>

        <div class="quiz-actions">
          <button id="btn-setup" type="button">Setup</button>
          <button id="btn-start" class="btn-primary" type="button">Start</button>
          <button id="btn-reset" type="button">Reset</button>
        </div>
      `;

      const qc = topbar.querySelector("#qc");
      const diff = topbar.querySelector("#diff");
      const timer = topbar.querySelector("#timer");
      const shuf = topbar.querySelector("#shuf");
      const ppt = topbar.querySelector("#ppt");

      const btnSetup = topbar.querySelector("#btn-setup");
      const btnStart = topbar.querySelector("#btn-start");
      const btnReset = topbar.querySelector("#btn-reset");

      qc.value = String(settings.count);
      diff.value = settings.difficulty;
      timer.value = String(settings.timer);
      shuf.value = settings.shuffle ? "on" : "off";
      ppt.value = String(playersPerTeam);

      function syncDisabled() {
        const canStart = selectedTeamIds.size >= 2 && view === "setup";
        btnStart.disabled = !canStart;
      }

      qc.addEventListener("change", () => {
        settings.count = parseInt(qc.value, 10) || 10;
      });

      diff.addEventListener("change", () => {
        settings.difficulty = diff.value || "all";
      });

      timer.addEventListener("change", () => {
        settings.timer = parseInt(timer.value, 10) || 0;
      });

      shuf.addEventListener("change", () => {
        settings.shuffle = shuf.value === "on";
      });

      ppt.addEventListener("change", () => {
        playersPerTeam = clamp(parseInt(ppt.value, 10) || 5, 1, 5);
        ppt.value = String(playersPerTeam);
        if (view === "setup") renderSetup();
      });

      btnSetup.addEventListener("click", () => {
        stopTimer();
        view = "setup";
        renderSetup();
        renderTopbar();
      });

      btnStart.addEventListener("click", () => {
        if (selectedTeamIds.size < 2) return;
        startGameFromSetup();
      });

      btnReset.addEventListener("click", () => {
        fullReset();
      });

      syncDisabled();
      topbar.__syncStart = syncDisabled;
    }

    /* ===============================
       Setup Screen
    =============================== */
    function renderLeaderboardPreview() {
      const lb = loadLeaderboard();
      if (!lb.length) {
        return `<div class="setup-note">Leaderboard: no games yet (localStorage).</div>`;
      }

      const rows = lb.slice(0, 5).map((x) => {
        const top = (x && x.top3) || [];
        const first = top[0] ? `${esc(top[0].emoji)} ${esc(top[0].name)} (${top[0].score})` : "—";
        return `<div class="setup-note">🏁 ${esc(x.when)} • Winner: <strong>${first}</strong></div>`;
      }).join("");

      return `
        <div class="setup-note"><strong>Leaderboard (last 5)</strong></div>
        ${rows}
      `;
    }

    function renderSetup() {
      stage.innerHTML = `
        <div class="question-card">
          <div class="q-text">Choose 2–12 teams, then enter player names (optional).</div>
          <div class="setup-note">Start is disabled until at least 2 teams are selected.</div>

          <div class="team-picker" id="teamPicker"></div>

          <div class="rosters" id="rosters"></div>

          ${renderLeaderboardPreview()}
        </div>
      `;

      const teamPicker = stage.querySelector("#teamPicker");
      const rostersEl = stage.querySelector("#rosters");

      teamPicker.innerHTML = LOCKED_TEAMS.map((t) => {
        const sel = selectedTeamIds.has(t.id) ? "selected" : "";
        return `
          <div class="team-chip ${sel}" data-team="${esc(t.id)}" role="button" tabindex="0" aria-label="Team ${esc(t.label)}">
            <div style="display:flex; gap:10px; align-items:center; min-width:0;">
              <span class="emoji">${esc(t.emoji)}</span>
              <strong>${esc(t.label)}</strong>
            </div>
            <div style="font-weight:1000; color: var(--muted); flex:0 0 auto;">${selectedTeamIds.has(t.id) ? "Selected" : "Tap"}</div>
          </div>
        `;
      }).join("");

      function toggleTeam(teamId) {
        if (!teamId) return;
        if (selectedTeamIds.has(teamId)) {
          selectedTeamIds.delete(teamId);
        } else {
          if (selectedTeamIds.size >= 12) return;
          selectedTeamIds.add(teamId);
        }
        renderSetup();
        if (topbar.__syncStart) topbar.__syncStart();
      }

      teamPicker.querySelectorAll("[data-team]").forEach((el) => {
        if (el.__wired) return;
        el.__wired = true;
        el.addEventListener("click", () => toggleTeam(el.dataset.team));
        el.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") toggleTeam(el.dataset.team);
        });
      });

      const selected = LOCKED_TEAMS.filter((t) => selectedTeamIds.has(t.id));
      if (!selected.length) {
        rostersEl.innerHTML = `<div class="setup-note">No teams selected yet.</div>`;
        return;
      }

      rostersEl.innerHTML = selected.map((t) => {
        const inputs = Array.from({ length: playersPerTeam }, (_, i) => {
          return `
            <label class="field" style="min-width:0;">
              <span>Player ${i + 1}</span>
              <input type="text" data-team="${esc(t.id)}" data-idx="${i}" placeholder="Name" autocomplete="off" />
            </label>
          `;
        }).join("");

        return `
          <div class="roster-card">
            <div class="roster-head">
              <div>${esc(t.emoji)} ${esc(t.label)}</div>
              <div style="color: var(--muted); font-weight:900;">Up to ${playersPerTeam}</div>
            </div>
            <div class="roster-grid">
              ${inputs}
            </div>
          </div>
        `;
      }).join("");

      const prev = new Map();
      teams.forEach((tm) => prev.set(tm.id, tm.players || []));

      rostersEl.querySelectorAll("input[data-team]").forEach((inp) => {
        const tid = inp.getAttribute("data-team");
        const idx = parseInt(inp.getAttribute("data-idx"), 10) || 0;
        const list = prev.get(tid) || [];
        inp.value = list[idx] || "";

        inp.addEventListener("input", () => {
          const tBase = LOCKED_TEAMS.find((x) => x.id === tid);
          if (!tBase) return;

          let tm = teams.find((x) => x.id === tid);
          if (!tm) {
            tm = { ...tBase, players: Array(playersPerTeam).fill(""), score: 0 };
            teams.push(tm);
          }
          if (!Array.isArray(tm.players)) tm.players = Array(playersPerTeam).fill("");
          tm.players[idx] = (inp.value || "").trim();
        });
      });
      }
          /* ===============================
       Build Game Deck
    =============================== */
    function buildQuestionDeck() {
      let pool = Array.isArray(quizQuestions) ? quizQuestions.slice() : [];

      if (settings.difficulty && settings.difficulty !== "all") {
        pool = pool.filter((q) => (q.difficulty || "").toLowerCase() === settings.difficulty);
      }

      if (!pool.length) pool = Array.isArray(quizQuestions) ? quizQuestions.slice() : [];

      if (settings.shuffle) pool = shuffle(pool);

      const take = clamp(settings.count || 10, 1, 25);
      pool = pool.slice(0, take);

      return pool;
    }

    /* ===============================
       Start Game
    =============================== */
    function startGameFromSetup() {
      stopTimer();
      leaderboardSaved = false;

      const selected = LOCKED_TEAMS.filter((t) => selectedTeamIds.has(t.id));

      const rosterMap = new Map();
      stage.querySelectorAll("input[data-team]").forEach((inp) => {
        const tid = inp.getAttribute("data-team");
        const idx = parseInt(inp.getAttribute("data-idx"), 10) || 0;
        if (!rosterMap.has(tid)) rosterMap.set(tid, Array(playersPerTeam).fill(""));
        rosterMap.get(tid)[idx] = (inp.value || "").trim();
      });

      teams = selected.map((t) => ({
        ...t,
        players: (rosterMap.get(t.id) || []).filter((x) => x && x.trim()),
        score: 0,
      }));

      questionDeck = buildQuestionDeck();
      qIndex = 0;

      view = "play";
      renderPlay();
      renderTopbar();
    }

    /* ===============================
       Score visuals
    =============================== */
    function getLeaderIds() {
      if (!teams.length) return new Set();
      const max = Math.max(...teams.map((t) => t.score));
      const leaders = teams.filter((t) => t.score === max).map((t) => t.id);
      return new Set(leaders);
    }

    /* ===============================
       Timer
    =============================== */
    function stopTimer() {
      if (countdownTimer) clearInterval(countdownTimer);
      countdownTimer = null;
      countdownLeft = 0;
    }

    function startTimer(seconds, onTick, onDone) {
      stopTimer();
      countdownLeft = seconds;

      const started = Date.now();
      const totalMs = seconds * 1000;

      countdownTimer = setInterval(() => {
        const elapsed = Date.now() - started;
        const leftMs = Math.max(0, totalMs - elapsed);
        const leftSec = Math.ceil(leftMs / 1000);

        if (leftSec !== countdownLeft) {
          countdownLeft = leftSec;
          if (typeof onTick === "function") onTick(leftMs / totalMs);
        }

        if (leftMs <= 0) {
          stopTimer();
          if (typeof onTick === "function") onTick(0);
          if (typeof onDone === "function") onDone();
        }
      }, 80);
    }

    /* ===============================
       Gameplay Rendering
    =============================== */
    function renderPlay() {
      if (!questionDeck.length) {
        renderEnd();
        return;
      }

      currentQ = questionDeck[qIndex];
      phase = "question";
      revealed = false;
      scoreMarks = {};
      fastestCorrectTeamId = null;

      let pickedIdx = null;

      const baseOptions = (currentQ.options || []).slice(0, 4);
      const mapped = baseOptions.map((txt, idx) => ({ text: txt, originalIndex: idx }));
      currentOptions = settings.shuffle ? shuffle(mapped) : mapped;

      const correctOriginal = currentQ.answerIndex;
      const correctMappedIndex = currentOptions.findIndex((x) => x.originalIndex === correctOriginal);

      stage.innerHTML = `
        <div>
          <div class="score-strip" id="scoreStrip"></div>

          <div class="question-card">
            <div class="timerbar" ${settings.timer ? "" : 'style="display:none;"'}>
              <div id="timerFill"></div>
            </div>

            <div class="q-meta">
              <div>Question <strong>${qIndex + 1}</strong> / ${questionDeck.length}</div>
              <div>Difficulty: <strong>${esc(currentQ.difficulty || "—")}</strong></div>
              <div>${settings.timer ? `Timer: <strong><span id="timeLeft">${settings.timer}</span>s</strong>` : "Timer: <strong>Off</strong>"}</div>
            </div>

            <div class="q-text">${esc(currentQ.question || "")}</div>

            <div class="answers" id="answers"></div>

            <div class="phase-bar">
              <div class="phase-left">
                <button id="reveal" class="btn-primary" type="button">Reveal Answer</button>
                <button id="skip" type="button">Skip (-1 no answer)</button>
              </div>
              <div style="color: var(--muted); font-weight: 900;">
                After reveal: click teams to score (fastest +3).
              </div>
            </div>

            <div id="factSlot"></div>
          </div>
        </div>
      `;

      const scoreStrip = stage.querySelector("#scoreStrip");
      const answersEl = stage.querySelector("#answers");
      const revealBtn = stage.querySelector("#reveal");
      const skipBtn = stage.querySelector("#skip");
      const timerFill = stage.querySelector("#timerFill");
      const timeLeftEl = stage.querySelector("#timeLeft");
      const factSlot = stage.querySelector("#factSlot");

      function renderScoreStrip() {
        const leaders = getLeaderIds();
        scoreStrip.innerHTML = teams.map((t) => {
          const isLeader = leaders.has(t.id);
          const badge = scoreMarks[t.id]
            ? (() => {
                const mark = scoreMarks[t.id];
                if (mark === "correct") {
                  if (fastestCorrectTeamId === t.id) return `<div class="badge fastest">+3 FASTEST</div>`;
                  return `<div class="badge correct">+1 CORRECT</div>`;
                }
                if (mark === "wrong") return `<div class="badge wrong">-1 WRONG</div>`;
                return `<div class="badge noanswer">-1 NO ANSWER</div>`;
              })()
            : "";

          const players = (t.players || []).slice(0, 5);
          const pills = players.length
            ? players.map((p) => `<span class="pill">${esc(p)}</span>`).join("")
            : `<span class="pill">—</span>`;

          return `
            <div class="score-tile ${isLeader ? "leader" : ""}" data-team="${esc(t.id)}">
              ${isLeader ? `<div class="crown">👑</div>` : ""}
              <div class="score-top">
                <div class="score-name"><span class="emoji">${esc(t.emoji)}</span> <span>${esc(t.label)}</span></div>
                <div class="score-points">${t.score}</div>
              </div>
              <div class="score-players">${pills}</div>
              ${badge}
            </div>
          `;
        }).join("");

        scoreStrip.querySelectorAll(".score-tile[data-team]").forEach((tile) => {
          if (tile.__wired) return;
          tile.__wired = true;
          tile.addEventListener("click", () => onTeamClick(tile.getAttribute("data-team")));
        });
      }

      answersEl.innerHTML = currentOptions.map((opt, idx) => {
        const letter = ["A", "B", "C", "D"][idx] || "•";
        return `
          <button class="ans-btn" type="button" data-idx="${idx}">
            <div style="font-weight:1100; margin-bottom:6px;">${letter}</div>
            <div>${esc(opt.text)}</div>
          </button>
        `;
      }).join("");

      answersEl.querySelectorAll("button[data-idx]").forEach((btn) => {
        if (btn.__wired) return;
        btn.__wired = true;
      
        btn.addEventListener("click", () => {
          if (revealed) return;
      
          pickedIdx = parseInt(btn.getAttribute("data-idx"), 10);
      
          answersEl.querySelectorAll("button[data-idx]").forEach((b) => {
            b.classList.remove("picked", "wrongpick");
          });
      
          btn.classList.add("picked");
        });
      });

      renderScoreStrip();

      let scoreMode = "correct"; // correct | wrong | noanswer

      function renderScoringControls() {
        factSlot.innerHTML = `
          <div class="phase-bar">
            <div class="phase-left">
              <button class="mode-btn ${scoreMode === "correct" ? "active" : ""}" id="mCorrect" type="button">Correct (+3 / +1)</button>
              <button class="mode-btn ${scoreMode === "wrong" ? "active" : ""}" id="mWrong" type="button">Wrong (-1)</button>
              <button class="mode-btn ${scoreMode === "noanswer" ? "active" : ""}" id="mNo" type="button">No answer (-1)</button>
            </div>
            <div class="phase-left">
              <button id="next" class="btn-primary" type="button">Next Question</button>
            </div>
          </div>

          <div class="fact-card">
            <div class="muted">Fact</div>
            <div>${esc(currentQ.fact || "")}</div>
          </div>
        `;

        const mCorrect = stage.querySelector("#mCorrect");
        const mWrong = stage.querySelector("#mWrong");
        const mNo = stage.querySelector("#mNo");
        const nextBtn = stage.querySelector("#next");

        function syncModes() {
          mCorrect.classList.toggle("active", scoreMode === "correct");
          mWrong.classList.toggle("active", scoreMode === "wrong");
          mNo.classList.toggle("active", scoreMode === "noanswer");
        }

        mCorrect.addEventListener("click", () => { scoreMode = "correct"; syncModes(); });
        mWrong.addEventListener("click", () => { scoreMode = "wrong"; syncModes(); });
        mNo.addEventListener("click", () => { scoreMode = "noanswer"; syncModes(); });

        nextBtn.addEventListener("click", () => {
          teams.forEach((t) => {
            if (!scoreMarks[t.id]) scoreMarks[t.id] = "noanswer";
          });

          teams.forEach((t) => {
            const mark = scoreMarks[t.id];
            if (mark === "correct") {
              t.score += (fastestCorrectTeamId === t.id) ? 3 : 1;
            } else if (mark === "wrong") {
              t.score -= 1;
            } else {
              t.score -= 1;
            }
          });

          qIndex += 1;
          if (qIndex >= questionDeck.length) {
            renderEnd();
          } else {
            renderPlay();
          }
        });
      }

      function revealAnswer() {
        if (revealed) return;
        revealed = true;
        phase = "scoring";
        stopTimer();

        const btns = Array.from(answersEl.querySelectorAll("button[data-idx]"));
        btns.forEach((b) => (b.disabled = true));

        const correctBtn = btns[correctMappedIndex];
        if (correctBtn) correctBtn.classList.add("correct");

        renderScoringControls();
        renderScoreStrip();
      }

      function onTeamClick(teamId) {
        if (!revealed) return;
        if (!teamId) return;

        const desired = scoreMode;
        scoreMarks[teamId] = desired;

        if (desired === "correct" && !fastestCorrectTeamId) {
          fastestCorrectTeamId = teamId;
        }

        renderScoreStrip();
      }

      revealBtn.addEventListener("click", revealAnswer);

      skipBtn.addEventListener("click", () => {
        revealAnswer();
        teams.forEach((t) => { scoreMarks[t.id] = "noanswer"; });
        renderScoreStrip();
      });

      if (settings.timer > 0) {
        const total = settings.timer;
        if (timeLeftEl) timeLeftEl.textContent = String(total);
        if (timerFill) timerFill.style.transform = "scaleX(1)";

        startTimer(
          total,
          (ratio) => {
            if (timerFill) timerFill.style.transform = `scaleX(${ratio})`;
            if (timeLeftEl) timeLeftEl.textContent = String(Math.max(0, Math.ceil(ratio * total)));
          },
          () => {
            revealAnswer();
            teams.forEach((t) => { scoreMarks[t.id] = "noanswer"; });
            renderScoreStrip();
          }
        );
      }
    }
        /* ===============================
       End Screen
    =============================== */
    function renderEnd() {
      stopTimer();
      view = "end";

      const sorted = teams.slice().sort((a, b) => b.score - a.score);
      const top3 = sorted.slice(0, 3).map((t) => ({ id: t.id, name: t.label, emoji: t.emoji, score: t.score }));
      
      if (!leaderboardSaved) {
        addLeaderboardEntry({
          when: nowStamp(),
          top3,
        });
        leaderboardSaved = true;
      }

      const podium = top3.map((t, i) => {
        const place = i === 0 ? "🥇 1st" : i === 1 ? "🥈 2nd" : "🥉 3rd";
        return `
          <div class="podium-card">
            <h3>${place}</h3>
            <div class="big">${esc(t.emoji)} ${esc(t.name)}</div>
            <div style="margin-top:6px; font-weight:1000;">Score: ${t.score}</div>
          </div>
        `;
      }).join("");

      const fullTable = sorted.map((t, i) => {
        return `
          <div class="podium-card">
            <div style="display:flex; justify-content:space-between; gap:10px; font-weight:1100;">
              <div>${i + 1}. ${esc(t.emoji)} ${esc(t.label)}</div>
              <div>${t.score}</div>
            </div>
            <div class="score-players" style="margin-top:8px;">
              ${(t.players && t.players.length) ? t.players.map((p) => `<span class="pill">${esc(p)}</span>`).join("") : `<span class="pill">—</span>`}
            </div>
          </div>
        `;
      }).join("");

      stage.innerHTML = `
        <div class="question-card">
          <div class="q-text">🏁 Quiz Complete</div>
          <div class="q-meta">
            <div>Questions played: <strong>${questionDeck.length}</strong></div>
            <div>Negative scores allowed: <strong>Yes</strong></div>
          </div>

          <div class="podium">
            ${podium}
          </div>

          <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
            <button id="playAgain" class="btn-primary" type="button">Play again</button>
            <button id="backSetup" type="button">Back to setup</button>
            <button id="clearLB" type="button">Clear leaderboard</button>
          </div>

          <div class="setup-note" style="margin-top:14px;"><strong>Full ranking</strong></div>
          <div class="podium" style="margin-top:10px;">
            ${fullTable}
          </div>
        </div>
      `;

      stage.querySelector("#playAgain").addEventListener("click", () => {
        teams.forEach((t) => (t.score = 0));
        questionDeck = buildQuestionDeck();
        qIndex = 0;
        view = "play";
        renderPlay();
        renderTopbar();
      });

      stage.querySelector("#backSetup").addEventListener("click", () => {
        view = "setup";
        renderSetup();
        renderTopbar();
      });

      stage.querySelector("#clearLB").addEventListener("click", () => {
        localStorage.removeItem("parisii_quiz_leaderboard_v1");
        renderSetup();
        renderTopbar();
      });
    }

    /* ===============================
       Reset
    =============================== */
    function fullReset() {
      stopTimer();
      view = "setup";
      selectedTeamIds = new Set();
      teams = [];
      questionDeck = [];
      qIndex = 0;

      settings = { count: 10, timer: 0, difficulty: "all", shuffle: true };
      playersPerTeam = 5;

      renderTopbar();
      renderSetup();
    }

    /* ===============================
       Init
    =============================== */
    renderTopbar();
    renderSetup();
  },
};