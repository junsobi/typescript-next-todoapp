import Layout from '@/components/Layout';
import { TasksProvider } from '@/context/TasksContext';
import { mockTasks } from '@/data/mockTasks';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import '../../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
