// js/games/bingo.js

export const bingoGame = {
  init(container) {
    /* ===============================
       LOCKED 75 BALLS (DO NOT CHANGE)
    =============================== */
    const BALLS = [
      { n: 1, t: "1 compilation album released in 2000" },
      { n: 2, t: "Lennon & McCartney songwriting partnership" },
      { n: 3, t: "Three Legs (Paul McCartney, 1971)" },
      { n: 4, t: "The Fab Four" },
      { n: 5, t: "The Fifth Beatle – Stuart Sutcliffe & George Martin" },
      { n: 6, t: "Liverpool's 6 European Cups" },
      { n: 7, t: "7 Feb 1964 – Arrive in New York" },
      { n: 8, t: "Eight Days a Week" },
      { n: 9, t: "Revolution 9" },
      { n: 10, t: "10 years active (1960–1970)" },
      { n: 11, t: "11 Oct 1962 – Love Me Do released" },
      { n: 12, t: "12-string Rickenbacker sound" },
      { n: 13, t: "13 UK studio albums" },
      { n: 14, t: "14 tracks on many UK LPs" },
      { n: 15, t: "1915 Lusitania sinking" },
      { n: 16, t: "16 Jan 1957 – Quarrymen formed" },
      { n: 17, t: "She was just seventeen…" },
      { n: 18, t: "18 Apr 1963 – Royal Albert Hall" },
      { n: 19, t: "19 Aug 1966 – Last paid US concert" },
      { n: 20, t: "20 US No.1 singles" },
      { n: 21, t: "21 Aug 1966 – Final commercial concert" },
      { n: 22, t: "22 Nov 1968 – White Album released" },
      { n: 23, t: "23 Aug 1962 – Pete Best dismissed" },
      { n: 24, t: "Liverpool – 'New York of Europe'" },
      { n: 25, t: "1925 – Empire Theatre opened" },
      { n: 26, t: "Strawberry Fields – Take 26" },
      { n: 27, t: "27 weeks UK No.1 – Sgt Pepper" },
      { n: 28, t: "28 Aug 1964 – Meet Bob Dylan" },
      { n: 29, t: "29 Aug 1966 – Final UK tour date" },
      { n: 30, t: "30 Jan 1969 – Rooftop concert" },
      { n: 31, t: "31 July 1968 – Hey Jude session" },
      { n: 32, t: "Penny Lane ranked 32nd (Rolling Stone)" },
      { n: 33, t: "33⅓ RPM LP record speed" },
      { n: 34, t: "1934 – Queensway Tunnel opens" },
      { n: 35, t: "35 sets performed in 1966" },
      { n: 36, t: "36 years – Formation to Anthology" },
      { n: 37, t: "1937 – George Harrison born" },
      { n: 38, t: "1938 – Liverpool FA Cup win" },
      { n: 39, t: "1939 – Liverpool prepares for war" },
      { n: 40, t: "John Lennon lived 40 years (1940–1980)" },
      { n: 41, t: "1941 – Paul McCartney born" },
      { n: 42, t: "1842 – Royal Albert Dock opened" },
      { n: 43, t: "1943 – Wartime Liverpool year" },
      { n: 44, t: "44 US Top 40 hits" },
      { n: 45, t: "45 RPM vinyl single" },
      { n: 46, t: "1946 – Post-war reconstruction" },
      { n: 47, t: "Penny Lane sign returned after 47 years" },
      { n: 48, t: "1948 – Post-war football rebuilding" },
      { n: 49, t: "49 years after Abbey Road (2018 recreation)" },
      { n: 50, t: "1950 – Liverpool FA Cup Final" },
      { n: 51, t: "51 weeks UK Albums No.1 (1963–64)" },
      { n: 52, t: "1952 – First hospital radio & holiday flight" },
      { n: 53, t: "53 postcards in Ringo's 2003 book" },
      { n: 54, t: "1954 – Liverpool FC relegated" },
      { n: 55, t: "1955 – Paul moves to Forthlin Road" },
      { n: 56, t: "1956 – Early Quarrymen era" },
      { n: 57, t: "1957 – John meets Paul" },
      { n: 58, t: "1958 – George joins" },
      { n: 59, t: "1959 – Casbah residency" },
      { n: 60, t: "1960 – Hamburg & name adopted" },
      { n: 61, t: "1961 – Cavern residency" },
      { n: 62, t: "1962 – First single released" },
      { n: 63, t: "1963 – Beatlemania explodes" },
      { n: 64, t: "1964 – Ed Sullivan appearance" },
      { n: 65, t: "1965 – Shea Stadium" },
      { n: 66, t: "1966 – Touring stops" },
      { n: 67, t: "1967 – Sgt Pepper released" },
      { n: 68, t: "1968 – White Album released" },
      { n: 69, t: "1969 – Abbey Road & Rooftop Concert" },
      { n: 70, t: "1970 – Official breakup" },
      { n: 71, t: "1971 – All four solo in UK charts" },
      { n: 72, t: "1972 – Wings record Live and Let Die" },
      { n: 73, t: "1973 – Photograph US No.1" },
      { n: 74, t: "1974 – Lennon/McCartney overlap" },
      { n: 75, t: "1975 – Lennon hiatus begins" },
    ];

    /* ===============================
       Helpers (better randomness)
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

    function bucketFor(n) {
      if (n <= 15) return "B";
      if (n <= 30) return "I";
      if (n <= 45) return "N";
      if (n <= 60) return "G";
      return "O";
    }

    function bucketClass(letter) {
      if (letter === "B") return "ball-b";
      if (letter === "I") return "ball-i";
      if (letter === "N") return "ball-n";
      if (letter === "G") return "ball-g";
      return "ball-o";
    }

    function formatCountdown(seconds) {
      const s = Math.max(0, Math.floor(seconds));
      const m = Math.floor(s / 60);
      const r = s % 60;
      if (m <= 0) return String(r);
      return `${m}:${String(r).padStart(2, "0")}`;
    }

    /* ===============================
       Sounds (subtle but exciting)
    =============================== */
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    function soundTick() {
      try {
        const ctx = audioCtx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = 920;
        gain.gain.value = 0.04;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } catch {}
    }

    function soundWhoosh() {
      try {
        const ctx = audioCtx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(620, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.23);
      } catch {}
    }

    function soundFinale() {
      try {
        const ctx = audioCtx;
        const notes = [523, 659, 784, 988, 1318];
        let t = ctx.currentTime;
        notes.forEach((f) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = f;
          gain.gain.setValueAtTime(0.0001, t);
          gain.gain.exponentialRampToValueAtTime(0.06, t + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.19);
          t += 0.08;
        });
        
      } catch {}
    }

    /* ===============================
       State
    =============================== */
    let deck = [];
    let drawn = [];
    let current = null;

    let mode = "idle"; // idle | countdown | running | finished
    let autoTimer = null;

    let countdownTimer = null;
    let countdownLeft = 10;
    let countdownTotal = 10;

    /* ===============================
       UI (matches your styles.css “Bingo Module”)
       - Fixes overlap by moving called balls into normal flow
       - Keeps big ball centered
       - Uses B/I/N/G/O colour buckets
    =============================== */
    container.innerHTML = `
      <section class="panel">
        <h2>🎱 Bingo Caller</h2>

        <div class="bingo-wrap">
          <div class="bingo-topbar">
            <label class="field">
              <span>Ball set</span>
              <select id="ballSet">
                <option value="25">25 Balls</option>
                <option value="50">50 Balls</option>
                <option value="75" selected>75 Balls</option>
              </select>
            </label>

            <label class="field">
              <span>Auto speed</span>
              <select id="speed">
                <option value="fast">Fast</option>
                <option value="normal" selected>Normal</option>
                <option value="slow">Slow</option>
              </select>
            </label>

            <label class="field">
              <span>Start countdown</span>
              <select id="countdown">
                <option value="10">10 seconds</option>
                <option value="30">30 seconds</option>
                <option value="60">1 minute</option>
                <option value="300">5 minutes</option>
              </select>
            </label>

            <div class="bingo-actions">
              <button id="startAuto" class="btn-primary" type="button">Start Auto</button>
              <button id="stopAuto" type="button">Stop</button>
              <button id="nextBall" type="button">Next Ball</button>
              <button id="reset" type="button">Reset</button>
            </div>
          </div>

          <div class="bingo-stage">
            <!-- Overlay used for BOTH countdown + finish (no more overlapping UI) -->
            <div id="overlay" class="bingo-overlay" aria-hidden="true">
              <div id="countdownCard" class="bingo-countdown" style="display:none;">
                <div class="label">Starting in…</div>
                <div class="time" id="countdownText">10</div>
              </div>

              <div id="finishCard" class="bingo-finish" style="display:none;">
                <div class="bingo-finish-title" aria-label="BINGO celebration">
                  <div class="bingo-letter">B</div>
                  <div class="bingo-letter">I</div>
                  <div class="bingo-letter">N</div>
                  <div class="bingo-letter">G</div>
                  <div class="bingo-letter">O</div>
                </div>
                <p id="finalLine">BINGO!</p>
                <div class="bingo-brand">Parisii Beatles Bingo</div>

                <div class="bingo-actions" style="justify-content:center; margin-top: 14px;">
                  <button id="playAgain" class="btn-primary" type="button">Play again</button>
                  <button id="closeOverlay" type="button">Close</button>
                </div>

                <div class="bingo-watermark">Made for the Parisii Beatles Web App</div>
              </div>
            </div>

            <div class="bingo-center" id="centerArea">
              <div class="bingo-ball-big ball-n" id="bigBall" aria-label="Current ball">
                <div>
                  <div class="big-letter" id="bigLetter">–</div>
                  <div class="big-num" id="bigNum">–</div>
                </div>
              </div>

              <div class="bingo-call" id="callLine">Ready to play</div>
              <div class="bingo-fact" id="fact"></div>
              <div class="bingo-sub" id="meta"></div>
            </div>

            <div class="bingo-history">
              <div class="bingo-history-title">
                <span>Called balls</span>
                <span id="submeta">0 of 0</span>
              </div>
              <div class="bingo-balls-grid" id="history" aria-label="Drawn balls"></div>
            </div>
          </div>
        </div>
      </section>
    `;

    const ballSetSel = container.querySelector("#ballSet");
    const speedSel = container.querySelector("#speed");
    const countdownSel = container.querySelector("#countdown");

    const startAutoBtn = container.querySelector("#startAuto");
    const stopAutoBtn = container.querySelector("#stopAuto");
    const nextBallBtn = container.querySelector("#nextBall");
    const resetBtn = container.querySelector("#reset");

    const bigBallEl = container.querySelector("#bigBall");
    const bigLetterEl = container.querySelector("#bigLetter");
    const bigNumEl = container.querySelector("#bigNum");

    const callLineEl = container.querySelector("#callLine");
    const factEl = container.querySelector("#fact");
    const metaEl = container.querySelector("#meta");
    const subMetaEl = container.querySelector("#submeta");
    const historyEl = container.querySelector("#history");

    const overlay = container.querySelector("#overlay");
    const countdownCard = container.querySelector("#countdownCard");
    const countdownTextEl = container.querySelector("#countdownText");
    const finishCard = container.querySelector("#finishCard");
    const playAgainBtn = container.querySelector("#playAgain");
    const closeOverlayBtn = container.querySelector("#closeOverlay");
    const finalLine = container.querySelector("#finalLine");

    /* ===============================
       Core logic
    =============================== */
    function speedMs() {
      const v = speedSel.value;
      if (v === "fast") return 1200;
      if (v === "slow") return 3500;
      return 2200;
    }

    function showOverlay(kind) {
      // kind: "countdown" | "finish" | null
      if (!kind) {
        overlay.classList.remove("show");
        overlay.setAttribute("aria-hidden", "true");
        countdownCard.style.display = "none";
        finishCard.style.display = "none";
        return;
      }

      overlay.classList.add("show");
      overlay.setAttribute("aria-hidden", "false");

      if (kind === "countdown") {
        countdownCard.style.display = "block";
        finishCard.style.display = "none";
      } else {
        countdownCard.style.display = "none";
        finishCard.style.display = "block";
      }
    }

    function setMode(newMode) {
      mode = newMode;

      const running = mode === "running";
      const counting = mode === "countdown";
      const finished = mode === "finished";

      // disable controls cleanly
      ballSetSel.disabled = running || counting;
      countdownSel.disabled = running || counting;
      speedSel.disabled = false;

      startAutoBtn.disabled = finished || counting || (running && !!autoTimer);
      stopAutoBtn.disabled = !autoTimer;
      nextBallBtn.disabled = finished || counting || (running && !!autoTimer);

      if (counting) showOverlay("countdown");
      if (finished) showOverlay("finish");
      if (!counting && !finished) showOverlay(null);

      if (finished) {
        startAutoBtn.disabled = true;
        nextBallBtn.disabled = true;
        stopAutoBtn.disabled = true;
      }
    }

    function resetBoard() {
      stopAllTimers();

      const size = parseInt(ballSetSel.value, 10) || 75;
      deck = shuffle(BALLS).slice(0, size);
      drawn = [];
      current = null;

      historyEl.innerHTML = "";
      bigLetterEl.textContent = "–";
      bigNumEl.textContent = "–";
      bigBallEl.classList.remove("ball-b", "ball-i", "ball-n", "ball-g", "ball-o", "bingo-pop");
      bigBallEl.classList.add("ball-n");

      callLineEl.textContent = "Ready to play";
      factEl.textContent = "";
      metaEl.textContent = "";
      subMetaEl.textContent = `0 of ${size}`;

      showOverlay(null);
      setMode("idle");
    }

    function stopAllTimers() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
      if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
      }
    }

    function updateMeta() {
      const total = drawn.length + deck.length;
      metaEl.textContent = drawn.length ? `${drawn.length} of ${total} drawn` : `No balls drawn yet`;
      subMetaEl.textContent = `${drawn.length} of ${total}`;
    }

    function drawOne() {
      if (!deck.length) {
        finishGame();
        return;
      }

      current = deck.shift();
      drawn.push(current);

      const letter = bucketFor(current.n);
      const cls = bucketClass(letter);

      // Update big ball
      bigBallEl.classList.remove("ball-b", "ball-i", "ball-n", "ball-g", "ball-o", "bingo-pop");
      // force reflow for pop animation
      void bigBallEl.offsetWidth;
      bigBallEl.classList.add(cls, "bingo-pop");

      bigLetterEl.textContent = letter;
      bigNumEl.textContent = String(current.n);

      callLineEl.textContent = `${current.n}`;
      factEl.textContent = current.t;

      // Add to history grid (no overlap; scrolls if many)
      const small = document.createElement("div");
      small.className = `bingo-ball ${cls}`;
      small.textContent = String(current.n);
      historyEl.appendChild(small);

      updateMeta();
      soundTick();

      if (!deck.length) {
        setTimeout(finishGame, 450);
      }
    }

    function startAutoNow() {
      if (autoTimer) return;

      setMode("running");
      drawOne();

      autoTimer = setInterval(() => {
        drawOne();
      }, speedMs());

      setMode("running");
    }

    function stopAuto() {
      if (!autoTimer) return;
      clearInterval(autoTimer);
      autoTimer = null;

      setMode(deck.length ? "running" : "finished");
    }

    function startCountdownThenAuto() {
      stopAllTimers();

      const seconds = parseInt(countdownSel.value, 10) || 10;
      countdownTotal = seconds;
      countdownLeft = seconds;

      setMode("countdown");
      soundWhoosh();

      function renderCountdown() {
        countdownTextEl.textContent = formatCountdown(countdownLeft);
      }
      renderCountdown();

      countdownTimer = setInterval(() => {
        countdownLeft -= 1;
        renderCountdown();

        if (countdownLeft <= 0) {
          clearInterval(countdownTimer);
          countdownTimer = null;
          startAutoNow();
        }
      }, 1000);
    }

    function finishGame() {
      stopAllTimers();
      setMode("finished");
      finalLine.textContent = `BINGO! ${drawn.length} balls drawn.`;
      soundFinale();
    }

    /* ===============================
       Events
    =============================== */
    startAutoBtn.addEventListener("click", () => {
      audioCtx.resume();

      if (!deck.length) resetBoard();
      startCountdownThenAuto();
    });

    stopAutoBtn.addEventListener("click", () => stopAuto());

    nextBallBtn.addEventListener("click", () => {
      if (mode === "countdown") return;
      if (mode === "finished") return;

      if (!deck.length) {
        finishGame();
        return;
      }

      setMode("running");
      drawOne();
    });

    resetBtn.addEventListener("click", () => resetBoard());

    ballSetSel.addEventListener("change", () => {
      if (mode !== "idle") return;
      resetBoard();
    });

    speedSel.addEventListener("change", () => {
      if (!autoTimer) return;
      clearInterval(autoTimer);
      autoTimer = setInterval(() => drawOne(), speedMs());
      setMode("running");
    });

    playAgainBtn.addEventListener("click", () => {
      resetBoard();
      startCountdownThenAuto();
    });

    closeOverlayBtn.addEventListener("click", () => {
      // If finished, this just dismisses the overlay but keeps history visible
      if (mode === "finished") showOverlay(null);
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay && mode === "finished") showOverlay(null);
    });

    /* ===============================
       Init
    =============================== */
    resetBoard();
  },
};