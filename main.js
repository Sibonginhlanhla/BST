// Node class
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// Tree class
class Tree {
  constructor(array) {
    this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
  }

  buildTree(array) {
    if (array.length === 0) return null;
    const mid = Math.floor(array.length / 2);
    const node = new Node(array[mid]);
    node.left = this.buildTree(array.slice(0, mid));
    node.right = this.buildTree(array.slice(mid + 1));
    return node;
  }

  insert(value, root = this.root) {
    if (!root) return new Node(value);
    if (value < root.data) root.left = this.insert(value, root.left);
    else if (value > root.data) root.right = this.insert(value, root.right);
    return root;
  }

  deleteItem(value, root = this.root) {
    if (!root) return null;
    if (value < root.data) root.left = this.deleteItem(value, root.left);
    else if (value > root.data) root.right = this.deleteItem(value, root.right);
    else {
      if (!root.left) return root.right;
      if (!root.right) return root.left;
      let minLargerNode = root.right;
      while (minLargerNode.left) minLargerNode = minLargerNode.left;
      root.data = minLargerNode.data;
      root.right = this.deleteItem(minLargerNode.data, root.right);
    }
    return root;
  }

  find(value, root = this.root) {
    if (!root) return null;
    if (value < root.data) return this.find(value, root.left);
    if (value > root.data) return this.find(value, root.right);
    return root;
  }

  levelOrder(callback) {
    if (!callback) throw new Error("Callback is required.");
    const queue = [this.root];
    while (queue.length > 0) {
      const current = queue.shift();
      if (current) {
        callback(current);
        queue.push(current.left, current.right);
      }
    }
  }

  inOrder(callback, root = this.root) {
    if (!callback) throw new Error("Callback is required.");
    if (!root) return;
    this.inOrder(callback, root.left);
    callback(root);
    this.inOrder(callback, root.right);
  }

  preOrder(callback, root = this.root) {
    if (!callback) throw new Error("Callback is required.");
    if (!root) return;
    callback(root);
    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
  }

  postOrder(callback, root = this.root) {
    if (!callback) throw new Error("Callback is required.");
    if (!root) return;
    this.postOrder(callback, root.left);
    this.postOrder(callback, root.right);
    callback(root);
  }

  height(node) {
    if (!node) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(value, node = this.root, depth = 0) {
    if (!node) return null;
    if (value === node.data) return depth;
    return value < node.data
      ? this.depth(value, node.left, depth + 1)
      : this.depth(value, node.right, depth + 1);
  }

  isBalanced(root = this.root) {
    if (!root) return true;
    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);
    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(root.left) &&
      this.isBalanced(root.right)
    );
  }

  rebalance() {
    const nodes = [];
    this.inOrder((node) => nodes.push(node.data));
    this.root = this.buildTree(nodes);
  }
}

// Utility to print tree
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) return;
  if (node.right !== null)
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null)
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

// Driver script
function getRandomArray(size = 15, max = 100) {
  const set = new Set();
  while (set.size < size) set.add(Math.floor(Math.random() * max));
  return Array.from(set);
}

const tree = new Tree(getRandomArray());
console.log("Initial Tree:");
prettyPrint(tree.root);
console.log("Is balanced:", tree.isBalanced());

console.log("Level order:");
tree.levelOrder((node) => console.log(node.data));

console.log("Preorder:");
tree.preOrder((node) => console.log(node.data));

console.log("Postorder:");
tree.postOrder((node) => console.log(node.data));

console.log("Inorder:");
tree.inOrder((node) => console.log(node.data));

// Unbalance the tree
[120, 150, 130, 200, 250].forEach((n) => tree.insert(n));
console.log("After inserting large values:");
prettyPrint(tree.root);
console.log("Is balanced:", tree.isBalanced());

// Rebalance the tree
tree.rebalance();
console.log("After rebalancing:");
prettyPrint(tree.root);
console.log("Is balanced:", tree.isBalanced());

console.log("Level order:");
tree.levelOrder((node) => console.log(node.data));

console.log("Preorder:");
tree.preOrder((node) => console.log(node.data));

console.log("Postorder:");
tree.postOrder((node) => console.log(node.data));

console.log("Inorder:");
tree.inOrder((node) => console.log(node.data));
