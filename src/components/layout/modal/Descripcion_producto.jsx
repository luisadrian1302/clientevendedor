import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

export const Descripcion_producto = ({show, handleClose,setText, text}) => {
  return (
    <>
     <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ingrese su texto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleTextarea">
              <Form.Label>Descripción del sub producto</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                value={text.descripcion}
                onChange={(e) => setText(element => ({...element,descripcion:  e.target.value}))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
         
        </Modal.Footer>
      </Modal>
    
    </>
  )
}
