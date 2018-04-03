'use strict'
function Game(parentElement) {
  var self = this;
  self.callback = null;
  self.parentElement = parentElement;
  self.gameoverButtonElement = null;
  self.playerNetworth = 0; 
};

Game.prototype.onEnded = function(cb) {
  var self = this;
  self.callback = cb;
};

Game.prototype.build = function() {
  var self = this;
  self.gameScreenElement = createHtml(`<div class="game-screen">
  <div class="company1">
      <p class="company-details">
      <span class="name">Company1</span>
      <span class="current-value">Current value:</span>
      <span class="market price">5</span>
      </p>

        <div class = "player-cards">
              <p>Your cards</p>
              <span class ="p-card1">0</span>
              <span class ="p-card2">0</span>
        </div>
          
        <div class = "bot-cards">
              <p>Bot cards</p>
              <span class ="p-card1">?</span>
              <span class ="p-card2">?</span>
        </div>

        <div class = "buy-stocks">
            <form>
                <div>
                  <label for="company1Qty">Buy:</label>
                  <input type="number" id="c1Qty">
                </div>
            </form>

        </div>

    </div>
<hr>

 <div class="company2">
        <p class="company-details">
        <span class="name">Company2</span>
        <span class="current-value">Current value:</span>
        <span class="market price">10</span>
        </p>

      <div class = "player-cards">
          <p>Your cards</p>
          <span class ="p-card1">0</span>
          <span class ="p-card2">0</span>
      </div>
      
      <div class = "bot-cards">
          <p>Bot cards</p>
          <span class ="p-card1">?</span>
          <span class ="p-card2">?</span>
      </div>

      <form>
          <div>
            <label for="company2Qty">Buy:</label>
            <input type="number" id="c2Qty">
          </div>
      </form>

  </div>  
<hr>
  <div class ="player-cash">
    <span>Cash balance - </span>
    <span>1000</span>
  </div>

  <button class="confirm">Confirm</button>
  <button class="next">Next</button>
  <button class="gameover-btn">Game Over</button>

</div>`);

  self.parentElement.appendChild(self.gameScreenElement);
  self.gameoverButtonElement = self.gameScreenElement.querySelector(".gameover-btn");
  self.gameoverButtonElement.addEventListener("click", self.callback);
};
// Game.prototype.start = function() {
//   var self = this;
//   self.nextTurn();
// };

Game.prototype.destroy = function() {
  var self = this;
  self.gameScreenElement.remove();
  self.gameoverButtonElement.removeEventListener("click", self.callback);
};