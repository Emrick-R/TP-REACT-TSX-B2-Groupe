import {configureStore} from "@reduxjs/toolkit";
import userReducer from './reducers/user'
import recipeReducer from './reducers/recipe'
import userLogged from "./reducers/userLogged.ts";
import loading from "./reducers/loading.ts";

export const store = configureStore({
    reducer: {
        user: userReducer,
        recipe: recipeReducer,
        userLogged: userLogged,
        loading: loading
    },
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']