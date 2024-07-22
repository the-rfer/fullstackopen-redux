import { useSelector, useDispatch } from 'react-redux';
import { increaseVotes } from '../reducers/anecdotesReducer';
import { createNotification } from '../reducers/notificationSlicer';

const AnecdoteList = () => {
    const stateAnecdotes = useSelector((state) => state.anecdotes);
    const filter = useSelector((state) => state.filter);

    const filteredAnecdotes = stateAnecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );

    const anecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes);

    const dispatch = useDispatch();

    const vote = (anecdote) => {
        dispatch(increaseVotes(anecdote.id, anecdote.votes));
        dispatch(createNotification(`You voted on "${anecdote.content}"`, 5));
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
