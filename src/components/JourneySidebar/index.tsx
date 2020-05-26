import React from "react";
import {
  Drawer,
  createStyles,
  makeStyles,
  Theme,
  Box,
  VerticalProgressStepper,
} from "@mashreq-digital/ui";
import { globalStyle } from "../../util/constants";
import { useTranslation } from "react-i18next";

// const MashreqLogo = getMashreqLogo();
const { postLogin, sidebarWidth, defaultGutter } = globalStyle;
const drawerWidth = sidebarWidth,
  drawerHeight = postLogin.height, // added 2 because of  header & footer border
  drawerTop = postLogin.top; // added 1 because of  header border

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      height: drawerHeight,
      overflow: "auto",
      flexShrink: 0,
      "& .MuiDrawer-paperAnchorDockedLeft": {
        top: drawerTop,
        width: drawerWidth,
        height: drawerHeight,
        overflow: "auto",
        padding: `${theme.spacing(9.3)}px 0px ${theme?.spacing(
          6
        )}px ${defaultGutter}px`,
      },
    },
    drawerPaper: {
      background: "rgb(248, 249, 251)",
      top: drawerTop,
      width: drawerWidth,
      height: drawerHeight,
      overflow: "auto",
    },
    mainLayout: {
      width: `calc( 100vw - ${sidebarWidth}px)`,
      height: "100%",
      overflow: "auto",
      padding: `${theme.spacing(9.3)}px ${defaultGutter}px ${theme.spacing(
        9.3
      )}px ${theme.spacing(6)}px`,
    },
  })
);

let JourneySidebar = (props: any) => {
  const { t } = useTranslation();
  const { drawer, mainLayout, drawerPaper } = useStyles();
  const { steps, children, currentStep } = props;
  const STEPS: Array<string> = t(`${steps}`, { returnObjects: true });
  return (
    <Box display="flex" height={postLogin.height} mt={`${postLogin.top}px`}>
      <Drawer
        open={true}
        variant="persistent"
        className={drawer}
        classes={{
          paper: drawerPaper,
        }}
        anchor="left"
      >
        <VerticalProgressStepper steps={STEPS} currentStep={currentStep} />
      </Drawer>
      <Box className={mainLayout}>{children}</Box>
    </Box>
  );
};

export default JourneySidebar;
