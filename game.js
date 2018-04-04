'use strict'
function Game(parentElement) {
  var self = this;
  self.callback = null;
  self.parentElement = parentElement;
  self.gameoverButtonElement = null;
  self.company1 = new Company ('crazycompany1', 100);
  self.company2 = new Company ('crazycompany2', 150);
  self.player = new Player ('Player1', 10000, 0, 0);
  self.cardsA = [];
  self.cardsB = [];
  self.playerNetworth = 0; 
  self.isChecked = false;

  self.turncardsA =[];
  self.turncardsB =[];
  self.turnInvestment = 0;

  self.playercardAOneElement= null;
  self.playercardATwoElement= null;
  self.botcardAOneElement= null;
  self.botcardATwoElement= null;
  self.playercardBOneElement= null;
  self.playercardBTwoElement= null;
  self.botcardBOneElement= null;
  self.botcardBTwoElement= null;

  self.currentpriceAElement= null;
  self.currentpriceBElement= null;

  self.buyInput = [];
  self.buyformAElement= null;
  self.buyformBElement= null;
  self.playerCashElement= null;
  self.confirmButtonElement= null;
  self.nextButtonElement= null;
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
  <span class="market-priceA">100</span>
  </p>
  
  <div class = "player-cards">
  <p>Your cards</p>
  <span class ="p-cardA1">0</span>
  <span class ="p-cardA2">0</span>
  </div>
  
  <div class = "bot-cards">
  <p>Bot cards</p>
  <span class ="b-cardA1">?</span>
  <span class ="b-cardA2">?</span>
  </div>
  
  <form class ="buy-a">
  <div>
  <label for="company1Qty">Buy:</label>
  <input type="number" id="c1Qty">
  </div>
  </form>
  
  
  
  </div>
  <hr>
  
  <div class="company2">
  <p class="company-details">
  <span class="name">Company2</span>
  <span class="current-value">Current value:</span>
  <span class="market-priceB">150</span>
  </p>
  
  <div class = "player-cards">
  <p>Your cards</p>
  <span class ="p-cardB1">0</span>
  <span class ="p-cardB2">0</span>
  </div>
  
  <div class = "bot-cards">
  <p>Bot cards</p>
  <span class ="b-cardB1">?</span>
  <span class ="b-cardB2">?</span>
  </div>
  
  <form class ="buy-b">
  <div>
  <label for="company2Qty">Buy:</label>
  <input type="number" id="c2Qty">
  </div>
  </form>
  
  </div>  
  <hr>
  <div class = "player-status">
  <span>Cash balance - </span>
  <span class ="player-cash" >10000</span>
  </div>
  
  <button class="confirm-btn">Confirm</button>
  <button class="next-btn">Next</button>
  <button class="gameover-btn">Game Over</button>
  
  </div>`);
  
  self.playercardAOneElement = self.gameScreenElement.querySelector('.company1 .player-cards .p-cardA1');
  self.playercardATwoElement = self.gameScreenElement.querySelector('.company1 .player-cards .p-cardA2');
  self.botcardAOneElement = self.gameScreenElement.querySelector('.company1 .bot-cards .b-cardA1');
  self.botcardATwoElement = self.gameScreenElement.querySelector('.company1 .bot-cards .b-cardA2');
  
  self.playercardBOneElement = self.gameScreenElement.querySelector('.company2 .player-cards .p-cardB1');
  self.playercardBTwoElement = self.gameScreenElement.querySelector('.company2 .player-cards .p-cardB2');
  self.botcardBOneElement = self.gameScreenElement.querySelector('.company2 .bot-cards .b-cardB1');
  self.botcardBTwoElement = self.gameScreenElement.querySelector('.company2 .bot-cards .b-cardB2');
  
  self.currentpriceAElement = self.gameScreenElement.querySelector('.company1 .market-priceA');
  self.currentpriceBElement = self.gameScreenElement.querySelector('.company2 .market-priceB');
  
  self.buyformAElement = self.gameScreenElement.querySelector('.company1 .buy-a');
  self.buyformBElement = self.gameScreenElement.querySelector('.company2 .buy-b');
  
  self.playerCashElement = self.gameScreenElement.querySelector('.player-status .player-cash');
  
  self.confirmButtonElement = self.gameScreenElement.querySelector(".confirm-btn");
  self.nextButtonElement = self.gameScreenElement.querySelector(".next-btn");
  
  self.parentElement.appendChild(self.gameScreenElement);
  self.gameoverButtonElement = self.gameScreenElement.querySelector(".gameover-btn");
  self.gameoverButtonElement.addEventListener("click", self.callback);
  
  self.setupBinding();
};

Game.prototype.createCards = function(){
  var self= this;
  for (var i =-25; i<=25; i+=5){ 
  if(i!== 0){
    var newCards = new Card("companyA", i);
    self.cardsA.push(newCards);
    };
  };

  for (var i =-25; i<=25; i+=5){ 
      if(i!== 0){
      var newCards = new Card("companyB", i);
      self.cardsB.push(newCards);
    };
  };

};

Game.prototype.start = function() {
  var self = this;
  self.createCards();
  self.nextTurn();
};


Game.prototype.destroy = function() {
  var self = this;
  self.gameScreenElement.remove();
  self.gameoverButtonElement.removeEventListener("click", self.callback);
  self.confirmButtonElement.removeEventListener('click',  self.handleConfirmClick);
  self.nextButtonElement.removeEventListener('click',  self.handleNextClick);
};

Game.prototype.shuffle = function(array) {
    var counter = array.length;
    while (counter > 0) {
        var index = Math.floor(Math.random() * counter);
        counter--;

        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    };
    return array;
};


Game.prototype.setupBinding = function () {
  var self = this;

  self.handleConfirmClick = function (event){
    console.log('confirm');
    self.checkBuy();
  }

  self.handleNextClick = function (event){
    console.log('next');
    if(self.isChecked == false){
      alert("please press the confirm button first after buying some stocks");
    }
    else{
      self.updateCurrentPrices();
    };
  };
  
  self.confirmButtonElement.addEventListener('click',  self.handleConfirmClick);
  self.nextButtonElement.addEventListener('click',  self.handleNextClick);
}

Game.prototype.revealBotCards = function (){
  // function to replace $ with bot cards 
  var self = this;
  self.botcardAOneElement.innerText = self.turncardsA[2].value;
  self.botcardATwoElement.innerText = self.turncardsA[3].value;
  self.botcardBOneElement.innerText = self.turncardsB[2].value;
  self.botcardBTwoElement.innerText = self.turncardsB[3].value;
}

Game.prototype.checkBuy = function(){
  // function to check total investment value less than current cash
  var self = this;
  self.turnInvestment = (self.buyInput[0].value * self.company1.value) + (self.buyInput[1].value * self.company2.value);
  if(self.turnInvestment > self.player.money){
    alert("Are you tryig to buy the world ? Try lower quantitites");
  }
  else{
    self.revealBotCards();
    self.isChecked = true;

    var newMoney = self.player.money - self.turnInvestment;
    var newstockA = self.player.stockA + self.buyInput[0].value;
    var newstockB = self.player.stockB + self.buyInput[1].value;
    console.log(newMoney);
    console.log(newstockA);
    console.log(newstockB);

    self.player.update(newMoney,newstockA,newstockB);
    self.playerCashElement.innerText = newMoney;
  }

}

Game.prototype.updateCurrentPrices = function (){
  //function to add all cards and update the current prices of all companies 
  var self = this;
  var turnCardSumA = 0;
  var turnCardSumB = 0;

  for(var i =0; i<self.turncardsA.length; i++){
    turnCardSumA += self.turncardsA[i].value;
    turnCardSumB += self.turncardsB[i].value;
  };
  
  var marketvalueA = self.company1.value + turnCardSumA;
  var marketvalueB = self.company2.value + turnCardSumB;

  self.company1.update(marketvalueA);
  self.company2.update(marketvalueB); 

  self.currentpriceAElement.innerText = marketvalueA;
  self.currentpriceBElement.innerText = marketvalueB;

}

Game.prototype.nextTurn = function() {
  var self = this;
  
  self.shuffle(self.cardsA);
  self.shuffle(self.cardsB);

  for(var i =0; i<4; i++){
    self.turncardsA.push(self.cardsA[i]);
    self.turncardsB.push(self.cardsB[i]);
  }

  self.botcardAOneElement.innerText = "$";
  self.botcardATwoElement.innerText = "$";
  self.botcardBOneElement.innerText = "$";
  self.botcardBTwoElement.innerText = "$";

  self.playercardAOneElement.innerText = self.turncardsA[0].value;
  self.playercardATwoElement.innerText = self.turncardsA[1].value;
  self.playercardBOneElement.innerText = self.turncardsB[0].value;
  self.playercardBTwoElement.innerText = self.turncardsB[1].value;

  self.buyInput = document.querySelectorAll("input");
  // self.buyformAElement = self.buyInput[0];
  // self.buyformBElement = self.buyInput[1];

};
  




