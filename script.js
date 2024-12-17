class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    // Remove duplicates and sort array before building the tree
    const processedArray = this.removeDuplicatesAndSort(array);
    this.root = this.buildTree(processedArray, 0, processedArray.length - 1);
  }

  removeDuplicatesAndSort(array) {
    const uniqueArray = array.filter(
      (item, index) => array.indexOf(item) === index
    );
    return uniqueArray.sort((a, b) => a - b);
  }

  // We build a balanced binary search tree from the sorted array
  buildTree(array, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);

    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }

  // A project provided utility method for visualization
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value, currentNode = this.root) {
    if (currentNode == null) {
      return new Node(value);
    }

    if (value === currentNode.data) return currentNode; // Prevent duplicates

    if (value < currentNode.data) {
      currentNode.left = this.insert(value, currentNode.left);
    } else {
      currentNode.right = this.insert(value, currentNode.right);
    }

    return currentNode;
  }

  // Utility function for deleteItem
  getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
        curr = curr.left;
    }
    return curr;
  }

  deleteItem(value, currentNode = this.root) {
    if (currentNode === null) {
      return currentNode;
    }

    // If key to be searched is in a subtree
    if (currentNode.data > value) {
      currentNode.left = this.deleteItem(value, currentNode.left);
    } else if (currentNode.data < value) {
      currentNode.right = this.deleteItem(value, currentNode.right);
    } else {
        // If root matches with the given key

        // Cases when root has 0 children or 
        // only right child
        if (currentNode.left === null) 
            return currentNode.right;

        // When root has only left child
        if (currentNode.right === null) 
            return currentNode.left;

        // When both children are present
        let successor = this.getSuccessor(currentNode);
        currentNode.data = successor.data;
        currentNode.right = this.deleteItem(successor.data, currentNode.right);
    }
    return currentNode;
  }

  find(value, currentNode = this.root) {
    if (currentNode === null) return null;

    if (value === currentNode.data) return currentNode;

    if (value < currentNode.data) {
      return currentNode.left = this.find(value, currentNode.left);
    } else {
      return currentNode.right = this.find(value, currentNode.right);
    }
  }
}

// Sample Usage
const sampleArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const arrayOfFive = [1, 10, 5, 6, 5, 5,6,8];

const tree = new Tree(arrayOfFive);
tree.insert(7);
tree.prettyPrint();
console.log(tree.find(6));
