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
}

// Sample Usage
const sampleArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const arrayOfFive = [1, 10, 5, 6, 5, 5,6,8];

const tree = new Tree(arrayOfFive);
tree.prettyPrint();

tree.insert(11);
tree.prettyPrint();

tree.insert(2);
tree.prettyPrint();

tree.insert(4);
tree.prettyPrint();
