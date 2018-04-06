'use strict'
function Game(parentElement) {
  var self = this;
  self.callback = null;
  self.parentElement = parentElement;
  self.gameoverButtonElement = null;
  self.round = 0;
  self.roundElement = null;
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

  self.stockAElement = null;
  self.stockBElement = null;

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
  self.gameScreenElement = createHtml(`  <div class="game-screen" style="font-size: 4vh;">
      <div class="card">
          <div class="card-body text-center">
              <div class = "round">
                <span>Round</span>&nbsp;<span class = "round-number">0</span>
              </div>
          </div>
      </div>
    
      <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist" >
          <li class="nav-item">
            <a class="nav-link active" id="p1-tab" data-toggle="tab" href="#p1" role="tab" aria-controls="p1" aria-selected="true">Player 1</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="p2-tab" data-toggle="tab" href="#p2" role="tab" aria-controls="p2" aria-selected="false">Player 2</a>
          </li>
      </ul>
      
      <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="p1" role="tabpanel" aria-labelledby="p1-tab">
              <div class="card"> 
                  <div class="card-header">
                      <div class="company1">
                          <p class="company-details">
                              <center><span class="name">Company1</span>&nbsp;&nbsp;&nbsp;
                              <span class="current-value">Current value:</span>
                              <span class="market-priceA">100</span>
                              </center>
                          </p>
                      </div>
                  </div>
                  <div class="card-body text-center">
                        <h4>Your cards</h4>
                        <div class="row">
                            <div class="col-6 col-sm-6">
                              <div class="card">
                                <div class="card-body">      
                                      <div class="player-cards">
                                        <span class="p-cardA1">0</span>
                                      </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-6 col-sm-6">
                              <div class="card">
                                <div class="card-body">
                                  <div class="player-cards">          
                                        <span class="p-cardA2">0</span>
                                      </div>       
                                </div>
                              </div>
                            </div>
                          </div>

                          <h4>Bot cards</h4>
                          <div class="row">
                              <div class="col-6 col-sm-6">
                                <div class="card">
                                  <div class="card-body">
                                    <div class="bot-cards">
                                      <span class="b-cardA1">$</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-6 col-sm-6">
                                <div class="card">
                                  <div class="card-body">
                                    <div class="bot-cards">
                                      <span class="b-cardA2">$</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              </div>
                          </div>

                          <div class="card-footer text-center">
                              <form class="buy-a">
                                  <div>
                                  <label for="company1Qty">Buy:</label>
                                  <input type="number" id="c1Qty" placeholder="Quantity" class="quantity-box-daaamn">
                                  </div>
                                  </form>

                                  <div class="stock-holding">
                                      <span>Stock holding :</span>
                                      <span class="stock-qty-a">0</span>
                                  </div>
                           </div>
                  </div>
                  <br>
                  <div class="card mb"> 
                      <div class="card-header">
                          <div class="company2">
                              <p class="company-details">
                                  <center><span class="name">Company2</span>&nbsp;&nbsp;&nbsp;
                                  <span class="current-value">Current value:</span>
                                  <span class="market-priceB">150</span>
                                  </center>
                              </p>
                          </div>
                      </div>
                      <div class="card-body text-center">
                            <h4>Your cards</h4>
                            <div class="row">
                                <div class="col-6 col-sm-6">
                                  <div class="card">
                                    <div class="card-body">      
                                          <div class="player-cards">
                                            <span class="p-cardB1">0</span>
                                          </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-6 col-sm-6">
                                  <div class="card">
                                    <div class="card-body">
                                      <div class="player-cards">          
                                            <span class="p-cardB2">0</span>
                                          </div>       
                                    </div>
                                  </div>
                                </div>
                              </div>
    
                              <h4>Bot cards</h4>
                              <div class="row">
                                  <div class="col-6 col-sm-6">
                                    <div class="card">
                                      <div class="card-body">
                                        <div class="bot-cards">
                                          <span class="b-cardB1">$</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-6 col-sm-6">
                                    <div class="card">
                                      <div class="card-body">
                                        <div class="bot-cards">
                                          <span class="b-cardB2">$</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  </div>
                              </div>
    
                              <div class="card-footer text-center">
                                  <form class="buy-b">
                                      <div>
                                      <label for="company2Qty">Buy:</label>
                                      <input type="number" id="c2Qty" placeholder="Quantity" class="input-box">
                                      </div>
                                      </form>
    
                                      <div class="stock-holding">
                                          <span>Stock holding :</span>
                                          <span class="stock-qty-b">0</span>
                                      </div>
                               </div>
                          </div>

                          <div class="card"> 
                              <div class="card-body text-center tofloat">
                                  <div class = "player-status">
                                      <h5>Cash Balance</h5>
                                      <span class ="player-cash" >10000</span>
                                  </div>
                                    
                                    <div class = "col-md-12">
                                    <button class="confirm-btn btn btn-outline-info btn-lg ">Confirm</button>
                                    <button class="next-btn btn btn-outline-info btn-lg ">Next</button>
                                    <button class="gameover-btn btn btn-outline-info btn-lg ">Game Over</button>
                                    </div>
                              
                        </div>
                </div>
        </div>
    </div>
  </div>`);
  
  self.roundElement = self.gameScreenElement.querySelector ('.round-number');

  self.playercardAOneElement = self.gameScreenElement.querySelector('.p-cardA1');
  self.playercardATwoElement = self.gameScreenElement.querySelector('.p-cardA2');
  self.botcardAOneElement = self.gameScreenElement.querySelector('.b-cardA1');
  self.botcardATwoElement = self.gameScreenElement.querySelector('.b-cardA2');
  
  self.playercardBOneElement = self.gameScreenElement.querySelector('.p-cardB1');
  self.playercardBTwoElement = self.gameScreenElement.querySelector('.p-cardB2');
  self.botcardBOneElement = self.gameScreenElement.querySelector('.b-cardB1');
  self.botcardBTwoElement = self.gameScreenElement.querySelector('.b-cardB2');
  
  self.currentpriceAElement = self.gameScreenElement.querySelector('.market-priceA');
  self.currentpriceBElement = self.gameScreenElement.querySelector('.market-priceB');

  self.stockAElement = self.gameScreenElement.querySelector('.stock-qty-a');;
  self.stockBElement = self.gameScreenElement.querySelector('.stock-qty-b');;
  
  self.buyformAElement = self.gameScreenElement.querySelector('.buy-a');
  self.buyformBElement = self.gameScreenElement.querySelector('.buy-b');
  
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
  self.calcNetWorth();
  console.log(self.playerNetworth);
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
    if(self.isChecked == false){
      alert("please press the confirm button first after buying some stocks");
    }
    
    else{
      if(self.round > 1){
        self.callback();
      }
    else{
      self.round++ ; 
      self.updateCurrentPrices();
      self.nextTurn();
    };
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
    var newstockA = self.player.stockA + Number(self.buyInput[0].value);
    var newstockB = self.player.stockB + Number(self.buyInput[1].value);
    console.log(newMoney);
    console.log(newstockA);
    console.log(newstockB);

    self.player.update(newMoney,newstockA,newstockB);
    self.playerCashElement.innerText = newMoney;
    self.stockAElement.innerText = newstockA;
    self.stockBElement.innerText = newstockB;
    
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
  self.roundElement.innerText = self.round + 1;
  self.isChecked =false;
  self.turncardsA =[];
  self.turncardsB =[];
  
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
};

Game.prototype.calcNetWorth = function (){
  var self = this;
  self.playerNetworth = self.player.money + (self.player.stockA * self.company1.value) + (self.player.stockB * self.company2.value);
};




