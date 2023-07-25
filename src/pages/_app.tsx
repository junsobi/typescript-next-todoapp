import { ReactNode } from 'react';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { RecoilRoot } from 'recoil';
import '@/styles/globals.css';
import '../../styles/global.css';
import { QueryClient, QueryClientProvider } from 'react-query';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// QueryClient를 초기화합니다
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </RecoilRoot>
  );
}
