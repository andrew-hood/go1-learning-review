import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { globalCSS } from "@go1d/go1d";

globalCSS();

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
