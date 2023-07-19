import { ReactNode } from 'react';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { RecoilRoot } from 'recoil';
import '@/styles/globals.css';
import '../../styles/global.css';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>;
}
