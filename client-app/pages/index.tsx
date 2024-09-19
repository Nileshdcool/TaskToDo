import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, wrapper } from '../store';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../store/todoSlice';
import { Todo } from '@/types/todo.interface';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

const HomePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { todos, error } = useSelector((state: RootState) => state.todos);
    const [isTaskCompleted, setIsTaskCompleted] = useState(false);
    const { width, height } = useWindowSize();

    useEffect(() => {
        dispatch(fetchTodos())
            .unwrap()
            .then(() => {
                toast.success('Todos fetched successfully');
            })
            .catch((err) => toast.error(`Error fetching todos: ${err.message}`));
    }, []);

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        comments: Yup.string().required('Comments are required'),
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
                toast.success('Todo updated successfully')
            })
            .catch((err) => {
                setIsTaskCompleted(false);
            });
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
            <Formik
                initialValues={{ name: '', description: '', comments: '', isComplete: false }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    handleCreateTodo(values);
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
                        <button type="submit" className="bg-blue-500 text-white p-2 flex-grow">
                            Add Todo
                        </button>
                    </Form>
                )}
            </Formik>
            {isTaskCompleted && <Confetti width={width} height={height} />}
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