import { ThemeProvider as SCThemeProvider } from "styled-components";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    color: ${(props) => props.theme.text.primary};
    background-color: ${(props) => props.theme.background.default};
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;

const darkTheme = {
  background: {
    default: "#192231",
    paper: "#24344d",
  },
  text: {
    primary: "#fff",
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
    hint: "rgba(255, 255, 255, 0.5)",
  },
  primary: {
    main: "#5893df",
    light: "rgb(121, 168, 229)",
    dark: "rgb(61, 102, 156)",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#2ec5d3",
    light: "rgb(87, 208, 219)",
    dark: "rgb(32, 137, 147)",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  error: {
    main: "#f44336",
    light: "#e57373",
    dark: "#d32f2f",
    contrastText: "#ffffff",
  },
  warning: {
    main: "#ff9800",
    light: "#ffb74d",
    dark: "#f57c00",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  info: {
    main: "#2196f3",
    light: "#64b5f6",
    dark: "#1976d2",
    contrastText: "#ffffff",
  },
  success: {
    main: "#4caf50",
    light: "#81c784",
    dark: "#388e3c",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  divider: "rgba(255, 255, 255, 0.12)",
  sizes: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    xxl: "24px",
    xxxl: "30px",
    xxxxl: "36px",
  },
};

const ThemeProvider = (props) => {
  return (
    <SCThemeProvider theme={darkTheme}>
      <GlobalStyle />
      {props.children}
    </SCThemeProvider>
  );
};

export default ThemeProvider;
