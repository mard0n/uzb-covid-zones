const getProductColor = (type: any) => {
  switch (type) {
    case "account":
      return "#fcb41d";
    case "card":
      return "#f48e26";
    case "loan":
      return "#f26d2d";
    case "deposit":
      return "#c22d18";
    case "salaam":
      return "#85271a";
    default:
      return "";
  }
};

export default getProductColor;
