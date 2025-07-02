import React from 'react'
import { Resenas } from './Resenas'
import { useNavigate } from 'react-router-dom';

export const Product = ({producto}) => {
  const navigate = useNavigate();
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  function mandarProducto(){
    navigate("/product/"+producto.id)

  }
  return (
    <>
    <div className="col-lg-3 col-md-6 mt-2 " onClick={(e) => mandarProducto()} style={{cursor: "pointer"}}>
                <div className="p-2">

                  <div className="carousel slide mb-2" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img src={producto.multimedia ? producto.multimedia[0]: "https://placehold.co/600x400.png"} className="d-block w-100" alt="Imagen 1"
                          style={{ height: "300px", objectFit: "contain" }} />
                      </div>
                    </div>

                  </div>
                  <div className="px-4">
                    <h6 className="card-title mb-2">{producto.titular}</h6>

                    <Resenas puntuacion={producto.puntuacion} users={producto.count}/>
                    {
                      producto.porcentaje_descuento ? 
                      <>
                         <p className="text-decoration-line-through text-muted mb-1 ">{formatCurrency(producto.precio)} </p>
                         <p className="fs-6 fw-bold p-0">{formatCurrency( producto.precio - ((producto.porcentaje_descuento * producto.precio) /100)) } <span className="text-success">{producto.porcentaje_descuento}% OFF</span></p>
                      </>
                      : 
                      <>
                         <p className="fs-6 fw-bold">$ {producto.precio} </p>
                      
                      </>
                    }
                 
                    <p className="text-muted "><small>hay {producto.total_subproductos}  {producto.total_subproductos  > 1 ? " productos similares": "producto similar" }</small></p>
                  </div>
                </div>

              </div>
    
    </>
  )
}
