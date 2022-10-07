import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {

    const isToken=()=>{
        const token = localStorage.getItem("token");
    return token !== ""
    }
		
    if(isToken()){
        return <Outlet />
    } else { 
        return <Navigate to='/login' />
    }                     // Aquí le debemos decir la ruta a la que queremos llevar
};                        // al usuario si no está autenticado

export default ProtectedRoutes;