import { useEffect } from "react";
import { Map } from "./components/Map";

function App() {
  useEffect(() => {
    fetch("/hello")
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
      });

    return () => {};
  }, []);

  return (
    <>
      <Map />
    </>
  );
}

export default App;
