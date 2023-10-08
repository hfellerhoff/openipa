import type { AppProps } from "next/app";

import { openSans, robotoSlab } from "../app/fonts";
import AuthProvider from "../src/state/AuthProvider";

import "../src/styles/app.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${openSans.variable} ${robotoSlab.variable} font-sans`}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  );
}
