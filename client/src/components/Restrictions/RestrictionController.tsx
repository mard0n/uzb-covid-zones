import React, { useContext } from "react";
import { StateContext } from "../../state/StateContext";
import { getSelectedZoneObjById } from "../../utils/getSelectedZoneObj";
import Editor from "./Editor";

export interface RestrictionControllerProps {
  socket: any;
}

const RestrictionController: React.SFC<RestrictionControllerProps> = (
  props
) => {
  const { socket } = props;
  const { zones, selectedZoneId } = useContext(StateContext);
  const selectedZone: any = getSelectedZoneObjById(selectedZoneId, zones);

  const handleSave = (data: any) => {

    socket.emit("edit_restrictions", {
      zoneId: selectedZoneId,
      restrictions: data,
    });
    socket.once("edit_restrictions_success", () => {
      socket.emit("initial_data");
    });
  };
  return (
    <div style={{ border: "1px solid #333" }}>
      <Editor
        restrictions={selectedZone?.properties?.restrictionsUz}
        handleSave={handleSave}
      />
    </div>
  );
};

export default RestrictionController;
