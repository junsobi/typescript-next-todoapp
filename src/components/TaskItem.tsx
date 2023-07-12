import React from 'react';
import Checkbox from './Checkbox';
import Button from './Button';
import Input from './Input';
import { Task } from '@/types/type';
import useTaskInput from '@/hooks/useTaskInput';
import useTaskText from '@/hooks/useTaskText';
import useCheckbox from '@/hooks/useCheckbox';
import useEditable from '@/hooks/useEditable';
import TaskLayout from '@/components/TaskItemLayout';

type TaskItemProps = {
  task: Task;
};

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { isEditing, startEditing } = useEditable();
  const inputProps = useTaskInput(task.title, task);
  const textProps = useTaskText(task, startEditing);
  const checkboxProps = useCheckbox(task);

  return (
    <TaskLayout>
      <div className="flex gap-4 w-full">
        <Checkbox {...checkboxProps} />

        {isEditing ? <Input {...inputProps} /> : <span {...textProps} />}
      </div>
      <Button className="delete-btn">🗑️</Button>
    </TaskLayout>
  );
};
export default TaskItem;
