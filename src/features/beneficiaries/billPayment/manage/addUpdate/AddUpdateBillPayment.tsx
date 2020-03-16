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
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../../redux/actions/beneficiary/billPayment/manageBeneficiaryActions";
import FilledCheckBox from "../../../../../common/filledCheckbox";
// import ImageWithText from "../../../../../common/imageWithText";
// console.log("initFieldProps -> formFields", FormFields)

type AddUpdateBillPaymentProps = {
  type: string | any;
  onSubmitCallback: any;
};

const utilities = ["addc", "addc", "dewa", "sewa", "fewa"];
const duTypes = ['du-prepaid-mobile', 'du-postpaid-mobile', 'du-postpaid-landline'];
  
const AddUpdateBillPayment = (props: AddUpdateBillPaymentProps) => {
  const { type, onSubmitCallback } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const getType: keyof typeof FormFields = type;
  const addNew = useSelector(
    (state: any) => state?.beneficiary?.billPayment?.addNew
  );
  const formSchema: any = FormFields[getType];
  const telecomOptions = formSchema["options"] && formSchema["options"] ? formSchema["options"] : [];
  const [billType, setBillType] = useState(formSchema["type"]);
  const [fields, setFields] = useState<any>({});
  const [formData, setFormData] = useState({});
  const [telecomValue, setTelecomValue] = useState('Prepaid');
  const [disabled, setDisabled] = useState(true);
  const [isUtility, setIsUtility] = useState(false);
  const [infoPopup, setInfoPopup] = useState(false);
  
  const infoTitle = replaceStr(
    t("beneficiary.manage.info.title"),
    "--type--",
    capitalizeFirstLetter(type)
  );

  const handleShowInfo = () => {
    setInfoPopup(true);
  };

  useEffect(() => {
    const initFieldProps = () => {
      const formFields: any = FormFields[getType]["fields"];
      let checkUtility = utilities.indexOf(type.toLowerCase()) > -1;
      if (checkUtility) {
        setBillType(type.toUpperCase());
        for (const field in formFields) {
          formFields[field]["config"]["value"] = '';
          if (field === "accountNumber") {
            formFields[field]["config"]["InputProps"] = {
              endAdornment: (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleShowInfo()}
                >
                  <SvgIcon component={InfoCircle} />
                </IconButton>
              )
            };
          }
        }
        return formFields;
      } else {
        setBillType(capitalizeFirstLetter(type));
        for (const field in formFields) {
          formFields[field]["config"]["value"] = '';
        }
        return formFields;
      }
    };
    setFields(initFieldProps());
  }, [getType, type]);

  useEffect(() => {
    let checkUtility = utilities.indexOf(type.toLowerCase()) > -1;
    setIsUtility(checkUtility);
  }, [type]);

  useEffect(()=>{
    if (onSubmitCallback && typeof onSubmitCallback === "function" && addNew) {
      onSubmitCallback(addNew);
    }
  },[addNew, onSubmitCallback])

  const onBlurFields = (resData: any) => {
  console.log("onBlurFields -> resData", resData)
    
    setFormData(resData);
    setDisabled(!resData.valid);
  };

  const onClickFilledOptions = (selItem: any) => {
    setTelecomValue(selItem);
  };

  const onClickSubmit = () => {
    let data: any = {...formData}, serviceType=billType;
    delete data['valid'];
    // data["updateMode"] = false;
    if(type && telecomValue && telecomOptions && telecomOptions.length > 0) {
      serviceType=(type+"-"+telecomValue).toLowerCase();
      if(type.toLowerCase() === 'du') {
        serviceType = duTypes.find((item)=>item.indexOf(telecomValue.toLowerCase()) > -1);
      }
    }
    data["serviceTypeCode"] = serviceType;
    dispatch(Actions.addUpdateBeneficiaryRequest({updateMode:false, data}));
  };

  return (
    <form>
      {isUtility && (
        <PromptTemplate
          title={infoTitle}
          desc={infoTitle + " " + t("beneficiary.manage.info.desc")}
          modalProps={{
            open: infoPopup,
            children: <></>,
            onClose: () => {
              setInfoPopup(false);
            }
          }}
          content={
            <Box mb={2}>
              <img
                src={""}
                alt="billPaymentScreenshot"
                height="200"
                style={{ maxWidth: "100%" }}
              />
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
      )}
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
                
                {telecomOptions && telecomOptions.length > 0 && 
                <Box mt={6} mb={6}>
                  <FilledCheckBox options={telecomOptions} init={telecomValue} onClickCallback={(selItem: string)=>onClickFilledOptions(selItem)}/>
                </Box>
                }

                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <InputWrapper
                    type={type}
                    initialState={fields}
                    onBlur={onBlurFields}
                  />
                </Grid>
              </Grid>
              {type && type === "salik" && (
                <Grid item xs={3}>
                  Right Content
                </Grid>
              )}
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
