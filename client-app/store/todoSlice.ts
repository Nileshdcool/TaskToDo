import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Todo } from '@/types/todo.interface';

interface TodoState {
    todos: Todo[];
    error: string | null;
}

const initialState: TodoState = {
    todos: [],
    error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await axios.get('http://localhost:5127/api/Todo');
    return response.data;
});

export const createTodo = createAsyncThunk('todos/createTodo', async (newTodo: Omit<Todo, 'id'>) => {
    const response = await axios.post('/api/todo', newTodo);
    return response.data;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, updatedTodo }: { id: string, updatedTodo: Partial<Todo> }) => {
    await axios.put(`/api/todo/${id}`, updatedTodo);
    return { id, updatedTodo };
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: string) => {
    await axios.delete(`/api/todo/${id}`);
    return id;
});

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
                state.todos = action.payload;
            })
            .addCase(createTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.todos.push(action.payload);
            })
            .addCase(updateTodo.fulfilled, (state, action: PayloadAction<{ id: string, updatedTodo: Partial<Todo> }>) => {
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = { ...state.todos[index], ...action.payload.updatedTodo };
                }
            })
            .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            })
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action:any) => {
                    state.error = action.error.message || 'An unexpected error occurred.';
                }
            );
    },
});

export default todoSlice.reducer;