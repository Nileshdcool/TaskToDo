import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, wrapper } from '../store';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../store/todoSlice';
import { Todo } from '@/types/todo.interface';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import SearchBar from '@/components/SearchBar';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import TodoFilters from '@/components/TodoFilters';
import TodoStats from '@/components/TodoStats';
import Pagination from '@/components/Pagination';
import { Tab } from '@/enums/tab.enums';

const HomePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { todos, error } = useSelector((state: RootState) => state.todos);
    const [isTaskCompleted, setIsTaskCompleted] = useState(false);
    const { width, height } = useWindowSize();

    const [activeTab, setActiveTab] = useState<Tab>(Tab.All);
    const [viewMode, setViewMode] = useState<'currentView' | 'tableView'>('currentView');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const showDeleteConfirm = (id: string) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <DeleteConfirmDialog
                        onConfirm={() => { handleDeleteTodo(id); onClose(); }}
                        onCancel={onClose}></DeleteConfirmDialog>
                );
            },
            overlayClassName: "custom-overlay"
        });
    };

    const toggleView = (mode: 'currentView' | 'tableView') => {
        setViewMode(mode);
    };

    useEffect(() => {
        dispatch(fetchTodos({ pageNumber: currentPage, pageSize: itemsPerPage }));
    }, [dispatch, currentPage]);

    const handleCreateTodo = (values: Omit<Todo, 'id'>) => {
        const todoWithId: Todo = { ...values, id: uuidv4() };
        dispatch(createTodo(todoWithId))
            .unwrap()
            .then(() => {
                toast.success('Todo created successfully');
            });
    };

    const handleUpdateTodo = (id: string, updatedTodo: Partial<Todo>) => {
        updatedTodo?.isComplete ? setIsTaskCompleted(true) : setIsTaskCompleted(false);
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
        if (searchQuery && !todo.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="bg-yellow-100 p-4 mb-4 rounded-lg shadow-lg">
            <TodoForm handleCreateTodo={handleCreateTodo} />
            </div>

            {isTaskCompleted && <Confetti width={width} height={height} />}

            <div className="mb-4">
            <SearchBar onSearch={handleSearch} />
            </div>

            <div className="mb-4">
            <TodoStats todos={todos} />
            </div>

            <div className="bg-green-100 p-4 rounded-lg shadow-lg mb-4">
            <TodoFilters activeTab={activeTab} onTabChange={setActiveTab} viewMode={viewMode} onToggleView={toggleView} />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
            <TodoList todos={filteredTodos} onUpdate={handleUpdateTodo} onDelete={showDeleteConfirm} />
            </div>

            <div className="flex justify-center">
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(todos.length / itemsPerPage)}
                onPageChange={handlePageChange}
            />
            </div>
        </div>
    );
};

export default HomePage;

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        try {
            await store.dispatch(fetchTodos({ pageNumber: 1, pageSize: 10 }));
            return { props: {} };
        } catch (error) {
            return { props: {} };
        }
    }
);