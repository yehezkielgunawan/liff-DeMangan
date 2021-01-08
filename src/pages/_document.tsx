import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

const APP_NAME = "DeMangan";
const APP_DESC = "Pesan via web app, langsung dapet summary di LINE";

export default class Document extends NextDocument {

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Recursive&display=swap"
            rel="stylesheet"
          ></link>
          <link rel="icon" href="/images/logo.png"/>
          <title>DeMangan</title>
          <meta name="application-name" content={APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="description" content={APP_DESC} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#FFFFFF" />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
          <script defer charSet="utf-8" src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
        </body>
      </Html>
    );
  }
}
