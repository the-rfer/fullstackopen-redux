const filterReducer = (state = 'ALL', action) => {
    console.log(state);

    if (action.payload === '') return (action.type = 'ALL');

    switch (action.type) {
        case 'SET_FILTER':
            return action.payload;
        default:
            return state;
    }
};

export const filterChange = (filter) => {
    return {
        type: 'SET_FILTER',
        payload: filter,
    };
};

export default filterReducer;
