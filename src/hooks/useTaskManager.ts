//recoil 또는 contextapi 를 판단해주는 로직

import { useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';

import { TasksContext } from '@/context/TasksContext';
import {
  tasksState,
  TaskManager as useRecoilTaskManager,
} from '@/state/atoms/tasksAtom';
import { ContextProps } from '@/context/TasksContext';


export interface TaskManagerProps extends ContextProps {}

export function useTaskManager(): TaskManagerProps {
  const router = useRouter();
  const contextTasks = useContext(TasksContext);
  const recoilTasks = useRecoilValue(tasksState);

  const { addTask: addTaskWithRecoil, ...recoilActions } =
    useRecoilTaskManager();

  if (router.pathname.includes('/recoil')) {
    return {
      tasks: recoilTasks,
      addTask: addTaskWithRecoil,
      ...recoilActions,
    };
  }

  return contextTasks;
}
