import React from "react";
import {
  Box,
  SectionSplitter,
  SuccessFailureIcon,
  UnderlineText,
  H2,
  Button,
  CardListItem,
  Body2,
  Grid,
  makeStyles,
  Avatar,
  Theme,
  colors,
} from "@mashreq-digital/ui";
import { useHistory } from "react-router-dom";
import { DispatchContext, StateContext } from "./store/context";
import { useTranslation } from "react-i18next";
import { getLetterFromStr } from "../../../../../util/helper";
import { CLEAR_STATE } from "./store/types";
import Timer from "../../../../../common/timer";  
import * as RoutePath from "../../../../../router/config";
import JourneySidebar from "../../../../../components/JourneySidebar";

const useStyles = makeStyles((theme: Theme) => ({
  cardWrapper: {
    "& .MuiCardContent-root": {
      "& > .MuiBox-root": {
        alignItems: "center",
      },
    },
  },
  avatarStyle: {
    color: theme.palette.getContrastText(colors.deepOrange[500]),
    backgroundColor: "rgb(255, 144, 62)",
    marginRight: theme.spacing(2),
  },
}));

const Success = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { cardWrapper, avatarStyle } = useStyles();
  const steps = "beneficiary.moneyTransfer.manage.local.steps";
  const { localAccount } = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const { beneficiaryDetails } = localAccount;
  const { accountNumber, fullName, activeAfter, nickname } = beneficiaryDetails;
  
  // let accountNumber = "123123321",
  //   fullName = "te sdfsdf",
  //   nickname = "32 asdfasfasdf";
  //   accountNumber: "AE120260001015673975601"
  // bankName: "EMIRATES NBD PJSC"
  // fullName: "asdfasdf"
  // id: 20
  // nickname: "ewsdf"
  // serviceTypeCode: "local"
  // status: "DRAFT"
  // swiftCode: "EBILAEADXXX"

  const onClickButton = () => {
    dispatch({type: CLEAR_STATE});
    history.replace({
      pathname:
        RoutePath.DASHBOARD,
    });
  };

  const onClickViewAll = () => {
    history.replace({
      pathname:
        RoutePath.BENIFICIARY_BILL_PAYMENT_LANDING,
    });
  };

  if(accountNumber) {
  return (
    <JourneySidebar steps={steps} currentStep={4}>
      <SectionSplitter
        top={
          <Box>
            <Box mb={4}>
              <SuccessFailureIcon type="success" />
            </Box>
            <Box mb={4}>
              <UnderlineText color="primary">
                <H2>
                  {t(
                    `beneficiary.moneyTransfer.manage.local.confirmation.success.title`
                  )}
                </H2>
              </UnderlineText>
            </Box>
            <Box mb={10}>
              <Body2>
                {t(
                  `beneficiary.moneyTransfer.manage.local.confirmation.success.desc`
                )}
              </Body2>
            </Box>
            <Grid container>
              <Grid item xs={5}>
                <Box className={cardWrapper}>
                  <CardListItem
                    customIcon={
                      <Avatar className={avatarStyle}>
                        {getLetterFromStr(nickname)}
                      </Avatar>
                    }
                    heading={nickname}
                    subheading={
                      <Box>
                        <Body2>{`IBAN | ${accountNumber}`}</Body2>
                        <Body2>
                          <b>
                            <Timer activeAfter={activeAfter}/>
                            {/* {t(
                              "beneficiary.moneyTransfer.manage.local.confirmation.success.activation"
                            )} */}
                          </b>
                        </Body2>
                      </Box>
                    }
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        }
        bottom={
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              color="primary"
              onClick={onClickViewAll}
              size="large"
            >
              {t(
                "beneficiary.moneyTransfer.manage.local.confirmation.success.viewAllButton"
              )}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={onClickButton}
              size="large"
            >
              {t("common.action.done")}
            </Button>
          </Box>
        }
      />
    </JourneySidebar>
  );
  }
  return false;
};

export default Success;
