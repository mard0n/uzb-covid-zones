import React, { useState, ReactElement } from "react";
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
import { SearchProps } from "./Search";
import { Scrollbars } from "react-custom-scrollbars";

export interface LayoutProps {
  map: ReactElement;
  mainContent: ReactElement;
  search: ReactElement;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    flexShrink: 0,
    width: "50%",
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
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const classes = useStyles();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const { map, search, mainContent } = props;
  console.log("isBottomSheetOpen", isBottomSheetOpen);

  return (
    <>
      {mdUp ? (
        <Grid container>
          <Drawer
            className={`${classes.drawer}`}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
          >
            <Scrollbars style={{ padding: "32px 40px" }} autoHide>
              <Box pt={4} pb={4} pl={5} pr={5}>
                <Box mb={4}>
                  {React.cloneElement(search, { isInsidePaper: true })}
                </Box>
                {mainContent}
              </Box>
            </Scrollbars>
          </Drawer>
          <Box height={"100vh"} flexGrow={1} zIndex={1}>
            {map}
          </Box>
        </Grid>
      ) : (
        <>
          <Grid container>
            <Box
              position="absolute"
              width={"100%"}
              paddingTop={"24px"}
              paddingLeft={"20px"}
              paddingRight={"20px"}
              zIndex={100}
            >
              {React.cloneElement(search, {
                isInsidePaper: false,
                closeBottomSheet: () => setIsBottomSheetOpen(false),
              })}
            </Box>
            <Box height={"calc(100vh - 260px)"} flexGrow={1} zIndex={1}>
              {React.cloneElement(map, {
                closeBottomSheet: () => setIsBottomSheetOpen(false),
              })}
            </Box>
            <Box zIndex={100}>
              <SwipeableBottomSheet
                overflowHeight={150}
                shadowTip={false}
                topShadow={false}
                overlay={false}
                bodyStyle={{
                  backgroundColor: "none",
                  overflow: "visible",
                }}
                open={isBottomSheetOpen}
                onChange={setIsBottomSheetOpen}
              >
                <Paper
                  elevation={11}
                  className={classes.bottomSheetPaper}
                  style={{ height: "60vh" }}
                >
                  <Box className={classes.notch}></Box>
                  <Box height={"60vh"}>{mainContent}</Box>
                </Paper>
              </SwipeableBottomSheet>
            </Box>
          </Grid>
        </>
      )}
    </>
  );
};

export default Layout;
