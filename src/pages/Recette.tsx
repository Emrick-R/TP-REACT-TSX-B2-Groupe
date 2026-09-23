//Vue détaillée : Consultation complète d’une recette sélectionnée via son identifiant
// (visuel grand format, ingrédients, étapes).
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";
import {clearFavoris, setFavoris} from "../store/reducers/userLogged.ts";

function Recette() {
    let navigate = useNavigate()
    let {recetteid} = useParams()

    const userLogged = useSelector((state: RootState) => state.userLogged)
    const recipes = useSelector((state: RootState) => state.recipe.recipes)
    const recipe = recipes.find((r) => Number(recetteid) == r.id)
    const dispatch = useDispatch()

    if (!recipe) {
        navigate("/404")
        return null
    }

    return (
        <section className="page">
            <div className="recipe-detail">
                <img src={recipe.image} alt="Image de la recette" className="recipe-img"/>
                <h1>{recipe.name} {userLogged.userLogged ?
                    userLogged?.favoris?.find((favId) => favId == recipe.id) ?
                        <button onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            dispatch(clearFavoris(recipe.id));
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                 fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                            </svg>
                        </button>
                        :
                        <button onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            dispatch(setFavoris(recipe.id));
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                 fill="currentColor"
                                 className="bi bi-heart" viewBox="0 0 16 16">
                                <path
                                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                            </svg>
                        </button>
                    :
                    <></>
                }</h1>
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