import { useState, useEffect } from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import Layout from "../components/Layout";
import GlobalStyle from "../styles/GlobalStyle";
import { darkTheme, lightTheme } from "../styles/theme.config";
import { GoogleAnalytics } from "@next/third-parties/google";
import SEO from '../next-seo.config';

function ThemedApp({ Component, pageProps, isMounted }) {
    const { resolvedTheme } = useTheme()
    const theme = resolvedTheme === "dark" ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Layout>
                {isMounted && <Component {...pageProps} />}
            </Layout>
        </ThemeProvider>
    )
}

function MyApp({ Component, pageProps }) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true);
    }, [])

    return (
        <>
            <GoogleAnalytics gaId={SEO.gaId ?? ""} />
            <NextThemesProvider defaultTheme="light">
                <Head>
                    <meta content="width=device-width, initial-scale=1" name="viewport" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <ThemedApp Component={Component} pageProps={pageProps} isMounted={isMounted} />
            </NextThemesProvider>
        </>
    )
}
export default MyApp
