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
      (item, index) => array.indexOf(item) === index,
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
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
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
      if (currentNode.left === null) return currentNode.right;

      // When root has only left child
      if (currentNode.right === null) return currentNode.left;

      // When both children are present
      let successor = this.getSuccessor(currentNode);
      currentNode.data = successor.data;
      currentNode.right = this.deleteItem(successor.data, currentNode.right);
    }
    return currentNode;
  }

  find(value, currentNode = this.root) {
    if (currentNode === null) return null;
  
    // If the value is found, return the node
    if (value === currentNode.data) return currentNode;
  
    // Recursively search to the left or right depending on the value
    if (value < currentNode.data) {
      return this.find(value, currentNode.left);
    } else {
      return this.find(value, currentNode.right);
    }
  }
  

  levelOrder(callback) {
    if (typeof callback !== "function")
      throw new Error("Please provide Callback!");
    if (this.root == null) return;
    const queue = [this.root]; // Start with the root node in the queue

    // Traverse level by level
    while (queue.length > 0) {
      const currentNode = queue.shift(); // We take the first node at the front of the queue
      callback(currentNode); // call the callback function for the first node (for example, we'll print it).

      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
  }

  inOrder(callback, currentNode = this.root) {
    if (typeof callback !== "function")
      throw new Error("Please provide Callback!");
    if (currentNode == null) return;

    if (currentNode.left) {
      this.inOrder(callback, currentNode.left); // We visit left until 'null', hitting our base case.
    }

    callback(currentNode); // After the base case we move to this line, calling the callback.

    if (currentNode.right) {
      this.inOrder(callback, currentNode.right); // If this there is a right, we'll visit that, and if that has a left then we go there first, until 'null'.
    }

    // Note: Notice that there is no explicit return, this is handled by the call stack, as we traverse the node, calling the callback until 'null', it will naturally exit and unwind to the predecessor caller.
  }

  preOrder(callback, currentNode = this.root) {
    // We'll generally solve this just like how we did the inOrder traversal, but we'll be calling the callback before the any recursion.
    if (typeof callback !== "function")
      throw new Error("Please provide Callback!");
    if (currentNode == null) return;

    callback(currentNode); // call the callback first.

    if (currentNode.left) this.preOrder(callback, currentNode.left);
    if (currentNode.right) this.preOrder(callback, currentNode.right);
  }

  postOrder(callback, currentNode = this.root) {
    // Post order traversal moves from left -> right -> current, so all we have to do is call the callback last.
    if (typeof callback !== "function")
      throw new Error("Please provide Callback!");
    if (currentNode == null) return;

    if (currentNode.left) this.postOrder(callback, currentNode.left);
    if (currentNode.right) this.postOrder(callback, currentNode.right);
    callback(currentNode); // Call the callback last.
  }

  height(node) {
    return !node 
    ? -1 
    : Math.max(this.height(node.left), this.height(node.right)) + 1;
  }
  
  printTree(currentNode = this.root) {
    return currentNode.right.data;
  }

  depth(targetNode, currentNode = this.root, currentDepth = 0) {
    return currentNode;
    if (currentNode === null) {
      console.log(`Reached a null node. Returning -1. Current depth: ${currentDepth}`);
      return -1; // Node not found
    }
  
    console.log(
      `Visiting node with value: ${currentNode.data}, target node: ${targetNode.data}, current depth: ${currentDepth}`
    );
  
    if (currentNode.data === targetNode.data) {
      console.log(
        `Target node found! Value: ${currentNode.data}, Depth: ${currentDepth}`
      );
      return currentDepth;
    }
  
    if (targetNode.data < currentNode.data) {
      console.log(
        `Target node (${targetNode.data}) is less than current node (${currentNode.data}). Recursing left.`
      );
      return this.depth(targetNode, currentNode.left, currentDepth + 1);
    } else {
      console.log(
        `Target node (${targetNode.data}) is greater than current node (${currentNode.data}). Recursing right.`
      );
      return this.depth(targetNode, currentNode.right, currentDepth + 1);
    }
  }  
}

// Sample Usage
const sampleArray = [7, 3, 10, 5, 2, 8, 1, 6, 9, 4];
const arrayOfFive = [1, 10, 5, 6, 5, 5, 6, 8];

const tree = new Tree(arrayOfFive);
// tree.insert(7);
tree.prettyPrint();
console.log(tree.root.right);
let findHeight = tree.find(10);
console.log(tree.depth(findHeight).right);

// tree.inOrder(node => console.log(node.data));
// tree.postOrder(node => console.log(node.data));
