import { createTheme } from "@mui/material/styles";

const sharedPalette = {
  primary: {
    main: "#07489D",
    white: "#ffffff",
    disabled: "#595F69",
    dark: "#1E2124",
    body: "#3D4148",
  },
  secondary: {
    main: "#c2185b",
  },
  background: {
    default: "#ffffff",
  },
  text: {
    primary: "#212121",
    secondary: "#757575",
  },
};

export const englishTheme = createTheme({
  direction: "ltr",
  palette: {
    ...sharedPalette,
    background: {
      default: sharedPalette.background.default,
    },
  },
  typography: {
    fontFamily: "'Gotham', sans-serif",
    fontWeightRegular: 400,
    fontWeightBold: 700,
    fontWeightLight: 300,
    h1: {
      fontWeight: 900,
    },
    body1: {
      fontWeight: 400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "'Gotham', sans-serif", 
        },
      },
    },
  },
});

export const arabicTheme = createTheme({
  direction: "rtl",
  palette: {
    ...sharedPalette,
    background: {
      default: sharedPalette.background.default,
    },
  },
  typography: {
    fontFamily: "'Neo Sans ', sans-serif",
    fontWeightRegular: 400,
    fontWeightBold: 700,
    fontWeightLight: 300,
    h1: {
      fontWeight: 900,
    },
    body1: {
      fontWeight: 400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "'Neo Sans Arabic', sans-serif", 
        },
      },
    },
  },
});
