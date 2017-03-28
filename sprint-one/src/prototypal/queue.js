var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var queue = Object.create(queueMethods);

  queue.length = 0;
  queue.beginning = 1;
  queue.storage = {};
  return queue;
};

var queueMethods = {
  enqueue: function(value) {
    this.length ++;
    this.beginning ++;
    this.storage[this.length] = value;
  },

  dequeue: function(){
    if (this.length > 0 {
      this.length --;
      this.beginning++;
    }
    return this.storage[this.beginning -1]

  },
  size: function(){
    return this.length
  }

};


