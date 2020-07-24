import React, { useContext } from "react";
import { StateContext } from "../../state/StateContext";
import { getSelectedZoneObjById } from "../../utils/getSelectedZoneObj";
import { editorToHTMLParser } from "../../utils/editorToHTMLParser";
import { Box } from "@material-ui/core";

export interface RestrictionsProps {}

const Restrictions: React.SFC<RestrictionsProps> = (props) => {
  const { zones, selectedZoneId } = useContext(StateContext);
  const selectedZone: any = getSelectedZoneObjById(selectedZoneId, zones);
  return (
    <Box mt={4} mb={4}>
      {editorToHTMLParser(selectedZone?.properties?.restrictions?.blocks)}
    </Box>
  );
};

export default Restrictions;
