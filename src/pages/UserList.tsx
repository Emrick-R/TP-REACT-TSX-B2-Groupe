import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";

function UserList() {
    const users = useSelector((state: RootState) => state.user.users)
    console.log(users)

    return (
        <section className="page">
            <h2>Liste des utilisateurs</h2>
            <div className="card-grid">
                {users.map((user) =>
                    <Link to={`/user/${user.id}`}>
                        {user.image?
                            <img src={user.image} alt={`Image de l\'user n°${user.id}`} className="detail-img"/>
                            :
                            <img src={"../assets/hero.png"} alt={`Image de l\'user n°${user.id}`} className="detail-img"/>
                        }
                        <h3>{user.username}</h3>
                    </Link>
                )}
            </div>
        </section>
    );
}

export default UserList;