var Tree = function(value) {
  var newTree = {};
  newTree.value = value;

  // your code here
  newTree.children = [];
  extend(newTree, treeMethods);;

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  this.children.push(Tree(value));
};

treeMethods.contains = function(target) {
  // if ( this.value === target ) {
  //   return true;
  // }
  // for ( var i = 0; i < this.children.length; i++ ) {
  //   var child = this.children[i];
  //   if (child.contains(target)) {
  //     return true;
  //   }
  // }
  // return false;

  var isFound = false;
  var recursiveSearch = function(tree){
    if (tree.value = target) {
      isFound = true;
    }
    else{
      for (var i=0; i< tre.children.length; i++){
        recursiveSearch(tree.children[i]);
      }
    }
  }
  recursiveSearch(this);
  return isFound;
};


// treeMethods.traverse = function(callback) {
//   callback(this.value);

//   if (!this.children) { return; }
//   for (var i = 0; i < this.children.length; i++) {
//     var child = this.children[i];
//     child.traverse(callback);
//   }
// };

var extend = function(original, extendobj) {
  for (var attrname in extendobj)
    { original[attrname] = extendobj[attrname];}
};




/*
 * Complexity: What is the time complexity of the above functions?
 */
