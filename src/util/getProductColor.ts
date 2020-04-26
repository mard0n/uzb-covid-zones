const getProductColor = (type: any) => {
  switch (type) {
    case "accounts":
      return "#fcb41d";
    case "cards":
      return "#f48e26";
    case "loans":
      return "#f26d2d";
    case "deposits":
      return "#c22d18";
    case "salaam":
      return "#85271a";
    default:
      return "";
  }
};

export default getProductColor;
