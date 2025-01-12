// ImageUploadModal.jsx
import React, { useState, useRef } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageUploadModal = ({ show, onHide, onSave, currentImage }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(currentImage || '');
  const [crop, setCrop] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const imgRef = useRef(null);

  // Función para centrar inicialmente el crop
  const centerAspectCrop = (mediaWidth, mediaHeight, aspect) => {
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  };

  // Manejador de carga de archivo
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setIsEditing(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejador cuando la imagen se carga
  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 16 / 9));
  };

  // Función para obtener la imagen recortada
  const getCroppedImg = () => {
    const image = imgRef.current;
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
      }, 'image/jpeg');
    });
  };

  // Manejador para guardar la imagen
  const handleSave = async () => {
    if (isEditing && crop) {
      const croppedBlob = await getCroppedImg();
      const croppedFile = new File([croppedBlob], selectedFile.name, {
        type: 'image/jpeg',
      });
      onSave(croppedFile);
    } else if (selectedFile) {
      onSave(selectedFile);
    }
    onHide();
  };

  return (
    <div
      className={`modal fade ${show ? 'show' : ''}`}
      style={{ display: show ? 'block' : 'none' }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {currentImage ? 'Actualizar' : 'Subir'} Imagen de Portada
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onHide}
              aria-label="Close"
            />
          </div>
          
          <div className="modal-body">
            <div className="mb-3">
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleFileSelect}
              />
            </div>

            {preview && (
              <div className="text-center">
                {isEditing ? (
                  <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    aspect={16 / 9}
                  >
                    <img
                      ref={imgRef}
                      src={preview}
                      onLoad={onImageLoad}
                      style={{ maxWidth: '100%' }}
                      alt="Preview"
                    />
                  </ReactCrop>
                ) : (
                  <img
                    src={preview}
                    style={{ maxWidth: '100%' }}
                    alt="Preview"
                  />
                )}
              </div>
            )}

            {preview && !isEditing && (
              <div className="text-center mt-3">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Editar imagen
                </button>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onHide}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
              disabled={!selectedFile}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show" style={{zIndex: "-1"}} />}
    </div>
  );
};

export default ImageUploadModal;