import React, { useEffect, useMemo, useRef, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Map, TreeView } from "../../components";
import { buildTree } from "../../components/TreeView/TreeView";
import { ZoneFeature, ZoneFeatureCollection } from "../../types/zone";
import "./EmbedLayout.css";

interface EmbedLayoutProps {}

const EmbedLayout: React.FC<EmbedLayoutProps> = () => {
  const mapRef = useRef();
  const zones = useLoaderData() as ZoneFeatureCollection | undefined;
  const [selectedZones, setSelectedZones] = useState<ZoneFeature[]>([]);
  const [embedLink, setEmbedLink] = useState("");

  if (!zones) {
    return <>loading...</>;
  }
  console.log("embedLink", embedLink);

  useEffect(() => {
    console.log("shwSpecificZones");

    (mapRef.current as any).showSpecificZones({
      type: "FeatureCollection",
      features: selectedZones,
    });

    const selectedZoneIds = selectedZones.map((zone) => zone.properties.id);
    console.log("window.location", window.location);

    const embedLink =
      window.location.origin + "?zone=" + selectedZoneIds.join("&zone=");
    setEmbedLink(embedLink);
    return () => {};
  }, [selectedZones, mapRef.current]);

  const handleZoneSelect = (selectedZoneIds: string[] = []) => {
    const selectedZonesObj = zones.features.filter((zone) =>
      selectedZoneIds.includes(zone.properties.id)
    );
    console.log("selectedZonesObj", selectedZonesObj);
    setSelectedZones(selectedZonesObj);
  };

  const tree = buildTree(zones.features);

  return (
    <>
      <div className="">
        <div className="w-full max-w-screen-md mx-auto pt-10 grid grid-cols-1 sm:grid-cols-[3fr_2fr]">
          <div className="overflow-scroll min-h-[300px] max-h-[500px]">
            Zones list <br />
            <TreeView data={tree} onSelect={handleZoneSelect} />
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
          <div>
            <input type="text" value={embedLink} />
          </div>
          <div className="relative grow aspect-video col-span-full">
            <Map ref={mapRef} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmbedLayout;
