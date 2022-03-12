import "./NodeContextMenu.scss";

type NodeContextMenuProps = {
  closeContextMenu: () => void;
  deleteNode?: () => void;
  isFolder: boolean;
  createFolder?: () => void;
  addFile?: () => void;
  moveUp?: () => void;
  moveDown?: () => void;
};
const NodeContextMenu = (props: NodeContextMenuProps) => {
  return (
    <div className="node-context-menu">
      {props.deleteNode && <div className="node-context-menu__item" onClick={() => {
        props.deleteNode!();
        props.closeContextMenu();
      }}>Delete</div>}
      {props.moveUp && <div className="node-context-menu__item" onClick={() => {
        props.moveUp!();
        props.closeContextMenu();
      }}>Move Up</div>}
      {props.moveDown && <div className="node-context-menu__item" onClick={() => {
        props.moveDown!();
        props.closeContextMenu();
      }}>Move Down</div>}
      {props.isFolder && <>
        {props.createFolder && <div className="node-context-menu__item" onClick={() => {
          props.createFolder!();
          props.closeContextMenu();
        }}>Create Folder</div>}
        {props.addFile && <div className="node-context-menu__item" onClick={() => {
          props.addFile!();
          props.closeContextMenu();
        }}>Add File</div>}
      </>}
    </div>
  );
};

export default NodeContextMenu;
