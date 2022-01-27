import React, {useState, useContext, forwardRef} from 'react';
import '../../tree.component.css';
import TreeContext from '../../tree_context';
const Node = forwardRef((props, ref) => {
  const [key, setKey] = useState(props.id);
  let treeContext = useContext(TreeContext);

  return (
    <div
      className={`node  ${treeContext.curr_node_idx == key ? 'visited' : ''}`}
    >
      <h3
        style={{
          fontSize: `${(6 / Number(String(key).length)) * 10}px`,
        }}
      >
        {key}
      </h3>
    </div>
  );
});

export default Node;
