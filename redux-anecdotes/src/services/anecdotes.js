import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const createAnecdote = async (post) => {
    const response = await axios.post(baseUrl, post);
    return response.data;
};

const incrementVotes = async (id, votes) => {
    const response = await axios.patch(`${baseUrl}/${id}`, {
        votes: votes + 1,
    });
    return response.data;
};

export default { getAll, createAnecdote, incrementVotes };
