import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     userId : null,
     isLoggedIn : false,
     userName : ""
}
const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers :{
        login : (state,action) =>{
            state.userId = action.payload.userId
            state.isLoggedIn = true
            state.userName = action.payload.userName
        },
        logout : (state) =>{
            state.userId = null
            state.isLoggedIn = false
            state.userName = ""
        }
    }
})

export const {login , logout} = authSlice.actions;
export default authSlice.reducer;