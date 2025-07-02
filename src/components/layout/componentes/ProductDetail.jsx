import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import ShowItems from './ShowItems';



const ProductDetail = ({ producto, imagenes, caracteristica }) => {
  const [thumbnailIndex, setThumbnailIndex] = React.useState(0);



  
  return (
    <>
      {Object.keys(producto).length > 0 ? (
        <>
          <Row className="g-4">
            {/* Columna izquierda con imágenes */}
            <Col xs={12} md={8}>
              <div className="d-flex mb-3">
                {/* Miniaturas */}
                <div className="me-3" style={{ width: '20%', maxHeight: '500px', overflowY: 'auto' }}>
                  {imagenes.map((img, index) => (
                    <div
                      key={index}
                      className="mb-2"
                      style={{
                        border: index === thumbnailIndex ? '2px solid #0d6efd' : '1px solid #dee2e6',
                        cursor: 'pointer'
                      }}
                      onClick={() => setThumbnailIndex(index)}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index}`}
                        className="img-fluid d-block"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Imagen principal */}
                <div style={{ width: '80%' }}>
                  <Card style={{ maxHeight: '500px' }}>
                    <Card.Img
                      src={imagenes[thumbnailIndex]}
                      alt={producto.producto.descripcion}
                      style={{
                        objectFit: 'contain',
                        maxHeight: '500px',
                        margin: 'auto'
                      }}
                    />
                  </Card>
                </div>
              </div>
            </Col>
            
            {/* Columna derecha con detalles */}
            <Col xs={12} md={4}>
              <h1 className="h5 mb-3">{producto.producto.titular}</h1>
              <p className="mb-3">{producto.producto.descripcionGeneral}</p>
              
              {/* Información de precios */}
              {producto.descuento != null ? (
                <div className="mb-3">
                  <p className="text-secondary text-decoration-line-through mb-1">
                    ${producto.precio.toFixed(2)}
                  </p>
                  <div className="d-flex align-items-center">
                    <h4 className="me-2">
                      ${(producto.precio.toFixed(2) - ((producto.descuento.porcentajeDescuento * producto.precio.toFixed(2)) / 100)).toFixed(2)}
                    </h4>
                    <span className="text-success">
                      {producto.descuento.porcentajeDescuento}%
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mb-3">
                  <div className="d-flex align-items-center">
                    <h4 className="me-2">
                      ${producto.precio.toFixed(2)}
                    </h4>
                  </div>
                </div>
              )}
              
              {/* Características del producto */}
              <ShowItems caracteristicas={caracteristica} />
              
              {/* Información adicional */}
              <div className="mb-4">
                <p className="mb-2">
                  Cantidad disponible: <strong>{producto.stock} unidades</strong>
                </p>
                <div className="row">
                  <div className="col-12">
                    <p className="mb-2">
                      Peso del producto: (en gramos): <strong>{producto.pesoProducto} gramos</strong>
                    </p>
                    <p className="mb-2">
                      Grosor: (en mm): <strong>{producto.grosor}cm</strong>
                    </p>
                    <p className="mb-2">
                      Tamaño ancho del producto: (en cm): <strong>{producto.tamañoAncho}cm</strong>
                    </p>
                    <p className="mb-2">
                      Tamaño largo del producto: (en cm): <strong>{producto.tamañoAlto}cm</strong>
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          
          {/* Descripción detallada */}
          <div className="my-5">
            <h6 className="mb-3">Descripción</h6>
            <p className="small">
              {producto.descripcion}
            </p>
          </div>
          
          {/* Tabla de características */}
          <div className="mb-5">
            <h6 className="mb-3">Características del producto</h6>
            <Card>
              <Table responsive>
                <tbody>
                  {producto.caracteristicasTable.map((spec, index) => (
                    <tr 
                      key={index} 
                      className={index % 2 === 0 ? 'table-light' : ''}
                    >
                      <td className="fw-bold">{spec.atributo}</td>
                      <td>{spec.valor}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ProductDetail;