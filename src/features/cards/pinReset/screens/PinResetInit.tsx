import React, { useState } from "react";
import {
  H1,
  Body1,
  UnderlineText,
  Box,
  Button,
  Grid,
  SectionSplitter,
  InfoCard,
  makeStyles,
  Caption,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mashreq-digital/ui";
import BackButton from "../../../../common/backButton";
import { globalStyle } from "../../../../util/constants";
import { SuccessTick } from "@mashreq-digital/webassets";
const { postLogin, sidebarWidth, defaultGutter } = globalStyle;

const useStyles = makeStyles((theme: any) => ({
  mainLayout: {
    width: `calc( 100vw - ${sidebarWidth}px)`,
    height: "100%",
    overflow: "auto",
    padding: `${theme.spacing(10.6)}px ${defaultGutter}px ${theme.spacing(
      10.6
    )}px ${theme.spacing(8)}px`,
  },
}));

export interface PinResetInitProps {}

const PinResetInit: React.SFC<PinResetInitProps> = () => {
  const [pin, setPin] = useState<any>();
  const [pinConfirm, setPinConfirm] = useState<any>();
  const { mainLayout } = useStyles();
  const tips = [
    "Keep your PIN unique for each of your cards.",
    "Do not use sequential or repetitive numbers like 1234 or 1111.",
    "Avoid easily accessible information like phone no. and date of birth.",
    "Use as many different digits as possible and keep it unique to you.",
  ];
  const isPinsMatch = () => {
    return pin && pinConfirm && pin.trim() === pinConfirm.trim();
  };
  return (
    <Box className={mainLayout}>
      <SectionSplitter
        top={
          <Box display="flex" justifyContent="space-between">
            <Grid md={4}>
              <UnderlineText>
                <H1>Enter your PIN</H1>
              </UnderlineText>

              <Body1>
                To reset your credit card PIN, please enter the new PIN you wish
                touse.
              </Body1>

              <Box display="flex" flexDirection="column" mt={3}>
                <label htmlFor="enter-pin">Enter your new PIN</label>
                <input
                  name="enter-pin"
                  type="number"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                />
                <label htmlFor="reenter-pin">Re-enter your PIN</label>
                <input
                  name="reenter-pin"
                  type="number"
                  value={pinConfirm}
                  onChange={(e) => setPinConfirm(e.target.value)}
                />
              </Box>
            </Grid>
            <InfoCard
              icon={SuccessTick}
              title={"How to set a secure PIN?"}
              content={
                <>
                  <Caption gutterBottom>
                    A secure PIN is unique and not easy to guess. Here are some
                    tips to guide you:{" "}
                  </Caption>
                  {tips.map((tip: string) => (
                    <List dense={true} disablePadding={true}>
                      <ListItem disableGutters={true}>
                        <ListItemIcon>()</ListItemIcon>
                        <ListItemText
                          primary={<Caption>Single-line item</Caption>}
                        />
                      </ListItem>
                    </List>
                  ))}
                </>
              }
              actions={<div>asdasd</div>}
              color={"primary"}
            ></InfoCard>
          </Box>
        }
        bottom={
          <Box display="flex" justifyContent="space-between">
            <BackButton disableRoute onClickBack={() => {}} />

            <Button
              variant="contained"
              size="large"
              color="primary"
              disabled={!isPinsMatch()}
              onClick={() => {}}
            >
              Reset PIN
            </Button>
          </Box>
        }
      />
    </Box>
  );
};

export default PinResetInit;
