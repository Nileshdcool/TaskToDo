import { Todo } from "./todo.interface";

export interface TodoState {
    todos: Todo[];
    error: string | null;
}