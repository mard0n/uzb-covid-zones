import React from "react";
import { Box, Drawer, createStyles, makeStyles, Theme } from "@mashreq-digital/ui";
import SidebarNav from "./SidebarNav";
import { pages } from "./pages";
// import { getMashreqLogo } from "@mashreq-digital/webassets";
import { useLocation } from "react-router-dom";
import { globalStyle } from "../../util/constants";
import JourneyPage from '../journeyLayout/index';

// const MashreqLogo = getMashreqLogo();
const { postLogin, sidebarWidth, defaultGutter } = globalStyle;
const drawerWidth = sidebarWidth, 
drawerHeight= postLogin.height,  // added 2 because of  header & footer border
drawerTop= postLogin.top; // added 1 because of  header border

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      height: drawerHeight,
      overflow: "auto",
      flexShrink: 0,
      "& .MuiDrawer-paperAnchorDockedLeft" : {
        top: drawerTop,
        width: drawerWidth,
        height: drawerHeight,
        overflow: "auto",
        padding: `${theme?.spacing(6)}px 0px ${theme?.spacing(6)}px ${defaultGutter}px`,
      }
    },
    drawerPaper: {
      top: drawerTop,
      width: drawerWidth,
      height: drawerHeight,
      overflow: "auto",
    },
  }),
);

let SideDrawer = () => {
  const { drawer, drawerPaper } = useStyles();
  const location = useLocation();
  const currentUrl = location && location.pathname ? location.pathname : "";


  let sidebarCondition = [
      "dashboard",
      "beneficiaries",
      "billpayment",
      "moneytransfer",
    ],
    splitUrl = currentUrl.indexOf("/") > -1 ? currentUrl.split("/") : [],
    enableSidebar =
      splitUrl && splitUrl.length > 0
        ?sidebarCondition.indexOf(splitUrl[1]) > -1
        : false;

        // enableSidebar =
        // splitUrl && splitUrl.length > 0
        //   ?!(sidebarExcept.indexOf(splitUrl[2]) > -1)
        //   : false;  

  if (!enableSidebar) {
    return <></>;
  } else {
    return (
      <Drawer
        open={true}
        variant="persistent"
        className={drawer}
        classes={{
          paper: drawerPaper,
        }}
        anchor="left"
      >
        <Box display="flex" alignItems="center">
          {/* <MashreqLogo width="80px" height="40px" /> */}
        </Box>

        <SidebarNav pages={pages} />
      </Drawer>
    );
  }
};

export default SideDrawer;
