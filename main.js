"use strict";
function createHtml(html) {
  var div = document.createElement("div");
  div.innerHTML = html;
  return div.children[0];
};

function main() {
  var mainContentElement = document.getElementById("main-content");
  // ------------------------- TITLE SCREEN -------------------------
  var titleScreenElement;
  var startButtonElement;

  function handleStartClick() {
    destroyTitleScreen();
    buildGameScreen();
  };
  function buildTitleScreen() {
    titleScreenElement = createHtml(`<div class = "title-screen">
    <h1>Stock-exchange game </h1>
    <button>Start Game</button>
  </div> `);
    mainContentElement.appendChild(titleScreenElement);
    startButtonElement = titleScreenElement.querySelector("button");
    startButtonElement.addEventListener("click", handleStartClick);
  };
  function destroyTitleScreen() {
    titleScreenElement.remove();
    startButtonElement.removeEventListener("click", handleStartClick);

  };
  // ------------------------- GAME SCREEN -------------------------
  var game;
  function gameEnded() {
    destroyGameScreen();
    buildGameOverScreen();
  };

  function buildGameScreen() {
    game = new Game(mainContentElement);
    //game.start();
    game.onEnded(function() {
      gameEnded();
    });
    game.build();
  };

  function destroyGameScreen() {
    game.destroy();
    //gameScreenElement.remove();
  };
  // ------------------------- GAME OVER SCREEN -------------------------
  var gameOverScreenElement;
  var restartGameButtonElement;
  function handleRestartClick() {
    destroyGameOverScreen();
    buildGameScreen();
  };
  function buildGameOverScreen() {
    gameOverScreenElement = createHtml(`<div class = "gameover-screen">
    <h1>Game over</h1>
    <p>Greed, for lack of a better word, is good !!</p>
    <button>Restart Game</button>
  </div> `);
    mainContentElement.appendChild(gameOverScreenElement);
    restartGameButtonElement = gameOverScreenElement.querySelector("button");
    restartGameButtonElement.addEventListener("click", handleRestartClick);
  };
  function destroyGameOverScreen() {
    gameOverScreenElement.remove();
    restartGameButtonElement.removeEventListener("click", handleRestartClick);
  };
  // ------------------------- START APP -------------------------
  buildTitleScreen();
};
window.addEventListener("load", main);
