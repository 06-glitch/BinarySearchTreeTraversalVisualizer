class NodeModel {
    constructor(key, value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.key = key;
    }

    getLeftNode() {
        return this.left
    }

    getRightNode() {
        return this.right
    }
    free() {
        this.left = null;
        this.right = null;
    }
}

export default NodeModel;