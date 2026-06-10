const ASSETS = {
  board: "assets/board/bb_board.png",
  hit: "assets/markers/bb_marker_hit.png",
  miss: "assets/markers/bb_marker_miss.png",
  torpedo: "assets/theme/bb_torpedo.png",
  sub: "assets/theme/bb_yellow_submarine.png",
  ships: {
    red: {
      carrier: "assets/ships/bb_ship_carrier_red.png",
      battleship: "assets/ships/bb_ship_battleship_red.png",
      cruiser: "assets/ships/bb_ship_cruiser_red.png",
      submarine: "assets/ships/bb_ship_submarine_red.png",
      destroyer: "assets/ships/bb_ship_destroyer_red.png"
    },
    blue: {
      carrier: "assets/ships/bb_ship_carrier_blue.png",
      battleship: "assets/ships/bb_ship_battleship_blue.png",
      cruiser: "assets/ships/bb_ship_cruiser_blue.png",
      submarine: "assets/ships/bb_ship_submarine_blue.png",
      destroyer: "assets/ships/bb_ship_destroyer_blue.png"
    }
  }
};

const SONGS = [
  { name: "Cry For A Shadow", year: 1961, weeks: 0 },
  { name: "Love Me Do", year: 1962, weeks: 18 },

  { name: "My Bonnie", year: 1963, weeks: 1 },
  { name: "Please Please Me", year: 1963, weeks: 18 },
  { name: "From Me To You", year: 1963, weeks: 21 },
  { name: "She Loves You", year: 1963, weeks: 33 },
  { name: "I Want To Hold Your Hand", year: 1963, weeks: 22 },

  { name: "Can't Buy Me Love", year: 1964, weeks: 15 },
  { name: "Ain't She Sweet", year: 1964, weeks: 6 },
  { name: "A Hard Day's Night", year: 1964, weeks: 13 },
  { name: "I Feel Fine", year: 1964, weeks: 13 },

  { name: "Ticket To Ride", year: 1965, weeks: 12 },
  { name: "Help!", year: 1965, weeks: 14 },
  { name: "Day Tripper / We Can Work It Out", year: 1965, weeks: 12 },

  { name: "Paperback Writer", year: 1966, weeks: 11 },
  { name: "Yellow Submarine / Eleanor Rigby", year: 1966, weeks: 13 },

  { name: "Penny Lane / Strawberry Fields Forever", year: 1967, weeks: 11 },
  { name: "All You Need Is Love", year: 1967, weeks: 13 },
  { name: "Hello Goodbye", year: 1967, weeks: 12 },
  { name: "Magical Mystery Tour", year: 1967, weeks: 12 },

  { name: "Lady Madonna", year: 1968, weeks: 8 },
  { name: "Hey Jude", year: 1968, weeks: 16 },

  { name: "Get Back", year: 1969, weeks: 17 },
  { name: "The Ballad Of John And Yoko", year: 1969, weeks: 14 },
  { name: "Something / Come Together", year: 1969, weeks: 12 },

  { name: "Let It Be", year: 1970, weeks: 10 }
];

const WEEK_ROWS = [
  { min: 0, max: 0 },
  { min: 1, max: 3 },
  { min: 4, max: 6 },
  { min: 7, max: 9 },
  { min: 10, max: 12 },
  { min: 13, max: 15 },
  { min: 16, max: 18 },
  { min: 19, max: 21 },
  { min: 22, max: 24 },
  { min: 25, max: 33 }
];

const YEARS = [1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970];

const FLEET_LAYOUT = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2
};

function getIndex(year, weeks) {
  const col = YEARS.indexOf(year);
  const row = WEEK_ROWS.findIndex(r => weeks >= r.min && weeks <= r.max);

  if (col === -1 || row === -1) return null;

  return row * 10 + col;
}

function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function buildBoard(board) {
  board.innerHTML = "";

  for (let i = 0; i < 100; i += 1) {
    const cell = document.createElement("div");
    cell.className = "bb-cell";
    cell.dataset.index = i;
    board.appendChild(cell);
  }
}

function buildCoordinateGroups() {
  const map = new Map();

  SONGS.forEach(song => {
    const index = getIndex(song.year, song.weeks);

    if (index === null) return;

    if (!map.has(index)) {
      map.set(index, {
        index,
        songs: []
      });
    }

    map.get(index).songs.push(song);
  });

  return Array.from(map.values());
}

function createFleet(boardColor, coordinateGroups) {
  const groups = shuffle(coordinateGroups);
  let pointer = 0;

  const fleet = {
    color: boardColor,
    carrier: [],
    battleship: [],
    cruiser: [],
    submarine: [],
    destroyer: []
  };

  Object.entries(FLEET_LAYOUT).forEach(([shipName, size]) => {
    const parts = groups.slice(pointer, pointer + size).map(group => ({
      index: group.index,
      songs: group.songs,
      hit: false
    }));

    fleet[shipName] = parts;
    pointer += size;
  });

  return fleet;
}

function findShipAtIndex(fleet, index) {
  for (const shipName of Object.keys(FLEET_LAYOUT)) {
    const part = fleet[shipName].find(cell => cell.index === index);

    if (part) {
      return { shipName, part };
    }
  }

  return null;
}

function allShipsSunk(fleet) {
  return Object.keys(FLEET_LAYOUT).every(shipName =>
    fleet[shipName].every(cell => cell.hit)
  );
}

function getRemainingTargetParts(fleet) {
  const parts = [];

  Object.keys(FLEET_LAYOUT).forEach(shipName => {
    fleet[shipName].forEach(part => {
      if (!part.hit) {
        parts.push({
          shipName,
          index: part.index,
          songs: part.songs
        });
      }
    });
  });

  return parts;
}

function renderFleetStatus(container, fleetColor) {
  container.innerHTML = `
    <div style="font-weight:900;text-align:center;margin-bottom:8px;">
      ${fleetColor === "red" ? "Red Fleet" : "Blue Fleet"} Ships
    </div>

    <div id="ship-${fleetColor}-carrier" style="opacity:.25;margin-bottom:6px;text-align:center;">
      <img src="${ASSETS.ships[fleetColor].carrier}" alt="carrier" style="max-width:100%;height:40px;object-fit:contain;">
    </div>

    <div id="ship-${fleetColor}-battleship" style="opacity:.25;margin-bottom:6px;text-align:center;">
      <img src="${ASSETS.ships[fleetColor].battleship}" alt="battleship" style="max-width:100%;height:36px;object-fit:contain;">
    </div>

    <div id="ship-${fleetColor}-cruiser" style="opacity:.25;margin-bottom:6px;text-align:center;">
      <img src="${ASSETS.ships[fleetColor].cruiser}" alt="cruiser" style="max-width:100%;height:32px;object-fit:contain;">
    </div>

    <div id="ship-${fleetColor}-submarine" style="opacity:.25;margin-bottom:6px;text-align:center;">
      <img src="${ASSETS.ships[fleetColor].submarine}" alt="submarine" style="max-width:100%;height:32px;object-fit:contain;">
    </div>

    <div id="ship-${fleetColor}-destroyer" style="opacity:.25;text-align:center;">
      <img src="${ASSETS.ships[fleetColor].destroyer}" alt="destroyer" style="max-width:100%;height:28px;object-fit:contain;">
    </div>
  `;
}

function revealShipStatus(fleetColor, shipName) {
  const node = document.getElementById(`ship-${fleetColor}-${shipName}`);
  if (node) {
    node.style.opacity = "1";
  }
}

export const battleshipsGame = {
  init(container) {
    const savedScores = JSON.parse(localStorage.getItem("bb-scores") || '{"red":0,"blue":0}');
    const savedTeams = JSON.parse(localStorage.getItem("bb-team-names") || '{"red":"Red Team","blue":"Blue Team"}');

    container.innerHTML = `
      <h2>Beatles Battleships</h2>
      <div class="bb-help">
  Enter the song’s year and chart weeks to fire. Match correctly to hit ships. First to sink the fleet wins.
</div>
      <button id="bb-reset-scores">Reset Scores</button>

      <div class="bb-scoreboard">
        <div class="bb-score-card">
          <div id="bb-score-red-name" class="bb-score-name">${savedTeams.red}</div>
          <div id="bb-score-red" class="bb-score-value">${savedScores.red}</div>
        </div>

        <div class="bb-score-card">
          <div id="bb-score-blue-name" class="bb-score-name">${savedTeams.blue}</div>
          <div id="bb-score-blue" class="bb-score-value">${savedScores.blue}</div>
        </div>
      </div>

      <div class="bb-team-names">
        <h4>Team Names</h4>
        <input id="bb-team-name-red" placeholder="Red Team Name" value="${savedTeams.red}">
        <input id="bb-team-name-blue" placeholder="Blue Team Name" value="${savedTeams.blue}">
      </div>

      <div class="bb-game-layout">

        <div class="bb-board-area">
          <h3 id="bb-red-heading">${savedTeams.red} Fleet</h3>
          <div class="bb-wrapper">
            <img class="bb-board-image" src="${ASSETS.board}">
            <div id="bb-board-red" class="bb-board"></div>
          </div>
        </div>
                <div class="bb-panel">

          <div id="bb-song" class="bb-status"></div>
          <div id="bb-turn" class="bb-status">Turn: Red</div>

          <div class="bb-team-box">
            <h4 id="bb-red-team-label">${savedTeams.red}</h4>
            <input id="bb-year-red" placeholder="Year">
            <input id="bb-weeks-red" placeholder="Weeks">
            <button id="bb-fire-red">Fire Red Torpedo</button>
          </div>

          <div class="bb-team-box">
            <h4 id="bb-blue-team-label">${savedTeams.blue}</h4>
            <input id="bb-year-blue" placeholder="Year">
            <input id="bb-weeks-blue" placeholder="Weeks">
            <button id="bb-fire-blue">Fire Blue Torpedo</button>
          </div>

          <div class="bb-team-box" id="bb-red-fleet-box"></div>
          <div class="bb-team-box" id="bb-blue-fleet-box"></div>

          <button id="bb-reset">New Game</button>

          <div id="bb-status"></div>

        </div>

        <div class="bb-board-area">
          <h3 id="bb-blue-heading">${savedTeams.blue} Fleet</h3>
          <div class="bb-wrapper">
            <img class="bb-board-image" src="${ASSETS.board}">
            <div id="bb-board-blue" class="bb-board"></div>
          </div>
        </div>

      </div>
      </div>

<details class="bb-cheat-panel">
  <summary>Cheat Sheet</summary>
  <pre class="bb-cheat">
1961/0 Cry For A Shadow
1962/18 Love Me Do
1963/1 My Bonnie
1963/18 Please Please Me
1963/21 From Me To You
1963/22 I Want To Hold Your Hand
1963/33 She Loves You
1964/6 Ain't She Sweet
1964/13 A Hard Day's Night
1964/13 I Feel Fine
1964/15 Can't Buy Me Love
1965/12 Ticket To Ride
1965/12 Day Tripper / We Can Work It Out
1965/14 Help!
1966/11 Paperback Writer
1966/13 Yellow Submarine / Eleanor Rigby
1967/11 Penny Lane / Strawberry Fields Forever
1967/12 Hello Goodbye
1967/12 Magical Mystery Tour
1967/13 All You Need Is Love
1968/8 Lady Madonna
1968/16 Hey Jude
1969/12 Something / Come Together
1969/14 The Ballad Of John And Yoko
1969/17 Get Back
1970/10 Let It Be</pre>
</details>
      
    `;

    const boardRed = container.querySelector("#bb-board-red");
    const boardBlue = container.querySelector("#bb-board-blue");

    const yearRed = container.querySelector("#bb-year-red");
    const weeksRed = container.querySelector("#bb-weeks-red");
    const yearBlue = container.querySelector("#bb-year-blue");
    const weeksBlue = container.querySelector("#bb-weeks-blue");

    const fireRedBtn = container.querySelector("#bb-fire-red");
    const fireBlueBtn = container.querySelector("#bb-fire-blue");
    const resetBtn = container.querySelector("#bb-reset");
    const resetScoresBtn = container.querySelector("#bb-reset-scores");

    const songDisplay = container.querySelector("#bb-song");
    const turnDisplay = container.querySelector("#bb-turn");
    const status = container.querySelector("#bb-status");

    const redFleetBox = container.querySelector("#bb-red-fleet-box");
    const blueFleetBox = container.querySelector("#bb-blue-fleet-box");

    const redTeamNameInput = container.querySelector("#bb-team-name-red");
    const blueTeamNameInput = container.querySelector("#bb-team-name-blue");

    const redScoreName = container.querySelector("#bb-score-red-name");
    const blueScoreName = container.querySelector("#bb-score-blue-name");
    const redScoreValue = container.querySelector("#bb-score-red");
    const blueScoreValue = container.querySelector("#bb-score-blue");

    const redHeading = container.querySelector("#bb-red-heading");
    const blueHeading = container.querySelector("#bb-blue-heading");
    const redTeamLabel = container.querySelector("#bb-red-team-label");
    const blueTeamLabel = container.querySelector("#bb-blue-team-label");

    const cheatPanel = document.createElement("details");
cheatPanel.className = "bb-cheat-panel";

cheatPanel.innerHTML = `
  <summary>Cheat Sheet</summary>
  <pre class="bb-cheat">
1961/0 Cry For A Shadow
1962/18 Love Me Do
1963/1 My Bonnie
1963/18 Please Please Me
1963/21 From Me To You
1963/22 I Want To Hold Your Hand
1963/33 She Loves You
1964/6 Ain't She Sweet
1964/13 A Hard Day's Night
1964/13 I Feel Fine
1964/15 Can't Buy Me Love
1965/12 Ticket To Ride
1965/12 Day Tripper / We Can Work It Out
1965/14 Help!
1966/11 Paperback Writer
1966/13 Yellow Submarine / Eleanor Rigby
1967/11 Penny Lane / Strawberry Fields Forever
1967/12 Hello Goodbye
1967/12 Magical Mystery Tour
1967/13 All You Need Is Love
1968/8 Lady Madonna
1968/16 Hey Jude
1969/12 Something / Come Together
1969/14 The Ballad Of John And Yoko
1969/17 Get Back
1970/10 Let It Be
  </pre>
`;

container.appendChild(cheatPanel);

    const coordinateGroups = buildCoordinateGroups();

    let turn = "red";
    let currentPrompt = null;
    let redFleet;
    let blueFleet;
    let firedOnRed = new Set();
    let firedOnBlue = new Set();
    let finalTurn = false;
    let finalTurnTeam = null;
    let gameOver = false;
    
    let redScore = Number(savedScores.red) || 0;
    let blueScore = Number(savedScores.blue) || 0;

    function getRedTeamName() {
      return redTeamNameInput.value.trim() || "Red Team";
    }

    function getBlueTeamName() {
      return blueTeamNameInput.value.trim() || "Blue Team";
    }

    function saveScores() {
      localStorage.setItem("bb-scores", JSON.stringify({
        red: redScore,
        blue: blueScore
      }));
    }

    function saveTeamNames() {
      localStorage.setItem("bb-team-names", JSON.stringify({
        red: getRedTeamName(),
        blue: getBlueTeamName()
      }));
    }

    function updateScoreboard() {
      redScoreName.textContent = getRedTeamName();
      blueScoreName.textContent = getBlueTeamName();
      redScoreValue.textContent = redScore;
      blueScoreValue.textContent = blueScore;
    }

    function updateTeamLabels() {
      redHeading.textContent = `${getRedTeamName()} Fleet`;
      blueHeading.textContent = `${getBlueTeamName()} Fleet`;
      redTeamLabel.textContent = getRedTeamName();
      blueTeamLabel.textContent = getBlueTeamName();

      if (turn === "red") {
        turnDisplay.textContent = `Turn: ${getRedTeamName()}`;
      } else {
        turnDisplay.textContent = `Turn: ${getBlueTeamName()}`;
      }
    }

    function updateTeamUI() {
      updateScoreboard();
      updateTeamLabels();
    }

    redTeamNameInput.addEventListener("input", () => {
      saveTeamNames();
      updateTeamUI();
    });

    blueTeamNameInput.addEventListener("input", () => {
      saveTeamNames();
      updateTeamUI();
    });

    function setTurn(newTurn) {
      turn = newTurn;

      if (newTurn === "red") {
        turnDisplay.textContent = `Turn: ${getRedTeamName()}`;
      } else {
        turnDisplay.textContent = `Turn: ${getBlueTeamName()}`;
      }
    }

    function clearInputs() {
      yearRed.value = "";
      weeksRed.value = "";
      yearBlue.value = "";
      weeksBlue.value = "";
    }

    function chooseNextPrompt() {
      const targetFleet = turn === "red" ? blueFleet : redFleet;
      const remainingParts = getRemainingTargetParts(targetFleet);

      if (remainingParts.length === 0) {
        currentPrompt = null;
        songDisplay.textContent = "Fleet destroyed";
        return;
      }

      const chosenPart = remainingParts[Math.floor(Math.random() * remainingParts.length)];
      const chosenSong = chosenPart.songs[Math.floor(Math.random() * chosenPart.songs.length)];

      currentPrompt = {
        index: chosenPart.index,
        song: chosenSong
      };

      songDisplay.textContent = chosenSong.name;
    }

    function launchTorpedo(board, index, onImpact) {
      const wrapper = board.parentElement;
      const cells = board.querySelectorAll(".bb-cell");
      const targetCell = cells[index];

      const torpedo = document.createElement("img");
      torpedo.src = ASSETS.torpedo;
      torpedo.className = "bb-torpedo";

      const sub = document.createElement("img");
      sub.src = ASSETS.sub;
      sub.className = "bb-sub";

      wrapper.appendChild(sub);
      wrapper.appendChild(torpedo);

      const wrapRect = wrapper.getBoundingClientRect();
      const cellRect = targetCell.getBoundingClientRect();

      const targetX = cellRect.left - wrapRect.left + cellRect.width / 2;
      const targetY = cellRect.top - wrapRect.top + cellRect.height / 2;

      sub.style.left = `${targetX - 120}px`;
      sub.style.top = `${targetY - 20}px`;

      torpedo.style.left = `${targetX - 120}px`;
      torpedo.style.top = `${targetY}px`;

      setTimeout(() => {
        torpedo.style.transition = "all 1s linear";
        torpedo.style.left = `${targetX}px`;
      }, 50);

      setTimeout(() => {
        onImpact(targetCell);
      }, 1000);

      setTimeout(() => {
        torpedo.remove();
        sub.remove();
      }, 1200);
    }

    function resolveFinalResult() {
      if (redScore > blueScore) {
        status.innerHTML = `<span class="bb-win">${getRedTeamName()} WINS!</span>`;
      } else if (blueScore > redScore) {
        status.innerHTML = `<span class="bb-win">${getBlueTeamName()} WINS!</span>`;
      } else {
        status.innerHTML = `<span class="bb-win">DRAW!</span>`;
      }

      container.classList.add("bb-flash");

      setTimeout(() => {
        container.classList.remove("bb-flash");
      }, 600);

      currentPrompt = null;
      gameOver = true;
    }

    function handleShot(attackingTeam, year, weeks) {
      if (!currentPrompt || gameOver) return;

      const inputIndex = getIndex(year, weeks);

      if (inputIndex === null) {
        status.textContent = "Invalid coordinates";
        return;
      }

      const enemyBoard = attackingTeam === "red" ? boardBlue : boardRed;
      const enemyFleet = attackingTeam === "red" ? blueFleet : redFleet;
      const enemyColor = attackingTeam === "red" ? "blue" : "red";
      const firedSet = attackingTeam === "red" ? firedOnBlue : firedOnRed;

      if (firedSet.has(currentPrompt.index)) {
        chooseNextPrompt();
        return;
      }

      launchTorpedo(enemyBoard, inputIndex, cell => {
        const marker = document.createElement("img");
        marker.style.position = "relative";
        marker.style.zIndex = "10";
        marker.style.width = "85%";

        if (inputIndex === currentPrompt.index) {
          marker.src = ASSETS.hit;

          const hitData = findShipAtIndex(enemyFleet, currentPrompt.index);

          if (hitData) {
            enemyFleet[hitData.shipName].forEach(part => {
              part.hit = true;
            });

            const ship = document.createElement("img");
            ship.src = ASSETS.ships[enemyColor][hitData.shipName];
            ship.className = "bb-ship";
            cell.appendChild(ship);

            revealShipStatus(enemyColor, hitData.shipName);
            status.textContent = `${hitData.shipName} sunk`;

            firedSet.add(currentPrompt.index);

            if (allShipsSunk(enemyFleet)) {
              if (!finalTurn) {
                finalTurn = true;
                finalTurnTeam = attackingTeam === "red" ? "blue" : "red";

                if (attackingTeam === "red") {
                  redScore += 1;
                } else {
                  blueScore += 1;
                }

                saveScores();
                updateScoreboard();

                status.innerHTML = `<span class="bb-win">Fleet Destroyed! ${finalTurnTeam === "red" ? getRedTeamName() : getBlueTeamName()} gets final shot!</span>`;

                container.classList.add("bb-flash");

                setTimeout(() => {
                  container.classList.remove("bb-flash");
                }, 600);
              } else {
                if (attackingTeam === "red") {
                  redScore += 1;
                } else {
                  blueScore += 1;
                }

                saveScores();
                updateScoreboard();
              }
            }
          } else {
            status.textContent = "Hit!";
            firedSet.add(currentPrompt.index);
          }
        } else {
          marker.src = ASSETS.miss;
          status.textContent = "Miss";
        }

        cell.appendChild(marker);
      });

      clearInputs();
      setTurn(attackingTeam === "red" ? "blue" : "red");

      setTimeout(() => {
        if (gameOver) return;

        if (finalTurn) {
          if (attackingTeam === finalTurnTeam) {
            resolveFinalResult();
            return;
          }

          chooseNextPrompt();
          return;
        }

        if (!allShipsSunk(enemyFleet)) {
          chooseNextPrompt();
        }
      }, 1400);
    }

    fireRedBtn.onclick = () => {
      if (turn !== "red" || gameOver) return;

      const year = parseInt(yearRed.value, 10);
      const weeks = parseInt(weeksRed.value, 10);

      handleShot("red", year, weeks);
    };

    fireBlueBtn.onclick = () => {
      if (turn !== "blue" || gameOver) return;

      const year = parseInt(yearBlue.value, 10);
      const weeks = parseInt(weeksBlue.value, 10);

      handleShot("blue", year, weeks);
    };

    function newGame() {
      buildBoard(boardRed);
      buildBoard(boardBlue);

      redFleet = createFleet("red", coordinateGroups);
      blueFleet = createFleet("blue", coordinateGroups);

      firedOnRed = new Set();
      firedOnBlue = new Set();
      finalTurn = false;
      finalTurnTeam = null;
      gameOver = false;

      renderFleetStatus(redFleetBox, "red");
      renderFleetStatus(blueFleetBox, "blue");

      setTurn("red");
      clearInputs();
      status.textContent = "";
      updateTeamUI();
      chooseNextPrompt();
    }

    resetBtn.onclick = newGame;
    resetScoresBtn.onclick = () => {

      localStorage.setItem("bb-scores", JSON.stringify({
        red: 0,
        blue: 0
      }));
    
      location.reload();
    };

    updateTeamUI();
    newGame();
  }
};
