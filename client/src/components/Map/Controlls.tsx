import L from "leaflet";

export const Controlls = (map: any) => {
  const zoomIn: any = L.DomUtil.create("div");
  const zoomOut: any = L.DomUtil.create("div");
  zoomIn.type = zoomOut.type = "button";
  zoomIn.title = "Zoom in";
  zoomOut.title = "Zoom out";
  zoomIn.innerHTML = "+";
  zoomOut.innerHTML = "-";

  zoomIn.style.cursor = zoomOut.style.cursor = "pointer";
  zoomIn.style.textAlign = zoomOut.style.textAlign = "center";
  zoomIn.style.width = zoomOut.style.width = "52px";
  zoomIn.style.height = zoomOut.style.height = "52px";
  zoomIn.style.borderRadius = zoomOut.style.borderRadius = "32px";
  zoomIn.style.background = zoomOut.style.background = "#ffffff";
  zoomIn.style.boxShadow = zoomOut.style.boxShadow =
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)";
  zoomIn.style.lineHeight = zoomOut.style.lineHeight = "52px";
  zoomIn.style.margin = zoomOut.style.margin = "8px 0";
  zoomIn.style.fontWeight = zoomOut.style.fontWeight = "500";
  zoomIn.style.fontSize = zoomOut.style.fontSize = "28px";
  zoomIn.style.fontFamily = zoomOut.style.fontFamily = "Rubik";
  zoomIn.style.color = zoomOut.style.color = "#242b43";

  zoomIn.onmouseover = function () {
    zoomIn.style.boxShadow = "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)";
  };
  zoomOut.onmouseover = function () {
    zoomOut.style.boxShadow = "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)";
  };
  zoomIn.onmouseout = function () {
    zoomIn.style.boxShadow = "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)";
  };
  zoomOut.onmouseout = function () {
    zoomOut.style.boxShadow = "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)";
  };

  zoomIn.onclick = function () {
    map.zoomIn(1);
    console.log("+ buttonClicked");
  };
  zoomOut.onclick = function () {
    map.zoomOut(1);
    console.log("- buttonClicked");
  };

  const container = L.DomUtil.create("div");
  container.appendChild(zoomIn);
  container.appendChild(zoomOut);

  return container;
};
