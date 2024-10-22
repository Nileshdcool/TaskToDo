import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TodoState } from '@/types/todo-state.interface';
import { fetchTodos as fetchTodosService, createTodo as createTodoService, updateTodo 
    as updateTodoService, deleteTodo as deleteTodoService } from '@/services/todo.service';
import { Todo } from '@/types/todo.interface';

const initialState: TodoState = {
    todos: [],
    error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async ({ pageNumber, pageSize }: { pageNumber: number, pageSize: number }) => {
    return await fetchTodosService(pageNumber,pageSize);
});

export const createTodo = createAsyncThunk('todos/createTodo', async (newTodo: Todo) => {
    await createTodoService(newTodo);
    return newTodo;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, updatedTodo }: { id: string, updatedTodo: Partial<Todo> }) => {
    await updateTodoService(id, updatedTodo);
    const updatedTodoWithId = { ...updatedTodo, id };
    return updatedTodoWithId;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: string) => {
    await deleteTodoService(id);
    return id;
});

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = {
                        ...state.todos[index],
                        ...action.payload,
                    };
                }
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            });
    },
});

export default todoSlice.reducer;