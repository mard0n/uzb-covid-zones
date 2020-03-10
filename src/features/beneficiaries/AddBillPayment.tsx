import React from "react";
import {
  Caption,
  Button,
  SectionSplitter,
  UnderlineText,
  Box,
  H2,
  Grid,
  TextField,
  FormGroup,
  makeStyles,
  FormControl
} from "@mashreq-digital/ui";
import { BubbleQuestion } from "@mashreq-digital/webassets";

const useStyles = makeStyles((theme: any) => ({
  formGroup: {
    width: theme.spacing(52.5)
  },
  inputBox: {
    marginTop: theme.spacing(4.3)
  },
  buttonStyle: {
    width: theme.spacing(30)
  }
}));

const AddBillPayment = (props: any) => {
  const classes = useStyles();
  const { formGroup, inputBox, buttonStyle } = classes;

  return (
    <SectionSplitter
      height="calc(100vh - 146px)"
      borderTop
      top={
        <Box>
          <UnderlineText color="primary">
            <H2>Let’s get started with your beneficiary details</H2>
          </UnderlineText>

          <Box mt={6} mb={6}>
            <Caption> Please enter your details </Caption>
          </Box>

          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
            <FormGroup className={formGroup}>
              <FormControl className={inputBox}>
                <TextField id="username" autoComplete="off" />
              </FormControl>

              <FormControl className={inputBox}>
                <TextField id="username" autoComplete="off" />
              </FormControl>
              <FormControl className={inputBox}>
                <TextField id="username" autoComplete="off" />
              </FormControl>
            </FormGroup>
          </Grid>
        </Box>
      }
      bottom={
        <Box display="flex" justifyContent="space-between">
          <Button
            className={buttonStyle}
            color="primary"
            size="medium"
            variant="outlined"
          >
            Cancel
          </Button>

          <Button className={buttonStyle} variant="contained" size="medium">
            Next
          </Button>
        </Box>
      }
    />
  );
};

export default AddBillPayment;
