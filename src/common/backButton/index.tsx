import React from "react";
import { useTranslation } from "react-i18next";
import { SvgIcon, Button } from "@mashreq-digital/ui";
import { ChevronLeft } from "@mashreq-digital/webassets";
import { useHistory } from "react-router-dom";

type BackButtonProps = {
  onClickBack: any;
  disableRoute?: boolean 
};

const BackButton = (props: BackButtonProps) => {
  const { onClickBack, disableRoute } = props;
  const history = useHistory();
  const { t } = useTranslation();
  const onClick = () => {
    if(!disableRoute) {
      history.goBack();
    }
    if(onClickBack && typeof onClickBack === "function") {
      onClickBack();
    }
  };

  return (
    <Button color="primary" onClick={onClick} size="medium">
      <SvgIcon color="primary" component={ChevronLeft} />
      <span color="primary">{t("common.action.back")} </span>
    </Button>
  );
};

BackButton.defaultProps = {
  onClickBack: ()=>{}
}

export default BackButton;
