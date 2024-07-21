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
export default notificationSlicer.reducer;
