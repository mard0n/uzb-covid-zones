import { useEffect, useState } from "react";
import { ZoneFeature, ZoneResType } from "../types/zone";

const useFetchZones = () => {
  const [zones, setZones] = useState<ZoneFeature>();
  const [showOnlySelectedZones, setShowOnlySelectedZones] = useState(false);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = urlSearchParams.getAll("zone");

    if (params.length) {
      fetch(`api/zones?${params.map((p) => "zone=" + p).join("&")}`)
        .then((res) => res.json())
        .then((res) => {
          setZones(res.zones);
          setShowOnlySelectedZones(true);
          console.log("res", res);
        });
    } else {
      fetch(`api/zones`)
        .then((res) => res.json())
        .then((res: ZoneResType) => {
          setZones(res.zones);
          console.log("res", res);
        });
    }

    return () => {};
  }, []);
  return [zones, showOnlySelectedZones] as const;
};

export default useFetchZones;
