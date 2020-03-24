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
  SvgIcon,
  InfoCard,
  IconText,
  CheckboxWithLabel
} from "@mashreq-digital/ui";
import {
  InfoCircle,
  ShieldSync,
  Heart2,
  Horns,
  Eye,
  Eye2
} from "@mashreq-digital/webassets";
import InputWrapper from "../../../../../../common/inputWrapper";
import { FormFields } from "../formData";
import PromptTemplate from "../../../../../../common/promptTemplate";
import { useTranslation } from "react-i18next";
import { replaceStr, capitalizeFirstLetter } from "../../../../../../util/helper";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../../../redux/actions/beneficiary/billPayment/manageBeneficiaryActions";
import FilledCheckBox from "../../../../../../common/filledCheckbox";
// import ImageWithText from "../../../../../common/imageWithText";
// console.log("initFieldProps -> formFields", FormFields)

type AddUpdateBillPaymentProps = {
  type: string | any;
  onSubmitCallback: any;
  isAdd: boolean;
  edit? : any;
};

const utilities = ["addc", "addc", "dewa", "sewa", "fewa"];
const duTypes = [
  "du-prepaid-mobile",
  "du-postpaid-mobile",
  "du-postpaid-landline"
];

const AddUpdateBillPayment = (props: AddUpdateBillPaymentProps) => {
  const { type, isAdd, edit, onSubmitCallback } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const getType: keyof typeof FormFields = type;
  const addNew = useSelector(
    (state: any) => state?.beneficiary?.billPayment?.addNew
  );
  const formSchema: any = FormFields[getType];
  const telecomOptions =
    formSchema && formSchema["options"] && formSchema["options"].length > 0 ? formSchema["options"] : [];
  const [billType, setBillType] = useState(formSchema["type"]);
  const [fields, setFields] = useState<any>({});
  const [formData, setFormData] = useState({});
  const [telecomValue, setTelecomValue] = useState("prepaid");
  const [disabled, setDisabled] = useState(true);
  const [isUtility, setIsUtility] = useState(false);
  const [infoPopup, setInfoPopup] = useState(false);
  const [hideSalikPin, setHideSalikPin] = useState(false);
  const [savePin, setSavePin] = useState(true);
  const formFields: any = (getType === "etisalat") || (getType === "du") ? formSchema[telecomValue]["fields"] : formSchema["fields"];

  const infoTitle = replaceStr(
    t("beneficiary.manage.info.title"),
    "--type--",
    capitalizeFirstLetter(type)
  );

  const onChangeSavePin = () => {
    setSavePin(!savePin)
  }

  const handleShowInfo = () => {
    setInfoPopup(true);
  };

  useEffect(() => {
    const initFieldProps = () => {
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
        if(isAdd){
          for (const field in formFields) {
            formFields[field]["config"]["value"] = "";
            formFields[field]["config"]["error"] = '';
            formFields[field]["config"]["errorText"] = '';
          }
        }
        return formFields;
      }
    };
    setFields(initFieldProps());
  }, [formFields, isAdd, type]);

  useEffect(()=>{
    const handleClickShowPassword = (val: any) => {
      let cloneFields = {...val};
      cloneFields['pincode']['config']['type'] = hideSalikPin ?  'password' : 'text';
      setHideSalikPin(!hideSalikPin);
      setFields(cloneFields);
    }

    for (const field in formFields) {
      if (type==="salik" && field === "pincode") {
        formFields[field]["config"]["InputProps"] = {
          endAdornment: (
            <IconButton
            aria-label="toggle password visibility"
            onClick={()=>handleClickShowPassword(fields)}
          >
            {hideSalikPin ? <Eye /> : <Eye2 />}
          </IconButton>
          )
        };
      }
    }},[type, fields, hideSalikPin, formFields]);

  //edit useeffect
  useEffect(()=>{
    if(!isAdd && edit && edit.id) {
      const updateEditValue = (fieldName: string) => {
        if(!isAdd && edit && edit.id) {
           return edit[fieldName] ? edit[fieldName] : '';
        }
      }
      for (const field in formFields) {
      formFields[field]["config"]["value"] = updateEditValue(field);
      formFields['accountNumber']["config"]["disabled"] = true 
      }
    }
  },[isAdd, edit, formFields]);

  useEffect(() => {
    let checkUtility = utilities.indexOf(type.toLowerCase()) > -1;
    setIsUtility(checkUtility);
  }, [type]);

  useEffect(() => {
    if (onSubmitCallback && typeof onSubmitCallback === "function" && addNew) {
      onSubmitCallback(addNew);
    }
  }, [addNew, onSubmitCallback]);

  const onBlurFields = (resData: any) => {
    setFormData(resData);
    setDisabled(!resData.valid);
  };

  const onClickFilledOptions = (selItem: any) => {
    let cloneFields = {...formSchema[selItem]["fields"]};
    setTelecomValue(selItem);
    //console.log("onClickFilledOptions -> cloneFields", cloneFields)
    if(isAdd) {
      for(let field in cloneFields) {
        cloneFields[field]["config"]["value"] = '';
        cloneFields[field]["config"]["error"] = '';
        cloneFields[field]["config"]["errorText"] = '';
      }
      setFields(cloneFields); 
    }
  };

  const onClickSubmit = () => {
    let data: any = { ...formData },
      serviceType = billType;
    delete data["valid"];
    //telecom => du/etisalat
    if (type && telecomValue && telecomOptions && telecomOptions.length > 0) {
      serviceType = (type + "-" + telecomValue).toLowerCase();
      if (type.toLowerCase() === "du") {
        serviceType = duTypes.find(
          item => item.indexOf(telecomValue.toLowerCase()) > -1
        );
      }
    }
    //salik
    if(type === 'salik') {
      delete data["pincode"];
      data["salikPinCode"] = btoa(fields["pincode"]['config']['value']);
      data["savePinCode"] = savePin;
    }
    data["serviceTypeCode"] = serviceType;
    dispatch(Actions.addUpdateBeneficiaryRequest({ updateMode: false, data }));
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
            <UnderlineText color="primary">
              <H2>{t("beneficiary.manage.addEdit.title")}</H2>
            </UnderlineText>

            <Box mt={6} mb={6}>
              <Caption>{t("beneficiary.manage.addEdit.desc")}</Caption>
            </Box>
            <Grid container>
              <Grid item xs={8}>
                {telecomOptions && telecomOptions.length > 0 && (
                  <Box mb={6}>
                    <FilledCheckBox
                      options={telecomOptions}
                      init={telecomValue}
                      onClickCallback={(selItem: string) =>
                        onClickFilledOptions(selItem)
                      }
                    />
                  </Box>
                )}

                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <InputWrapper
                    type={type}
                    initialState={fields}
                    onBlur={onBlurFields}
                  />
                  {type && type === "salik" &&
                  <CheckboxWithLabel checked={savePin} onChange={()=>onChangeSavePin()} color="default" label={t('beneficiary.manage.addEdit.salik.savePin')} />
        }
                </Grid>
              </Grid>
              {type && type === "salik" && (
                <Grid item xs={3}>
                  <InfoCard
                    fullWidth
                    title={t("beneficiary.manage.addEdit.salik.info.title")}
                    content={
                      <Box>
                        <IconText
                          primaryText=""
                          iconProps={{ color: "primary" }}
                          icon={ShieldSync}
                          secondaryText={t(
                            "beneficiary.manage.addEdit.salik.info.item1"
                          )}
                        />
                        <IconText
                          primaryText=""
                          iconProps={{ color: "primary" }}
                          icon={Heart2}
                          secondaryText={t(
                            "beneficiary.manage.addEdit.salik.info.item2"
                          )}
                        />
                        <IconText
                          primaryText=""
                          iconProps={{ color: "primary" }}
                          icon={Horns}
                          secondaryText={t(
                            "beneficiary.manage.addEdit.salik.info.item3"
                          )}
                        />
                      </Box>
                    }
                  />
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
              {t("common.action.submit")}
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
