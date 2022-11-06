import React, {
  FC,
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { ZoneFeature } from "../../types/zone";
/*
  Requirements:
  1. Open close tree with children
  2. Select a tree which has children or children of a tree but not both (not tree and chilren)
*/

export const buildTree = (
  data: ZoneFeature[],
  tree?: Omit<ReactFolderTreeType, "children"> & {
    children: ReactFolderTreeType[] | string[];
  },
  path: number[] = []
): ReactFolderTreeType => {
  if (!tree) {
    const topParent = data.find(
      (d) => !d.properties.parentZoneId
    ) as ZoneFeature;

    const { id, displayName, childZoneIds } = topParent?.properties || {};
    tree = { name: displayName, id, children: childZoneIds, _path: [] };
  }

  if (!tree?.children?.length) return { ...tree, children: [] };

  const formattedChildObj = tree.children.map((childId, i) => {
    path.length ? (path[path.length - 1] = i) : path.push(i);

    const childData = data.find((d) => d.properties.id === childId);

    if (!childData)
      return { id: "notfound", name: "child not found", _path: [] };

    const { id, displayName, childZoneIds } = childData?.properties;
    const childTreeObj = buildTree(
      data,
      { id: id, name: displayName, children: childZoneIds, _path: path },
      [...path, 0]
    );
    childTreeObj._path = [...path];
    return childTreeObj;
  });

  return { ...tree, children: formattedChildObj };
};

type ReactFolderTreeType = {
  id: string;
  name: string;
  checked?: boolean;
  isOpen?: boolean;
  children?: ReactFolderTreeType[];
  _path: number[];
};

interface FolderProps {
  data: ReactFolderTreeType;
  handleSelect: (selectedTreePath: number[]) => void;
  handleFolderToggle: (selectedTreePath: number[]) => void;
}

interface FileProps {
  data: ReactFolderTreeType;
  handleSelect: (selectedTreePath: number[]) => void;
}

interface TreeNodesProps {
  data: ReactFolderTreeType;
  handleSelect: (selectedTreePath: number[]) => void;
  handleFolderToggle: (selectedTreePath: number[]) => void;
}

interface TreeViewProps {
  data: ReactFolderTreeType;
  onSelect: (selectedZoneIds: string[]) => void;
}

const Folder: FC<PropsWithChildren<FolderProps>> = ({
  data,
  handleSelect,
  handleFolderToggle,
  children,
}) => {
  return (
    <ul>
      <span onClick={() => handleFolderToggle(data._path)}>Toggle</span>{" "}
      <span
        onClick={() => {
          handleSelect(data._path);
        }}
      >
        {data.name}
      </span>{" "}
      {data.checked ? "checked" : "not checked"}
      {data.isOpen ? children : <></>}
    </ul>
  );
};

const File: FC<FileProps> = ({ data, handleSelect }) => {
  return (
    <li
      onClick={(e) => {
        e.stopPropagation();
        handleSelect(data._path);
      }}
    >
      {data.name} {data.checked ? "checked" : "not checked"}
    </li>
  );
};

const TreeNodes: FunctionComponent<TreeNodesProps> = ({
  data,
  handleSelect,
  handleFolderToggle,
}) => {
  return data.children?.length ? (
    <Folder
      data={data}
      handleSelect={handleSelect}
      handleFolderToggle={handleFolderToggle}
    >
      {data.children.map((child: any) => (
        <TreeNodes
          key={child.id}
          data={child}
          handleSelect={handleSelect}
          handleFolderToggle={handleFolderToggle}
        />
      ))}
    </Folder>
  ) : (
    <File data={data} handleSelect={handleSelect} />
  );
};

const TreeView: FunctionComponent<TreeViewProps> = ({ data, onSelect }) => {
  const [tree, setTree] = useState(data);

  const findTargetNode = (root: ReactFolderTreeType, path: number[]) => {
    if (path && !path.length) return root;

    let currentNode = root;

    for (const idx of path) {
      if (currentNode.children?.length) {
        currentNode = currentNode.children[idx];
      }
    }
    return currentNode;
  };
  const uncheckAllChildren = (children: ReactFolderTreeType[]) => {
    let childrenNodeQueue = [...children];

    while (childrenNodeQueue.length) {
      const currentChildNode = childrenNodeQueue[0];
      currentChildNode.checked = false;

      if (currentChildNode.children?.length) {
        childrenNodeQueue.push(...currentChildNode.children);
      }

      childrenNodeQueue.shift();
    }
  };
  const uncheckAllDirectParents = (
    root: ReactFolderTreeType,
    path: number[]
  ) => {
    if (path && !path.length) return root;

    let currentNode = root;

    for (const idx of path) {
      currentNode.checked = false;

      if (currentNode.children?.length) {
        currentNode = currentNode.children[idx];
      }
    }
    return currentNode;
  };

  const handleSelect = (selectedTreePath: number[]) => {
    setTree((root) => {
      const currentNode = findTargetNode(root, selectedTreePath);
      if (!currentNode.checked) {
        uncheckAllDirectParents(root, selectedTreePath);
        currentNode.children && uncheckAllChildren(currentNode.children);
      }
      currentNode.checked = !currentNode.checked;

      return { ...root };
    });
  };

  const handleFolderToggle = (treePath: number[]) => {
    setTree((root) => {
      const currentNode = findTargetNode(root, treePath);
      currentNode.isOpen = !currentNode.isOpen;
      return { ...root };
    });
  };

  useEffect(() => {
    const nodeQueue = [tree];
    const selectedNodes = [];
    while (nodeQueue.length) {
      const currentNode = nodeQueue[0];

      currentNode.checked && selectedNodes.push(currentNode.id);

      currentNode.children && nodeQueue.push(...currentNode.children);

      nodeQueue.shift();
    }
    console.log("selectedNodes", selectedNodes);

    onSelect(selectedNodes);
    return () => {};
  }, [tree]);

  return (
    <TreeNodes
      data={tree}
      handleSelect={handleSelect}
      handleFolderToggle={handleFolderToggle}
    />
  );
};

export default TreeView;
