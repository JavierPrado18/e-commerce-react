import { createSlice } from '@reduxjs/toolkit';

export const isLoginSlice = createSlice({
    name: 'isLogin',
    initialState: false,
    reducers: {
        setIslogin:(state,action)=>{
            return action.payload
        }
    }
})

export const { setIslogin } = isLoginSlice.actions;

export default isLoginSlice.reducer;
