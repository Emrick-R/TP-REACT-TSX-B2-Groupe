// Page de connexion : Formulaire permettant de se connecter. La validation se fait
// côté client en vérifiant que les identifiants saisis correspondent bien à un utilisateur
// existant dans le deuxième fichier JSON (users.json).
import {type SyntheticEvent, useState} from "react";

// On récupère les
import axios from "axios";
import type {User} from "../types/user.ts";
import {store} from "../store/store.ts";
import {clearUserLogged, setUserLogged} from "../store/reducers/userLogged.ts";
import {useNavigate} from "react-router-dom";

interface UserResponse {
    id: number;
    image: string;
    username: string;
    accessToken: string;
}

function Connexion() {
    let [username, setUsername] = useState("")
    let [mdp, setMdp] = useState("")
    let navigate = useNavigate();
    // On précise qu'useOutletContext() contient et est typé comme pour le header, il faut que les nom soient exactement comme dans le contexte de l'outlet
    // let {setUserid} = useOutletContext<{ userid: string | null, setUserid: Dispatch<SetStateAction<string | null>> }>()

    // le type de l'event est un submit de formulaire HTML
    async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
        // on empêche le rafraichissement automatique
        e.preventDefault()

        const url = `https://dummyjson.com/auth/login`;
        try {
            const response = await axios.post<UserResponse>(url,
                {
                    username: username,
                    password: mdp
                },
                {
                    headers: {'Content-Type': "application/json"},
                    withCredentials: true
                }
            )
            const token = response.data.accessToken
            console.log("succès", response.data)
            localStorage.setItem("accesstoken", token)

            if (token) {
                try {
                    const url = "https://dummyjson.com/auth/me";
                    const response = await axios.get<User>(url,
                        {
                            headers: {Authorization: `Bearer ${token}`},
                            withCredentials: true
                        }
                    );
                    const user = response.data
                    store.dispatch(setUserLogged(user))
                    navigate("/profile")
                } catch (e) {
                    store.dispatch(clearUserLogged())
                    console.log(e);
                }
            }


        } catch
            (e) {
            console.log(e);
            console.log("erreur", username, mdp)
        }

        // let usernameVerif = USERS.users.find((u) => u.username === username)
        // if (usernameVerif) {
        //     if (usernameVerif.password === mdp) {
        //         localStorage.setItem("userId", String(usernameVerif.id))
        //         setUserid(String(usernameVerif.id))
        //         navigate(`/profile/${usernameVerif.id}`)
        //         return
        //     }
        // }
    }

    return (
        <section className="page">
            <div className="auth-card">
                <h1>Connexion</h1>
                <form
                    onSubmit={(e) => handleSubmit(e)}>
                    <label className="form-field">
                        Nom d'utilisateur :
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(u) => setUsername(u.target.value)}
                        />
                    </label>
                    <label className="form-field">
                        Mot de passe :
                        <input
                            type="password"
                            name="mdp"
                            value={mdp}
                            onChange={(m) => setMdp(m.target.value)}
                        />
                    </label>
                    <button type="submit" disabled={!username || !mdp} className="btn-primary">Connexion</button>
                </form>
            </div>
        </section>
    )
}

export default Connexion;