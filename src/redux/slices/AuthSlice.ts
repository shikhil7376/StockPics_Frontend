import {createSlice,PayloadAction} from '@reduxjs/toolkit'
import { UserState } from '../../interface/stateTypes'
import { signupTypes } from '../../interface/dataTypes'



const initialState:UserState = {
    userdata:null
}


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredential:(state,action:PayloadAction<signupTypes>)=>{
            state.userdata = action.payload
        },
        clearUserdata:(state)=>{
            state.userdata = null
        }
    }
})

export const {setCredential,clearUserdata} = authSlice.actions

export default authSlice.reducer