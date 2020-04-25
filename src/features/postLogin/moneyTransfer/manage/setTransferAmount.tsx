import React, { useState } from "react";
import {
  UnderlineText,
  H2,
  SectionSplitter,
  Button,
  Box,
  SubMain,
  H5,
  Caption,
  InfoCard,
  H4,
} from "@mashreq-digital/ui";
import BackButton from "../../../../common/backButton";
import InputWrapper from "../../../../common/inputWrapper/index";
import { FormFields } from "./formData/index";
import { Rocket } from "@mashreq-digital/webassets";
import SuggestionBox from "../../../../common/suggetionBox/index";

const SetTransferAmount = (props: any) => {
  const { onHandleBack, serviceType } = props;
  const [recieveAmount, setRecieveAmount] = useState();
  const [transferAmount, setTransferAmount] = useState();

  const onChangeOfReciveAmount = (obj: any) => {
    setRecieveAmount(obj.customAmount.config.value);
  };
  const onChangeOfTransferAmount = (obj: any) => {
    setTransferAmount(obj.customAmount.config.value);
  };

  return (
    <SectionSplitter
      height={"calc(100vh - 400px)"}
      top={
        <>
          <UnderlineText color="primary">
            <H2>What amount would you like to transfer?</H2>
          </UnderlineText>

          <SubMain
            content={
              <>
                <Box mt={10}>
                  <H5>The Recieving account will get</H5>
                  <InputWrapper
                    initialState={FormFields.recievingAmount.fields}
                    // onBlur={onBlurFields}
                    onChangeFields={onChangeOfReciveAmount}
                  />
                  {recieveAmount && (
                    <SuggestionBox
                      activeStep={recieveAmount}
                      currecy={"USD"}
                      maxPrice={Math.floor(serviceType.maxAmount)}
                    />
                  )}
                </Box>

                <Box mt={10}>
                  <H5>You will be debited</H5>
                  <InputWrapper
                    initialState={FormFields.transferAmount.fields}
                    // onBlur={onBlurFields}
                    onChangeFields={onChangeOfTransferAmount}
                  />
                  {transferAmount && (
                    <SuggestionBox
                      activeStep={transferAmount}
                      currecy={"AED"}
                      maxPrice={Math.floor(serviceType.maxAmount)}
                    />
                  )}
                  <Caption>
                    At an exchange rate of <b>{"3.66"}</b>
                  </Caption>
                </Box>
              </>
            }
            image={
              <Box width={"300px"}>
                <InfoCard
                  icon={Rocket}
                  fullWidth={true}
                  title="Exchange Rate"
                  content={
                    <>
                      <Caption>
                        Your exchange rate is calculated on the following values
                      </Caption>
                      <Box mt={4}>
                        <H4>AED 1.00 = USD 0.27</H4>
                        <Caption>(AED 367,270.00 = USD 100,000.00)</Caption>
                      </Box>
                    </>
                  }
                />
              </Box>
            }
          />
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
            color="primary"
            disabled={true}
            onClick={() => {}}
            size="large"
          >
            Pick a Time
          </Button>
        </Box>
      }
    />
  );
};
export default SetTransferAmount;
