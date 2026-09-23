import './css/Err404.css'
import {Link} from "react-router-dom";

function Err404() {
    return (
        <section className="page">
            <div className="error-card">
                <h1>404</h1>
                <h2>Element introuvable</h2>
                <div className="error-actions">
                    <Link to={"/"} className="btn-primary">Retour à l'accueil</Link>
                </div>
            </div>
        </section>
    );
}

export default Err404;