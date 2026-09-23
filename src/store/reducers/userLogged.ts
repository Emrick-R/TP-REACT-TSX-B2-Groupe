import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {User} from '../../types/user.ts'

interface UserLoggedState {
    userLogged: User | null
    favoris: number[] | null
}

const initialState: UserLoggedState = {
    userLogged: null,
    favoris: null
}

export const userLoggedSlice = createSlice({
    name: 'userLogged',
    initialState,
    reducers: {
        setUserLogged: (state, action: PayloadAction<User | null>) => {
            state.userLogged = action.payload
        },
        clearUserLogged: (state) => {
            state.userLogged = null
            localStorage.removeItem("accesstoken")
        },
        setFavoris: (state, action: PayloadAction<number>) => {
            const id = action.payload
            if (!state.favoris) {
                state.favoris = [id]
            } else {
                state.favoris.push(id)
            }
            console.log("ajouté")
            console.log(JSON.parse(JSON.stringify(state.favoris)))
        },
        clearFavoris: (state, action: PayloadAction<number>) => {
            const id = action.payload
            if (state.favoris) {
                if (state.favoris.length === 1) {
                    state.favoris = []
                } else {
                    state.favoris = state.favoris.filter((favId) => favId !== id)
                }
            }

            console.log("supprimé")
            console.log(JSON.parse(JSON.stringify(state.favoris)))
        }
    },
})

export const {setUserLogged, clearUserLogged, setFavoris, clearFavoris} = userLoggedSlice.actions

export default userLoggedSlice.reducer