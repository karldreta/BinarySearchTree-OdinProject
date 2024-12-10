class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;

    }
}

class Tree {
    constructor(array) {
        this.root = buildTree(array);
    }
}

function buildTree(array) {
    let mid = array[Math.floor(array.length / 2)];
    let left = array.slice(0, mid - 1);
    let right = array.slice(mid, array.length);

    return mid;
}

const sampleArr = [1, 2, 3];
const test = new Node();
const tree = new Tree(sampleArr);
console.log(tree.root);



