class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;

    }
}

class Tree {
  constructor(array) {
      this.root = buildTree(array, 0, array.length - 1);
  }
  // value = 6;
  insert(value, currentNode = this.root) {

    if (currentNode == null)
      return new Node(value);

    if (value == currentNode.data) return; // Test this later.

    if (value < currentNode.data) {
      currentNode.left = this.insert(value, currentNode.left);
    } else {
      currentNode.right = this.insert(value, currentNode.right);
    }
    
    return currentNode;
  }
}

// We need to remove the duplicates first
function removeDuplicatesAndSort(arr) {
const newArray = arr.filter((item,
index) => arr.indexOf(item) === index);
return newArray.sort(function (a, b) {
  return a - b;
})
}

function buildTree(array, start, end) {
    removeDuplicatesAndSort(array) // But this will also be called in succeeding calls (during the recursion) which will take unnecessary computing power. We'll fix this later.

    // We need a base case.
    // We need to call this function recursively and divide,
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);
    node.left = buildTree(array, start, mid - 1);
    node.right = buildTree(array, mid + 1, end);

    return node;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };


const sampleArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const arrayOfFive = [1, 10, 5, 6, 5];
const tree = new Tree(arrayOfFive);
// prettyPrint(tree.root);
// tree.insert(6);
prettyPrint(tree.root);
// tree.insert(10);
// prettyPrint(tree.root);
// tree.insert(3);
// prettyPrint(tree.root);




    
// let left = array.slice(0, mid - 1);
// let right = array.slice(mid, array.length);



