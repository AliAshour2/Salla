import { createSlice , PayloadAction } from "@reduxjs/toolkit";


interface TokenState {
    token : string | null ;
}


const initialState : TokenState = {
    token : null ,
}

const tokenSlice = createSlice(
    {
        name : 'token' ,
        initialState ,
        reducers: {
            setToken(state , action : PayloadAction<string | null>){
                state.token = action.payload
            },
            clearToken(state){
                state.token = null;
            }
        }
    }
)
export const selectToken = (state: { token: TokenState }) => state.token.token;
export const { setToken , clearToken } = tokenSlice.actions;
export default tokenSlice.reducer