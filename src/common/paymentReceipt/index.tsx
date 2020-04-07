import React from "react";
import {
  Modals,
  H5,
  Box,
  makeStyles,
  Theme,
  IconText,
  Grid,
  colors,
  Caption,
} from "@mashreq-digital/ui";
import { transitionModalProps } from "@mashreq-digital/ui/dist/types/components";
import TextWraper from "../textWraper/index";
import { Phone24 } from "@mashreq-digital/webassets";

const useStyles = makeStyles((theme: Theme) => ({
  root: (props: any) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiPaper-root": {
      width: props && props.minWidth ? "668px" : "60%",
      height: props && props.minHight ? "668px" : "60%",
    },
  }),
  svgIconStyle: {
    backgroundColor: colors?.orange[500],
    borderRadius: "50%",
    "& > svg": {
      height: "20px",
      width: "20px",
    },
  },
  headingStyle: {
    marginBottom: theme?.spacing(2),
  },
}));

interface PrompTemplateProps {
  title: string;
  paymentSummary: any;
  openModal: boolean;
  minWidth?: boolean;
  billRefNo?:any;
  onCloseModal?: any;
  modalProps: transitionModalProps;
}

const PaymentReceipt = (props: PrompTemplateProps) => {
  const { root, svgIconStyle, headingStyle } = useStyles(props);
  const { title, paymentSummary, openModal, onCloseModal, modalProps,billRefNo } = props;

  const onClose = () => {
    if (onCloseModal && typeof onCloseModal === "function") {
      onCloseModal();
    }
  };

  return (
    <Modals
      className={root}
      open={openModal}
      onClose={() => onClose()}
      {...modalProps}
    >
      <Grid container xs={12} sm={12} lg={12} xl={12}>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={6}>
            <H5 className={headingStyle} gutterBottom>
              {title}
            </H5>
          </Grid>
          <Grid item xs={6}>
            <TextWraper
              heading={"Reference Number"}
              subHeading={billRefNo}
            />
          </Grid>
        </Grid>



        <Box mt={3} mb={3}>
        <H5>Payment Summary</H5>
        </Box>
        <Grid container item xs={12} spacing={3}>
          {Object.keys(paymentSummary).map((key: any) => {
            return (
              <Grid item xs={4} key={key}>
                <TextWraper heading={key} subHeading={paymentSummary[key]} />
              </Grid>
            );
          })}
        </Grid>
        <Box mt={3} mb={3}>
        <H5>Contact Information</H5>
        </Box>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={6}>
            <IconText
              primaryText={"Mashreq customer care"}
              secondaryText={"24/7 support"}
              iconProps={{ color: "primary" }}
              icon={Phone24}
            />
          </Grid>
          <Grid item xs={6}>
            <IconText
              primaryText={"Etisalat"}
              secondaryText={"support"}
              icon={Phone24}
              iconProps={{ color: "primary" }}
            />
          </Grid>
        </Grid>

        <Caption>
          Bank Fees and Corresponding Bank Charges will be charged separately.
          The transaction has been executed based on your confirmation that you
          have understood and have abided by the Banks Funds Transfer Terms &
          Conditions (including the Banks Sanctions policy requirements). Please
          contact +9714 4244763 should you need any further clarification.
        </Caption>
      </Grid>
    </Modals>
  );
};

PaymentReceipt.defaultProps = {
  minWidth: true,
  modalProps: { children: <></> },
};

export default PaymentReceipt;
