import { Layout, EmbedLayout } from "./layouts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import { ZoneResType } from "./types/zone";

async function rootloader() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = urlSearchParams.getAll("zone");

  if (params.length) {
    const res: ZoneResType = await fetch(
      `api/zones?${params.map((p) => "zone=" + p).join("&")}`
    ).then((res) => res.json());
    if (res?.zones) {
      return res.zones;
    }
  } else {
    const res: ZoneResType = await fetch(`api/zones`).then((res) => res.json());
    if (res?.zones) {
      return res.zones;
    }
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    loader: rootloader,
  },
  {
    path: "/embed",
    element: <EmbedLayout />,
    errorElement: <ErrorPage />,
    loader: rootloader,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
