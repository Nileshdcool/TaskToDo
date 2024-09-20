import { Todo } from '@/types/todo.interface';
import TodoItem from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    onUpdate: (id: string, updatedTodo: Partial<Todo>) => void;
    onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onUpdate, onDelete }) => {
    return (
        <ul>
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
            ))}
        </ul>
    );
};

export default TodoList;