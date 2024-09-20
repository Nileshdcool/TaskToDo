import TodoItem from './TodoItem';
import { TodoListProps } from '@/types/todo-list-props.interface';

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