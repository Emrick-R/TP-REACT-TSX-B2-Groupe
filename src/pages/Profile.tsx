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
        <article id="center" className="detail-card">
            <header>
                {userData.image ?
                    <img src={userData.image} alt={`Image de l'user n°${userData.id}`} className="detail-img"/>
                    :
                    <img src={"../assets/hero.png"} alt={`Image de l'user n°${userData.id}`} className="detail-img"/>
                }
                <div>
                    <h1>{userData.username}</h1>
                    <p className="badge">{userData.role}</p>
                </div>
            </header>
            <div className="info-block">
                <h2>Informations personnelles</h2>
                <dl>
                    <dt>Nom</dt>
                    <dd>{userData.lastName} {userData.firstName} {userData.maidenName ? `(née ${userData.maidenName})` : ""}</dd>
                    <dt>Email</dt>
                    <dd>{userData.email}</dd>
                    <dt>Téléphone</dt>
                    <dd>{userData.phone}</dd>
                    <dt>Date de naissance</dt>
                    <dd>{userData.birthDate}</dd>
                    <dt>Âge</dt>
                    <dd>{userData.age} ans</dd>
                    <dt>Genre</dt>
                    <dd>{userData.gender}</dd>
                </dl>
            </div>

            <div className="info-block">
                <h2>Caractéristiques</h2>
                <dl>
                    <dt>Taille</dt>
                    <dd>{userData.height} cm</dd>
                    <dt>Poids</dt>
                    <dd>{userData.weight} kg</dd>
                    <dt>Couleur des yeux</dt>
                    <dd>{userData.eyeColor}</dd>
                    {userData.hair ?
                        <>
                            <dt>Cheveux</dt>
                            <dd>{userData.hair.color} - {userData.hair.type}</dd>
                        </>
                        :
                        <></>
                    }
                    <dt>Groupe sanguin</dt>
                    <dd>{userData.bloodGroup}</dd>
                </dl>
            </div>

            {userData.address ?
                <div className="info-block">
                    <h2>Adresse</h2>
                <dl>
                    <dt>Rue</dt>
                    <dd>{userData.address.address}</dd>
                    <dt>Ville</dt>
                    <dd>{userData.address.city} {userData.address.state} ({userData.address.stateCode}) {userData.address.postalCode}</dd>
                    <dt>Pays</dt>
                    <dd>{userData.address.country}</dd>
                </dl>
            </div>
                :
                <></>
            }

            {userData.company ?
                <div className="info-block">
                    <h2>Entreprise</h2>
                <dl>
                    <dt>Nom</dt>
                    <dd>{userData.company.name}</dd>
                    <dt>Service</dt>
                    <dd>{userData.company.department}</dd>
                    <dt>Poste</dt>
                    <dd>{userData.company.title}</dd>
                    {userData.company.address ?
                        <>
                            <dt>Adresse</dt>
                            <dd>{userData.company.address.address}, {userData.company.address.city} ({userData.company.address.country})</dd>
                        </>
                        :
                        <></>
                    }
                </dl>
            </div>
                :
                <></>
            }

            {userData.university ?
                <div className="info-block">
                    <h2>Études</h2>
                <dl>
                    <dt>Université</dt>
                    <dd>{userData.university}</dd>
                </dl>
            </div>
                :
                <></>
            }

            {userData.bank ?
                <div className="info-block">
                    <h2>Banque</h2>
                <dl>
                    <dt>Carte</dt>
                    <dd>Carte {userData.bank.cardType} se terminant par {userData.bank.cardNumber?.slice(-4)}</dd>
                    <dt>Devise</dt>
                    <dd>{userData.bank.currency}</dd>
                    <dt>IBAN</dt>
                    <dd>{userData.bank.iban}</dd>
                </dl>
            </div>
                :
                <></>
            }

            {userData.crypto ?
                <div className="info-block">
                    <h2>Cryptomonnaie</h2>
                <dl>
                    <dt>Monnaie</dt>
                    <dd>{userData.crypto.coin} ({userData.crypto.network})</dd>
                    <dt>Wallet</dt>
                    <dd>{userData.crypto.wallet}</dd>
                </dl>
            </div>
                :
                <></>
            }

            <div className="info-block">
                <h2>Identifiants techniques</h2>
                <dl>
                    <dt>IP</dt>
                    <dd>{userData.ip}</dd>
                    <dt>MAC</dt>
                    <dd>{userData.macAddress}</dd>
                    <dt>EIN</dt>
                    <dd>{userData.ein}</dd>
                    <dt>SSN</dt>
                    <dd>{userData.ssn}</dd>
                </dl>
            </div>

            <button onClick={() => navigate(-1)} className="btn-back"> Retour</button>
        </article>
    );
}

export default Profile;