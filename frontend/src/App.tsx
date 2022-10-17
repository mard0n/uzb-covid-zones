import { Map } from "./components/Map";
import useFetchZones from "./hooks/useFetchZones";

function App() {
  const [zones, showOnlySelectedZones] = useFetchZones();
  return (
    <>
      <Map zones={zones} showOnlySelectedZones={showOnlySelectedZones} />
    </>
  );
}

export default App;
