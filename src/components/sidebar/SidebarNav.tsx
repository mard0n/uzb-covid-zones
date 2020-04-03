import React, { forwardRef } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  Button,
  Box,
  Collapse,
  makeStyles,
  H5,
  colors
} from "@mashreq-digital/ui";

const useStyles = makeStyles((theme: any) => ({
  root: {
    "& h5":{
    fontFamily: "GilroyMedium",
  },
  "& .MuiButton-text" : {
    padding: `${theme.spacing(1.8)}px`,
  }
  },
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0
  },
  icon: {
    color: theme.palette.icon,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(3.3),
    "& > svg" : {
      width: 24,
      height: 24,
      fill: colors?.blueGrey[400]
    }
  },
  active: {
    color: theme.palette.primary.main,
    width: "100%",
    justifyContent: "flex-start",
    position: "relative",
    "&::after" : {
      content: `''`,
      position: "absolute",
      height: "60%",
      width: "3px",
      backgroundColor: "#313131",
      right: "0px"
    },
    "& svg" : {
      fill: "#313131"
    },
    "& h5":{
      fontFamily: "GilroyBold",
    }
  }
}));

const CustomRouterLink = forwardRef((props: any, ref: any) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const SidebarNav = (props: any) => {
  const { pages, className, ...rest } = props;

  const classes = useStyles();

  return (
    <List {...rest} className={classes.root}>
      {pages.map((page: any, i: number) => (
        <Box mt={page.mt ? page.mt : 0} key={i}>
          <ListItem className={classes.item} disableGutters key={page.title}>
            <Button
              activeClassName={classes.active}
              component={CustomRouterLink}
              to={page.href}
            >
              <div className={classes.icon}>{page.icon}</div>
              <H5>{page.title}</H5>
            </Button>
          </ListItem>
          {page.subMenu ? (
            <Collapse in={true} timeout="auto" unmountOnExit>
              {page.subMenu.map((subPage: any, j: number) => (
                <List component="div" disablePadding key={subPage.title+j}>
                  <ListItem>
                    <Button
                      activeClassName={classes.active}
                      component={CustomRouterLink}
                      to={subPage.href}
                    >
                      <div className={classes.icon}>{subPage.icon}</div>
                      <H5>{subPage.title}</H5>
                    </Button>
                  </ListItem>
                </List>
              ))}
            </Collapse>
          ) : (
            ""
          )}
        </Box>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;
