import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  SvgIcon,
  H4,
  Caption,
  makeStyles,
  Button,
  Theme,
  colors,
  Box,
} from "@mashreq-digital/ui";
import { Trash, Edit2 } from "@mashreq-digital/webassets";
import Timer from "../timer";

const useStyles = makeStyles((theme: Theme) => ({
  gridRoot: {
    paddingBottom: "inherit",
  },
  root: {
    borderColor: "#dde0e9",
    borderStyle: "solid",
    borderWidth: "thin",
    alignItems: "center",
    marginBottom: theme?.spacing(1.5),
    "&:hover, &:focus, &:active": {
      backgroundColor: "rgba(255, 79, 0, 0.05)",
    },
    height: "72px",
  },
  orange: {
    color: theme.palette.getContrastText(colors.deepOrange[500]),
    backgroundColor: "rgb(255, 144, 62)",
  },
  secondaryAction: {
    alignItems: "center",
  },
}));

/**
 * @customProps
 *  @prop {Component}  avatarComponent ,
 *  @prop {string} avatarName,
 *  @prop {string} nickname,
 *  @prop {string} accountNumber,
 *  @prop {string} color,
 *  @prop {function} editCallback,
 *  @prop {function} deleteCallback
 * @return {Component}
 *
 */

interface CustomListItemProps {
  avatarImage?: string | undefined;
  avatarName: string;
  nickname: string;
  accountNumber: string;
  onResumeLabel?: string;
  activeAfter?: any;
  color?: string | undefined;
  editCallback?: any | undefined;
  deleteCallback?: any | undefined;
  onResumeCallback?: any | undefined;
}

//TODO: move this hooks to mashreq-web-packages
let useLoaded = ({ avatarImage }: any) => {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    if (!avatarImage) {
      return undefined;
    }

    setLoaded(false);

    let active = true;
    const image = new Image();
    image.src = avatarImage;
    image.onload = () => {
      if (!active) {
        return;
      }
      setLoaded(true);
    };
    image.onerror = () => {
      if (!active) {
        return;
      }
      setLoaded(false);
    };

    return () => {
      active = false;
    };
  }, [avatarImage]);

  return loaded;
};

const CustomListItem = (props: CustomListItemProps) => {
  const {
    avatarImage,
    avatarName,
    nickname,
    accountNumber,
    activeAfter,
    color,
    editCallback,
    deleteCallback,
    onResumeLabel,
    onResumeCallback,
  } = props;
  const { root, secondaryAction, gridRoot, orange } = useStyles(props);
  let svgIconProps: any = {};
  let imagesIsloaded = useLoaded({ avatarImage });

  if (color) {
    svgIconProps["color"] = color;
  }

  const onEditCallback = (e: any) => {
    if (editCallback && typeof editCallback === "function") {
      editCallback(e);
    }
  };
  const onDeleteCallback = (e: any) => {
    if (deleteCallback && typeof deleteCallback === "function") {
      deleteCallback(e);
    }
  };

  return (
    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={gridRoot}>
      <ListItem className={root} button>
        <ListItemAvatar>
          <Avatar
            src={avatarImage}
            className={!imagesIsloaded && !onResumeLabel ? orange : ""}
          >
            {avatarName
              .split(/\s/)
              .reduce(
                (response: any, word: any) => (response += word.slice(0, 1)),
                ""
              )
              .slice(0, 2)
              .toUpperCase()}
          </Avatar>
        </ListItemAvatar>

        <ListItemText primary={<H4> {nickname} </H4>} />

        <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
          <ListItemText
            primary={
              <Caption>
                {" "}
                {accountNumber}{" "}
                {activeAfter !== "" && activeAfter && <Timer activeAfter={activeAfter} />}{" "}
              </Caption>
            }
          />
        </Grid>

        <Grid item xl={3} lg={3} md={3} sm={3} xs={3}></Grid>
        <ListItemSecondaryAction className={secondaryAction}>
          {onResumeLabel &&
            onResumeCallback &&
            typeof onResumeCallback === "function" && (
              <Button
                variant="text"
                color="primary"
                onClick={(e) => onResumeCallback(e)}
              >
                {onResumeLabel}
              </Button>
            )}
          {!(onResumeCallback && typeof onResumeCallback === "function") && (
            <>
              {onEditCallback && typeof onEditCallback === "function" && (
                <IconButton
                  edge="start"
                  aria-label="Edit"
                  onClick={(e) => onEditCallback(e)}
                >
                  <SvgIcon component={Edit2} {...svgIconProps} />
                </IconButton>
              )}
            </>
          )}
          {onDeleteCallback && typeof onDeleteCallback === "function" && (
            <IconButton
              edge="end"
              aria-label="Delete"
              onClick={(e) => onDeleteCallback(e)}
            >
              <SvgIcon component={Trash} {...svgIconProps} />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </ListItem>
    </Grid>
  );
};

export default CustomListItem;
