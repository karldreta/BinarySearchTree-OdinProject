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
}

function buildTree(array, start, end) {
    
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

const sampleArr = [1, 2, 3, 4, 5];
const tree = new Tree(sampleArr);
prettyPrint(tree.root);

    
// let left = array.slice(0, mid - 1);
// let right = array.slice(mid, array.length);



