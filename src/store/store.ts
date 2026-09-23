import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/user'
import recipeReducer from './reducers/recipe'
import userLogged from "./reducers/userLogged.ts";
import loading from "./reducers/loading.ts";
import citationReducer from "./reducers/citation.ts";
import post from "./reducers/post.ts";
import comment from "./reducers/comment.ts";

export const store = configureStore({
    reducer: {
        user: userReducer,
        recipe: recipeReducer,
        userLogged: userLogged,
        loading: loading,
        citation: citationReducer,
        post: post,
        comment: comment
    },
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']