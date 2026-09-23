import './css/Header.css'
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
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <Link to={"/userList"}>Liste des utilisateurs</Link>
                </li>
                <li>
                    <Link to={"/CitationduJour"}>Citation du Jour</Link>
                </li>
                <li>
                    <Link to={"/postlist"}>Liste des Posts</Link>
                </li>
                <li>
                    {user ?
                        (<Link to={"/profile"}>Mon profil</Link>)
                        :
                        (<Link to={"/connexion"}>Connexion</Link>)
                    }
                </li>
                {user && (
                    <>
                        <li>
                            <Link to={"/favoris"}>Favoris</Link>
                        </li>
                        <li>
                            <Link to={"/"} onClick={() => {
                                store.dispatch(clearUserLogged())
                            }}>Déconnexion</Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
}

export default Header
