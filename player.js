function Player(name, money, stockA, stockB) {
      var self = this;
      self.name = name;
      self.money = money;
      self.stockA = stockA;
      self.stockB = stockB;
  };

  Player.prototype.update = function (money, stockA, stockB){
    var self = this;
    self.money = money;
    self.stockA = stockA;
    self.stockB = stockB;
  }

