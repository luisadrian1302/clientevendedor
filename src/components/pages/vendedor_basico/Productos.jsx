import React, { useEffect } from 'react'
import { verificarVendedor } from '../../../helper/isVendedor'
import { Link, useNavigate } from 'react-router-dom'
import { AlertTriangle, FileText, Home, MessageCircle, Package, PlusCircle, ShoppingBag, Tag } from 'lucide-react';
import { Button, Col, Container, FormSelect, Row } from 'react-bootstrap';
import { ProductCard } from '../../layout/componentes/productCard';
import { SidebarVendedor } from '../../SidebarVendedor';

export const Productos = () => {

    const navegate = useNavigate();

    useEffect(() => {

        async function getUser() {

            let isvendedor = await verificarVendedor(localStorage.getItem("token"));

            console.log(isvendedor);


            if (!isvendedor) {
                navegate("../")
            }
        }

        getUser();
    }, [])

    const products = [
        {
            image: "https://via.placeholder.com/150",
            title: "iPhone 8 Plus 256 GB",
            price: { original: 2210, discounted: 1700 },
            discount: 30,
            colors: ["#fff", "#ffb800", "#000"],
        },
        // Agrega más productos según sea necesario
    ];

    return (
        <Container fluid>

            <Row>
               
               <SidebarVendedor/>

                <Col className='p-2'>
                     <h2 className="text-xl font-semibold my-3">Productos</h2>

                    <div class="d-flex align-items-center gap-4 mb-4">
                        <div class="col-md-4">
                            <input 
                            style={{background: "#cccccc" }}
                                type="search" 
                                class="form-control" 
                                placeholder="Buscar"
                            />
                        </div>
                        
                        <select class="form-select " style={{width: "200px", background: "transparent" }}>
                            <option selected>Ordenar por</option>
                            <option value="price-asc">Precio: Menor a Mayor</option>
                            <option value="price-desc">Precio: Mayor a Menor</option>
                            <option value="name">Nombre</option>
                        </select>
                        
                        <span class="text-secondary">Mis productos: 3</span>
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


                        <Row xs={1} sm={2} md={3}>
                            {products.map((product, index) => (
                                <Col key={index}>
                                    <ProductCard {...product} />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Col>
            </Row>
        </Container>
    )
}
