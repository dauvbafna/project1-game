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
    <center>
      <img src="./money-never-sleeps.jpg" alt="img" style="width:100%">
      <div class = "my-buttons-on-splash" style="position: relative; bottom: 6.5vh;">
      <button class="btn btn-outline-info btn-lg">Start Game</button>
      <button type="button" class="btn btn-outline-info btn-lg btn2" data-toggle="modal" data-target="#instructionModal">Instructions</button>
      <div class="modal fade" id="instructionModal" tabindex="-1" role="dialog" aria-labelledby="instructionModalLabel" aria-hidden="true">
<div class="modal-dialog" role="document">
<div class="modal-content">
  <div class="modal-header">
    <h5 class="modal-title" id="instructionModalLabel">Read Instructions carefully before playing.</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    Some crazy intructions what no one would read !!
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
  </div>
</div>
</div>
</div>
    </center>
    </div>  `);
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
    game.onEnded(function() {
      gameEnded();
    });
    game.build();
    game.start();
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
    var finalMoney = game.playerNetworth;
    gameOverScreenElement = createHtml(`<div class = "gameover-screen" style="background:  black;">
    <center>
    <div class="container">
      <h1 class="display-3" style="color: white;">Game over</h1>
      <span class="badge badge-info" style="font-size: 20px;">Your networth: </span>
    <span class = "networth badge badge-success" style="font-size: 20px;">` + finalMoney + `</span>
    <img src="./gameoverimage.gif" alt="img" style="width:100%; margin-top: 3vh;">
          <button class=" restart btn btn-info btn-lg" style="margin-top: 10px;"> Restart Game</button>
        </div>  
      </center>
     </div>`);
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
