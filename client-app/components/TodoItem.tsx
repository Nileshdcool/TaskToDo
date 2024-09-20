import { MESSAGES } from '@/constants/messages';
import { TodoItemProps } from '@/types/todo-item-props.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { differenceInDays, isBefore } from 'date-fns';

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
    const dueDate = todo.dueDate ? new Date(todo.dueDate) : new Date();
    const isOverdue = isBefore(dueDate, new Date()) && !todo.isComplete;
    const isDueSoon = differenceInDays(dueDate, new Date()) <= 2 && !isOverdue && !todo.isComplete;

    return (
        <li className={`border p-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center rounded-lg shadow-lg transition-transform transform hover:scale-105 ${isOverdue ? 'bg-red-300' : isDueSoon ? 'bg-orange-300' : 'bg-white'}`}>
            <div className="flex-grow">
                <h2 className="text-xl font-bold">{todo.name}</h2>
                <p>{todo.description}</p>
                <p>{todo.comments}</p>
                <p>Due Date: {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : MESSAGES.NO_DUE_DATE}</p>
                <p>{todo.isComplete ? 'Complete' : 'Incomplete'}</p>
            </div>
            <div className="flex mt-2 md:mt-0">
                <button
                    onClick={() => onUpdate(todo.id, { ...todo, isComplete: !todo.isComplete })}
                    className="bg-green-500 text-white p-2 mr-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                >
                    {todo.isComplete ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button
                    onClick={() => onDelete(todo.id)}
                    className="bg-red-500 text-white p-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                >
                    <FontAwesomeIcon icon="trash" />
                </button>
            </div>
        </li>
    );
};

export default TodoItem;