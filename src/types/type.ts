export interface Task {
  id: string;
  title: string;
  content: string;
  categories: string[];
  status: 'inProgress' | 'completed';
  createdDateTime: Date;
  lastModifiedDateTime: Date;
  DueDateTime: Date | null;
}
// Optimistic UI를 위한 타입
export interface PartialTask {
  id?: string;
  title?: string;
  content?: string;
  categories?: string[];
  status?: 'inProgress' | 'completed';
  createdDateTime?: Date;
  lastModifiedDateTime?: Date;
  DueDateTime?: Date | null;
  tempId?: string;
}

// Optimistic UI를 위한 인터페이스
export interface TaskManagerPropsWithOptimisticId extends TaskManagerProps {
  addTask: (
    taskToAdd: Omit<Task, 'id' | 'createdDateTime' | 'lastModifiedDateTime'>,
  ) => void;
  editTask: (
    taskToEdit: Pick<Task, 'id'> &
      Partial<
        Omit<
          Task,
          'id' | 'createdDateTime' | 'lastModifiedDateTime' | 'DueDateTime'
        >
      >,
  ) => void;
  clearCompletedTasks: () => void;
}

export interface TaskManagerProps {
  tasks: Task[];
  addTask: (
    taskToAdd: Omit<Task, 'id' | 'createdDateTime' | 'lastModifiedDateTime'>,
  ) => void;
  editTask: (
    taskToEdit: Pick<Task, 'id'> &
      Partial<
        Omit<
          Task,
          'id' | 'createdDateTime' | 'lastModifiedDateTime' | 'DueDateTime'
        > & {
          DueDateTime?: Date | null;
        }
      >,
  ) => void;
  toggleTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  clearCompletedTasks: () => void;
}
