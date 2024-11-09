import "@/styles/globals.css";
import { Lato } from "next/font/google";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { wrapper } from "@/redux/store";
import Layout from "@/components/Layout";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material";
import theme, { colors } from "@/theme/theme";

export const font = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["italic", "normal"],
});

function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Layout>
            <NextNProgress color={colors.primary} />
            <Component {...props} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}

export default App;
