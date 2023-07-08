export interface Task {
  id: string;
  title: string;
  content: string;
  categories: string[];
  status: 'inProgress' | 'completed';

  createdDateTime: Date;
  lastModifiedDateTime: Date;
}
