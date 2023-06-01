import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  breakpoints: {
    xs: "280px",
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  },
  colors: {
    gray: {
      "100": "#adb5bd",
      "200": "#ced4da",
      "300": "#dee2e6",
      "400": "#e9ecef",
      "500": "#f1f3f5 ",
    },
    blue: {
      "100": "#22598a",
      "200": "#2f7bbd",
      "300": "#2b71b0",
      "400": "#",
      "500": "#",
    },
    white: {
      "100": "#FFFFFF",
      "200": "#f5fafe",
    },
    black: {
      "100": "#2C3042",
    },
    yellow: {
      "100": "#fcc419",
    },
    red: {
      "100": "#fa5252",
    },
    green: {
      "100": "#61ab80",
    },
  },
  fonts: {
    heading: `Roboto`,
    body: `Roboto`,
  },
  styles: {
    global: {
      body: {
        bg: "white.100",
        color: "black.100",
      },
    },
  },
});
