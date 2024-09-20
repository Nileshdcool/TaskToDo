export interface Todo {
    id: string;
    name: string;
    description: string;
    comments?: string;
    isComplete?: boolean;
    dueDate?: Date;
  }