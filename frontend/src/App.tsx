import { Map } from "./components/Map";
import useFetchZones from "./hooks/useFetchZones";
import { Layout } from "./layouts";

function App() {
  const [zones, showOnlySelectedZones] = useFetchZones();
  return (
    <>
      <Layout
        map={
          <Map zones={zones} showOnlySelectedZones={showOnlySelectedZones} />
        }
        body={<>test</>}
      />
    </>
  );
}

export default App;
