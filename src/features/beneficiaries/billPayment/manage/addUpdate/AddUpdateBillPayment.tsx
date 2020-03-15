import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  IconButton,
  Caption,
  SectionSplitter,
  UnderlineText,
  H2,
  Grid,
  SvgIcon
} from "@mashreq-digital/ui";
import { InfoCircle } from "@mashreq-digital/webassets";
import InputWrapper from "../../../../../common/inputWrapper";
import { FormFields } from "../formData";
import PromptTemplate from "../../../../../common/promptTemplate";
import { useTranslation } from "react-i18next";
import { replaceStr, capitalizeFirstLetter } from "../../../../../util/helper";
// import ImageWithText from "../../../../../common/imageWithText";
// console.log("initFieldProps -> formFields", FormFields)

type AddUpdateBillPaymentProps = {
  type: string | any;
  onSubmitCallback: any;
};

const AddUpdateBillPayment = (props: AddUpdateBillPaymentProps) => {
  const { type, onSubmitCallback } = props;
  const { t } = useTranslation();
  const getType: keyof typeof FormFields = type;
  const [billType, setBillType] = useState(FormFields[getType]["type"]);
  const [fields, setFields] = useState({});
  const [formData, setFormData] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [isUtility, setIsUtility] = useState(false);
  const [infoPopup, setInfoPopup] = useState(false);
  const utilities = ["addc", "addc", "dewa", "sewa", "fewa"];
  const infoTitle = replaceStr(t("beneficiary.manage.info.title"),'--type--', capitalizeFirstLetter(type));

  const initFieldProps = () => {
    const formFields: any = FormFields[getType]["fields"];
    let checkUtility = utilities.indexOf(type.toLowerCase()) > -1;
    if (checkUtility) {
      //add info to accountNumber
      for (const field in formFields) {
        if (field === "accountNumber") {
          formFields[field]["config"]["InputProps"] = {
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={()=>handleShowInfo()}
              >
                <SvgIcon component={InfoCircle} />
              </IconButton>
            )
          };
        }
      }
      // console.log("initFieldProps -> formFields", formFields)
      return formFields;
    }
    return formFields;
  };

  const handleShowInfo = () => { setInfoPopup(true)};

  useEffect(() => {
    setFields(initFieldProps());
  }, [initFieldProps]);

  useEffect(() => {
    let checkUtility = utilities.indexOf(type.toLowerCase()) > -1;
    setIsUtility(checkUtility);
  }, [type, utilities]);

  const onBlurFields = (resData: any) => {
    console.log(resData, "resData =====")
    setFormData(resData);
    setDisabled(!resData.valid);
  };

  const onClickSubmit = () => {
    if (onSubmitCallback && typeof onSubmitCallback === "function") {
      onSubmitCallback();
    }
  };

  return (
    <form>
      {isUtility && 
      <PromptTemplate
        title={infoTitle}
        desc={infoTitle + " " +t("beneficiary.manage.info.desc")}
        modalProps={{
          open: infoPopup,
          children: <></>,
          onClose: () => {
            setInfoPopup(false);
          }
        }}
        content={
          <Box mb={2}>
          <img src="" alt="Image" height="200" style={{maxWidth: "100%"}}/>
          </Box>
        }
        buttonLabel={t("common.action.done")}
        buttonProps={{
          variant: "outlined",
          disabled: false,
          onClick: () => {
            setInfoPopup(false);
          }
        }}
      />
    }
      <SectionSplitter
        height="calc(100vh - 250px)"
        top={
          <Box>
            <Grid container>
              <Grid item xs={8}>
                <UnderlineText color="primary">
                  <H2>{t("beneficiary.manage.addEdit.title")}</H2>
                </UnderlineText>

                <Box mt={6} mb={6}>
                  <Caption>{t("beneficiary.manage.addEdit.desc")}</Caption>
                </Box>

                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <InputWrapper type={type} initialState={fields} onBlur={onBlurFields} />
                </Grid>
              </Grid>
              {type && type === "salik" &&
              <Grid item xs={3}>
                Right Content
              </Grid>
              }
            </Grid>
          </Box>
        }
        bottom={
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              disabled={disabled}
              onClick={() => onClickSubmit()}
              size="medium"
            >
              Submit
            </Button>
          </Box>
        }
      />
    </form>
  );
};

AddUpdateBillPayment.defaultProps = {
  type: "sewa"
};

export default AddUpdateBillPayment;
