import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../app/reducers/reducer';

export const store = configureStore({
    reducer: {
        users: usersReducer,
    },
});
