import React from "react";
import { Drawer, createStyles, makeStyles, Theme } from "@mashreq-digital/ui";
import { useLocation } from "react-router-dom";
import { globalStyle } from "../../util/constants";
import VerticalStepper2 from './VerticalStepper2';

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

let JourneySidebar = (props:any) => {
  const { drawer, drawerPaper } = useStyles();
  const {steps, currentStep} = props;
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
        <VerticalStepper2 steps={steps} currentStep={currentStep} />
      </Drawer>
    );
  }


export default JourneySidebar;
