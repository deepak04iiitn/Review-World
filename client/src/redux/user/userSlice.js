import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentUser : null,
    error : null,
    loading : false
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {                               // // here we add the logics for the functionalities we want
        signInStart : (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess : (state , action) => {
            state.currentUser = action.payload;       // user data is payload
            state.loading = false;
            state.error = null;
        },
        signInFailure : (state , action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const { signInFailure , signInStart , signInSuccess } = userSlice.actions;

export default userSlice.reducer;