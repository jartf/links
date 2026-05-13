import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import Layout from "../components/Layout";
import GlobalStyle from "../styles/GlobalStyle";
import { darkTheme, lightTheme } from "../styles/theme.config";


function ThemedApp({ Component, pageProps }) {
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextThemesProvider defaultTheme="system" attribute="class" enableSystem>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ThemedApp Component={Component} pageProps={pageProps} />
      </NextThemesProvider>
    </>
  )
}
export default MyApp
