import {Navigate} from "react-router-dom"

import {useAuth} from "../hooks/useAuth"

const PrivateRoute = () => {

   const {user} = useAuth();
   if (user === null) return <Navigate to = "/error"/>
   return children; 
}

export default PrivateRoute
