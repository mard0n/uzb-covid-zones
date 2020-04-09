import { withStyles } from "@mashreq-digital/ui";

const GlobalCss = withStyles(({ palette, spacing }) => ({
  "@global": {
    "*, *::before, *::after": {
      margin: 0,
      padding: 0
    },
    "input:-internal-autofill-selected": {
      backgroundColor: "transparent !important",
      color: "inherit !important"
    },
    "ul.inline": {
      display: "flex",
      justifyContent: "center",
      "&>li": {
        padding: `0 ${spacing(2)}px`,
        "&:last-child": {
          paddingRight: 0
        },
        "&:first-child": {
          paddingLeft: 0
        }
      },
      "&.border": {
        "&>li": {
          borderRight: `1px solid ${palette?.grey?.[500]}`,
          "&:last-child": {
            borderRight: "none"
          }
        }
      }
    },
    "ul.list-style-none": {
      listStyleType: "none"
    },
    "a, a > *" : {
      textDecoration: "none"
    },
    body: {
      backgroundColor: "#ffffff"
      // "@media (min-width: 1440px)": {
      //   maxWidth: "1440px",
      //   margin: "0 auto"
      // }
    }
  }
}))(() => null);

export default GlobalCss;
