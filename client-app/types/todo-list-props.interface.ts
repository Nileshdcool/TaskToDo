import { Todo } from "./todo.interface";

export interface TodoListProps {
    todos: Todo[];
    onUpdate: (id: string, updatedTodo: Partial<Todo>) => void;
    onDelete: (id: string) => void;
}