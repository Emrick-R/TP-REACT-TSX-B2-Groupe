import { createBrowserRouter, Outlet } from "react-router";
import App from "../pages/App.tsx";
import UserList from "../pages/UserList.tsx";
import Utilisateur from "../pages/User.tsx";
import CitationDuJour from "../pages/Citation.tsx";
import Recette from "../pages/Recette.tsx";
import GuestRoute from "./GuestRoute.tsx";
import Connexion from "../pages/Connexion.tsx";
import Profile from "../pages/Profile.tsx";
import Err404 from "../pages/Err404.tsx";
import Header from "../components/Header.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import Favoris from "../pages/Favoris.tsx";
import Post from "../pages/Post.tsx";
import PostList from "../pages/PostList.tsx";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

const route = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <App />
            },
            {
                path: "/userList",
                element: <UserList />
            },
            {
                path: "/user/:userid",
                element: <Utilisateur />
            },
            {
                path: "/recette/:recetteid",
                element: <Recette />
            },
            {
                path: "/citationdujour",
                element: <CitationDuJour />
            },
            {
                path: "/post/:postid",
                element: <Post/>
            },
            {
                path: "/postlist",
                element: <PostList/>
            },
            {
                path: "/connexion",
                element: <GuestRoute>
                    <Connexion />
                </GuestRoute>
            },
            {
                path: "/profile",
                element: <PrivateRoute>
                    <Profile />
                </PrivateRoute>
            },
            {
                path: "/favoris",
                element: <PrivateRoute>
                    <Favoris/>
                </PrivateRoute>
            },
            {
                path: "/404",
                element: <Err404 />
            },
            {
                path: "*",
                element: <Err404 />
            }
        ]
    }
]);

export default route