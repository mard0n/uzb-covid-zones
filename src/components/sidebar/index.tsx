import React from "react";
import { Box, Drawer } from "@mashreq-digital/ui";
import SidebarNav from "./SidebarNav";
import { pages } from "./pages";
import { getMashreqLogo } from "@mashreq-digital/webassets";

const MashreqLogo = getMashreqLogo();

let SideDrawer = () => {
  return (
    <Drawer open={true} variant="persistent">
      <Box display="flex" alignItems="center">
      <MashreqLogo width="80px" height="40px" />
      </Box>
      <SidebarNav pages={pages} />
    </Drawer>
  );
};

export default SideDrawer;
