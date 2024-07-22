import { configureStore } from '@reduxjs/toolkit';
import anecdotesReducer from './anecdotesReducer';
import filterSlicer from './filterSlicer';
import notificationSlicer from './notificationSlicer';

const store = configureStore({
    reducer: {
        anecdotes: anecdotesReducer,
        filter: filterSlicer,
        notification: notificationSlicer,
    },
});

export default store;
