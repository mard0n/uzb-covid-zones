import React, { useState, useEffect, useContext } from "react";
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
import { SuccessTick, CheckCircle } from "@mashreq-digital/webassets";
import { useFetch } from "../../../kyc/store/hooks/useFetch";
import * as Endpoint from "../../../../network/Endpoints";
import { DispatchContext } from "../../store/context";
import { useHistory } from "react-router-dom";
import JourneySidebar from "../../../../components/JourneySidebar";
import { ADD_MASKED_MOBILE } from "../../store/types";
import { PIN_RESET_AUTH } from "../../routes/config";
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

export interface PinResetInitProps {}

const PinResetInit: React.SFC<PinResetInitProps> = () => {
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useContext(DispatchContext);
  const [pin, setPin] = useState<any>("");
  const [pinConfirm, setPinConfirm] = useState<any>("");
  const [pinError, setPinError] = useState("");
  const [error, setError] = useState("");

  const tips: string[] = t("cards.pinReset.init.infoCard.list", {
    returnObjects: true,
  });

  const { execute, response, loading, error: apiError } = useFetch(
    Endpoint.CARDS_PIN_RESET_INIT,
    {
      method: "POST",
      data: {
        encryptedPinNo: pin,
        cardNumber: "123",
      },
    }
  );

  useEffect(() => {
    console.log("apiError", apiError);

    if (!loading && response) {
      console.log("response", response);
      if (response.errorCode) {
        setError("Error message");
      } else {
        dispatch({ type: ADD_MASKED_MOBILE, payload: response.data });
        history.push({
          pathname: PIN_RESET_AUTH,
        });
        setError("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, loading, dispatch, apiError]);

  const handleSubmit = () => {
    if (pin && pinConfirm && pin.trim() === pinConfirm.trim()) {
      execute();
    } else {
      setPinError(t("cards.pinReset.init.pinsNotMatchError"));
    }
  };
  return (
    <JourneySidebar steps={"cards.pinReset.steps"} currentStep={0}>
      <SectionSplitter
        top={
          <Box display="flex" justifyContent="space-between">
            <Grid item md={4}>
              <Box mb={5}>
                <UnderlineText>
                  <H2>{t("cards.pinReset.init.title")}</H2>
                </UnderlineText>
              </Box>
              <Box mb={5}>
                <Body1>{t("cards.pinReset.init.subTitle")}</Body1>
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
                    <H5 gutterBottom>
                      {t("cards.pinReset.init.infoCard.title")}
                    </H5>
                    <Caption gutterBottom>
                      {t("cards.pinReset.init.infoCard.content")}
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
                label={t("cards.pinReset.init.backBtnText")}
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
              {t("cards.pinReset.init.mainBtnText")}
            </Button>
          </Box>
        }
      />
    </JourneySidebar>
  );
};

export default PinResetInit;
