import React, { useState } from "react";
import { UnderlineText, H2, SectionSplitter, Button, Box } from "@mashreq-digital/ui";
import BackButton from "../../../../common/backButton";

const SetTransferAmount = (props: any) => {
    const {onHandleBack} = props;

  return (
    <SectionSplitter
    height={"calc(100vh - 400px)"}
    top={
      <>
      <UnderlineText color="primary">
        <H2>What amount would you like to transfer?</H2>
      </UnderlineText>

      </>
    }
    bottom={
      <Box display="flex" justifyContent="space-between">
            <BackButton disableRoute onClickBack={() => {
              onHandleBack()
            }}/>
      <Button
        variant="contained"
        color="primary"
        disabled={true}
        onClick={()=>{}}
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
