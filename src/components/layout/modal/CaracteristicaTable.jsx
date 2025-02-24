import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

export const CaracteristicaTable = ({show, handleClose,sendInformacion}) => {

  const [data, setData] = useState({
    atributo: "",
    valor: ""
  })


  function mandarCaracteristica (){
    sendInformacion(data)
    handleClose();
    setData({
      atributo: "",
      valor:""
    })

  }
  return (
    <>
     <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ingrese su texto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleTextarea">
              <Form.Label>Caracteristica: </Form.Label>
              <Form.Control
                as="input"
                value={data.atributo}
                onChange={(e) => setData(element => ({...element,atributo:  e.target.value}))}
              />
            </Form.Group>

            <Form.Group controlId="exampleTextarea">
              <Form.Label>Valor: </Form.Label>
              <Form.Control
                as="input"
                value={data.valor}
                onChange={(e) => setData(element => ({...element,valor:  e.target.value}))}
              />
            </Form.Group>


          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={mandarCaracteristica}>
            Guardar
          </Button>
         
        </Modal.Footer>
      </Modal>
    
    </>
  )
}
