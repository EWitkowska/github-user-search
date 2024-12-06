import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#f9f9f9",
    },
  },
  typography: {
    fontFamily:
      "'Roboto', 'Helvetica', 'Arial', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'",
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          "&:-webkit-autofill": {
            boxShadow: "0 0 0 100px #fff inset",
            WebkitTextFillColor: "#000",
            transition: "background-color 5000s ease-in-out 0s",
          },
        },
      },
    },
  },
});

export default theme;
