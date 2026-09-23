import './css/Profile.css'
//Page de profil : En cas de correspondance, redirection automatique de l'utilisateur
// vers sa page de profil (avec affichage de toutes ses informations fournies dans
// users.json).
import {Navigate} from 'react-router-dom'
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";

function Profile() {
    let navigate = useNavigate();
    const userData = useSelector((state: RootState) => state.userLogged.userLogged)
    if (!userData) {
        // un composant react doit toujours retourner du JSX ou null. JSX de Navigate
        return <Navigate to={"/404"}/>
    }
    return (
        <div id="center" className="detail-card">
            {userData.image ?
                <img src={userData.image} alt={`Image de l'user n°${userData.id}`} className="detail-img"/>
                :
                <img src={"../assets/hero.png"} alt={`Image de l'user n°${userData.id}`} className="detail-img"/>
            }
            <div>
                <h1>{userData.username}</h1>
                <p className="badge">{userData.role}</p>
            </div>
            <div className="info-block">
                <p>{userData.lastName} {userData.firstName} {userData.maidenName ? `(née ${userData.maidenName})` : ""}</p>
                <p>{userData.email} | {userData.phone}</p>
                <p>né le {userData.birthDate} - {userData.age} ans - {userData.gender}</p>
            </div>

            <div className="info-block">
                <h2>Caractéristiques</h2>
                <p>Taille : {userData.height} cm | Poids : {userData.weight} kg</p>
                <p>Couleur des yeux : {userData.eyeColor}</p>
                {userData.hair ?
                    <p>Cheveux : {userData.hair.color} - {userData.hair.type}</p>
                    :
                    <></>
                }
                <p>Groupe sanguin : {userData.bloodGroup}</p>
            </div>

            {userData.address ?
                <div className="info-block">
                    <h2>Adresse</h2>
                    <p>{userData.address.address}</p>
                    <p>{userData.address.city} {userData.address.state} ({userData.address.stateCode}) {userData.address.postalCode}</p>
                    <p>{userData.address.country}</p>
                </div>
                :
                <></>
            }

            {userData.company ?
                <div className="info-block">
                    <h2>Entreprise</h2>
                    <p>{userData.company.name}</p>
                    <p>Service {userData.company.department} - {userData.company.title}</p>
                    {userData.company.address ?
                        <p>{userData.company.address.address}, {userData.company.address.city} ({userData.company.address.country})</p>
                        :
                        <></>
                    }
                </div>
                :
                <></>
            }

            {userData.university ?
                <div className="info-block">
                    <h2>Études</h2>
                    <p>{userData.university}</p>
                </div>
                :
                <></>
            }

            {userData.bank ?
                <div className="info-block">
                    <h2>Banque</h2>
                    <p>Carte {userData.bank.cardType} se terminant par {userData.bank.cardNumber?.slice(-4)}</p>
                    <p>Devise : {userData.bank.currency} | IBAN : {userData.bank.iban}</p>
                </div>
                :
                <></>
            }

            {userData.crypto ?
                <div className="info-block">
                    <h2>Cryptomonnaie</h2>
                    <p>{userData.crypto.coin} ({userData.crypto.network})</p>
                    <p>Wallet : {userData.crypto.wallet}</p>
                </div>
                :
                <></>
            }

            <div className="info-block">
                <h2>Identifiants techniques</h2>
                <p>IP : {userData.ip} | MAC : {userData.macAddress}</p>
                <p>EIN : {userData.ein} | SSN : {userData.ssn}</p>
            </div>

            <button onClick={() => navigate(-1)} className="btn-back"> Retour</button>
        </div>
    );
}

export default Profile;