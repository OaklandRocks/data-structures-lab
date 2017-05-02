var Queue = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var start = 0;
  var end = 0;

  // Implement the methods below this line

  someInstance.enqueue = function(value) {
    storage[end++] = value;
  };

  someInstance.dequeue = function() {
    delete storage[start];
    someInstance.size() && start++;
    return result;
  };

  someInstance.size = function() {
    return end - start;
  };

  return someInstance;
};
