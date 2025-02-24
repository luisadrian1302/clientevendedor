import React, { useState } from 'react'

export const TipoAtributo = ({tipo_atibuto,valor,updateValue,valueUpdate,data }) => {



    const [value,setValue] = useState(valor)

    function updateColor(e){
        updateValue({ ...data, valor: e.target.value })
        // setValue(e.target.value)
      
        
    }
   
 
  return (
    <>
    
      {tipo_atibuto == "color" &&
      <>
          <p>Color</p>

          <input type="color"  value={valor} onChange={updateColor} />
      </> }


      {tipo_atibuto == "boton" &&
      <>
          <p>Boton</p>

          <button className='btn btn-outline-dark '>{valor} </button>
      </> }


    </>
  )
}
