import React from "react";
import { createStyles, Theme, makeStyles, Drawer } from "@mashreq-digital/ui";
import SidebarNav from "./SidebarNav";
import { pages } from "./pages";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar
  })
);

let SideDrawer = () => {
  const classes = useStyles();
  return (
    <Drawer open={true} variant="persistent">
      <div className={classes.toolbar} />
      <SidebarNav pages={pages} />
    </Drawer>
  );
};

export default SideDrawer;
