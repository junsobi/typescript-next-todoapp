import { useContext } from 'react';
import { useGlobalState } from './useGlobalState';
import { useLocalTaskManager } from '@/recoil/localTaskManager';
import { useServerTaskManager } from '@/recoil/serverTaskManager';
import { TasksContext } from '@/context/TasksContext';
import { TaskManagerProps } from '@/types/type';

export function useTaskManager(): TaskManagerProps {
  const [globalState] = useGlobalState();

  const localTaskManager = useLocalTaskManager();
  const serverTaskManager = useServerTaskManager();
  const contextTaskManager = useContext(TasksContext);

  switch (globalState.stateManager) {
    case 'recoil':
      return localTaskManager;
    case 'recoil-with-server':
      return serverTaskManager;
    case 'context':
    default:
      return contextTaskManager;
  }
}
