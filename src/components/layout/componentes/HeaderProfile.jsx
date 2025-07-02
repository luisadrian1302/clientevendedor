import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export const HeaderProfile = () => {

    useEffect(() => {
        try {
            const url= window.location.href;
 
            const urlSplits = url.split("/");
    
            const route = urlSplits[urlSplits.length - 1];
    
            let url_profiles = document.querySelectorAll(".url_profile")
                
            for (let i = 0; i < url_profiles.length; i++) {
    
                if (url_profiles[i]) {
                    
                    url_profiles[i].classList.remove("url_profile")
                }
            }
    
            if (route == "crear-direccion") {
                document.querySelector("#Direcciones-y-cuentas").classList.add("active_url") 
                
            }else{

                document.querySelector("#"+route).classList.add("active_url") 
            }
        } catch (error) {
            
        }
         
        
        
    }, [])
    
  return (
    <div className="row">
        {/* Pestañas */}
        <div className="col-12">
            <ul className="nav nav-tabs ">
                <li className="nav-item " >
                    <Link className="nav-link text-dark  url_profile" id='profile' to="../profile">
                        General
                    </Link>
                </li>
                <li className="nav-item  ">
    

                    <Link className="nav-link text-dark url_profile" id='seguridad' to="../seguridad">
                        Seguridad
                    </Link>
                </li>
                <li className="nav-item ">
                    <Link className="nav-link text-dark url_profile" id='Direcciones-y-cuentas' to="../Direcciones-y-cuentas">
                        
                         Direcciones y Cuentas
                    </Link>
                </li>
                <li className="nav-item ">
                    <Link  className="nav-link text-dark url_profile" id='options' to="../options">
                        Más opciones
                    </Link > 
                </li>
            </ul>
        </div>
    </div>
  )
}
