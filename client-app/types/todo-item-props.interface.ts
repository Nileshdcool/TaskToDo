import { Todo } from "./todo.interface";

export interface TodoItemProps {
    todo: Todo;
    onUpdate: (id: string, updatedTodo: Partial<Todo>) => void;
    onDelete: (id: string) => void;
}