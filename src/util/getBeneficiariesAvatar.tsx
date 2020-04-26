import {   getMashreqLogo,
  SingleNeutral,
  Earth1,
  CashPinMap } from '@mashreq-digital/webassets';

const AADC = require("../assets/images/beneficiaries/AADC.png");
const ADDC = require("../assets/images/beneficiaries/ADDC.png");
const DEWA = require("../assets/images/beneficiaries/DEWA.png");
const DU = require("../assets/images/beneficiaries/Du.png");
const ETISALAT = require("../assets/images/beneficiaries/Etisalat.png");
const FEWA = require("../assets/images/beneficiaries/FEWA.png");
const SALIK = require("../assets/images/beneficiaries/Salika.png");
const SEWA = require("../assets/images/beneficiaries/SEWA.png");
const THAVTE = require("../assets/images/beneficiaries/Thavte.png");
const Ahsen = require("../assets/images/beneficiaries/Ahsen.png");
const Dubai_Cares = require("../assets/images/beneficiaries/Dubai_Cares.png");
const Fund_Transfer = require("../assets/images/beneficiaries/Fund_Transfer.png");
const Noqodi = require("../assets/images/beneficiaries/Noqodi.png");

const getBeneficiariesAvatar = (serviceType: any) => {
  switch (serviceType) {
    case "aadc":
      return AADC;
    case "addc":
      return ADDC;
    case "noqodi":
      return Noqodi;
    case "ahsen":
      return Ahsen;
    case "dubai care":
      return Dubai_Cares;
    case "fund transfer":
      return Fund_Transfer;
    case "dewa":
      return DEWA;
    case "du":
      return DU;
    case "duetisalat-prepaid":
      return ETISALAT;
    case "etisalat":
      return ETISALAT;
    case "fewa":
      return FEWA;
    case "salik":
      return SALIK;
    case "sewa":
      return SEWA;
    case "within-mashreq":
      return getMashreqLogo("symbol");
    case "international":
      return Earth1;
    case "own-account":
      return SingleNeutral;
    case "local":
      return CashPinMap;
    case "thvte":
      return THAVTE;
    default:
      return "";
  }
};

export default getBeneficiariesAvatar;
