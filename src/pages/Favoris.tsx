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
                <h2>Liste des recettes</h2>
                {recipeFav.length === 0 ?
                    <h3>Aucun favoris</h3>
                    :
                    <div className="card-grid">
                {recipeFav.map((recipe) =>
                    <RecipeCard recipe={recipe}/>
            )}
        </div>
                }
            </section>
        </>
    )
}

export default Favoris
