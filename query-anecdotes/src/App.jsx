import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, updateVotes } from './components/requests';

const App = () => {
    const queryClient = useQueryClient();

    const updateVotesMutation = useMutation({
        mutationFn: updateVotes,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
    });

    const handleVote = (anecdote) => {
        console.log('vote');
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

            <Notification />
            <AnecdoteForm />

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
