import { Html, Head, Main, NextScript } from "next/document";
import { font } from "./_app";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="keywords"
          content="hotel valhalla, Best hotel in Myanmar, Hotel in Kalaw Myanmar"
        />
        <meta name="theme-color" content="#6e57e0" />
        <meta name="author" content="Htut Wai Phyoe" />
      </Head>
      <body className={font.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
