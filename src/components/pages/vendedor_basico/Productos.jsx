import React, { useEffect, useRef, useState } from 'react'
import { verificarVendedor } from '../../../helper/isVendedor'
import { Link, useNavigate } from 'react-router-dom'
import { AlertTriangle, FileText, Home, MessageCircle, Package, PlusCircle, ShoppingBag, Tag } from 'lucide-react';
import { Button, Col, Container, FormSelect, Row } from 'react-bootstrap';
import { ProductCard } from '../../layout/componentes/productCard';
import axios from 'axios';
import { URLAPI } from '../../../url';
import { cerrarSesionAuth } from '../../../actions/AuthAction';

export const Productos = () => {

    const navegate = useNavigate();
    const [products, setproducts] = useState([])
    const [productsMemory, setproductsMemory] = useState([])
    const effectRun = useRef(false);
    
    

    useEffect(() => {

        if (!effectRun.current) {
            effectRun.current = true;
         }else{


           
     
     
             async function getProducts() {
                 try {
                     let token = localStorage.getItem("token");
                     const { data } = await axios.get(`${URLAPI}/product/verProductosPorUsuario`, {
                         headers: {
                             Authorization: `Bearer ${token}`
                         }
                     })
                     setproducts(data)
                     setproductsMemory(data)
                     console.log(products);
                     
                 } catch (error) {
                     
                 }
     
               
                 
             }
             
     
             getProducts();
         }

        return () => {
            setproducts([])
          }
    }, [])

    function filterValueFunc(e){

        let opt = e.target.value;
    
        // buscar
        
    
        let filterValue = productsMemory.filter(element => {
    
          if (element.titular.includes(opt) || element.descripcionGeneral.includes(opt) ) {
            return element;
          }
        })
    
        
    
        setproducts(filterValue);
    
        
    
      }

    // const products = [
    //     {
    //         image: "https://via.placeholder.com/150",
    //         title: "iPhone 8 Plus 256 GB",
    //         price: { original: 2210, discounted: 1700 },
    //         discount: 30,
    //         colors: ["#fff", "#ffb800", "#000"],
    //     },
    //     // Agrega más productos según sea necesario
    // ];

    return (
        <Container fluid>
            <div className="container">


            <Row>
               

                <Col className='p-2'>
                     <h2 className="text-xl font-semibold my-3">Productos</h2>

                    <div class="d-flex align-items-center gap-4 mb-4">
                        <div class="col-md-4">
                            <input 
                            style={{background: "#cccccc" }}
                                type="search" 
                                class="form-control" 
                                placeholder="Buscar"
                                onChange={(e) => filterValueFunc(e)}
                            />
                        </div>
                        
                      
                        
                        <span class="text-secondary">Mis productos: {products.length}</span>
                    </div>

                    <Col style={{ background: "white" }} className='p-2'>
                        <Row className="align-items-center my-4">
                            <Col>
                                <h4>Mis productos</h4>
                            </Col>
                            <Col className="text-end">
                                <Link variant="link" className="text-decoration-none" to={"../products/create"}> 
                                    <PlusCircle size={20} /> Añadir producto
                                </Link>
                            </Col>
                        </Row>


                        <Row xs={1} sm={3} md={4}>
                            {products.map((product, index) => (
                                
                                <Col key={index}>
                                    <ProductCard {...product}  navegate={navegate}/>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Col>
            </Row>
            </div>

        </Container>
    )
}
