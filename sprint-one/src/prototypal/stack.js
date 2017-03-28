var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var stack = Object.create(stackMethods)
  stack.length =0;
  stack.storage = {};
  return stack;
};

var stackMethods = {
  push: function(value){
    this.length++;
    this.storage[this.length]=value;
  },
  pop: function(){
    return this.length;
  }
};


