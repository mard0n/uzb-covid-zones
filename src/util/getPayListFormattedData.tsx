export const getPayListFromattedData = (obj: any, type: string) => {
console.log("getPayListFromattedData -> ###### type", type)
console.log("getPayListFromattedData -> obj", obj);
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

  } else if(type === "deposits") {
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