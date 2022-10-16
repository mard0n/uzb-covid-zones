import { useEffect, useState } from "react";
import { Map } from "./components/Map";
import { Zone } from "./types/zone";

function App() {
  const [zones, setZones] = useState<Zone>();
  useEffect(() => {
    fetch(`api/zones`)
      .then((res) => res.json())
      .then((res) => {
        setZones(res.zones);
        console.log("res", res);
      });

    return () => {};
  }, []);

  return (
    <>
      <Map zones={zones} />
    </>
  );
}

export default App;
