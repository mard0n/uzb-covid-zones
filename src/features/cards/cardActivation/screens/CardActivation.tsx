import React, { useState, useContext, useEffect } from "react";
import {
  Body1,
  UnderlineText,
  Box,
  Button,
  Grid,
  SectionSplitter,
  Banner,
  BackButton,
  H2,
} from "@mashreq-digital/ui";
import { DispatchContext } from "../../store/context";
import { useHistory } from "react-router-dom";
import JourneySidebar from "../../../../components/JourneySidebar";
import { PIN_SET } from "../../routes/config";
import { useTranslation } from "react-i18next";
import CardImages from "../components/CardImages";
import ExpiryDateInput from "../components/ExpiryDateInput";
import { useFetch } from "../../../kyc/store/hooks/useFetch";
import * as Endpoint from "../../../../network/Endpoints";
import Loader from "../../../../common/loader";

export interface CardActivationProps {}

const CardActivation: React.SFC<CardActivationProps> = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useContext(DispatchContext);
  const [error, setError] = useState("");

  const [expDate, setExpDate] = useState("MM/YY");
  const [expDateError, setExpDateError] = useState("");

  const { execute, response, loading, error: apiError } = useFetch(
    Endpoint.CARDS_EXPIRY_DATE_VALIDATION +
      "6E0338B67E63B017CE9748782BCEC0AC451F346DDB75A6615D1E0EFD6B34CCA8",
    {
      method: "GET",
    }
  );

  useEffect(() => {
    console.log("apiError", apiError);
    if (!loading && response) {
      console.log("response", response);
      if (response.status === "error") {
        setError("Error message");
      } else {
        let { expiryDate } = response?.data || {};
        let [mm, yy] = (expDate.split("/") as [any, any]);


        let [validYY, validMM] = expiryDate.split('-')
        validYY = parseInt(validYY.toString().substr(-2));
        validMM = parseInt(validMM);
        mm = parseInt(mm);
        yy = parseInt(yy);

        console.log('validMM', validMM);
        console.log('validYY', validYY);
        
        if (validMM === mm && validYY === yy) {

          setError("");
          history.push({
            pathname: PIN_SET,
          });
        } else {
          setError("Card expiry date wrong");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, loading, dispatch, apiError]);

  const handleSubmit = () => {
    const strDate = new Date();
    const shortYear = strDate.getFullYear();
    const currentYear = shortYear.toString().substr(-2);
    const expDateYear = expDate.toString().substr(-2);
    const maxDateYear = (parseInt(currentYear) + 15).toString();
    if (expDateYear >= currentYear && expDateYear <= maxDateYear) {
      execute();
    } else {
      setExpDateError("Please enter valid expiry date");
    }
  };
  return (
    <JourneySidebar steps={"cards.cardActivation.steps"} currentStep={0}>
      <SectionSplitter
        top={
          <Box display="flex" justifyContent="space-between">
            <Grid item md={4}>
              <Box mb={4}>
                <UnderlineText>
                  <H2>{t("cards.cardActivation.init.title")}</H2>
                </UnderlineText>
              </Box>
              <Box mb={2}>
                <Body1>{t("cards.cardActivation.init.subTitle")}</Body1>
              </Box>
              <Box mb={4}>
                <CardImages cardType={{}} />
              </Box>
              <ExpiryDateInput
                expDate={expDate}
                expDateError={expDateError}
                handleExpDateChange={(date: any) => {
                  setExpDateError("");
                  setError("");
                  console.log("date", new Date(date));
                  setExpDate(date);
                }}
              />
            </Grid>
          </Box>
        }
        bottom={
          <Box display="flex" justifyContent="space-between">
            {error ? (
              <Banner
                left={error}
                severity="error"
                style={{}}
                onClose={() => setError("")}
              />
            ) : (
              <BackButton
                label={t("cards.cardActivation.init.backBtnText")}
                onClickBack={() => {}}
              />
            )}

            <Button
              variant="contained"
              size="large"
              color="primary"
              disabled={expDate.length !== 5}
              onClick={handleSubmit}
            >
              {t("cards.cardActivation.init.mainBtnText")}
            </Button>
          </Box>
        }
      />
      {loading && <Loader enable={true} />}
    </JourneySidebar>
  );
};

export default CardActivation;
