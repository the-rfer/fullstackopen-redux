import { useSelector, useDispatch } from 'react-redux';
import { incrementVotes } from '../reducers/anecdotesReducer';

const AnecdoteList = () => {
    const stateAnecdotes = useSelector((state) => state.anecdotes);
    const filter = useSelector((state) => state.filter);

    const filteredAnecdotes = stateAnecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );

    const anecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes);

    const dispatch = useDispatch();

    const vote = (id) => {
        dispatch(incrementVotes({ id: id }));
    };

    return (
        <>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
        </>
    );
};
export default AnecdoteList;
