import React, { useEffect, useState } from 'react'
import { HeaderProfile } from '../../layout/componentes/HeaderProfile'

import { Phone, Mail, Lock, User } from 'lucide-react';
import { ListGroup } from 'react-bootstrap';
import { URLAPI } from '../../../url';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { ChevronRight } from 'lucide-react';
import { HiIdentification } from 'react-icons/hi2';
import { CgProfile } from 'react-icons/cg';
import AddDocuments from '../../layout/modal/AddDocuments';

export const Options = () => {


  const [datos, setDatos] = useState({});
  // Estado para controlar la visibilidad del modal
  const [tipeDocument, setTipeDocument] = useState("");
  const [showModalCurp, setShowModalCurp] = useState(false);

  // Funciones para abrir y cerrar el modal
  const handleOpenModalCurp = () => setShowModalCurp(true);
  const handleCloseModalCurp = () => setShowModalCurp(false);
  // const handleOpenModalCurp = () => setShowModalCurp(true);

  async function obtenerDatos() {
    try {
      let token = localStorage.getItem("token")
      const { data } = await axios.get(`${URLAPI}/users/getDocumentation`, {
        headers: {
          Authorization: `Bearer ${token}`
        }     
      })
      if (data) {
        setDatos(data);
      }
    } catch (error) {

    }
  }
  useEffect(() => {

    obtenerDatos()

  }, [])


  function subirDocumento(type){

    setTipeDocument(type);
    handleOpenModalCurp()
  }

  async function cerrarModal(){

    setTipeDocument("");
    handleCloseModalCurp();
    obtenerDatos();
  }
  function verificarElement(data){
    console.log(data);
    

    if (Object.entries(datos).length == 0) {
      
      return  <div className="rounded-circle bg-danger" style={{ width: 15, height: 15 }}></div>
    }
    if ( data == 1) {
      return  <div className="rounded-circle bg-success" style={{ width: 15, height: 15 }}></div>
      
    }
    if ( data == 2) {
      return  <div className="rounded-circle bg-warning" style={{ width: 15, height: 15 }}></div>
      
    }
    return  <div className="rounded-circle bg-danger" style={{ width: 15, height: 15 }}></div>
  }
  return (
    <div className="container my-4">
      <h2 className="mb-4">Usuario</h2>
      <HeaderProfile />

      <div className="row mt-4">

        <Card className='p-3'>
          <Container fluid className="p-0">
            {/* Header */}
            <Row className="border-bottom py-3 mx-0">
              <Col>
                <h5 className="mb-0">Opciones</h5>
              </Col>
            </Row>

            {/* Documentación del cliente section */}
            <Row className="mx-0 mt-4">
              <Col>
                <h6 className="mb-3">Documentacion del cliente</h6>
              </Col>
            </Row>

{/* traer  */}
            {/* CURP Card */}
            <Card className="mb-3 border rounded" style={{ cursor: 'pointer' }}  onClick={(e) => subirDocumento("curp")}>
              <Card.Body className="d-flex align-items-center justify-content-between py-2">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <div className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: 60, height: 60, backgroundColor: '#f8f9fa', border: '2px solid #6c757d', position: "relative" }}>
                      <div className="">
                          <HiIdentification size={40} />

                        </div>
                      <div className="position-absolute" style={{ bottom: 0, right: 0 }}>
                          {verificarElement(datos.statusImageCurp)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="fw-bold">Curp</div>
                    <div className="text-muted">QRDV380204MHGXFV25</div>
                  </div>
                </div>
               
                <ChevronRight size={20} color="#6c757d" />

               
              </Card.Body>
            </Card>

            {/* Identificación oficial Card */}
            <Card className="mb-4 border rounded" style={{ cursor: 'pointer' }} onClick={(e) => subirDocumento("ine")}>
              <Card.Body className="d-flex align-items-center justify-content-between py-2">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <div className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: 60, height: 60, backgroundColor: '#f8f9fa', border: '2px solid #6c757d', position: "relative" }}>
                        <div className="">
                         <HiIdentification size={40} />


                        </div>
                     
                      <div className="position-absolute" style={{ bottom: 0, right: 0 }}>
                          {verificarElement(datos.statusIne)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="fw-bold">Identificacion oficial</div>
                    <div className="text-muted">Luis Adrian Mendez Felipe</div>
                  </div>
                </div>
                <ChevronRight size={20} color="#6c757d" />
              </Card.Body>
            </Card>

            {/* Face real */}
            <Card className="mb-4 border rounded" style={{ cursor: 'pointer' }} >
              <Card.Body className="d-flex align-items-center justify-content-between py-2">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <div className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: 60, height: 60, backgroundColor: '#f8f9fa', border: '2px solid #6c757d', position: "relative" }}>
                        <div className="">
                          <CgProfile size={40} />
                          

                        </div>
                     
                      <div className="position-absolute" style={{ bottom: 0, right: 0 }}>
                          {verificarElement(datos.statusfaceReal)}
                        
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="fw-bold">Face reveal</div>
                    <div className="text-muted">Luis Adrian Mendez Felipe</div>
                  </div>
                </div>
                <ChevronRight size={20} color="#6c757d" />
              </Card.Body>
            </Card>

            {/* Opciones de vendedor section */}
            <Row className="mx-0 mb-3">
              <Col>
                <h6>Opciones de vendedor</h6>
              </Col>
            </Row>

            {/* Ir al modo vendedor */}
            <Row className="mx-0">
              <Col>
                <div className="mb-1">
                  <a href="#" className="text-decoration-none text-primary">Ir al modo vendedor</a>
                </div>
                <div className="text-muted small">
                  para usar el modo vendedor debes de verificar que hayas enviado el curp y la identificacion oficial
                </div>
              </Col>
            </Row>
          </Container>
        </Card>
        <AddDocuments handleCloseModalCurp={cerrarModal} showModalCurp={showModalCurp} typeDocument={tipeDocument}/>




      </div>
    </div>
  )
}
