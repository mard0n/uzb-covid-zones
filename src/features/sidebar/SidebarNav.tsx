import React, { forwardRef } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  Button,
  Collapse,
  makeStyles,
  ListItemText,
  ListItemIcon
} from "@mashreq-digital/ui";

const useStyles = makeStyles((theme: any) => ({
  root: {},
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    "& $icon": {
      color: theme.palette.primary.main
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
      {pages.map((page: any) => (
        <>
          <ListItem className={classes.item} disableGutters key={page.title}>
            <Button
              activeClassName={classes.active}
              component={CustomRouterLink}
              to={page.href}
            >
              <div className={classes.icon}>{page.icon}</div>
              {page.title}
            </Button>
          </ListItem>
          {page.subMenu ? (
            <Collapse in={true} timeout="auto" unmountOnExit>
              {page.subMenu.map((subPage: any) => (
                <List component="div" disablePadding>
                  <ListItem>
                    <Button
                      activeClassName={classes.active}
                      component={CustomRouterLink}
                      to={subPage.href}
                    >
                      <div className={classes.icon}>{subPage.icon}</div>
                      {subPage.title}
                    </Button>
                  </ListItem>
                </List>
              ))}
            </Collapse>
          ) : (
            ""
          )}
        </>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;
