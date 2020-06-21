export const mockExpiryDateValidateSuccess = {
  data: {
    expiryDate: {
      year: 2022,
      monthValue: 12,
    },
  },
  status: "success",
  message: "Success",
  errorCode: "CM-7009",
};
export const mockExpiryDateValidateFail = {
  status: "error",
  message: "Something went wrong with external service CM-7009",
  errorCode: "CM-7009",
};
