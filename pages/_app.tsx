import { UserContextProvider } from '../src/state/context/UserContextProvider';
import '../src/styles/app.scss';

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  );
}

export default MyApp;
