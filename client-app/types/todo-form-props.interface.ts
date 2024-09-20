import { Todo } from './todo.interface';

export interface TodoFormProps {
    handleCreateTodo: (todo: Todo) => void;
  }