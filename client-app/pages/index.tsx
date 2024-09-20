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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faCheckCircle, faTable } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { todos, error } = useSelector((state: RootState) => state.todos);
    const [isTaskCompleted, setIsTaskCompleted] = useState(false);
    const { width, height } = useWindowSize();
    const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'nonCompleted'>('all');
    const [viewMode, setViewMode] = useState<'currentView' | 'tableView'>('currentView');

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

    const toggleView = (mode: 'currentView' | 'tableView') => {
        setViewMode(mode);
    };

    useEffect(() => {
        dispatch(fetchTodos());
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
            });
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

            <div className="bg-yellow-100 p-4 mb-4 rounded-lg shadow-lg">
                <Formik
                    initialValues={{ name: '', description: '', comments: '', isComplete: false, dueDate: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        handleCreateTodo({ ...values, dueDate: new Date(values.dueDate) });
                        resetForm();
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className="mb-4 flex flex-col md:flex-row">
                            <div className="flex-grow">
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className={`border p-2 mb-2 md:mb-0 md:mr-2 flex-grow ${errors.name && touched.name ? 'border-red-500' : ''}`}
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500" />
                            </div>
                            <div className="flex-grow">
                                <Field
                                    type="text"
                                    name="description"
                                    placeholder="Description"
                                    className={`border p-2 mb-2 md:mb-0 md:mr-2 flex-grow ${errors.description && touched.description ? 'border-red-500' : ''}`}
                                />
                                <ErrorMessage name="description" component="div" className="text-red-500" />
                            </div>
                            <div className="flex-grow">
                                <Field
                                    type="text"
                                    name="comments"
                                    placeholder="Comments"
                                    className={`border p-2 mb-2 md:mb-0 md:mr-2 flex-grow ${errors.comments && touched.comments ? 'border-red-500' : ''}`}
                                />
                                <ErrorMessage name="comments" component="div" className="text-red-500" />
                            </div>
                            <div className="flex-grow">
                                <Field
                                    type="date"
                                    name="dueDate"
                                    placeholder="Due Date"
                                    className={`border p-2 mb-2 md:mb-0 md:mr-2 flex-grow ${errors.dueDate && touched.dueDate ? 'border-red-500' : ''}`}
                                />
                                <ErrorMessage name="dueDate" component="div" className="text-red-500" />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white p-2 flex-grow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                            >
                                Add Todo
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>

            {isTaskCompleted && <Confetti width={width} height={height} />}

            <div className="bg-green-100 p-4 rounded-lg shadow-lg">
                <div className="mb-4 flex flex-wrap gap-2 justify-between items-center">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`p-2 ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'} hover:bg-blue-400 transition-colors duration-200`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setActiveTab('nonCompleted')}
                            className={`p-2 ${activeTab === 'nonCompleted' ? 'bg-blue-500 text-white' : 'bg-gray-200'} hover:bg-blue-400 transition-colors duration-200`}
                        >
                            Non-Completed
                        </button>
                        <button
                            onClick={() => setActiveTab('completed')}
                            className={`p-2 ${activeTab === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'} hover:bg-blue-400 transition-colors duration-200`}
                        >
                            Completed
                        </button>
                    </div>
                    <div className="flex gap-4">
                        <FontAwesomeIcon 
                            onClick={() => toggleView('currentView')} 
                            icon={faAddressCard} 
                            className="h-8 w-8 cursor-pointer hover:text-blue-500 transition-colors duration-200" 
                        />
                        <FontAwesomeIcon 
                            onClick={() => toggleView('tableView')} 
                            icon={faTable} 
                            className="h-8 w-8 cursor-pointer hover:text-blue-500 transition-colors duration-200" 
                        />
                    </div>
                </div>
                <div>
                    <div>
                        {filteredTodos.map(todo => {
                            const dueDate = todo.dueDate ? new Date(todo.dueDate) : new Date();
                            const isOverdue = isBefore(dueDate, new Date()) && todo.isComplete === false;
                            const isDueSoon = differenceInDays(dueDate, new Date()) <= 2 && !isOverdue && todo.isComplete === false;
                            return (
                                <li key={todo.id}
                                    className={`border p-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center rounded-lg shadow-lg transition-transform transform hover:scale-105 ${isOverdue ? 'bg-red-300' : isDueSoon ? 'bg-orange-300' : 'bg-white'
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
                                            className="bg-green-500 text-white p-2 mr-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                                        >
                                            {todo.isComplete ? 'Mark Incomplete' : 'Mark Complete'}
                                        </button>
                                        <button
                                            onClick={() => showDeleteConfirm(todo.id)}
                                            className="bg-red-500 text-white p-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            )
                        })}
                    </div>
                </div>
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