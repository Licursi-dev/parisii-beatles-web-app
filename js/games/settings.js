 // js/games/settings.js

 import { loadPrefs, setPrefs } from "../settings.js";

 const GAME_KEY = "parisii_game_settings_v1";
 
 // ---------------------------
 // Game Settings Storage
 // ---------------------------
 const DEFAULT_GAME_SETTINGS = {
   quizTimer: 10,
   quizCount: 10,
   bingoSpeed: "5",
   bingoSize: 75,
 };
 
 function loadGameSettings() {
   try {
     const stored = JSON.parse(localStorage.getItem(GAME_KEY) || "{}");
     return { ...DEFAULT_GAME_SETTINGS, ...stored };
   } catch {
     return { ...DEFAULT_GAME_SETTINGS };
   }
 }
 
 function saveGameSettings(obj) {
   try {
     localStorage.setItem(GAME_KEY, JSON.stringify(obj || {}));
   } catch {}
 }
 
 function setSelectValue(id, value) {
   const el = document.getElementById(id);
   if (!el) return;
   el.value = String(value);
   el.dispatchEvent(new Event("change", { bubbles: true }));
 }
 
 // ---------------------------
 // Settings Page
 // ---------------------------
 export const settingsGame = {
   init(container) {
     const prefs = loadPrefs();
     const gs = loadGameSettings();
 
     container.innerHTML = `
       <section class="panel">
         <h2>⚙️ Settings</h2>
 
         <div class="settings-block">
           <h3>🎨 Appearance</h3>
           <div class="settings-grid">
             <label class="setting">
               <span>Theme</span>
               <select id="prefTheme">
                 <option value="light">Light</option>
                 <option value="dark">Dark</option>
               </select>
             </label>
 
             <label class="setting">
               <span>Font size</span>
               <select id="prefFont">
                 <option value="normal">Normal</option>
                 <option value="large">Large (A+)</option>
               </select>
             </label>
 
             <label class="setting">
               <span>Contrast</span>
               <select id="prefContrast">
                 <option value="normal">Normal</option>
                 <option value="high">High</option>
               </select>
             </label>
           </div>
         </div>
 
         <div class="settings-block">
           <h3>🧠 Quiz</h3>
           <div class="settings-grid">
             <label class="setting">
               <span>Time per question</span>
               <select id="quizTimer">
                 <option value="5">5s</option>
                 <option value="10">10s</option>
                 <option value="15">15s</option>
                 <option value="20">20s</option>
               </select>
             </label>
 
             <label class="setting">
               <span>Question count</span>
               <select id="quizCount">
                 <option value="5">5</option>
                 <option value="10">10</option>
                 <option value="15">15</option>
                 <option value="20">20</option>
               </select>
             </label>
           </div>
         </div>
 
         <div class="settings-block">
           <h3>🔵 Bingo</h3>
           <div class="settings-grid">
             <label class="setting">
               <span>Calling speed</span>
               <select id="bingoSpeed">
                 <option value="manual">Manual</option>
                 <option value="3">3s</option>
                 <option value="5">5s</option>
                 <option value="10">10s</option>
                 <option value="15">15s</option>
               </select>
             </label>
 
             <label class="setting">
               <span>Number pool</span>
               <select id="bingoSize">
                 <option value="25">25</option>
                 <option value="50">50</option>
                 <option value="75">75</option>
               </select>
             </label>
           </div>
         </div>
         
       </section>
     `;
 
     // ---------------------------
     // Set Initial Values
     // ---------------------------
     document.getElementById("prefTheme").value = prefs.theme;
     document.getElementById("prefFont").value = prefs.font;
     document.getElementById("prefContrast").value = prefs.contrast;
 
     document.getElementById("quizTimer").value = String(gs.quizTimer);
     document.getElementById("quizCount").value = String(gs.quizCount);
     document.getElementById("bingoSpeed").value = String(gs.bingoSpeed);
     document.getElementById("bingoSize").value = String(gs.bingoSize);
 
     // ---------------------------
     // Appearance Wiring
     // ---------------------------
     document
       .getElementById("prefTheme")
       .addEventListener("change", (e) => {
         setPrefs({ theme: e.target.value });
       });
 
     document
       .getElementById("prefFont")
       .addEventListener("change", (e) => {
         setPrefs({ font: e.target.value });
       });
 
     document
       .getElementById("prefContrast")
       .addEventListener("change", (e) => {
         setPrefs({ contrast: e.target.value });
       });
 
     // ---------------------------
     // Game Settings Wiring
     // ---------------------------
     function updateGameSettings(patch) {
       const current = loadGameSettings();
       const next = { ...current, ...(patch || {}) };
       saveGameSettings(next);
 
       // Sync to real controls if they exist
       if (patch.quizTimer != null)
         setSelectValue("quizTimerSelect", patch.quizTimer);
 
       if (patch.quizCount != null)
         setSelectValue("quizCountSelect", patch.quizCount);
 
       if (patch.bingoSpeed != null)
         setSelectValue("bingoSpeedSelect", patch.bingoSpeed);
 
       if (patch.bingoSize != null)
         setSelectValue("bingoSizeSelect", patch.bingoSize);
     }
 
     document
       .getElementById("quizTimer")
       .addEventListener("change", (e) =>
         updateGameSettings({ quizTimer: parseInt(e.target.value, 10) })
       );
 
     document
       .getElementById("quizCount")
       .addEventListener("change", (e) =>
         updateGameSettings({ quizCount: parseInt(e.target.value, 10) })
       );
 
     document
       .getElementById("bingoSpeed")
       .addEventListener("change", (e) =>
         updateGameSettings({ bingoSpeed: e.target.value })
       );
 
     document
       .getElementById("bingoSize")
       .addEventListener("change", (e) =>
         updateGameSettings({ bingoSize: parseInt(e.target.value, 10) })
       );
 
     // Push stored values into live controls if already rendered
     setSelectValue("quizTimerSelect", gs.quizTimer);
     setSelectValue("quizCountSelect", gs.quizCount);
     setSelectValue("bingoSpeedSelect", gs.bingoSpeed);
     setSelectValue("bingoSizeSelect", gs.bingoSize);
   },
 };