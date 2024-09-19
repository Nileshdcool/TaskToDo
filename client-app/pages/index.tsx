import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, wrapper } from '../store';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../store/todoSlice';
import { Todo } from '@/types/todo.interface';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const HomePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { todos, error } = useSelector((state: RootState) => state.todos);
    const [newTodo, setNewTodo] = useState<Omit<Todo, 'id'>>({
        name: '',
        description: '',
        comments: '',
        isComplete: false,
    });

    useEffect(() => {
        dispatch(fetchTodos())
            .unwrap()
            .then(() => toast.success('Todos fetched successfully'))
            .catch((err) => toast.error(`Error fetching todos: ${err.message}`));
    }, [dispatch]);

    const handleCreateTodo = () => {
        const todoWithId: Todo = { ...newTodo, id: uuidv4() };
        dispatch(createTodo(todoWithId))
            .unwrap()
            .then(() => {
                toast.success('Todo created successfully');
                setNewTodo({ name: '', description: '', comments: '', isComplete: false });
            })
            .catch((err) => toast.error(`Error creating todo: ${err.message}`));
    };

    const handleUpdateTodo = (id: string, updatedTodo: Partial<Todo>) => {
        dispatch(updateTodo({ id, updatedTodo }))
            .unwrap()
            .then(() => toast.success('Todo updated successfully'))
            .catch((err) => toast.error(`Error updating todo: ${err.message}`));
    };

    const handleDeleteTodo = (id: string) => {
        dispatch(deleteTodo(id))
            .unwrap()
            .then(() => toast.success('Todo deleted successfully'))
            .catch((err) => toast.error(`Error deleting todo: ${err.message}`));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4 flex flex-col md:flex-row">
                <input
                    type="text"
                    placeholder="Name"
                    value={newTodo.name}
                    onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
                    className="border p-2 mb-2 md:mb-0 md:mr-2 flex-grow"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    className="border p-2 mb-2 md:mb-0 md:mr-2 flex-grow"
                />
                <input
                    type="text"
                    placeholder="Comments"
                    value={newTodo.comments}
                    onChange={(e) => setNewTodo({ ...newTodo, comments: e.target.value })}
                    className="border p-2 mb-2 md:mb-0 md:mr-2 flex-grow"
                />
                <button onClick={handleCreateTodo} className="bg-blue-500 text-white p-2 flex-grow">
                    Add Todo
                </button>
            </div>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className="border p-2 mb-2 flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="flex-grow">
                            <h2 className="text-xl font-bold">{todo.name}</h2>
                            <p>{todo.description}</p>
                            <p>{todo.comments}</p>
                            <p>{todo.isComplete ? 'Complete' : 'Incomplete'}</p>
                        </div>
                        <div className="flex mt-2 md:mt-0">
                            <button
                                onClick={() => handleUpdateTodo(todo.id, { isComplete: !todo.isComplete })}
                                className="bg-green-500 text-white p-2 mr-2"
                            >
                                {todo.isComplete ? 'Mark Incomplete' : 'Mark Complete'}
                            </button>
                            <button onClick={() => handleDeleteTodo(todo.id)} className="bg-red-500 text-white p-2">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        try {
            await store.dispatch(fetchTodos());
            return { props: {} };
        } catch (error) {
            return { props: {} };
        }
    }
);