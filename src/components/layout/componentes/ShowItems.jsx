import React from 'react';
import { Button } from 'react-bootstrap';

export const ShowItems = ({ caracteristicas = [] }) => {
  return (
    <>
      {caracteristicas.map((e, i) => (
        <div key={i}>
          {e.tipo === "color" ? (
            <div className="mb-3">
              <h6 className="subtitle">{e.propiedad}</h6>
              <div 
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: e.valor,
                  border: '1px solid #ddd'
                }}
              />
            </div>
          ) : null}
          
          {e.tipo === "boton" ? (
            <div className="mb-3">
              <h6 className="subtitle">{e.propiedad}</h6>
              <Button
                variant="warning"
                className="text-dark"
                style={{
                  boxShadow: 'none'
                }}
              >
                {e.valor}
              </Button>
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
};

export default ShowItems;