import React, { useState } from "react";
import {
  Body1,
  UnderlineText,
  Box,
  Button,
  Grid,
  SectionSplitter,
  InfoCard,
  Caption,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Banner,
  BackButton,
  makeStyles,
  H2,
  SuccessFailureIcon,
  H5,
} from "@mashreq-digital/ui";
import { CheckCircle } from "@mashreq-digital/webassets";
import { useHistory } from "react-router-dom";
import JourneySidebar from "../../../../components/JourneySidebar";
import { useTranslation } from "react-i18next";
import PinInput from "../components/PinInput";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "8px",
  },
  listItemIcon: {
    minWidth: "32px",
  },
}));

export interface PinSetProps {
  nextPage: string;
  steps: string;
  currentStep: number;
}

const PinSet: React.SFC<PinSetProps> = (props) => {
  const { nextPage, steps, currentStep } = props;
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  // const dispatch = useContext(DispatchContext);
  const [pin, setPin] = useState<any>("");
  const [pinConfirm, setPinConfirm] = useState<any>("");
  const [pinError, setPinError] = useState("");
  const [error, setError] = useState("");

  const tips: string[] = t("cards.pinSet.infoCard.list", {
    returnObjects: true,
  });

  const handleSubmit = () => {
    if (pin && pinConfirm && pin.trim() === pinConfirm.trim()) {
      history.push({
        pathname: nextPage,
      });
    } else {
      setPinError(t("cards.pinSet.pinsNotMatchError"));
    }
  };
  return (
    <JourneySidebar steps={steps} currentStep={currentStep}>
      <SectionSplitter
        top={
          <Box display="flex" justifyContent="space-between">
            <Grid item md={4}>
              <Box mb={5}>
                <UnderlineText>
                  <H2>{t("cards.pinSet.title")}</H2>
                </UnderlineText>
              </Box>
              <Box mb={5}>
                <Body1>{t("cards.pinSet.subTitle")}</Body1>
              </Box>

              <Box display="flex" flexDirection="column">
                <PinInput
                  autoFocus={true}
                  label={"Enter your new PIN"}
                  value={pin}
                  onPinChange={(value) => {
                    setPinError("");
                    setPin(value);
                  }}
                  error={!!pinError}
                />
                <PinInput
                  label={"Re-enter your pin"}
                  value={pinConfirm}
                  onPinChange={(value) => {
                    setPinError("");
                    setPinConfirm(value);
                  }}
                  error={!!pinError}
                />
                {pinError && <Caption color="error">{pinError}</Caption>}
              </Box>
            </Grid>
            <Box style={{ maxWidth: "300px" }}>
              <InfoCard
                fullWidth
                content={
                  <>
                    <SuccessFailureIcon type="success" />
                    <H5 gutterBottom>{t("cards.pinSet.infoCard.title")}</H5>
                    <Caption gutterBottom>
                      {t("cards.pinSet.infoCard.content")}
                    </Caption>
                    <List
                      className={classes.root}
                      dense={true}
                      disablePadding={true}
                    >
                      {tips.map((tip: string) => (
                        <ListItem
                          key={tip}
                          disableGutters={true}
                          alignItems="flex-start"
                        >
                          <ListItemIcon className={classes.listItemIcon}>
                            <CheckCircle />
                          </ListItemIcon>
                          <ListItemText primary={<Caption>{tip}</Caption>} />
                        </ListItem>
                      ))}
                    </List>
                  </>
                }
                color={"primary"}
              />
            </Box>
          </Box>
        }
        bottom={
          <Box display="flex" justifyContent="space-between">
            {error ? (
              <Banner
                left={error}
                severity="error"
                style={{}}
                // style={{
                //   height: "48px",
                //   width: "100%",
                //   maxWidth: "408px",
                //   backgroundColor: "#ffeaea",
                //   color: "#b00020",
                // }}
                onClose={() => setError("")}
              />
            ) : (
              <BackButton
                label={t("cards.pinSet.backBtnText")}
                onClickBack={() => {}}
              />
            )}

            <Button
              variant="contained"
              size="large"
              color="primary"
              disabled={!pin || !pinConfirm}
              onClick={handleSubmit}
            >
              {t("cards.pinSet.mainBtnText")}
            </Button>
          </Box>
        }
      />
    </JourneySidebar>
  );
};

export default PinSet;
