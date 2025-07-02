import React, { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { cerrarSesionAuth } from '../actions/AuthAction';
import { useDispatch } from 'react-redux';
import { verificarUser } from '../helper/isVendedor';

export const ProtectedRoute = ({route, login, isCheckout}) => {

 

  const navegate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  useEffect(() => {
    let isAuth = localStorage.getItem("token");

    // comprar estado de autenticacion.... 
    // obtener reducer para hacer la autenticacion en java
  
    async function getUser() {
         
      let isAuthenticate = await verificarUser(localStorage.getItem("token"));
      if (!isAuthenticate) {
          console.log("close");
          dispatch(cerrarSesionAuth(navegate));
      }
  }
  getUser();

  localStorage.setItem("route", location.pathname);
  

    
}, [route])

  return (
    <>
    
        {login === true || isCheckout == false ? route : <Navigate to="/login" />}
    </>
  )
}
