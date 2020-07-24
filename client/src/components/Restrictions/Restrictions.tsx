import React, { useContext } from "react";
import { StateContext } from "../../state/StateContext";
import { getSelectedZoneObjById } from "../../utils/getSelectedZoneObj";
import { editorToHTMLParser } from "../../utils/editorToHTMLParser";
import { Box } from "@material-ui/core";
import { getLanguage } from "../../utils/getLanguage";

export interface RestrictionsProps {}

const Restrictions: React.SFC<RestrictionsProps> = (props) => {
  const { zones, selectedZoneId } = useContext(StateContext);
  const selectedZone = getSelectedZoneObjById(selectedZoneId, zones);
  let restrictions: any;
  console.log('getLanguage()', getLanguage());
  console.log('selectedZone', selectedZone);
  switch (getLanguage()) {
    case 'uz':
      restrictions = selectedZone?.properties?.restrictionsUz
      break;
    case 'ru':
      restrictions = selectedZone?.properties?.restrictionsRu
      break;
    default:
      restrictions = selectedZone?.properties?.restrictionsUz
      break;
  }
  return (
    <Box mt={4} mb={4}>
      {editorToHTMLParser(restrictions?.blocks)}
    </Box>
  );
};

export default Restrictions;
