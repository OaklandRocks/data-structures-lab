var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  this.storage = {};
  this.size = 0;
};

Stack.prototype.push = function(value){
  this.storage[this.size] =value;
  this.size++;
};

Stack.prototype.pop = function(){
  this.size && this.size --;
  var result = this.storage[this.size];
  delete this.storage[this.size];
  return result;
};

Stack.prototype.size = function(){
  return this.size;
};


