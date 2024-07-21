import { useSelector, useDispatch } from 'react-redux';
import { incrementVotes } from '../reducers/anecdotesReducer';
import {
    setNotification,
    clearNotification,
} from '../reducers/notificationSlicer';

const AnecdoteList = () => {
    const stateAnecdotes = useSelector((state) => state.anecdotes);
    const filter = useSelector((state) => state.filter);

    const filteredAnecdotes = stateAnecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );

    const anecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes);

    const dispatch = useDispatch();

    const vote = (anecdote) => {
        dispatch(incrementVotes({ id: anecdote.id }));
        dispatch(setNotification(`You voted on "${anecdote.content}"`));
        setTimeout(() => {
            dispatch(clearNotification());
        }, 5000);
    };

    return (
        <>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
        </>
    );
};
export default AnecdoteList;
