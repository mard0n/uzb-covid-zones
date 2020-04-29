export const getPayListFormattedData = (obj: any, type: string) => {
  let data = {
    name: "",
    accNo: "",
    status: "",
    currency: "",
    balance: "",
    type: ""
  };
  data["type"] = type;
  if(type === "accounts") {
    const { customerName,
      accountNumber,
      accountDescription,
      accountNo,
      currentBalance,
      status,
      currency,
      availableBalance} = obj;
    data["name"] = accountDescription || customerName;
    data["accNo"] = accountNumber || accountNo || currentBalance;
    data["status"] = status;
    data["currency"] = currency;
    data["balance"] = availableBalance; 
  }
  // "id": 266,
  // "accountNumber": "010490730773",
  // "nickname": "Ssss",
  // "category": "Fund Transfer",
  // "serviceType": "To Another Mashreq Account",
  // "serviceTypeCode": "within-mashreq",
  // "status": "ACTIVE",
  // "createdDate": "2020-04-19T14:28:27.135Z",
  // "activeAfter": "2020-04-19T14:31:33.534Z",
  // "beneficiaryCurrency": "AED"
  else if(type === "benificiary") {
    const { 
      accountNumber,
      nickname,
      status,
      serviceTypeCode,
      beneficiaryCurrency,
      } = obj;
    data["name"] = nickname;
    data["accNo"] = "Account Number | " +accountNumber;
    data["currency"] = beneficiaryCurrency;
    data["type"] = serviceTypeCode;
    data["status"] = status;
  }
  else if(type === "deposits") {
    const { 
      accountDescription,
      dealReferenceNumber,
      status,
      currency,
      availableBalance} = obj;
    data["name"] = accountDescription;
    data["accNo"] = dealReferenceNumber;
    data["status"] = status;
    data["currency"] = currency;
    data["balance"] = availableBalance;

  } else if(type === "loans") {
    const { 
      accountDescription,
      loanAccountNumber,
      status,
      currency,
      totalOutstanding} = obj;
    data["name"] = accountDescription;
    data["accNo"] = loanAccountNumber;
    data["status"] = '';
    data["currency"] = currency;
    data["balance"] = totalOutstanding;

  } else if (type === "cards") {
    const { cardHolderName,
      cardNo,
      cardDescription,
      currentBalance,
      cardStatus,
      currency,
      availableCreditLimit} = obj;
      data["name"] = cardDescription || cardHolderName;
      data["accNo"] = cardNo;
      data["status"] = cardStatus;
      data["currency"] = currency;
      data["balance"] = currentBalance || availableCreditLimit;

  }else if (type === "salaam") {
    const { salamPoints } = obj;
      data["balance"] = salamPoints;

  }
  return {...data, res: obj};
}