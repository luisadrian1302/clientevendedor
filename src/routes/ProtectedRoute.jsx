import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({route, login, isCheckout}) => {
    useEffect(() => {
        let isAuth = localStorage.getItem("token");

        // comprar estado de autenticacion.... 
        // obtener reducer para hacer la autenticacion en java
      
    }, [])

  return (
    <>
    
        {login === true || isCheckout == false ? route : <Navigate to="/login" />}
    </>
  )
}
