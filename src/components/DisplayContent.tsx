import "./DisplayContent.scss";
import {DataNode} from "../types";

type Props = {
  node: DataNode;
  closeDialog: () => void;
}
const DisplayContent = ({node, closeDialog}: Props) => {
  return (
    <div onClick={closeDialog} className="display-content">
      <div className="display-content__container">
        <div className="display-content__header">
          {node.path}
          <div onClick={closeDialog} className="display-content__close">X</div>
        </div>
        <iframe title="file content" className="display-content__iframe" src={node.path}/>
      </div>
    </div>
  );
};

export default DisplayContent;
