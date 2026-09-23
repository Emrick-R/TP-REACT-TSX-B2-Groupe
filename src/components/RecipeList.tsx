import './css/RecipeList.css'
import {Link} from "react-router-dom";
import type {RootState} from "../store/store.ts";
import {useSelector} from "react-redux";

function RecipeList() {
    const recipes = useSelector((state: RootState) => state.recipe.recipes)
    console.log(recipes)

    return (
        <>
            <h2>Liste des recettes</h2>
            <div className="card-grid">
                {recipes.map((recipe) =>
                    <Link to={`/recette/${recipe.id}`} className="card">
                        <div>
                            <img src={recipe.image} alt="Image de la recette" className="card-img"/>
                            <h3> {recipe.name}</h3>
                            <p className="card-subtitle">Temps de
                                préparation: {recipe.prepTimeMinutes} minutes</p>
                        </div>
                    </Link>
                )
                }
            </div>
        </>
    )
}

export default RecipeList;