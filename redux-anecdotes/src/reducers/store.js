import { configureStore } from '@reduxjs/toolkit';
import anecdotesReducer from './anecdotesReducer';
import filterSlicer from './filterSlicer';

export const store = configureStore({
    reducer: {
        anecdotes: anecdotesReducer,
        filter: filterSlicer,
    },
});
