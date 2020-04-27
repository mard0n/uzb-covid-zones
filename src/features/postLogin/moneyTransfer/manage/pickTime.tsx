import React from "react";
import {
  Box,
  Button,
  Grid,
  RadioWithLabel,
  IconText,
  SectionSplitter,
  makeStyles,
  UnderlineText,
  H2,
  Paper,
} from "@mashreq-digital/ui";
import { useState } from "react";
import BackButton from "../../../../common/backButton";



const useStyles = makeStyles((theme: any) => ({
    radioBox: {
    borderRadius: "6px",
    padding:"24px",
    boxShadow: "0px 8px 12px 0px rgba(0, 0, 0, 0.06)",
    height: "170px"
    },
  }));
const PickTime = (props: any) => {
  const { onNextStep, onHandleBack } = props;
  const {radioBox} =  useStyles();

  const timeRadio: any = [
    { id: 1, heading: "Now", subHeading: "" },
    {
      id: 2,
      heading: "Later",
      subHeading:
        "Pick any day within the next 30 days, the prevalent exchange rate will be applied on your chosen day.",
    },
  ];

  const [selectedTime, setSelectedTime] = useState<any>({});

  return (
    <SectionSplitter
      height={"calc(100vh - 400px)"}
      top={
        <>
          <UnderlineText color="primary">
            <H2>What time do you want to make this transfer</H2>
          </UnderlineText>

          <Box mb={3} mt={10}>
            <Grid container>
              {timeRadio.map((pickTime: any, i: number) => {
                let { heading, subHeading } = pickTime;
                return (
                  <Grid xs={6} sm={3} lg={4} xl={4}>
                    <Box component={Paper} className={radioBox}  ml={3}>
                        <RadioWithLabel
                          radioFixTop={true}
                          checked={
                            selectedTime && selectedTime.id
                              ? pickTime.id === selectedTime.id
                              : false
                          }
                          onChange={() => {
                            setSelectedTime(pickTime);
                          }}
                          border={false}
                          label={
                            <IconText
                              primaryText={heading}
                              secondaryText={subHeading}
                            />
                          }
                        />
                        </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
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
            disabled={false}
            onClick={onNextStep}
            size="large"
          >
            Submit
          </Button>
        </Box>
      }
    />
  );
};

export default PickTime;
