import { ChakraProvider } from "@chakra-ui/react";
import { LiffProvider } from "react-liff";
import theme from "../theme";
import App from "next/app";

const LIFF_ID = process.env.MY_LIFF_ID;
const stubEnabled = process.env.NODE_ENV !== "production";

function MyApp({ Component, pageProps, liffId }: any) {
  return (
    <LiffProvider liffId={liffId} stubEnabled={stubEnabled}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </LiffProvider>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);

  const liffId = LIFF_ID;
  return { ...appProps, liffId };
};

export default MyApp;
