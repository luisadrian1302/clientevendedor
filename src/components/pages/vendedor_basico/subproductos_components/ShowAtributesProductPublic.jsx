import React from 'react'

export const ShowAtributesProductPublic = ({caracteristicas, id, onchange}) => {

    
    function isAvtivate(item){

        if (item.active) {
            return "btn  text-dark border-3 border shadow-lg border-primary  "
            
        }else{
            return "btn hover-none border shadow-lg  border-dark "
        }

    }

    function isActivateColor(item){

        if (item.active) {
            return "showItems border border-3  shadow-lg border-primary  "
            
        }else{
            return "showItems"
        }

    }

    function onchangeSelect(item){
        onchange(item)

    }
  return (
    <>
    <div className="d-flex" >

     {caracteristicas.map((e, i) => (
            <div key={i} className={e.tipoPropiedad == "color"  ? "color" : ""}>
                {e.tipoPropiedad == "color" ? <>
                    <div className="row m-0 p-1  pt-0 " style={{ alignItems: "center" }}>
                        <div className={isActivateColor(e)} style={{ backgroundColor: e.valor }} onClick={(event) => onchangeSelect(e)}>

                        </div>
 
                    </div>
                </> : null}
                {e.tipoPropiedad == "boton" ?
                    <div className='m-1 ' >
                        <button className={isAvtivate(e)} style={{
                            fontSize: "13px"
                        }} onClick={(event) => onchangeSelect(e)}>{e.valor} </button>

                    </div> : null}


            </div>
        ))}
    </div>
    
    </>
  )
}
