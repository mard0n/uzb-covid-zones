export const mockPinResetInitSuccess = {
  data: {
    maskedMobileNumber: "+99852***1234",
  },
  responseStatus: {
    status: "success",
    message: "HSMI Translate PIN*Failed",
  },
};
export const mockPinResetInitFail = {
  data: {},
  responseStatus: {
    status: "success",
    message: "HSMI Translate PIN*Failed",
    errorCode: "EAI-SEL-BRK-099",
  },
};
