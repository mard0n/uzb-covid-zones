import React, { useEffect, useMemo, useRef, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Embed } from "../../components/Embed";
import { Map } from "../../components/Map";
import { ZoneFeature, ZoneFeatureCollection } from "../../types/zone";
import "react-folder-tree/dist/style.css";
import "./EmbedLayout.css";

interface EmbedLayoutProps {}

type ReactFolderTreeType = {
  id: string;
  name: string;
  checked?: 0 | 1;
  isOpen?: boolean;
  children?: ReactFolderTreeType[];
};

const buildTree = (
  zones: ZoneFeature[],
  tree?: Omit<ReactFolderTreeType, "children"> & {
    children?: ReactFolderTreeType[] | string[];
  }
): ReactFolderTreeType => {
  const zonesShallowCopy = [...zones];
  if (!tree) {
    const topParentIndex = zonesShallowCopy.findIndex(
      (zone) => !zone.properties.parentZoneId
    );

    if (topParentIndex < 0) {
      return { name: "Parent not found", id: "" };
    }

    const { id, displayName, childZoneIds } = zonesShallowCopy.splice(
      topParentIndex,
      1
    )[0].properties;

    return buildTree(zonesShallowCopy, {
      id,
      name: displayName,
      checked: 0,
      isOpen: true,
      children: childZoneIds,
    });
  }

  if (tree.children?.length) {
    const formattedChildObj = tree.children.map((childId) => {
      const childIndex = zonesShallowCopy.findIndex(
        (zone) => zone.properties.id === childId
      );

      if (childIndex < 0) {
        return { name: "Child not found", id: childId as string };
      }

      const { id, displayName, childZoneIds } = zonesShallowCopy.splice(
        childIndex,
        1
      )[0].properties;

      return buildTree(zonesShallowCopy, {
        id,
        name: displayName,
        checked: 0,
        isOpen: false,
        children: childZoneIds,
      });
    });

    return { ...tree, children: formattedChildObj };
  }

  delete tree.children;

  return { ...tree, children: tree.children };
};
const getSelectedZoneIds = (
  tree: ReactFolderTreeType,
  zones: ZoneFeature[],
  foundZones: ZoneFeature[] = []
): ZoneFeature[] => {
  const foundZone = zones.find(
    (zone) => zone.properties.id === tree.id && tree.checked === 1
  );
  foundZone && foundZones.push(foundZone);
  if (tree.children?.length) {
    tree.children.forEach((treeChild) => {
      const foundChild = zones.find(
        (zone) =>
          zone.properties.id === (treeChild as ReactFolderTreeType).id &&
          treeChild.checked === 1
      );

      foundChild && foundZones.push(foundChild);
      getSelectedZoneIds(treeChild, zones);
    });
    return foundZones;
  }

  return foundZones;
};

const EmbedLayout: React.FC<EmbedLayoutProps> = () => {
  const mapRef = useRef();
  const zones = useLoaderData() as ZoneFeatureCollection | undefined;
  const [selectedZones, setSelectedZones] = useState<ZoneFeature[]>([]);

  if (!zones) {
    return <>loading...</>;
  }

  useEffect(() => {
    console.log("shwSpecificZones");

    (mapRef.current as any).showSpecificZones({
      type: "FeatureCollection",
      features: selectedZones,
    });

    return () => {};
  }, [selectedZones, mapRef.current]);

  const serializedData = JSON.stringify(zones);
  console.log("serializedData.length", serializedData.length);

  const data = useMemo(() => buildTree(zones.features), [serializedData]);

  const onTreeStateChange = (state: ReactFolderTreeType) => {
    setSelectedZones(getSelectedZoneIds(state, zones.features));
  };

  const preventDefault = () => {
    // TODO: Make zones selectable by clicking on the name. You need to change the source code to do that
    return null;
  };

  return (
    <>
      <div className="">
        <div className="w-full max-w-screen-md mx-auto pt-10 grid grid-cols-1 sm:grid-cols-[3fr_2fr]">
          {/* <div className="flex min-h-[300px] max-h-[500px]"> */}
          <div className="overflow-scroll min-h-[300px] max-h-[500px]">
            Zones list
            {/* <FolderTree
              data={data}
              onChange={onTreeStateChange}
              iconComponents={{
                FolderIcon: () => null,
                FileIcon: () => null,
                FolderOpenIcon: () => null,
              }}
              onNameClick={preventDefault}
            /> */}
          </div>
          <div className="overflow-scroll min-h-[300px] max-h-[500px] hidden sm:block">
            {selectedZones &&
              selectedZones.map((zone) => {
                return (
                  <div key={zone.properties.displayName}>
                    {zone.properties.displayName}
                  </div>
                );
              })}
          </div>
          <div className="relative grow aspect-video col-span-full">
            <Map ref={mapRef} />
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default EmbedLayout;
