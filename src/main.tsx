import {createRoot} from 'react-dom/client'
import {RouterProvider} from "react-router/dom"
import './pages/css/index.css'

import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import axios from "axios";
import type {User} from "./types/user.ts";
import {setUsers} from "./store/reducers/user.ts";
import type {Recipe} from "./types/recipe.ts";
import {setRecipes} from "./store/reducers/recipe.ts";
import {clearUserLogged, setUserLogged} from "./store/reducers/userLogged.ts";
import route from "./routes/route.tsx";
import {setLoading} from "./store/reducers/loading.ts";


interface UsersResponse {
    users: User[];
}

async function getUsers() {
    try {
        const url = "https://dummyjson.com/users";
        const response = await axios.get<UsersResponse>(url);
        store.dispatch(setUsers(response.data.users))
        console.log("appel Users")
    } catch (e) {
        console.log(e);
    }
}

interface RecipeResponse {
    recipes: Recipe[];
}

async function getRecipes() {
    try {
        const url = "https://dummyjson.com/recipes";
        const response = await axios.get<RecipeResponse>(url);
        store.dispatch(setRecipes(response.data.recipes))
        console.log("appel Recipes")
    } catch (e) {
        console.log(e);
    }
}

async function getMe() {
    const token = localStorage.getItem("accesstoken")
    if (token) {
        try {
            const url = "https://dummyjson.com/auth/me";
            const response = await axios.get<User>(url,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );
            store.dispatch(setUserLogged(response.data))
            console.log("appel Me")
        } catch (e) {
            store.dispatch(clearUserLogged())
            console.log(e);
        }
    }
}

Promise.all([getUsers(), getRecipes(), getMe()]).catch((e) =>
    console.log(e)
).finally(() =>
    store.dispatch(setLoading(false))
)

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={route}/>
    </Provider>
)
