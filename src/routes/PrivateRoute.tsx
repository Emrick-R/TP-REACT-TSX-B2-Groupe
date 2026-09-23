import type {ReactNode} from "react";
import {useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";
import {Navigate} from "react-router-dom";


interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({children}: PrivateRouteProps) => {
    const loggedUser = useSelector((state: RootState) => state.userLogged.userLogged)
    const loading = useSelector((state: RootState) => state.loading)
    if (loading.value) return <div>Loading...</div>
    return loggedUser ? <>{children}</> : <Navigate to="/" replace/>
}

export default PrivateRoute