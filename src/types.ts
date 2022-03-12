export interface DataNode {
  id: string;
  type: "FOLDER" | "IMAGE" | "VIDEO" | "MUSIC" | "TEXT" | string;
  name: string;
  path?: string;
  children?: DataNode[];
}
