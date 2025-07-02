import React, { useEffect, useState } from 'react'
import { HeaderProfile } from '../../layout/componentes/HeaderProfile'
import { Card } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap';
import { Container, Row, Col, Button } from "react-bootstrap";
import { Home, CreditCard, Option } from "lucide-react";
import { SlOptions, SlOptionsVertical } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URLAPI } from '../../../url';

export const DireccionesCuentas = () => {

    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [user, setUser] = useState({});
   

    const accounts = [
        {
            id: 1,
            type: "Mercado Pago",
            date: "21 de agosto",
            account: "#2123322211",
            icon: "https://498405.fs1.hubspotusercontent-na1.net/hubfs/498405/Que%20es%20Mercado%20Pago%20(1).jpg", // Simulación de icono de Mercado Pago
        },
        {
            id: 2,
            type: "PayPal",
            account: "#2123322211",
            icon: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg", // Icono de PayPal
        },
    ];

    async function getddresses() {
        
        try {
          
            let token = localStorage.getItem("token")
            const { data } = await axios.get(`${URLAPI}/direccion/getAll`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setAddresses(data)          
        } catch (error) {
            // setError(error);}
            console.log(error);   
        }
    }
    useEffect(() => {


        const obtenerUsuario = async () => {

            try {
                let token = localStorage.getItem("token")
                const { data } = await axios.get(`${URLAPI}/users/getTokenDeserialize`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUser(data)
            } catch (error) {
                console.log("se cerró la sesion", error);
            }

        }
        getddresses();
        obtenerUsuario();
    }, [])

    function editarDireccion(id){
        navigate("/actualizar-direccion/"+id)
    }

    async function eliminarDireccion(id){
        try {
              
            let token = localStorage.getItem("token")
            const { data } = await axios.delete(`${URLAPI}/direccion/delete/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            await getddresses();
                    
        } catch (error) {
            // setError(error);}
            console.log(error);   
        }
        
        // navigate("/actualizar-direccion/"+id)
    }
    
    return (
        <div className="container my-4">
            <h2 className="mb-4">Usuario</h2>
            <HeaderProfile />

            <div className="row mt-4">

                <Card className='p-3'>
                    <h5 className='p-3'>Direcciones y cuentas</h5>
                    <hr />

                    {/* Direcciones */}
                    <div className="p-3 mb-4 ">
                        <h5>Direcciones</h5>
                        {addresses.map((address, index) => (
                            

                            < >
                                <div className="d-flex" key={index}>

                                    <Home className="me-2 col-1" size={45} />
                                    <div className="mb-3 col-10">
                                        <strong>{address.calle}, {address.numero_externo}</strong>
                                        <p className='p-0 m-0'>{address.referencias}</p>
                                        <p className='p-0 m-0'>{address.colonia}, {address.municipio} ({address.codigoPostal }), {address.estado} </p>
                                        <p className='p-0 m-0'>Recibe: {user.nombre} {user.apellidos}, {user.numeroTelefonico}</p>
                                        <Button variant="link" className='p-0' style={{
                                            textDecoration: "none"
                                        }} onClick={(e) => editarDireccion(address.id)}  >Añadir o modificar dirección</Button>
                                    </div>
                                    <div className="options col-1">

                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-custom-components">
                                                <SlOptionsVertical /> {/* Ícono de tres puntos verticales */}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="dropdown-menu-end"> {/* Menú alineado a la derecha */}
                                                <Dropdown.Item href="#" onClick={(e) => eliminarDireccion(address.id)}  >Eliminar</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </>
                        ))}
                        <Button className='p-0' style={{ textDecoration: "none" }} variant="link" onClick={(e) =>navigate("../crear-direccion")}>Agregar una dirección nueva</Button>
                    </div>
                    <hr />

                    {/* Cuentas bancarias */}
                    <div className="p-3">
                        <h5>Cuentas bancarias</h5>
                        <Row>
                            {accounts.map((account) => (
                                <Col key={account.id} md={6} className="mb-3">
                                    <Card className="p-2 d-flex flex-row align-items-center">
                                        <img
                                            src={account.icon}
                                            alt={account.type}
                                            width="40"
                                            className="me-2"
                                        />
                                        <div>
                                            <strong>{account.type}</strong>
                                            <p className="mb-0">{account.date ? account.date : ""} {account.account}</p>
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <Button variant="link" className='p-0' style={{ textDecoration: "none" }}>Añadir una nueva cuenta bancaria</Button>
                    </div>


                </Card>




            </div>
        </div>
    )
}
