import { BrowserRouter, Route, Router, Routes, useLocation } from "react-router-dom"
import PrincipalRouter from "./PrincipalRouter"
import {Welcome} from "../components/pages/Welcome"
import { useEffect } from "react"
import { Login } from "../components/pages/Login"
import { ProtectedRoute } from "./ProtectedRoute"
import { ProtectedExample } from "../components/pages/ProtectedExample"
import Header from "../components/layout/Header"
import 'bootstrap/dist/css/bootstrap.min.css';

import { Register } from "../components/pages/Register"
import Confirmacion from "../components/pages/Confirmacion"
import { useDispatch, useSelector } from "react-redux"
import { authLogin } from "../actions/AuthAction"
import { Profile } from "../components/pages/Profile/Profile"
import { URLAPI } from "../url"
import { Seguridad } from "../components/pages/Profile/Seguridad"
import { Options } from "../components/pages/Profile/Options"
import { Productos } from "../components/pages/vendedor_basico/Productos"
import { ProductModification } from "../components/pages/vendedor_basico/ProductModification"

const AppRouter = props => {

    const {isAuth, isCheckout} = useSelector(re => re.AuthReducer);

    const dispatch = useDispatch();

    

    // useEffect(() => {
    //     let token = localStorage.getItem("token");
    // }, [isAuth])

    useEffect(() => {
        let token = localStorage.getItem("token");
        // verificar usuarios
        dispatch(authLogin(token))

    }, [])
 
    

    return (

        <div className="">
            <BrowserRouter>

                <Header isAuth={isAuth}/>

                <Routes>
                    <Route  path="/" element={<PrincipalRouter/>}>
                         <Route path="/" element={<Welcome />} />   

  
                         <Route path="/login" element={<Login />} />  
                         <Route path="/register" element={<Register />} />  
                         <Route path="/confirmar" element={<Confirmacion />} />  
                         

                         {/* <Route path="/example" element={<ProtectedRoute login={isAuth} route={<ProtectedExample/>}/>} />   */}
                         <Route path="/profile" element={<ProtectedRoute login={isAuth} isCheckout={isCheckout} route={<Profile/>}/>} />  
                         <Route path="/seguridad" element={<ProtectedRoute login={isAuth} isCheckout={isCheckout} route={<Seguridad/>}/>} />  
                         <Route path="/Options" element={<ProtectedRoute login={isAuth} isCheckout={isCheckout} route={<Options/>}/>} />  
                         <Route path="/vendedorProductos" element={<ProtectedRoute login={isAuth} isCheckout={isCheckout} route={<Productos/>}/>} />  
                         <Route path="/products/create" element={<ProtectedRoute login={isAuth} isCheckout={isCheckout} route={<ProductModification/>}/>} />  


                    </Route>


                    
                    


                    
                </Routes>

            </BrowserRouter>
        </div>
    )

}

AppRouter.propTypes = {}
export default AppRouter;