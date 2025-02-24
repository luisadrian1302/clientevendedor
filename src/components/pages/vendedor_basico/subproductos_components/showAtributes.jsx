import React from 'react'

export const ShowAtributes = ({caracteristicas}) => {
  return (
    <>
    <div className="d-flex" style={{flexDirection: "column"}}>

     {caracteristicas.map((e, i) => (
            <div key={i} className={e.atributo.tipoPropiedad == "color"  ? "color" : ""}>
                {e.atributo.tipoPropiedad == "color" ? <>
                    <div className="row m-0 pt-0 " style={{ alignItems: "center" }}>
                        <div className='showItems' style={{ backgroundColor: e.valor.valor }}>

                        </div>

                    </div>
                </> : null}
                {e.atributo.tipoPropiedad == "boton" ?
                    <div className='pt-2' >
                        <button className='btn btn-outline-dark '>{e.valor.valor} </button>

                    </div> : null}


            </div>
        ))}
    </div>
    
    </>
  )
}
