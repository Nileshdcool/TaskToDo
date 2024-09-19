import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import todoReducer from './todoSlice';

const makeStore = () =>
    configureStore({
        reducer: {
            todos: todoReducer,
        },
    });

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export const wrapper = createWrapper(makeStore);