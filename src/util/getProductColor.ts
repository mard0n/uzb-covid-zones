const getProductColor = (type: any) => {
  switch (type) {
    case "accounts":
      return "#fcb41d";
    case "cards":
      return "#f48e26";
    case "loans":
      return "#f26d2d";
    case "insurances":
      return "#f2442c";
    case "deposits":
      return "#c22d18";
    case "salaam":
      return "#85271a";
    case "mm":
      return "#d4253b";
    default:
      return "";
  }
};

export default getProductColor;
