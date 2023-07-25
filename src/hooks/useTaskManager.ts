import { useEffect, useContext } from 'react';
import { useGlobalState } from './useGlobalState';
import { useLocalTaskManager } from '@/recoil/localTaskManager';
import { useServerTaskManager } from '@/recoil/serverTaskManager';
import { useReactQueryTaskManager } from './useReactQueryTaskManager';
import { TasksContext } from '@/context/TasksContext';
import {
  TaskManagerProps,
  TaskManagerPropsWithOptimisticId,
} from '@/types/type';

export function useTaskManager():
  | TaskManagerProps
  | TaskManagerPropsWithOptimisticId {
  const [globalState] = useGlobalState();

  useEffect(() => {}, [globalState]);

  const localTaskManager = useLocalTaskManager();
  const serverTaskManager = useServerTaskManager();
  const contextTaskManager = useContext(TasksContext);
  const reactQueryTaskManager = useReactQueryTaskManager();

  switch (globalState.stateManager) {
    case 'recoil':
      return localTaskManager;
    case 'recoil-with-server':
      return serverTaskManager;
    case 'react-query':
      return reactQueryTaskManager;
    case 'context':
    default:
      return contextTaskManager;
  }
}
