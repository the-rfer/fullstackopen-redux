import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createAnecdote } from './requests';
import { useContext, useEffect } from 'react';
import NotificationContext from '../notificationContext';

const AnecdoteForm = () => {
    const [_, notificationDispatch] = useContext(NotificationContext);

    const queryClient = useQueryClient();

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
        retry: false,
    });

    const onCreate = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        newAnecdoteMutation.mutate({ content, votes: 0 });
    };

    useEffect(() => {
        if (newAnecdoteMutation.status === 'success') {
            notificationDispatch({
                type: 'NOTIFICATION',
                payload: `you created ${newAnecdoteMutation.variables.content}`,
            });
        }
        if (newAnecdoteMutation.status === 'error') {
            notificationDispatch({
                type: 'NOTIFICATION',
                payload: `the anecdote is too short`,
            });
        }
    }, [newAnecdoteMutation.status]);

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote' />
                <button type='submit'>create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
