import { createSlice } from '@reduxjs/toolkit';
import anecdotes from '../services/anecdotes';

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        appendAnecdote(state, action) {
            state.push(action.payload);
        },
        incrementVotes(state, action) {
            return state.map((anecdote) =>
                anecdote.id === action.payload.id
                    ? { ...anecdote, votes: anecdote.votes + 1 }
                    : anecdote
            );
        },
        setAnecdotes(_, action) {
            return action.payload;
        },
    },
});

export const { incrementVotes, setAnecdotes, appendAnecdote } =
    anecdoteSlice.actions;

export const initializeAnecdote = () => {
    return async (dispatch) => {
        const response = await anecdotes.getAll();
        dispatch(setAnecdotes(response));
    };
};

export const createAnecdote = (content) => {
    return async (dispatch) => {
        const newAnecdote = await anecdotes.createAnecdote({
            content: content,
            votes: 0,
        });
        dispatch(appendAnecdote(newAnecdote));
    };
};

export const increaseVotes = (id, votes) => {
    return async (dispatch) => {
        const response = await anecdotes.incrementVotes(id, votes);
        dispatch(incrementVotes({ id: response.id }));
    };
};

export default anecdoteSlice.reducer;
