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
