const AADC = require("../assets/images/beneficiaries/AADC.png");
const ADDC = require("../assets/images/beneficiaries/ADDC.png");
const DEWA = require("../assets/images/beneficiaries/DEWA.png");
const DU = require("../assets/images/beneficiaries/Du.png");
const ETISALAT = require("../assets/images/beneficiaries/Etisalat.png");
const FEWA = require("../assets/images/beneficiaries/FEWA.png");
const SALIK = require("../assets/images/beneficiaries/Salika.png");
const SEWA = require("../assets/images/beneficiaries/SEWA.png");
const THAVTE = require("../assets/images/beneficiaries/Thavte.png");

const getBeneficiariesAvatar = (serviceType: any) => {
  switch (serviceType) {
    case "aadc":
      return AADC;
    case "addc":
      return ADDC;
    case "dewa":
      return DEWA;
    case "du":
      return DU;
    case "etisalat":
      return ETISALAT;
    case "fewa":
      return FEWA;
    case "salik":
      return SALIK;
    case "sewa":
      return SEWA;
    case "thvte":
      return THAVTE;
    default:
      return "";
  }
};

export default getBeneficiariesAvatar;
