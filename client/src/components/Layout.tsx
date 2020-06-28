import React from "react";
import {
  makeStyles,
  Drawer,
  Grid,
  Box,
  useMediaQuery,
  Theme,
  Paper,
} from "@material-ui/core";
import SwipeableBottomSheet from "react-swipeable-bottom-sheet";
import { transformTranslate } from "@turf/turf";

export interface LayoutProps {
  map: any;
  mainContent: any;
  search: any;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: "50%",
    flexShrink: 0,
    maxWidth: 600,
  },
  drawerPaper: {
    width: "50%",
    maxWidth: 600,
  },
  bottomSheetPaper: {
    position: "relative",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: "30px 20px 30px",
  },
  notch: {
    position: "absolute",
    top: 12.5,
    left: "50%",
    transform: "translateX(-50%)",
    width: 37,
    height: 5,
    background: "#E3E3E3",
    borderRadius: 9,
  },
}));

const Layout: React.SFC<LayoutProps> = (props) => {
  const classes = useStyles();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const { map, search, mainContent } = props;

  return (
    <>
      {mdUp ? (
        <Grid container>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
          >
            {search}
            {mainContent}
          </Drawer>
          <Box height={"100vh"} flexGrow={1} zIndex={1}>
            {map}
          </Box>
        </Grid>
      ) : (
        <Grid container>
          <Box position="absolute" width={'100%'} zIndex={100} >
            {search}
          </Box>
          <Box height={"calc(100vh - 260px)"} flexGrow={1} zIndex={1}>
            {map}
          </Box>
          <Box zIndex={100}>
            <SwipeableBottomSheet
              overflowHeight={300}
              shadowTip={false}
              topShadow={false}
              overlay={false}
              bodyStyle={{ backgroundColor: "none", overflow: "unset" }}
              onTransitionEnd={() => {
                console.log("e");
              }}
            >
              <Paper elevation={11} className={classes.bottomSheetPaper}>
                <Box className={classes.notch}></Box>
                <Box height={"60vh"}>{mainContent}</Box>
              </Paper>
            </SwipeableBottomSheet>
          </Box>
        </Grid>
      )}
    </>
  );
};

export default Layout;
