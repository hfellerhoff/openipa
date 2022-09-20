import type { AppProps } from 'next/app';

import { UserContextProvider } from '../src/state/context/UserContextProvider';

import '../src/styles/app.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  );
}

export default MyApp;
