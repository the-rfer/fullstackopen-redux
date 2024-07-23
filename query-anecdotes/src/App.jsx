import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, updateVotes } from './components/requests';

import NotificationContext from './notificationContext';
import { useReducer } from 'react';

const App = () => {
    const notificationReducer = (state, action) => {
        switch (action.type) {
            case 'NOTIFICATION':
                return action.payload;
            default:
                return state;
        }
    };

    const [notification, notificationDispatch] = useReducer(
        notificationReducer,
        null
    );

    const queryClient = useQueryClient();

    const updateVotesMutation = useMutation({
        mutationFn: updateVotes,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
    });

    const handleVote = (anecdote) => {
        notificationDispatch({
            type: 'NOTIFICATION',
            payload: `you voted for ${anecdote.content}`,
        });
        const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
        updateVotesMutation.mutate(updatedAnecdote);
    };

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: 2,
    });

    if (result.isLoading) {
        return <div>loading data...</div>;
    }

    if (result.isError) {
        return <div>{result.error.message}</div>;
    }

    const anecdotes = result.data;

    return (
        <div>
            <h3>Anecdote app</h3>
            <NotificationContext.Provider
                value={[notification, notificationDispatch]}
            >
                <Notification />
                <AnecdoteForm />
            </NotificationContext.Provider>

            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
