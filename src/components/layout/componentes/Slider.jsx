import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/ProductBanner.css'; // Archivo de estilos personalizados

import imgs from "../../../imagenes/img.png"
import imgs2 from "../../../imagenes/img2.png"
import imgs3 from "../../../imagenes/img3.png"

const ProductSlider = () => {
  // Array de banners con sus datos
  const banners = [
    {
      id: 1,
      title: "Nuevo producto de ejemplo",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: imgs,
      buttonText: "Ver oferta",
      backgroundColor: "#ff3b30",
    },
    {
      id: 2,
      title: "Oferta especial",
      description: "Aprovecha nuestros descuentos de temporada.",
      image:imgs2,
      buttonText: "Comprar ahora",
      backgroundColor: "#5630ff",

    },
    {
      id: 3,
      title: "Lanzamiento exclusivo",
      description: "Sé el primero en obtener nuestro nuevo producto.",
      image: imgs3,
      buttonText: "Reservar",
      backgroundColor: "#0307f3",

    }
  ];

  // Estado para controlar el banner actual
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Funciones para navegar entre banners
  const goToPrevious = () => {
    setCurrentBannerIndex((prevIndex) => 
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentBannerIndex((prevIndex) => 
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Banner actual
  const currentBanner = banners[currentBannerIndex];

  return (
    <div className="product-banner" style={{
        backgroundColor: banners[currentBannerIndex].backgroundColor
    }}>
      <Container fluid className="p-0">
        <div className="banner-content">
          {/* Flechas de navegación */}
          <button className="nav-arrow left-arrow" onClick={goToPrevious}>
            <span>&lt;</span>
          </button>
          <button className="nav-arrow right-arrow" onClick={goToNext}>
            <span>&gt;</span>
          </button>
          
          <Row className="align-items-center">
            {/* Columna para la imagen */}
            <Col md={6} className="text-center">
              <div className="product-image-container">
                <img 
                  src={currentBanner.image} 
                  alt={currentBanner.title} 
                  className="product-image" 
                />
              </div>
            </Col>
            
            {/* Columna para el texto */}
            <Col md={6}>
              <div className="product-info">
                <h2 className="product-title text-light">{currentBanner.title}</h2>
                <p className="product-description text-light">{currentBanner.description}</p>
                <Button className="offer-button">{currentBanner.buttonText}</Button>
              </div>
            </Col>
          </Row>
          
          {/* Indicadores de posición */}
          <div className="banner-indicators">
            {banners.map((banner, index) => (
              <button 
                key={banner.id}
                className={`indicator-dot ${index === currentBannerIndex ? 'active' : ''}`}
                onClick={() => setCurrentBannerIndex(index)}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductSlider;