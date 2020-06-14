import React, { useContext } from "react";
import { StateContext } from "../state/StateContext";
import { getSelectedZoneObjById } from "../utils/getSelectedZoneObj";
import { editorToHTMLParser } from "../utils/editorToHTMLParser";

export interface RestrictionsProps {}

const Restrictions: React.SFC<RestrictionsProps> = (props) => {
  const { zones, selectedZoneId } = useContext(StateContext);
  const selectedZone: any = getSelectedZoneObjById(selectedZoneId, zones);
  return (
    <div style={{ padding: "0 20px" }}>
      <span>Restrictions: </span>
      {editorToHTMLParser(selectedZone?.properties?.restrictions?.blocks)}
    </div>
  );
};

export default Restrictions;
