import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, wrapper } from '../store';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../store/todoSlice';
import { Todo } from '@/types/todo.interface';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { differenceInDays, isBefore } from 'date-fns';

const HomePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { todos, error } = useSelector((state: RootState) => state.todos);
    const [isTaskCompleted, setIsTaskCompleted] = useState(false);
    const { width, height } = useWindowSize();
    const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'nonCompleted'>('all');

    const showDeleteConfirm = (id: string) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="custom-confirm-alert">
                        <h1>Confirm to delete</h1>
                        <p>Are you sure you want to delete this todo?</p>
                        <div className="button-group">
                            <button
                                onClick={() => {
                                    handleDeleteTodo(id);
                                    onClose();
                                }}
                                className="confirm-button"
                            >
                                Yes
                            </button>
                            <button onClick={onClose} className="cancel-button">
                                No
                            </button>
                        </div>
                    </div>
                );
            },
            overlayClassName: "custom-overlay"
        });
    };

    useEffect(() => {
        dispatch(fetchTodos())
            .unwrap()
            .catch((err) => toast.error(`Error fetching todos: ${err.message}`));
    }, [dispatch]);

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        comments: Yup.string().required('Comments are required'),
        dueDate: Yup.date().required('Due date is required'),
    });

    const handleCreateTodo = (values: Omit<Todo, 'id'>) => {
        const todoWithId: Todo = { ...values, id: uuidv4() };
        dispatch(createTodo(todoWithId))
            .unwrap()
            .then(() => {
                toast.success('Todo created successfully');
            })
            .catch((err) => toast.error(`Error creating todo: ${err.message}`));
    };

    const handleUpdateTodo = (id: string, updatedTodo: Partial<Todo>) => {
        setIsTaskCompleted(true);
        dispatch(updateTodo({ id, updatedTodo }))
            .unwrap()
            .then(() => {
                setTimeout(() => {
                    setIsTaskCompleted(false);
                }, 5000);
                toast.success('Todo updated successfully');
            })
            .catch((err) => {
                setIsTaskCompleted(false);
                toast.error(`Error updating todo: ${err.message}`);
            });
    };

    const handleDeleteTodo = (id: string) => {
        dispatch(deleteTodo(id))
            .unwrap()
            .then(() => toast.success('Todo deleted successfully'))
            .catch((err) => toast.error(`Error deleting todo: ${err.message}`));
    };

    const filteredTodos = todos.filter(todo => {
        if (activeTab === 'completed') return todo.isComplete;
        if (activeTab === 'nonCompleted') return !todo.isComplete;
        return true;
    });

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            {error && <p className="text-red-500">{error}</p>}
            <div className="bg-white shadow-md rounded p-4 mb-4">
                <Formik
                    initialValues={{ name: '', description: '', comments: '', isComplete: false, dueDate: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        handleCreateTodo({ ...values, dueDate: new Date(values.dueDate) });
                        resetForm();
                    }}
                >
                    {({ errors, touched, handleSubmit, handleChange, values }) => (
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.name}
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                        errors.name && touched.name ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.name && touched.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    onChange={handleChange}
                                    value={values.description}
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                        errors.description && touched.description ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.description && touched.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comments">
                                    Comments
                                </label>
                                <textarea
                                    id="comments"
                                    name="comments"
                                    onChange={handleChange}
                                    value={values.comments}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
                                    Due Date
                                </label>
                                <input
                                    id="dueDate"
                                    name="dueDate"
                                    type="date"
                                    onChange={handleChange}
                                    value={values.dueDate}
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                        errors.dueDate && touched.dueDate ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.dueDate && touched.dueDate && <p className="text-red-500 text-xs italic">{errors.dueDate}</p>}
                            </div>
                            <div className="col-span-1 md:col-span-2 flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 animate-pulse-slow"
                                >
                                    Add Todo
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
            <div className="bg-white shadow-md rounded p-4 mb-4">
                <div className="flex space-x-4 mb-4">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`p-2 ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setActiveTab('nonCompleted')}
                        className={`p-2 ${activeTab === 'nonCompleted' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Non-Completed
                    </button>
                    <button
                        onClick={() => setActiveTab('completed')}
                        className={`p-2 ${activeTab === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Completed
                    </button>
                </div>
                <ul>
                    {filteredTodos.map(todo => {
                        const dueDate = todo.dueDate ? new Date(todo.dueDate) : new Date();
                        const isOverdue = isBefore(dueDate, new Date()) && todo.isComplete === false;
                        const isDueSoon = differenceInDays(dueDate, new Date()) <= 2 && !isOverdue && todo.isComplete === false;
                        return (
                            <li
                                key={todo.id}
                                className={`border p-2 mb-2 flex flex-col md:flex-row justify-between items-start md:items-center ${
                                    isOverdue ? 'bg-red-300' : isDueSoon ? 'bg-orange-300' : ''
                                }`}
                            >
                                <div className="flex-grow">
                                    <h2 className="text-xl font-bold">{todo.name}</h2>
                                    <p>{todo.description}</p>
                                    <p>{todo.comments}</p>
                                    <p>Due Date: {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'No due date'}</p>
                                    <p>{todo.isComplete ? 'Complete' : 'Incomplete'}</p>
                                </div>
                                <div className="flex mt-2 md:mt-0">
                                    <button
                                        onClick={() => handleUpdateTodo(todo.id, { ...todo, isComplete: !todo.isComplete })}
                                        className="bg-green-500 text-white p-2 mr-2"
                                    >
                                        {todo.isComplete ? 'Mark Incomplete' : 'Mark Complete'}
                                    </button>
                                    <button onClick={() => showDeleteConfirm(todo.id)} className="bg-red-500 text-white p-2">
                                        Delete
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
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