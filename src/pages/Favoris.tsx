import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";
import RecipeCard from "../components/RecipeCard.tsx";

function Favoris() {
    const userLogged = useSelector((state: RootState) => state.userLogged)
    const recipes = useSelector((state: RootState) => state.recipe.recipes)
    const recipeFav = recipes.filter((recipe) => userLogged?.favoris?.includes(recipe.id))
    return (
        <>
            <section className="page">
                <div>
                    <h1>Favoris de {userLogged.userLogged ? userLogged.userLogged.username : <></>}</h1>
                </div>
                <p>{recipeFav.length} recette{recipeFav.length > 1 ? "s" : ""} enregistrée{recipeFav.length > 1 ? "s" : ""}</p>
                {recipeFav.length === 0 ?
                    <div className="detail-card">
                        <h2>Aucun favori pour le moment</h2>
                        <p>Clique sur le cœur d’une recette pour la retrouver ici.</p>
                        <Link to="/" className="btn-back">Voir les recettes</Link>
                    </div>
                    :
                    <div className="card-grid">
                        {recipeFav.map((recipe) =>
                            <RecipeCard key={recipe.id} recipe={recipe}/>
                        )}
                    </div>
                }
            </section>
        </>
    )
}

export default Favoris
