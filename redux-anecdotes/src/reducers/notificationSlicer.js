import { createSlice } from '@reduxjs/toolkit';

const notificationSlicer = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(_, action) {
            return action.payload;
        },
        clearNotification() {
            return '';
        },
    },
});

export const { setNotification, clearNotification } =
    notificationSlicer.actions;

export const createNotification = (message, time) => {
    return async (dispatch) => {
        dispatch(setNotification(message));
        setTimeout(() => {
            dispatch(clearNotification());
        }, time * 1000);
    };
};

export default notificationSlicer.reducer;
