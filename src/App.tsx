import React, {useState} from "react";
import "./App.scss";
import DisplayContent from "./components/DisplayContent";
import TreeView from "./components/TreeView";
import fileData from "./data.json";
import {DataNode} from "./types";

function App() {
  const [contentToShow, setContentToShow] = useState<DataNode | null>(null);
  const [treeData, setTreeData] = useState<DataNode>(fileData);
  const [isFlat, setIsFlat] = useState(false);

  return (
    <div className="App">
      <a onClick={() => setIsFlat(prevState => !prevState)} className="App__flatmap-checkbox">
        <input type="checkbox" checked={isFlat}/>
        Flatmap
      </a>
      {treeData && <TreeView showContent={setContentToShow} rootNode={treeData} setRootNode={setTreeData} isFlat={isFlat}/>}
      {contentToShow && <DisplayContent node={contentToShow} closeDialog={() => setContentToShow(null)}/>}
    </div>
  );
}

export default App;
