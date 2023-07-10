import { TasksProvider } from '@/context/TasksContext';
import { mockTasks } from '@/data/mockTasks';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
