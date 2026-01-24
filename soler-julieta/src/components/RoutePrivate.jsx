import { useEffect, useState } from "react"
import * as AuthService from '../services/auth.service'
import { Navigate } from "react-router-dom"

export default function RoutePrivate({ children })
{
    const [isAuth, setIsAuth] = useState(null)

    useEffect(() => {
        AuthService.IsLogin()
        .then(data => {
            console.log("la data es", data)
            setIsAuth(true)
        })
        .catch(() => {
            setIsAuth(false)
        })
    }, [])

    if(isAuth === null) return <p>Cargando...</p>

    if(!isAuth) return <Navigate to="login" replace />
    

    return children
}