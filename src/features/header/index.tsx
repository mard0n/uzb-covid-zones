import React from "react";
import {
  Header,
  LinearProgressBar,
  Select,
  Box,
  Caption,
  makeStyles,
  SvgIcon,
  IconButton,
  Theme
} from "@mashreq-digital/ui";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { getMashreqLogo, Search, AlarmBell, SingleNeutral, Logout } from "@mashreq-digital/webassets";
import { stepsID } from "../../redux/reducers/createAcountReducer";
import i18n from "../../config/i18n";
import { changeLocalization } from "../../redux/actions/globalSetupAction";
import { globalStyle } from "../../util/constants";

const { header, logo, defaultGutter } = globalStyle;

const headerIcons = [
  {
    title: "search",
    icon: Search
  },
  {
    title: "notification",
    icon: AlarmBell
  },
  {
    title: "user",
    icon: SingleNeutral
  },
  {
    title: "logout",
    icon: Logout
  }
];

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& header > div": {
      minHeight: header,
      padding: `0 ${defaultGutter}px`,
      borderBottom: "1px solid #ccc"
    }
  },
  svgIconButton: {
    margin: `0 ${theme.spacing(0.8)}px`
  },
  sidebarHeader: {
    // "& header > div": {
    //   borderBottom: "1px solid #ccc"
    // }
  }
 
}));


const MOLHeader = (props: any) => {
  const { root, sidebarHeader, svgIconButton } = useStyles();
  const { t } = useTranslation();
  const steps = t("account.steps", { returnObjects: true });
  const { activeStep } = useSelector((state: any) => ({
    activeStep: state?.createAccount?.activeStep
  }));
  const dispatch = useDispatch();

  const handleLanguageChange = (event: any) => {
    let newlang = event.target.value,
      dir = newlang && newlang === "ar" ? "rtl" : "ltr";
    i18n.changeLanguage(newlang);
    dispatch(changeLocalization(dir));
    document.body.setAttribute("dir", dir);
  };

  //update regex for any other path
  const exludePath = new RegExp("account");

  const MashreqLogo = getMashreqLogo();

  return (
    <Box className={`${root} ${props.hasSidebar ? sidebarHeader : ""}`}> 
      <Header
        position="fixed"
        left={
          <Box display="flex" alignItems="center">
            {/* {!props.hasSidebar && */}
            <MashreqLogo width={logo.width} height={logo.height} />
          {/* } */}
            {!exludePath.test(props?.match?.url) ? null : (
              <Box ml={2.5}>
                <Caption>{steps[activeStep]}</Caption>
              </Box>
            )}
          </Box>
        }
        right={
          <Box>
            {props.hasSidebar && headerIcons.map((item:any, i:number)=>{
              const { icon } = item;
              return (
                <IconButton className={svgIconButton} aria-label="upload picture" component="span"> 
                  <SvgIcon key={i+"headerIcons"} htmlColor="#313131" component={icon} />
                </IconButton>
              )
            })}
            {!exludePath.test(props?.match?.url) ? (
              <Select native onChange={handleLanguageChange}>
                <option value="er">{t("common.language.english")}</option>
                <option value="ar">{t("common.language.arabic")}</option>
              </Select>
            ) : (
              <Caption>{t("common.links.needHelp")}</Caption>
            )}
          </Box>
        }
      />

      {!exludePath.test(props?.match?.url) ? null : (
        <LinearProgressBar
          activeStep={activeStep}
          variant="determinate"
          totalStep={stepsID.length - 1}
        />
      )}
    </Box>
  );
};

export default MOLHeader;
