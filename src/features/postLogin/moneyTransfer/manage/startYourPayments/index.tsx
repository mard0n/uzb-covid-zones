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
  const payCardListData = useSelector(
    (state: any) => state.moneyTransfer.other.payListData
  );
  let transfer = useSelector(
    (state: any) => state.moneyTransfer.other.transfer
  );
  const { t } = useTranslation();

  const onChangeFromAcount = (item: any) => {
    transfer = { ...transfer, fromAccount: item.accountNumber };
    dispatch(Actions.setTransferObject(transfer));
    if (
      transfer.hasOwnProperty("fromAccount") &&
      transfer.hasOwnProperty("toAccount")
    ) {
      setTransferButton(true);
    }
  };

  const onChangeToAcount = (item: any) => {
    transfer = { ...transfer, toAccount: item.accountNumber };
    dispatch(Actions.setTransferObject(transfer));
    if (
      transfer.hasOwnProperty("fromAccount") &&
      transfer.hasOwnProperty("toAccount")
    ) {
      setTransferButton(true);
    }
  };

  useEffect(() => {
    dispatch(Actions.fetchPayListRequest());
  }, [dispatch]);

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
                <CardPayList
                  type="smart"
                  heading="I want to send money from"
                  payListData={payCardListData.source}
                  onChangeList={onChangeFromAcount}
                />
              }
              rightContent={
                <CardPayList
                  heading="To this account"
                  payListData={payCardListData.destination}
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
