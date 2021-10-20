import React, { useState, ReactElement, useEffect, useContext } from "react";
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
import { Scrollbars } from "react-custom-scrollbars";
import { ADD_CLOSE_BOTTOM_SHEET_FN } from "state/reducers/appReducer";
import { StateContext } from "state/StateContext";

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
    boxShadow: "0px 4px 40px rgba(0, 30, 89, 0.09)",
  },
  bottomSheetPaper: {
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    backgroundColor: "white",
    fontSize: "18px",
    padding: "30px 20px",
    // minHeight: "calc(100vh - 160px)",
    // maxHeight: 'calc(100vh - 160px)',
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
  const { dispatch } = useContext(StateContext);
  const classes = useStyles();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const { map, mainContent, search } = props;

  const handleSwipeableChange = (isOpen: boolean) =>
    setIsBottomSheetOpen(isOpen);

  const handleBottomSheetClose = () => setIsBottomSheetOpen(false);

  useEffect(() => {
    dispatch({
      type: ADD_CLOSE_BOTTOM_SHEET_FN,
      payload: handleBottomSheetClose,
    });
    return () => {};
  }, []);

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
                <Box mb={3}>
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
              paddingTop={"8px"}
              paddingLeft={"8px"}
              paddingRight={"8px"}
              zIndex={100}
            >
              {React.cloneElement(search, {
                isInsidePaper: false,
              })}
            </Box>
            <Box height={"calc(100vh - 190px)"} flexGrow={1} zIndex={1}>
              {map}
            </Box>
            <Box zIndex={100}>
              <SwipeableBottomSheet
                overflowHeight={200}
                shadowTip={false}
                topShadow={false}
                overlay={false}
                open={isBottomSheetOpen}
                onChange={handleSwipeableChange}
              >
                <Paper elevation={11} className={classes.bottomSheetPaper}>
                  {/* <Scrollbars style={{ padding: "30px 20px", }} autoHide> */}
                  <Box className={classes.notch}></Box>
                  <Box>{mainContent}</Box>
                  {/* </Scrollbars> */}
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
