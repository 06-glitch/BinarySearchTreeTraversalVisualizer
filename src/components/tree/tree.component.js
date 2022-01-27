import React, {useContext, useState} from 'react';
import TreeModel from '../../classes/tree.model';
import Node from './subtree/node/node.component';
import './tree.component.css';
import TreeContext from './tree_context';
import logo from './logo.svg';

function Tree() {
  let treeContext = useContext(TreeContext);
  const [subtrees, setSubtree] = useState(treeContext.subtrees);
  const [currNode, setCurrNode] = useState(0);
  const [removeKey, setRemoveKey] = useState(0);
  const [insertKey, setInsertKey] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState(0);
  const [treeNode, setTreeNode] = useState(new TreeModel());
  const [updateTree, setUpdateTree] = useState(0); // integer state
  let nodeList = [];
  let insertedKey = 0;

  const insertStuff = () => {
    treeNode.insert(parseInt(insertKey), parseInt(value));
    insertedKey = parseInt(insertKey);
    setUpdateTree((value) => ++value); // update the state to force render
  };

  const removeStuff = () => {
    treeNode.remove(parseInt(removeKey));
    setUpdateTree((value) => ++value); // update the state to force render
  };

  const handleOnChange = ({target: {value}}) => {
    const updatedValue = value.length > 6 ? String(value).slice(0, -1) : value;
    setInputValue(updatedValue);
    setInsertKey(Number(updatedValue));
    setRemoveKey(Number(updatedValue));
  };

  const constructTree = (node) => {
    if (node != null) {
      return (
        <div className="subtree">
          <Node key={node.key} id={node.key} value={node.value} />

          {node.left && !node.right && (
            <div className={`children left`}>{constructTree(node.left)}</div>
          )}
          {!node.left && node.right && (
            <div className={`children right`}>{constructTree(node.right)}</div>
          )}

          {node.left && node.right && (
            <div className={`children`}>
              {constructTree(node.left)}
              {constructTree(node.right)}
            </div>
          )}
        </div>
      );
    }
  };
  const calculateTraversal = (node) => {
    nodeList.push(node);
  };

  const showAnimation = () => {
    function task(node, i) {
      setTimeout(function () {
        treeContext.curr_node_idx = node.key;
        setCurrNode(node.key);
      }, 1000 * i);
    }

    for (let i = 0; i < nodeList.length; i++) {
      task(nodeList[i], i);
    }
  };
  const traversal = (type) => {
    nodeList = [];
    switch (type) {
      case 0:
        treeNode.inorder(treeNode.root, calculateTraversal);
        break;
      case 1:
        treeNode.preorder(treeNode.root, calculateTraversal);
        break;
      case 2:
        treeNode.postorder(treeNode.root, calculateTraversal);
        break;
      case 3:
        treeNode.breadthFirst(treeNode.root, calculateTraversal);
        break;
      case 4:
        treeNode.depthFirst(treeNode.root, calculateTraversal);
        break;
      default:
        return;
    }

    showAnimation();
  };

  return (
    <div className="container">
      <div className="header">
        <div className="logo-bar">
          <img className="logo" src={logo} width={50} />
          <div id="title">BINARY SEARCH TREE</div>
          <img className="logo" src={logo} width={50} />
        </div>
        <div className="main-actions">
          <button id="add" onClick={() => insertStuff()}>
            Insert
          </button>
          <input
            type="number"
            name="key"
            placeholder="enter tree key"
            onChange={handleOnChange}
            value={inputValue}
          />
          <button id="remove" onClick={() => removeStuff()}>
            Remove
          </button>
        </div>
        <div className="navbar">
          <button onClick={() => traversal(0)}>In-Order traversal</button>
          <button onClick={() => traversal(1)}>Pre-Order traversal</button>
          <button onClick={() => traversal(2)}>Post-Order traversal</button>
          <button onClick={() => traversal(3)}>Breadth-First traversal</button>
          <button onClick={() => traversal(4)}>Depth-First traversal</button>
        </div>
      </div>

      <div className="tree">
        {constructTree(treeNode.root)}
        {treeNode.root === null && (
          <p id="emptyTreeMsg">Tree is Empty. Try adding a node.</p>
        )}
      </div>
    </div>
  );
}

export default Tree;
