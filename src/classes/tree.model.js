import NodeModel from './node.model';

class TreeModel {
  constructor() {
    this.root = null;
  }

  insert(key, value) {
    if (!Number.isInteger(key)) return;
    const newNode = new NodeModel(key, value);
    if (this.root === null) {
      this.root = newNode;
    } else this.insertNode(this.root, newNode);
  }

  insertNode(node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) node.left = newNode;
      else this.insertNode(node.left, newNode);
    } else if (newNode.key === node.key) {
      node.value = newNode.value;
    } else {
      if (node.right === null) node.right = newNode;
      else this.insertNode(node.right, newNode);
    }
  }

  remove(key) {
    if (!Number.isInteger(key)) return;
    this.root = this.removeNode(this.root, key);
  }
  removeNode(node, key) {
    if (node === null) return null;
    else if (key < node.key) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      const aux = this.findMinimumNode(node.right);
      node.key = aux.key;

      node.right = this.removeNode(node.right, aux.key);
      return node;
    }
  }

  inorder(node, fn) {
    if (node !== null) {
      this.inorder(node.left, fn);
      fn(node);
      this.inorder(node.right, fn);
    }
  }

  preorder(node, fn) {
    if (node !== null) {
      fn(node);
      this.preorder(node.left, fn);
      this.preorder(node.right, fn);
    }
  }

  postorder(node, fn) {
    if (node !== null) {
      this.postorder(node.left, fn);
      this.postorder(node.right, fn);
      fn(node);
    }
  }

  breadthFirst(node, fn) {
    const queue = [node];
    while (queue.length > 0) {
      if (queue[0].left != null) queue.push(queue[0].left);
      if (queue[0].right != null) queue.push(queue[0].right);
      fn(queue.shift());
    }
  }

  depthFirst(node, fn) {
    const stack = [node];
    while (stack.length > 0) {
      const x = stack[stack.length - 1];
      fn(stack.pop());
      if (x.left != null) stack.push(x.left);
      if (x.right != null) stack.push(x.right);
    }
  }

  findMinimumNode(node) {
    if (node.left === null) return node;
    else return this.findMinimumNode(node.left);
  }
  
  findingKey(node, fn, key) {
    if (node === null) {
      return false;
    }
    fn(node);
    if (node.key === key) {
      return true;
    } else if (node.key >= key) {
      return this.findingKey(node.left, fn, key);
    } else {
      return this.findingKey(node.right, fn, key);
    }
  }
}
export default TreeModel;
