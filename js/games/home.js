// js/games/home.js

export const homeGame = {
    init(container) {
      container.innerHTML = `
        <section class="panel">
          <h2>🎸 Welcome to The Parisii Beatles Web App</h2>
  
          <p>
            A professional classroom engagement toolkit built around
            music, interaction, and accessibility.           
          </p>
  
          <div class="home-grid">
            <div class="home-card">
              <h3>🎵 Seat Selector</h3>
              <p>
                Assign seats using Beatles songs to create a fun,
                structured classroom environment.
              </p>
            </div>
  
            <div class="home-card">
              <h3>🔵 Bingo</h3>
              <p>
                Interactive bingo with adjustable speed and number pools
                for different class sizes.
              </p>
            </div>
  
            <div class="home-card">
              <h3>🧠 Quiz</h3>
              <p>
                Timed quiz mode with configurable question count
                and countdown controls.
              </p>
            </div>
  
            <div class="home-card">
              <h3>⚓ Battleships</h3>
              <p>
               Competitive Beatles game based on song release years and weeks in the charts.
              </p>
            </div>
          </div>
  
          <div class="home-accessibility">
            <h3>♿ Accessibility First</h3>
            <p>
              Includes dark mode, scalable fonts, and high-contrast options
              to support inclusive classroom use.
            </p>
          </div>
        </section>
      `;
    }
  };