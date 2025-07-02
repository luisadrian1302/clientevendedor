import React, { useState, useRef } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/PdfValidatorModal.css';
import axios from 'axios';
import { URLAPI } from '../../../url';

const AddDocuments = ({ showModalCurp, handleCloseModalCurp, typeDocument }) => {
    // Estados para la validación
    const [selectedFile, setSelectedFile] = useState(null);
    const [isValidFile, setIsValidFile] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const fileInputRef = useRef(null);

    // Función para validar el archivo PDF
    const validatePdfFile = (file) => {
        setErrorMessage('');
        setIsValidFile(false);

        // Verificar si se seleccionó un archivo
        if (!file) {
            setErrorMessage('Por favor seleccione un archivo');
            return false;
        }

        // Verificar si es un archivo PDF
        if (file.type !== 'application/pdf') {
            setErrorMessage('Solo se permiten archivos PDF');
            return false;
        }

        // Verificar el tamaño del archivo (máximo 5MB)
        const fileSizeInMB = file.size / (1024 * 1024);
        if (fileSizeInMB > 5) {
            setErrorMessage('El archivo no debe exceder los 5MB');
            return false;
        }

        // Si pasa todas las validaciones
        setIsValidFile(true);
        return true;
    };

    // Manejar el cambio de archivo
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        validatePdfFile(file);
    };

    // Resetear los estados al cerrar
    const handleClose = () => {
        setSelectedFile(null);
        setErrorMessage('');
        setIsValidFile(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        handleCloseModalCurp();
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            setErrorMessage('Por favor seleccione un archivo');
            return;
        }

        if (isValidFile) {
            // Aquí iría la lógica para procesar o enviar el archivo
            console.log('Archivo válido listo para procesamiento:', selectedFile);

            //   crear endpoint para subir los documentos
            const formData = new FormData();
            formData.append('pdf', selectedFile);
            formData.append('tipo', typeDocument);
            console.log(typeDocument);
            
            let token = localStorage.getItem("token")

            try {
                // Enviar el archivo al servidor
                const response = await axios.post(`${URLAPI}/users/uploadPdf`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                         Authorization: `Bearer ${token}`
                    }
                });
                console.log(response);

            } catch (error) {
                console.log(error.response);
                
                // setUploadStatus(`Error al subir el archivo: ${error.response?.data?.message || error.message}`);
            }
            // Ejemplo: subir el archivo a un servidor
            alert('Archivo PDF validado correctamente');
            await handleClose();
        }
    };

    return (
        <Modal
            show={showModalCurp}
            onHide={handleClose}
            centered
            backdrop="static"
            className="pdf-validator-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>Validación de Documento PDF</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Seleccione su documento PDF:</Form.Label>
                        <Form.Control
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            className="pdf-file-input"
                        />
                        <Form.Text className="text-muted">
                            Solo se aceptan archivos en formato PDF (máx. 5MB)
                        </Form.Text>
                    </Form.Group>

                    {errorMessage && (
                        <Alert variant="danger" className="mt-3">
                            {errorMessage}
                        </Alert>
                    )}

                    {isValidFile && (
                        <Alert variant="success" className="mt-3">
                            Archivo validado correctamente
                        </Alert>
                    )}

                    <div className="d-flex justify-content-end mt-4">
                        <Button
                            variant="secondary"
                            onClick={handleClose}
                            className="me-2"
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={!isValidFile}
                        >
                            Guardar
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddDocuments;