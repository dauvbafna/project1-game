
function Company (name, initialValue){
    var self =this;
    self.name = name;
    self.value = initialValue;
};

Company.prototype.update = function (value) {
    var self = this;
    self.value = value;
}
