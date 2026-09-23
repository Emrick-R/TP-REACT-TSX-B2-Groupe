import {useParams} from 'react-router-dom'
import {useNavigate} from "react-router-dom";
import type {User} from "../types/user.ts"
import {useEffect, useState} from "react";
import axios from "axios";

interface UserResponse {
    id: number;
    image: string;
    username: string;
}

function Utilisateur() {
    let navigate = useNavigate();
    let {userid} = useParams();
    const url = `https://dummyjson.com/users/${userid}`;
    const [user, setUser] = useState<UserResponse>()
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get<User>(url);
                if (!response.data || !response.data.id) {
                    navigate("/404")
                } else {
                    setUser(response.data);
                }
            } catch (e) {
                console.log(e);
                navigate("/404")
            }
        })();
    }, []);
    if (!user) {
        // un composant react doit toujours retourner du JSX ou null. JSX de Navigate
        return
    }
    return (
        <div id="center" className="detail-card">
            <img src={user.image} alt={`Image de l\'user n°${user.id}`} className="detail-img"/>
            <h1>{user.username}</h1>
            <button className="btn-back" onClick={() => navigate(-1)}> Retour</button>
        </div>
    );
}

export default Utilisateur;