import React, { useEffect, useState } from 'react'
import { HeaderProfile } from '../../layout/componentes/HeaderProfile'

import { Phone, Mail, Lock, User } from 'lucide-react';
import { Card, ListGroup } from 'react-bootstrap';
import { URLAPI } from '../../../url';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Seguridad = () => {


    const [datos, setDatos]  = useState({});

    useEffect(() => {

        async function obtenerDatos (){
            try {
                let token = localStorage.getItem("token")
                const { data } = await axios.get(`${URLAPI}/users/getTokenDeserialize`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                console.log(data.numeroTelefonico);
                

                setDatos(data);
            } catch (error) {
                
            }

            
            
        }
        obtenerDatos()

    }, [])
    
  return (
    <div className="container my-4">
    <h2 className="mb-4">Usuario</h2>
    <HeaderProfile/>

    <div className="row mt-4">

        <Card className='p-3'>

        <ListGroup variant="flush">
            <ListGroup.Item className="border rounded mb-2 p-3 d-flex align-items-center">
              <div className="bg-primary rounded-circle p-2 me-3">
                <Phone className="text-white" size={24} />
              </div>
              <div className="flex-grow-1">
                <div>Teléfono</div>
                <small className="text-muted">{
                    !datos.numeroTelefonico  ? "": datos.code_number + " " +  datos.numeroTelefonico
                }</small>
              </div>

              {
                   !datos.verifiedNumber ? 
                   <div className="text-warning me-2">
                        !
                   </div>
                   :
                   
                   <div className="text-success me-2">
                         ✓
                    </div>
                }
             
             {
                !datos.numeroTelefonico ? "" : 

                <div className="text-muted">
                     <Link className='text-black nav-link'>&gt;</Link>
                </div>
             }
            
            </ListGroup.Item>

            <ListGroup.Item className="border rounded mb-2 p-3 d-flex align-items-center">
              <div className="bg-info rounded-circle p-2 me-3">
                <Mail className="text-white" size={24} />
              </div>
              <div className="flex-grow-1">
                <div>Email</div>
                <small className="text-muted">
                {
                    !datos.email  ? "": datos.email
                }
                </small>
              </div>
              {
                   !datos.verified ? 
                   <div className="text-warning me-2">
                        !
                   </div>
                   :
                   
                   <div className="text-success me-2">
                         ✓
                    </div>
                }
               {
                !datos.email ? "" : 

                <div className="text-muted">
                     <Link className='text-black nav-link'>&gt;</Link>
                </div>
             }
            </ListGroup.Item>

            <ListGroup.Item className="border rounded mb-2 p-3 d-flex align-items-center">
              <div className="bg-secondary rounded-circle p-2 me-3">
                <User className="text-white" size={24} />
              </div>
              <div className="flex-grow-1">
                <div>Reconocimiento facial</div>
                <small className="text-muted">
                {
                    !datos.nombre  ? "": datos.nombre
                }
                </small>
              </div>
              <div className="text-warning me-2">!</div>

              {
                !datos.email ? "" : 

                <div nombre="text-muted">
                     <Link className='text-black nav-link'>&gt;</Link>
                </div>
             }
            </ListGroup.Item>
          </ListGroup>
        </Card>
    
        

        
    </div>
</div>
  )
}
