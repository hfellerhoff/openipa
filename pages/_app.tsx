import type { AppProps } from 'next/app';

import AuthProvider from '../src/state/AuthProvider';

import '../src/styles/app.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
