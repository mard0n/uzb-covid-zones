import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  UnderlineText,
  H2,
  Button,
  makeStyles,
  SectionSplitter,
  CircularProgress,
  SvgIcon,
} from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import CardPayList from "../../../../common/cardPayList/index";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../redux/actions/moneyTransfer/payListActions";
import CardDash from "../../../../common/cardDash/index";
import PayFromList from "../../../../components/billpayment/review/PayFromList";
import * as ActionBeni from "../../../../redux/actions/moneyTransfer/fetchBeni";
import CardPayNow from "../../../../common/card/CardPayNow";
import getBeneficiariesAvatar from "../../../../util/getBeneficiariesAvatar";
import { withinMashreq } from "../../../../util/constants";
import EmtyList from "../../../../common/payList/emtyList";
import { Plus } from "@mashreq-digital/webassets";
import { useHistory } from "react-router-dom";
import { MONEY_TRANSFER_JOURNEY_WITHIN_AMOUNT } from "../../../../router/config";
import ImageWithText from '../../../../common/imageWithText/index';
import { DispatchContext, StateContext } from "../../../../redux/context";
import * as TransferActions from "../../../../redux/actions/moneyTransfer/transferAction";

const useStyles = makeStyles((theme: any) => ({
  NoBeniStyle: {
    background: "rgb(255, 94, 0)",
    borderRadius: "50%",
    padding: `${theme.spacing(1.3)}px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const StartPayments = (props:any) => {
  const [transferButton, setTransferButton] = useState(false);
  const {serviceType,setStep,resumeFileds} = props;
  const { NoBeniStyle } = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const transferDispatch = useContext(DispatchContext);
  const transferState = useContext(StateContext);
  let { transfer } = transferState;

  // let transfer = useSelector(
  //   (state: any) => state.moneyTransfer.other.transfer
  // );

  const payCardListData = Object.assign(
    useSelector((state: any) => state.moneyTransfer.other.payListData)
  );

  let benificiary = useSelector(
    (state: any) => state.moneyTransfer.mtBeni.beneficiaries
  );

  const { t } = useTranslation();

  const onSubmitPayment = () => {
    history.replace({
      pathname: MONEY_TRANSFER_JOURNEY_WITHIN_AMOUNT,
      state: {serviceType:serviceType,
      resumeFileds:transfer
      }
    });
    setStep(1);
  };
  const onChangeFromAcount = (item: any) => {
    transfer = { ...transfer, fromAccount: item };
    transferDispatch(TransferActions.setTransferObject(transfer));
    if (payCardListData) {
      payCardListData.source["suggestedAccount"] = item;
    }

    if (
      transfer.hasOwnProperty("fromAccount") &&
      transfer.hasOwnProperty("toAccount")
    ) {
      if (
        !(transfer.fromAccount.availableBalance <= 0) &&
        transfer.fromAccount.accountNumber !== transfer.toAccount.accountNumber
      ) {
        setTransferButton(true);
      } else {
        setTransferButton(false);
      }
    }
  };

  const onChangeToAcount = (item: any) => {
    transfer = { ...transfer, toAccount: item };
    if (payCardListData) {
      payCardListData.destination = {
        ...payCardListData.destination,
        suggestedAccount: item,
      };
    }

    transferDispatch(TransferActions.setTransferObject(transfer));
    if (
      transfer.hasOwnProperty("fromAccount") &&
      transfer.hasOwnProperty("toAccount")
    ) {
      if (
        !(transfer.fromAccount.availableBalance <= 0) &&
        transfer.fromAccount.accountNumber !== transfer.toAccount.accountNumber
      ) {
        setTransferButton(true);
      } else {
        setTransferButton(false);
      }
    }
  };

  useEffect(() => {
    dispatch(Actions.fetchPayListRequest({ type: withinMashreq }));
    dispatch(ActionBeni.fetchMoneyTransferBeneficiariesRequest());

    // console.log("StartPayments -> resumeFileds", resumeFileds);
    // if(!resumeFileds){
    //   transfer = resumeFileds;
    // }

    /* Patch - Don't remove the below comment otherwiser useeffect will expect a dependency. 
    We should add onChangeList as dependency then source api will get triggered infinitely */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SectionSplitter
      height={"calc(100vh - 400px)"}
      top={
        <>
        <Box mb={6}>
        <ImageWithText
          description={serviceType.name}
          name={serviceType.code}
          iconType={false}
          logo={true}
          avtHight="40px"
          avtWidth="40px"
        />
      </Box>

          <UnderlineText color="primary">
            <H2>{t("moneytransfer.startYourPayment.title")}</H2>
          </UnderlineText>

          {Object.keys(payCardListData).length !== 0 ? (
            <CardDash
              leftContent={
                payCardListData.hasOwnProperty("source") &&
                payCardListData.source.accounts.length > 0 ? (
                  <PayFromList
                  heading={t("moneytransfer.startYourPayment.payfrom")}
                  payListData={payCardListData.source}
                    onChangeList={onChangeFromAcount}
                  />
                ) : (
                  <EmtyList heading={t("moneytransfer.noAccount")} />
                )
              }
              rightContent={
                benificiary && !benificiary.loading ? (
                  benificiary && benificiary.length > 0 ? (
                    <PayFromList
                      selectOptions={true}
                      heading={t("moneytransfer.startYourPayment.to")}
                      payListData={{ benificiary: benificiary }}
                      onChangeList={onChangeToAcount}
                    />
                  ) : (
                    <CardPayNow
                      fullWidth
                      icon={
                        <Box component="span" className={NoBeniStyle}>
                          <SvgIcon htmlColor="#fff" component={Plus} />
                        </Box>
                      }
                      style={{ justifyContent: "space-around" }}
                      arrow={true}
                      heading="No beneficiaries detected"
                      subheading="You can add one right now"
                    />
                  )
                ) : (
                  <Box display="flex" mt={12} alignItems="baseline">
                    <CircularProgress />
                  </Box>
                )
              }
            />
          ) : (
            <Box display="flex" mt={12} alignItems="baseline">
              <CircularProgress />
            </Box>
          )}
        </>
      }
      bottom={
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            disabled={!transferButton}
            onClick={onSubmitPayment}
            size="large"
          >
            Set Transfer Amount
          </Button>
        </Box>
      }
    />
  );
};

export default StartPayments;
