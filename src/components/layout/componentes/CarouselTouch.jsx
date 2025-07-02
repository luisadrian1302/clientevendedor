// CarouselTouch.jsx
import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";

const CarouselTouch = ({imagenes}) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carouselElement = carouselRef.current;

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
    };

    const handleSwipe = () => {
      if (!carouselElement) return;

      if (touchEndX < touchStartX) {
        // Deslizar a la derecha (siguiente imagen)
        carouselElement.querySelector(".carousel-control-next").click();
      } else if (touchEndX > touchStartX) {
        // Deslizar a la izquierda (imagen anterior)
        carouselElement.querySelector(".carousel-control-prev").click();
      }
    };

    carouselElement.addEventListener("touchstart", handleTouchStart);
    carouselElement.addEventListener("touchend", handleTouchEnd);

    // Limpiar eventos al desmontar el componente
    return () => {
      carouselElement.removeEventListener("touchstart", handleTouchStart);
      carouselElement.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className="container mt-4">
      <div ref={carouselRef}>
        <Carousel>
            {imagenes.map((e,i) =>(

                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    style={{
                        height: "350px",
                        objectFit: "contain"
                    }}
                    src={e}
                    alt="Imagen 1"
                    />
                   
                </Carousel.Item>

            ) )}

          
        </Carousel>

        {/* Controles (necesarios para el swipe manual) */}
        <button className="carousel-control-prev" type="button">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>

        <button className="carousel-control-next" type="button">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  );
};

export default CarouselTouch;
