import { BrowserRouter, Route, Router, Routes, useLocation } from "react-router-dom"
import PrincipalRouter from "./PrincipalRouter"
import {Welcome} from "../components/pages/Welcome"
import { useEffect } from "react"
import { Login } from "../components/pages/Login"
import { ProtectedRoute } from "./ProtectedRoute"
import Header from "../components/layout/Header"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/general.css'
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
import { ProductCreate } from "../components/pages/vendedor_basico/ProductCreate"
import { SidebarVendedor } from "../components/layout/includes/SidebarVendedor"
import { ProductSubcategoriaCreate } from "../components/pages/vendedor_basico/ProductSubcategoriaCreate"
import { SubproductoUpdate } from "../components/pages/vendedor_basico/SubproductoUpdate"
import { SubproductIndexScreen } from "../components/pages/vendedor_basico/subproductos/SubproductIndexScreen.jsx"
import { DescuentosIndexScreen } from "../components/pages/vendedor_basico/descuentos/DescuentosIndexScreen.jsx"

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
                         <Route path="/confirmar/:token" element={<Confirmacion />} />  
                         

                         {/* <Route path="/example" element={<ProtectedRoute login={isAuth} route={<ProtectedExample/>}/>} />   */}
                         <Route path="/profile" element={<ProtectedRoute login={isAuth} isCheckout={isCheckout} route={<Profile/>}/>} />  
                         <Route path="/seguridad" element={<ProtectedRoute login={isAuth} isCheckout={isCheckout} route={<Seguridad/>}/>} />  
                         <Route path="/Options" element={<ProtectedRoute login={isAuth} isCheckout={isCheckout} route={<Options/>}/>} />  

                         {/* vendedor ruta */}
                         <Route path="/vendedorProductos" element={<ProtectedRoute login={isAuth} isCheckout={isCheckout} route={<SidebarVendedor  component={<Productos/>}/> }/>} />  
                         <Route path="/products/create" element={<ProtectedRoute login={isAuth} isCheckout={isCheckout} route={<SidebarVendedor component={<ProductCreate/>}/>}/>} />  
                         <Route path="/products/edit/:id" element={<ProtectedRoute login={isAuth} isCheckout={isCheckout} route={<SidebarVendedor component={<ProductModification/>}/>}/>} />  
                         <Route path="/subproducts/:id" element={<ProtectedRoute login={isAuth} isCheckout={isCheckout} route={<SidebarVendedor component={<ProductSubcategoriaCreate/>}/>}/>} />  
                         <Route path="/subproducts/edit/:id" element={<ProtectedRoute login={isAuth} isCheckout={isCheckout} route={<SidebarVendedor component={<SubproductoUpdate/>}/>}/>} />  
                         <Route path="/subproducts/getAll" element={<ProtectedRoute login={isAuth} isCheckout={isCheckout} route={<SidebarVendedor component={<SubproductIndexScreen/>}/>}/>} />  
                         <Route path="/Descuentos/getAll" element={<ProtectedRoute login={isAuth} isCheckout={isCheckout} route={<SidebarVendedor component={<DescuentosIndexScreen/>}/>}/>} />  

                         

                    </Route>


                    
                    


                    
                </Routes>

            </BrowserRouter>
        </div>
    )

}

AppRouter.propTypes = {}
export default AppRouter;