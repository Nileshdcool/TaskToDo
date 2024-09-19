import { Todo } from '@/types/todo.interface';
import axiosInstance from './axiosInstance.service';

export const fetchTodos = async () => {
    const response = await axiosInstance.get('/Todo');
    return response.data;
};

export const createTodo = async (newTodo: Omit<Todo, 'id'>) => {
    const response = await axiosInstance.post('/Todo', newTodo);
    return response.data;
};

export const updateTodo = async (id: string, updatedTodo: Partial<Todo>) => {
    const response = await axiosInstance.put(`/Todo/${id}`, updatedTodo);
    return response.data;
};

export const deleteTodo = async (id: string) => {
    const response = await axiosInstance.delete(`/Todo/${id}`);
    return response.data;
};