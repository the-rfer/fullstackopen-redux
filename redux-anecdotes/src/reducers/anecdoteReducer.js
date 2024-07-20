const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0,
    };
};

export const incrementVotes = (id) => {
    return { type: 'VOTE', payload: { id } };
};

export const createAnecdote = (content) => {
    return { type: 'NEW_ANECDOTE', payload: { content } };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = initialState, action) => {
    if (action.type === 'VOTE') {
        return state.map((anecdote) =>
            anecdote.id === action.payload.id
                ? { ...anecdote, votes: anecdote.votes + 1 }
                : anecdote
        );
    } else if (action.type === 'NEW_ANECDOTE') {
        return state.concat({
            content: action.payload.content,
            id: getId(),
            votes: 0,
        });
    }

    return state;
};

export default anecdoteReducer;
