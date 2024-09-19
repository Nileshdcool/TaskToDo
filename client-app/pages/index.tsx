import { useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { Todo } from "@/types/todo.interface";
import { TodoPageProps } from "@/types/todo-props.interface";

const HomePage = ({ initialTodos }: TodoPageProps) => {
    const [todos, setTodos] = useState<Todo[]>(initialTodos);
    const [newTodo, setNewTodo] = useState<Omit<Todo, "id">>({
        name: "",
        description: "",
        comments: "",
        isComplete: false,
    });
    const [error, setError] = useState<string | null>(null);

    const createTodo = async () => {
        try {
            const response = await axios.post("/api/todo", newTodo);
            setTodos([...todos, response.data]);
            setNewTodo({ name: "", description: "", comments: "", isComplete: false });
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                setError("Todo not found.");
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };

    const updateTodo = async (id: string, updatedTodo: Partial<Todo>) => {
        try {
            await axios.put(`/api/todo/${id}`, updatedTodo);
            setTodos(todos.map(todo => (todo.id === id ? { ...todo, ...updatedTodo } : todo)));
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                setError("Todo not found.");
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };

    const deleteTodo = async (id: string) => {
        try {
            await axios.delete(`/api/todo/${id}`);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                setError("Todo not found.");
            } else {
                setError("An unexpected error occurred.");
            }
        }
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
                <button onClick={createTodo} className="bg-blue-500 text-white p-2">Add Todo</button>
            </div>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className="border p-2 mb-2 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold">{todo.name}</h2>
                            <p>{todo.description}</p>
                            <p>{todo.comments}</p>
                            <p>{todo.isComplete ? "Complete" : "Incomplete"}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => updateTodo(todo.id, { isComplete: !todo.isComplete })}
                                className="bg-green-500 text-white p-2 mr-2"
                            >
                                {todo.isComplete ? "Mark Incomplete" : "Mark Complete"}
                            </button>
                            <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 text-white p-2">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const response = await axios.get("http://localhost:5127/api/Todo");
        const initialTodos: Todo[] = response.data;

        return {
            props: {
                initialTodos,
            },
        };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return {
                notFound: true,
            };
        }
        return {
            props: {
                initialTodos: [],
            },
        };
    }
};