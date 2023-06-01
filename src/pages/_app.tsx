import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { CookiesProvider } from "react-cookie";

import { AuthProvider } from "../contexts/AuthContext";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "../styles/global.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <CookiesProvider>
          <ToastContainer autoClose={3000} />
          <Component {...pageProps} />
        </CookiesProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
