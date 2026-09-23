import type {User} from "../types/user.ts";

// import {store} from "../store/store.ts";

function RecipeCard(props: { user: User }) {
    const {user} = props
    return (
        <>

            {user.image ?
                <img src={user.image} alt={`Image de l\'user n°${user.id}`} className="detail-img"/>
                :
                <img src={"../assets/hero.png"} alt={`Image de l\'user n°${user.id}`} className="detail-img"/>
            }
            <h3>{user.username}</h3>

        </>
    )
}

export default RecipeCard;