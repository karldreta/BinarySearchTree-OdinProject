class Node {
    constructor() {
        this.data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // This will be dynamic later on, and we'll create a sorting algorithm for this (merge sort).
        this.mid = this.data[Math.floor(this.data.length / 2)];
        this.left = this.data.slice(0, this.mid - 1);
        this.right = this.data.slice(this.mid, this.data.length);

    }
}

const test = new Node();
console.log(test.left);
console.log(test.mid);
console.log(test.right);


