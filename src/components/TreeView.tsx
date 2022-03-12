import "./TreeView.scss";
import useToggle from "../hooks/useToggle";
import {DataNode} from "../types";
import Icons from "../assets/icon";
import {useRef, useState} from "react";
import NodeContextMenu from "./NodeContextMenu";

type Props = {
  showContent: (node: DataNode) => void;
  rootNode: DataNode;
  setRootNode: (node: DataNode) => void;
  isFlat: boolean;
  parentName?: string;
  // these are events that should be done by my parent
  deleteNode?: () => void;
  moveUp?: () => void;
  moveDown?: () => void;
};

const TreeView = ({rootNode, showContent, deleteNode, setRootNode, moveUp, moveDown, isFlat, parentName}: Props) => {
  const [isExpand, toggleExpand] = useToggle();
  const [showContextMenu, setShowContextMenu] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const isExpandOrFlat = isExpand || isFlat;

  const getIconSource = () => {
    switch (rootNode.type) {
      case "IMAGE":
        return Icons.imageIcon;
      case "VIDEO":
        return Icons.videoIcon;
      case "MUSIC":
        return Icons.musicIcon;
      case "TEXT":
        return Icons.textIcon;
      case "FOLDER":
        if (isExpand && !isFlat) {
          return Icons.folderOpenIcon;
        } else {
          return Icons.folderIcon;
        }
      default:
        return Icons.unknownIcon;
    }
  };

  const onNodeEvents = (e: any) => {
    e.stopPropagation();
    if (headerRef.current) {
      headerRef.current.focus();
    }
  }

  const onTitleClick = (e: any) => {
    onNodeEvents(e);
    if (rootNode.type === "FOLDER") {
      toggleExpand();
    } else {
      showContent(rootNode);
    }
  }

  const onMenuClick = (e: any) => {
    onNodeEvents(e);
    setShowContextMenu(prev => !prev);
  }

  return (
    <div className={`tree-node ${isFlat ? "tree-node_flat" : ""}`}>
      <div className="tree-node__header" tabIndex={0} ref={headerRef} onBlur={() => setShowContextMenu(false)}>
        {showContextMenu && (
          <NodeContextMenu
            isFolder={rootNode.type === "FOLDER"}
            deleteNode={deleteNode}
            closeContextMenu={() => setShowContextMenu(false)}
            moveUp={moveUp}
            moveDown={moveDown}
            // these are events I can do myself
            createFolder={() => setRootNode({
              ...rootNode,
              children: [
                ...rootNode.children ?? [],
                {
                  id: "testFolderId",
                  type: "FOLDER",
                  name: "New Folder",
                }
              ]
            })}
            addFile={() => setRootNode({
              ...rootNode,
              children: [
                ...rootNode.children ?? [],
                {
                  id: "testFileId",
                  type: "IMAGE",
                  name: "kitten(copy).jpg",
                  path: "datafiles/kitty.jpg"
                }
              ]
            })}/>
        )}
        <span onClick={onTitleClick}>
          <img alt="" src={getIconSource()} className="tree-node__header--icon"/>
          {isFlat && parentName}{rootNode.name}
          {!isFlat && rootNode.children && (
            <img
              alt=""
              className="tree-node__header--chevron"
              src={isExpand ? Icons.chevronDownIcon : Icons.chevronRightIcon}
            />
          )}
        </span>
        <img
          alt=""
          onClick={onMenuClick}
          className="tree-node__header--chevron"
          src={Icons.menuIcon}
        />
      </div>
      {rootNode.children && (
        <div
          className={`tree-node__container ${!isExpandOrFlat ? "tree-node__container_hidden" : ""} ${isFlat ? "tree-node__container_flat" : ""}`}>
          {rootNode.children?.map((childNode, key) => (
            <TreeView
              showContent={showContent}
              key={key}
              isFlat={isFlat}
              rootNode={childNode}
              parentName={`${parentName ?? ""}${rootNode.name} / `}
              setRootNode={(newChild) => setRootNode({
                ...rootNode,
                children: rootNode.children!.map((prevChild, index) => index === key ? newChild : prevChild)
              })}
              deleteNode={() => setRootNode({
                ...rootNode,
                children: rootNode.children!.filter((value, index) => index !== key)
              })}
              moveUp={key < 1 ? undefined : () => setRootNode({
                ...rootNode,
                children: rootNode.children!.map((child, index) => {
                  if (index === key) {
                    return rootNode.children![key - 1];
                  } else if (index === (key - 1)) {
                    return rootNode.children![key];
                  }
                  return child;
                })
              })}
              moveDown={key >= (rootNode.children!.length - 1) ? undefined : () => setRootNode({
                ...rootNode,
                children: rootNode.children!.map((child, index) => {
                  if (index === key) {
                    return rootNode.children![key + 1];
                  } else if (index === (key + 1)) {
                    return rootNode.children![key];
                  }
                  return child;
                })
              })}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeView;
