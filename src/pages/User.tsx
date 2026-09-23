import './css/User.css'
import {useParams} from 'react-router-dom'
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";
import UserCard from "../components/UserCard.tsx";


function Utilisateur() {
    let navigate = useNavigate();
    let {userid} = useParams();

    const users = useSelector((state: RootState) => state.user.users)
    const user = users.find((u) => Number(userid) == u.id)

    if (!user) {
        navigate("/404")
        return null
    }
    return (
        <section className="page">
            <div id="center" className="detail-card">
                <UserCard user={user}/>
                <button className="btn-back" onClick={() => navigate(-1)}> Retour</button>
            </div>
        </section>
    );
}

export default Utilisateur;
