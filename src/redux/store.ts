import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { persistStore,persistReducer } from "redux-persist";
import { PersistPartial } from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import userReducer from '../redux/slices/AuthSlice'
import { UserState } from "../interface/stateTypes";


export interface RootState{
    user:UserState
}

const rootReducers:Reducer<RootState> = combineReducers({
    user:userReducer
})

const persistConfig = {
    key:'root',
    storage
}

const persistedReducer:Reducer<RootState & PersistPartial> = persistReducer(persistConfig, rootReducers)

const store = configureStore({
    reducer:persistedReducer
})

const persistor = persistStore(store)

export {store,persistor} 
