import React, { useState, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const UserImageModal = ({ show, handleClose, onImageUpdate }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 100,
    aspect: 1
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const getCroppedImg = async (image, crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 1);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (completedCrop && imgRef.current) {
      const croppedImageBlob = await getCroppedImg(
        imgRef.current,
        completedCrop
      );
      
      // Crear un nuevo archivo a partir del blob
      const croppedImageFile = new File(
        [croppedImageBlob],
        'cropped-image.jpg',
        { type: 'image/jpeg' }
      );
      
      onImageUpdate(croppedImageFile);
      handleModalClose();
    }
  };

  const handleModalClose = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setCrop({
      unit: '%',
      width: 100,
      aspect: 1
    });
    setCompletedCrop(null);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Actualizar imagen de perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Seleccionar imagen</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              required
            />
          </Form.Group>
          
          {previewUrl && (
            <div className="text-center mb-3">
              <p>Arrastra para recortar la imagen:</p>
              <div style={{ maxWidth: '100%', maxHeight: '500px', overflow: 'auto' }}>
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={1}
                  circularCrop={false}
                >
                  <img
                    ref={imgRef}
                    src={previewUrl}
                    style={{ maxWidth: '100%' }}
                    alt="Crop preview"
                  />
                </ReactCrop>
              </div>
              <small className="text-muted">
                La imagen será recortada en forma cuadrada. Ajusta el área de selección según necesites.
              </small>
            </div>
          )}
          
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleModalClose}>
              Cancelar
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              disabled={!completedCrop?.width || !completedCrop?.height}
            >
              Guardar cambios
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserImageModal;