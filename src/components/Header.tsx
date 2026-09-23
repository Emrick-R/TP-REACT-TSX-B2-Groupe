import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState, store } from "../store/store.ts";
import { clearUserLogged } from "../store/reducers/userLogged.ts";

function Header() {
    const user = useSelector((state: RootState) => state.userLogged.userLogged)

    return (
        <header className="main-header">
            <ul className="nav-list">
                <li>
                    <header><Link to={"/"}>Home</Link></header>
                </li>
                <li>
                    <header><Link to={"/userList"}>Liste des utilisateurs</Link></header>
                </li>
                <li>
                    <header><Link to={"/postlist"}>Liste des Posts</Link></header>
                </li>
                <li>
                    {user ?
                        (<header><Link to={"/profile"}>Mon profil</Link></header>)
                        :
                        (<header><Link to={"/connexion"}>Connexion</Link></header>)
                    }
                </li>
                <li>
                    {user ?
                        ((<header><Link to={"/"} onClick={() => {
                            store.dispatch(clearUserLogged())
                        }}>Déconnexion</Link></header>))
                        :
                        (<></>)
                    }
                </li>
            </ul>
        </header>
    );
}

export default Header