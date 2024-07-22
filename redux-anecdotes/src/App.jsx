import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAnecdote } from './reducers/anecdotesReducer';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeAnecdote());
    }, []);

    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    );
};

export default App;
