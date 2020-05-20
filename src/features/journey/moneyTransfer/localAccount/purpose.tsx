import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  UnderlineText,
  H2,
  SectionSplitter,
  Button,
  makeStyles,
  H4,
  Modals,
  Caption,
  ListItem,
  Body2,
  Grid,
  InfoCard,
} from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import BackButton from "../../../../common/backButton/index";
import {
  MONEY_TRANSFER_JOURNEY_LOCAL_AMOUNT,
  MONEY_TRANSFER_JOURNEY_LOCAL_REVIEW,
} from "../../../../router/config";
import { useHistory } from "react-router-dom";
import Loader from "../../../../common/loader/index";
import ImageWithText from "../../../../common/imageWithText/index";
import SelectPopup from "../../../../common/selectPopup/index";
import SelectBox from "../../../../common/selectBox/index";
import { API } from "../../../../network/index";
import * as Endpoints from "../../../../network/Endpoints";
import { QuestionCircle } from "@mashreq-digital/webassets";
import { DispatchContext, StateContext } from "../../../../redux/context";
import * as TransferActions from "../../../../redux/actions/moneyTransfer/transferAction";

const useStyles = makeStyles(() => ({
  iconStyle: {
    backgroundColor: "rgb(224, 224, 224)",
    "& > svg": {
      height: "15px",
      width: "15px",
    },
  },
}));

const Purpose = (props: any) => {
  const { setStep } = props;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [purposeModel, setPurposeModel] = useState(false);
  const [chargeBearer, setChargeBearer] = useState("");
  console.log("Purpose -> chargeBearer naaz", chargeBearer)
  const [chargeBearerDesc, setChargeBearerDesc] = useState("");

  
  const [selectedPurpose, setSelectedPurpose]: any = useState({});
  console.log("Purpose -> selectedPurpose naaz", selectedPurpose)

  const [purposeList, setPurposeList] = useState([]);
  const { iconStyle } = useStyles();
  const history = useHistory();

  const transferDispatch = useContext(DispatchContext);
  const transferState = useContext(StateContext);
  let { transfer,serviceType } = transferState;


  const onSubmit = () => {
    transfer = {
      ...transfer,
      purpose:{
        chargeBearer:chargeBearer,
        chargeBearerDesc:chargeBearerDesc,
        selected:selectedPurpose
      }
    };
    transferDispatch(TransferActions.setTransferObject(transfer));
    history.replace({
      pathname: MONEY_TRANSFER_JOURNEY_LOCAL_REVIEW,
      state: { serviceType: serviceType },
    });
    setStep(3);
  };

  const onHandleBack = () => {
    history.replace({
      pathname: MONEY_TRANSFER_JOURNEY_LOCAL_AMOUNT,
      state: { serviceType: serviceType },
    });
    setStep(1);
  };

  useEffect(() => {
    const url = Endpoints.MONEY_TRANSFER_PURPOSE_OF_PAYMENT_ENDPOINT.replace(
      "transferType",
      "local"
    )
      .replace("customerTypeParam", "I")
      .replace("qrTypeParam", "");

    API.get(url).then((res: any) => {
      console.log("Purpose -> response agaya %%  vvv", res);

      setPurposeList(res.data.data);
    });

    /* Patch - Don't remove the below comment otherwiser useeffect will expect a dependency. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SectionSplitter
        height={"calc(100vh - 400px)"}
        top={
          <>
            <Box mb={6}>
              <ImageWithText
                description={serviceType.name}
                name={serviceType.code}
                iconType={true}
                logo={false}
                avtHight="40px"
                avtWidth="40px"
              />
            </Box>

            <UnderlineText color="primary">
              <H2>{t("moneytransfer.purpose.title")}</H2>
            </UnderlineText>
            <Box mt={4} mb={4}>
              <H4>{t("moneytransfer.purpose.payfor")}</H4>
            </Box>

            <SelectPopup
              title={t("moneytransfer.purpose.select")}
              content={selectedPurpose && selectedPurpose?.purposeDesc}
              onClick={() => {
                setPurposeModel(true);
              }}
            />

            <Box mt={8} mb={4}>
              <H4>{t("moneytransfer.purpose.whoPays")}</H4>
            </Box>
            <Grid container xs={12} sm={12} lg={12} xl={12} md={12}>
              <Grid item xs={8} sm={8} lg={8} xl={8} md={8}>
                <SelectBox
                  active={chargeBearer === "B"}
                  onClick={() => {
                    setChargeBearer("B");
                    setChargeBearerDesc("Only the receiver");
                  }}
                  title= {t("moneytransfer.purpose.oreciever")}
                  content={t("moneytransfer.purpose.receiverCharges")}
                />

                <SelectBox
                  active={chargeBearer === "U"}
                  onClick={() => {
                    setChargeBearer("U");
                    setChargeBearerDesc("Only the sender");
                  }}
                  title={t("moneytransfer.purpose.oSender")}
                  content={t("moneytransfer.purpose.toCharges")}
                />

                <SelectBox
                  active={chargeBearer === "O"}
                  onClick={() => {
                    setChargeBearer("O");
                    setChargeBearerDesc("Shared between sender & receiver");
                  }}
                  title={t("moneytransfer.purpose.shared")}
                  content= {t("moneytransfer.purpose.both")}
                />
              </Grid>

              <Grid item lg={4} xl={4} md={4} sm={4} xs={4}>
                <Box style={{ width: "300px" }}>
                  <InfoCard
                    icon={QuestionCircle}
                    title={t("moneytransfer.purpose.payment")}
                    fullWidth
                    content={
                      <Caption>
                      {t("moneytransfer.purpose.card")}
                      </Caption>
                    }
                  />
                </Box>
              </Grid>
            </Grid>

            {purposeModel && (
              <Modals
                heading={<H4>{t("moneytransfer.purpose.selectPurpose")}</H4>}
                open={purposeModel}
                onBackdropClick={(e) => {
                  console.log(e);
                }}
                onClose={() => {
                  setPurposeModel(!purposeModel);
                }}
              >
                <>
                  {purposeList &&
                    purposeList.map((eachPurpose: any) => {
                      return (
                        <>
                          <ListItem
                            component={Button}
                            onClick={() => {
                              setSelectedPurpose(eachPurpose);
                              setPurposeModel(!purposeModel);
                            }}
                            style={{ maxWidth: "392px" }}
                          >
                            <Box mb={2} mt={2}>
                              <Body2>{eachPurpose.purposeDesc}</Body2>
                            </Box>
                          </ListItem>
                          <hr />
                        </>
                      );
                    })}
                </>
              </Modals>
            )}
          </>
        }
        bottom={
          <Box display="flex" justifyContent="space-between">
            <BackButton
              disableRoute
              onClickBack={() => {
                onHandleBack();
              }}
            />

            <Button
              variant="contained"
              size="large"
              color="primary"
              disabled={!(selectedPurpose !== {} && chargeBearer !== "")}
              onClick={() => onSubmit()}
            >
            {t("moneytransfer.purpose.continue")}
            </Button>
          </Box>
        }
      />
      {loading && <Loader enable={true} />}
    </>
  );
};

export default Purpose;
// {currency} {rechargeAmount}
