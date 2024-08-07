// pages/_app.tsx
import type { AppProps } from 'next/app';
import MainWrapper from '../components/MainWrapper';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainWrapper>
      <Component {...pageProps} />
    </MainWrapper>
  );
}

export default MyApp;
