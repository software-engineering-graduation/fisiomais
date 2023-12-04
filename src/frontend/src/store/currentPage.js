import { createSlice } from '@reduxjs/toolkit';

export const currentPage = createSlice({
    name: 'currentPage',
    initialState: {
        value: 0
    },
    reducers: {
        setPage: (state, action) => {
            state.value = action.payload; // Use action.payload to set the new value
        }
    }
});

export const { setPage } = currentPage.actions;

export default currentPage.reducer;