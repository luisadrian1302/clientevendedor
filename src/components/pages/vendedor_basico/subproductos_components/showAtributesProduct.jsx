import React from 'react'

export const ShowAtributesProduct = ({caracteristicas, id}) => {
  return (
    <>
    <div className="d-flex" >

     {caracteristicas.map((e, i) => (
            <div key={i} className={e.tipoPropiedad == "color"  ? "color" : ""}>
                {e.tipoPropiedad == "color" ? <>
                    <div className="row m-0 p-1  pt-0 " style={{ alignItems: "center" }}>
                        <div className='showItems' style={{ backgroundColor: e.valor }}>

                        </div>

                    </div>
                </> : null}
                {e.tipoPropiedad == "boton" ?
                    <div className='m-1 ' >
                        <button className='btn btn-outline-dark ' style={{
                            fontSize: "13px"
                        }}>{e.valor} </button>

                    </div> : null}


            </div>
        ))}
    </div>
    
    </>
  )
}
