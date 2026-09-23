import RecipeList from "../components/RecipeList.tsx"

function App() {

    return (
        <>
            <section className="page">
                <div>
                    <h1>Bienvenue sur notre site !</h1>
                </div>
                <div >
                    <RecipeList />
                </div>
            </section>
        </>
    )
}

export default App
