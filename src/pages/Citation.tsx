import { useSelector } from "react-redux";
import type { RootState } from "../store/store.ts";
import type { Citation } from "../types/citation.ts";

function CitationDuJour() {

    function getRandom(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const aujourdhui: Date = new Date();
    const aujoudhuiDateNb: number = aujourdhui.getDate()
    const citations = useSelector((state: RootState) => state.citation.citations)
    let citationDuJour: Citation | undefined;

    //vérif pour checker si on est le 31, dans ce cas génère un id aléatoire entre 1 et 30
    if (Number(aujoudhuiDateNb) === 31) {
        const randomid: number = getRandom(1, 30)
        citationDuJour = citations.find((citation) => randomid === Number(citation.id))
        console.log("ID aléatoire :", randomid);
    } else if (Number(aujoudhuiDateNb) < 31) {
        citationDuJour = citations.find((citation) => aujoudhuiDateNb === Number(citation.id))
    }

    //vérif de l'existante de la citation du jour
    if (!citationDuJour) {
        return
    }

    return (
        <div id="center" className="detail-card">
            <h1>Citation du jour</h1>
            <h2><br></br>{citationDuJour.quote}</h2>
            <h2>De : {citationDuJour.author}</h2>
            <p>{aujourdhui.toLocaleDateString("fr-FR")}</p>
        </div>)
}

export default CitationDuJour;