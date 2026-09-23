import type {RootState} from "../store/store.ts";
import {useSelector} from "react-redux";
import RecipeCard from "./RecipeCard.tsx";

function RecipeList() {
    const recipes = useSelector((state: RootState) => state.recipe.recipes)
    return (
        <>
            <h2>Liste des recettes</h2>
            <div className="card-grid">
                {recipes.map((recipe) =>
                    <RecipeCard recipe={recipe}/>
                )}
            </div>
        </>
    )
}

export default RecipeList;