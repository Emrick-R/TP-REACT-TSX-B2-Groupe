import './css/Recette.css'
//Vue détaillée : Consultation complète d’une recette sélectionnée via son identifiant
// (visuel grand format, ingrédients, étapes).
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";

function Recette() {
    let navigate = useNavigate()
    let {recetteid} = useParams()

    const recipes = useSelector((state: RootState) => state.recipe.recipes)
    console.log(recipes)
    const recipe = recipes.find((r) => Number(recetteid) == r.id)
    console.log(recipe)

    if (!recipe) {
        navigate("/404")
        return null
    }

    return (
        <section className="page">
            <div className="recipe-detail">
                <img src={recipe.image} alt="Image de la recette" className="recipe-img"/>
                <h1>{recipe.name}</h1>
                <p className="recipe-meta">{`Temps de préparation : ${recipe.prepTimeMinutes} minutes \| Temps de cuissons : ${recipe.cookTimeMinutes} minutes`}</p>
                <div className="recipe-columns">
                    <div>
                        <h2>Ingrédients</h2>
                        <ul>
                            {recipe.ingredients.map((ingredient) =>
                                <li>{ingredient}</li>
                            )
                            }
                        </ul>
                    </div>
                    <div>
                        <h2>Instruction</h2>
                        <ul>
                            {recipe.instructions.map((instruction) =>
                                <li>{instruction}</li>
                            )
                            }
                        </ul>
                    </div>
                </div>
                <button onClick={() => navigate(-1)} className="btn-back"> Retour</button>
            </div>
        </section>
    );
}

export default Recette;