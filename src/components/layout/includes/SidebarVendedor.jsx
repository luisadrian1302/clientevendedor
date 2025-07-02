import React, { useEffect, useState } from 'react'
import { AlertTriangle, FileText, Home, User, Menu, MessageCircle, Package, PlusCircle, ShoppingBag, Tag, Blocks, MenuSquare } from 'lucide-react';
import { Container, Navbar } from 'react-bootstrap';

import '../../pages/vendedor_basico/styles/sidebar.css'
import { Link, useNavigate } from 'react-router-dom';
import { verificarVendedor } from '../../../helper/isVendedor';
import { useDispatch, useSelector } from 'react-redux';
import { cerrarSesionAuth } from '../../../actions/AuthAction';
import { connect, disconnect } from '../../../webSockets/connect';
import { actualizarProductos } from '../../../actions/notificationsAction';
export const SidebarVendedor = ({component}) => {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [tamaño, settamaño] = useState(25);

  const { userData } = useSelector(re => re.AuthReducer);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };


  const [messages, setMessages] = useState([]);





  const navegate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
      let isAuth = localStorage.getItem("token");

      // comprar estado de autenticacion.... 
      // obtener reducer para hacer la autenticacion en java
    
      async function getUser() {
           
        let isvendedor = await verificarVendedor(localStorage.getItem("token"));
        
        if (!isvendedor) {
            console.log("close");
            
            dispatch(cerrarSesionAuth(navegate));
        }
    }
    getUser();

      
  }, [component])
  

  return (

    <>
      <div className="d-flex  border-end min-h-100" id='container'>
        {/* Sidebar */}
        <div id='sidevar'
          className={`bg-white  p-3 ${isCollapsed ? "collapsed-sidebar" : "expanded-sidebar"
            }`}
          style={{
            width: isCollapsed ? "80px" : "auto",
            transition: "width 0.3s",
            overflow: "hidden",
            minHeight: isCollapsed ? "0" : "100vh",
            minWidth: isCollapsed ? "80px" : "250px",
            height: isCollapsed ? "" : "auto!important"
          }}
        >
          <button
            className="btn btn-outline btn-sm mb-3"
            onClick={toggleSidebar}
            style={{
              width: "30px",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            {isCollapsed ? <Menu /> : <Menu />}
          </button>

          {!isCollapsed ? (
            <div id='sideba2'>
              <h5 class="fw-semibold mb-4">Principales</h5>

              <div class="d-flex flex-column gap-2">
                <Link to="/vendedorProductos" class="d-flex align-items-center text-secondary text-decoration-none hover-primary py-2">
                  <Package class="me-2" size={tamaño} />
                  <span>Productos</span>
                </Link>
                <Link to="/subproducts/getAll" class="d-flex align-items-center text-secondary text-decoration-none hover-primary py-2">
                  <Blocks class="me-2" size={tamaño} />
                  <span>Subproductos</span>
                </Link>
                <Link to="/Descuentos/getAll" class="d-flex align-items-center text-secondary text-decoration-none hover-primary py-2">
                  <Tag class="me-2" size={tamaño} />
                  <span>Descuentos</span>
                </Link>
                <a href="#" class="d-flex align-items-center text-secondary text-decoration-none hover-primary py-2">
                  <MessageCircle class="me-2" size={tamaño} />
                  <span>Chats</span>
                </a>
                <a href="#" class="d-flex align-items-center text-secondary text-decoration-none hover-primary py-2">
                  <FileText class="me-2" size={tamaño} />
                  <span>Documentación</span>
                </a>
              </div>

              <h5 class="fw-semibold mt-5 mb-4">Ventas y logística</h5>
              <div class="d-flex flex-column gap-2">
                <a href="#" class="d-flex align-items-center text-secondary text-decoration-none hover-primary py-2">
                  <Home class="me-2" size={tamaño} />
                  <span>Ventas</span>
                </a>
                <a href="#" class="d-flex align-items-center text-secondary text-decoration-none hover-primary py-2">
                  <ShoppingBag class="me-2" size={tamaño} />
                  <span>Pedidos</span>
                </a>
                <a href="#" class="d-flex align-items-center text-secondary text-decoration-none hover-primary py-2">
                  <AlertTriangle class="me-2" size={tamaño} />
                  <span>Reclamos y quejas</span>
                </a>              
              </div>

              <h5 class="fw-semibold mt-5 mb-4">Avanzado</h5>
              <div class="d-flex flex-column gap-2">
                <a href="#" class="d-flex align-items-center text-secondary text-decoration-none hover-primary py-2">
                  <Home class="me-2" size={tamaño} />
                  <span>Sliders</span>
                </a>
                <a href="#" class="d-flex align-items-center text-secondary text-decoration-none hover-primary py-2">
                  <ShoppingBag class="me-2" size={tamaño} />
                  <span>Pedidos</span>
                </a>
                <a href="#" class="d-flex align-items-center text-secondary text-decoration-none hover-primary py-2">
                  <AlertTriangle class="me-2" size={tamaño} />
                  <span>Reclamos y quejas</span>
                </a>              
              </div>


            </div>
          ) : <div id='sideba1'>


            <div class="d-flex flex-column gap-2">
              <Link to="/vendedorProductos" class="d-flex align-items-center text-secondary text-decoration-none hover-primary py-2">
                <Package class="me-2" size={tamaño} />
              </Link>
              <Link to="/subproducts/getAll" class="d-flex align-items-center text-secondary text-decoration-none hover-primary py-2">
                <Blocks class="me-2" size={tamaño} />
              </Link>
              <Link to="/Descuentos/getAll" class="d-flex align-items-center text-secondary text-decoration-none hover-primary py-2">
                <Tag class="me-2" size={tamaño} />
              </Link>
              <a href="#" class="d-flex align-items-center text-secondary text-decoration-none hover-primary py-2">
                <MessageCircle class="me-2" size={tamaño} />
              </a>
              <a href="#" class="d-flex align-items-center text-secondary text-decoration-none hover-primary py-2">
                <FileText class="me-2" size={tamaño} />
              </a>
            </div>

            <br />
            <div class="d-flex flex-column gap-2">
              <a href="#" class="d-flex align-items-center text-secondary text-decoration-none hover-primary py-2">
                <Home class="me-2" size={tamaño} />
              </a>
              <a href="#" class="d-flex align-items-center text-secondary text-decoration-none hover-primary py-2">
                <ShoppingBag class="me-2" size={tamaño} />
              </a>
              <a href="#" class="d-flex align-items-center text-secondary text-decoration-none hover-primary py-2">
                <AlertTriangle class="me-2" size={tamaño} />
              </a>
            </div>


            <br />
            <div class="d-flex flex-column gap-2">
              <a href="#" class="d-flex align-items-center text-secondary text-decoration-none hover-primary py-2">
                <Home class="me-2" size={tamaño} />
              </a>
              <a href="#" class="d-flex align-items-center text-secondary text-decoration-none hover-primary py-2">
                <ShoppingBag class="me-2" size={tamaño} />
              </a>
              <a href="#" class="d-flex align-items-center text-secondary text-decoration-none hover-primary py-2">
                <AlertTriangle class="me-2" size={tamaño} />
              </a>
            </div>
          </div>}
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-3">
        {component ? component : "null"}
        </div>
      </div>

      
    </>




  )
}
