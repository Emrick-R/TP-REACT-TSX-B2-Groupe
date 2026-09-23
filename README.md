# TP-REACT-TSX-B2-Groupe

## Description

Projet réalisé en groupe en B2 à Ynov pour pratiquer React et TypeScript. On utilise les données l'API DummyJSON pour afficher des recettes, des utilisateurs et une citation du jour.

## Fonctionnalités

- Voir les recettes et leurs détails (ingrédients, étapes, temps de préparation).
- Consulter la liste des utilisateurs et leurs fiches.
- Se connecter, consulter son profil et se déconnecter.
- Afficher une citation du jour.
- Afficher une page 404 si la page demandée n’existe pas.
- Poster, Lire, Modifier et Supprimer des posts/commentaires selon les droits.

## Technologies

- React et TypeScript
- React Router pour les pages
- Redux Toolkit pour partager les données
- Axios pour les appels API
- Vite

## Pré-requis

Avoir Node.js 22.12 ou supérieur, npm et Git installés. Une connexion Internet est nécessaire pour récupérer les données.

## Installation et lancement

```bash
git clone https://github.com/Emrick-R/TP-REACT-TSX-B2-Groupe.git
cd TP-REACT-TSX-B2-Groupe
npm install
npm run dev
```

Ouvrir ensuite le lien affiché dans le terminal.

## Organisation du projet

```text
src/
├── assets/       # Images
├── components/   # Header et liste des recettes
├── pages/        # Pages de l’application
│   └── css/      # Styles CSS
├── routes/       # Navigation et accès au profil
├── store/        # Données partagées avec Redux
│   └── reducers/ 
├── types/        # Types TypeScript
└── main.tsx      # Démarrage de l’application
```

## Répartition des tâches

- A. Authentification & Espace Membres | Florian / Emrick / Harold | Complétée au cours des anciens TP
- B. Gestion des Favoris (State Global Redux) | Emrick
- C. Espace Blog & Commentaires (CRUD Simulé avec Redux) | Florian
- D. Catalogue de Recettes | Florian / Emrick / Harold | Complétée au cours des anciens TP
- E. Widget "Citation du Jour" | Harold
- F. Navigation Globale, Résilience & Design | Florian / Emrick / Harold | Complétée au cours des anciens TP
- Documentation. Écriture du README | Harold

## Contributeurs

- [Florian](https://github.com/Florian-AZ)
- [Emrick](https://github.com/Emrick-R)
- [Harold](https://github.com/Harld9)
