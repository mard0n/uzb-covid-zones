export const getTelecomServiceType = (type: string, currentTab: string) => {
  let serviceType: any = type;
  if (type && currentTab && (type === "du" || type ==="etisalat")) {
    const duTypes = [
      "du-prepaid-mobile",
      "du-postpaid-mobile",
      "du-postpaid-landline"
    ];
    serviceType = (type + "-" + currentTab).toLowerCase();
    if (type.toLowerCase() === "du") {
      serviceType = duTypes.find(
        item => item.indexOf(currentTab.toLowerCase()) > -1
      );
    }
    return serviceType;
  } else {
    return serviceType;
  }
  
};
