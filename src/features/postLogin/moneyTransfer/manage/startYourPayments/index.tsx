import React, { useState, useEffect } from "react";
import {
  Box,
  UnderlineText,
  H2,
  Button,
  SectionSplitter,
  CircularProgress,
} from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import CardPayList from "../../../../../common/cardPayList/index";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../../redux/actions/moneyTransfer/payListActions";
import CardDash from "../../../../../common/cardDash/index";
import PayFromList from "../../../../../components/billpayment/review/PayFromList";
import * as ActionBeni from "../../../../../redux/actions/moneyTransfer/fetchBeni";
import CardPayNow from "../../../../../common/card/CardPayNow";
import getBeneficiariesAvatar from "../../../../../util/getBeneficiariesAvatar";
import { withinMashreq } from "../../../../../util/constants";

type StartPaymentsProps = {
  type: string | any;
  onHandleBack?: any;
  data?: any;
  onSubmitPayment?: any;
};

const StartPayments = (props: StartPaymentsProps) => {
  const { type, data, onHandleBack, onSubmitPayment } = props;
  const [transferButton, setTransferButton] = useState(false);
  const dispatch = useDispatch();
  const payCardListData = Object.assign(
    useSelector((state: any) => state.moneyTransfer.other.payListData)
  );

  let transfer = useSelector(
    (state: any) => state.moneyTransfer.other.transfer
  );

  let benificiary = useSelector(
    (state: any) => state.moneyTransfer.mtBeni.beneficiaries
  );

  const { t } = useTranslation();

  const onChangeFromAcount = (item: any) => {
    transfer = { ...transfer, fromAccount: item };
    dispatch(Actions.setTransferObject(transfer));
    if (type !== withinMashreq) {
      if (payCardListData) {
        payCardListData.source["suggestedAccount"] = item;
      }
    }

    if (
      transfer.hasOwnProperty("fromAccount") &&
      transfer.hasOwnProperty("toAccount")
    ) {
      if (!(transfer.fromAccount.availableBalance <= 0)) {
        setTransferButton(true);
      } else {
        setTransferButton(false);
      }
    }
  };

  const onChangeToAcount = (item: any) => {
    transfer = { ...transfer, toAccount: item };
    if (type !== withinMashreq) {
      if (payCardListData) {
        payCardListData.destination = {
          ...payCardListData.destination,
          "suggestedAccount":item
        }
      }
    }
    dispatch(Actions.setTransferObject(transfer));
    if (
      transfer.hasOwnProperty("fromAccount") &&
      transfer.hasOwnProperty("toAccount")
    ) {
      if (!(transfer.fromAccount.availableBalance <= 0)) {
        setTransferButton(true);
      } else {
        setTransferButton(false);
      }
    }
  };

  useEffect(() => {
    dispatch(Actions.fetchPayListRequest({ type: type }));
    if (type === withinMashreq) {
      dispatch(ActionBeni.fetchMoneyTransferBeneficiariesRequest());
    }

    /* Patch - Don't remove the below comment otherwiser useeffect will expect a dependency. 
    We should add onChangeList as dependency then source api will get triggered infinitely */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SectionSplitter
      height={"calc(100vh - 400px)"}
      top={
        <>
          <UnderlineText color="primary">
            <H2>Start your transfer</H2>
          </UnderlineText>

          {Object.keys(payCardListData).length !== 0 ? (
            <CardDash
              leftContent={
                <PayFromList
                  heading="I want to send money from"
                  payListData={payCardListData.source}
                  onChangeList={onChangeFromAcount}
                />
              }
              rightContent={
                <PayFromList
                  selectOptions={true}
                  heading="To this account"
                  payListData={
                    type === withinMashreq
                      ? { benificiary: benificiary }
                      : payCardListData.destination
                  }
                  onChangeList={onChangeToAcount}
                />
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
