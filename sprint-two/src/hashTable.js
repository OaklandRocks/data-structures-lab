
//////////////////////////////////////////////////////////////////
// This file contains two distinct solutions:
//   - The solution presented in lecture
//   - Refactored version that makes use of higher-order functions
//
// The two solutions are delineated by comment blocks.
// To use the Higher-Order Function (HOF) version, uncomment the
// line of code near the end of this file.

//////////////////////////////////////////////////////////////////
// Implementation #1:
// Solution-Lecture implementation
//
// Notice how each function has a similar structure:
//   - calculate an index
//   - retreive an bucket at that location
//   - iterate over the bucket, and
//     - perform an action if the key is found
//   - otherwise perform a not-found action
//////////////////////////////////////////////////////////////////

var HashTable = function() {

  this._size = 0;
    this._limit = 8;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);

  var bucket = this._storage.get(index) || [];

  for (var i = 0; i < bucket.length; i++) {
    var tuple = bucket[i];
    if (tuple[0] === k) {
      var oldValue = tuple[1];
      tuple[1] = v;
      return oldValue;
    }
  }

  bucket.push([k,v]);
  this._storage.set(index, bucket);
  this._size++;

  if (this._size > this._limit * 0.75) {
    this._resize(this._limit * 2);
  }

  return undefined;
  };

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);

  var bucket = this._storage.get(index) || [];

  for (var i = 0; i < bucket.length; i++) {
    var tuple = bucket[i];
    if (tuple[0] === k) {
      return tuple[1];
    }
  }

  return undefined;
  };

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);

  var bucket = this._storage.get(index) || [];

  for (var i = 0; i < bucket.length; i++) {
    var tuple = bucket[i];
    if (tuple[0] === k) {
      bucket.splice(i, 1)
      this._size--;
      if (this._size < this._limit * 0.25) {
        this._resize(Math.floor(this._limit / 2));
      }
      return tuple[1];
    }
  }

  return undefined;
  };


HashTable.prototype._resize = function(newLimit) {
  var oldStorage = this._storage;

  // min size of 8, return if nothing to do!
  newLimit = Math.max(newLimit, 8);
  if (newLimit === this._limit) { return };

  this._limit = newLimit;
  this._storage = LimitedArray(this._limit);
  this._size = 0;

  oldStorage.each(function(bucket) {
    if (!bucket) { return; }
    for (var i = 0; i < bucket.length; i++) {
      var tuple = bucket[i];
      this.insert(tuple[0], tuple[1]);
    }
  }.bind(this));
};

/*
 * Complexity: What is the time complexity of the above functions?
 */


//////////////////////////////////////////////////////////////////
// Implementation #2:
// Higher-Order Function implementation
//
// This version factors out the common code of searching for a
// tuple in a bucket -- see _tupleSearch. That function performs
// the specialized work of insert/retreive/remove by delegating
// to the found and not-found callbacks.
//////////////////////////////////////////////////////////////////

var HashTableHOF = function() {
  this._size = 0;
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
};

HashTableHOF.prototype.insert = function(k, v) {
  return this._tupleSearch(k,
    function(bucket, tuple, i) {
      var oldValue = tuple[1];
      tuple[1] = v;
      return oldValue;
    },
    function(bucket) {
      bucket.push([k,v]);
      this._size++;
      if (this._size > 0.75 * this._limit) {
        this._resize( this._limit * 2 );
      }
    }
  );
};

HashTableHOF.prototype.retrieve = function(k) {
  return this._tupleSearch(k,
    function(bucket, tuple, i) {
      return tuple[1];
    }
  );
};

HashTableHOF.prototype.remove = function(k) {
  return this._tupleSearch(k,
    function(bucket, tuple, i) {
      bucket.splice(i, 1);
      this._size--;
      if (this._size < 0.25 * this._limit) {
        this._resize(Math.floor(this._limit / 2));
      }
      return tuple[1];
    }
  );
};

HashTableHOF.prototype._tupleSearch = function(key, foundCB, notFoundCB) {
  var index = getIndexBelowMaxForKey(key, this._limit);
  var bucket = this._storage.get(index) || [];

  this._storage.set(index, bucket);

  for (var i = 0; i < bucket.length; i++) {
    var tuple = bucket[i];
    if (tuple[0] === key) {
      return foundCB.call(this, bucket, tuple, i);
    }
  }

  return notFoundCB ? notFoundCB.call(this, bucket) : undefined;
}

HashTableHOF.prototype._resize = function(newLimit) {
  var oldStorage = this._storage;

  // min size of 8, return if nothing to do!
  newLimit = Math.max(newLimit, 8);
  if (newLimit === this._limit) { return };

  this._limit = newLimit;
  this._storage = LimitedArray(this._limit);
  this._size = 0;

  oldStorage.each(this._redistribute.bind(this));
};

HashTableHOF.prototype._redistribute = function(bucket) {
  if (!bucket) { return; }
  for (var i = 0; i < bucket.length; i++) {
    var tuple = bucket[i];
    this.insert(tuple[0], tuple[1]);
  }
};

//////////////////////////////////////////////////////////////////
// uncomment this line to use the HOF version of HashTable
// HashTable = HashTableHOF;
