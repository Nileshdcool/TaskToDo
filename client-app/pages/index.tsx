import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, wrapper } from '../store';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../store/todoSlice';
import { Todo } from '@/types/todo.interface';

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
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleCreateTodo = () => {
        dispatch(createTodo(newTodo));
        setNewTodo({ name: '', description: '', comments: '', isComplete: false });
    };

    const handleUpdateTodo = (id: string, updatedTodo: Partial<Todo>) => {
        dispatch(updateTodo({ id, updatedTodo }));
    };

    const handleDeleteTodo = (id: string) => {
        dispatch(deleteTodo(id));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={newTodo.name}
                    onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Comments"
                    value={newTodo.comments}
                    onChange={(e) => setNewTodo({ ...newTodo, comments: e.target.value })}
                    className="border p-2 mr-2"
                />
                <button onClick={handleCreateTodo} className="bg-blue-500 text-white p-2">Add Todo</button>
            </div>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className="border p-2 mb-2 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold">{todo.name}</h2>
                            <p>{todo.description}</p>
                            <p>{todo.comments}</p>
                            <p>{todo.isComplete ? 'Complete' : 'Incomplete'}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => handleUpdateTodo(todo.id, { isComplete: !todo.isComplete })}
                                className="bg-green-500 text-white p-2 mr-2"
                            >
                                {todo.isComplete ? 'Mark Incomplete' : 'Mark Complete'}
                            </button>
                            <button onClick={() => handleDeleteTodo(todo.id)} className="bg-red-500 text-white p-2">Delete</button>
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