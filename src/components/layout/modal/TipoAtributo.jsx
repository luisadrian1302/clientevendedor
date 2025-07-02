import React, { useState } from 'react'

export const TipoAtributo = ({tipo_atibuto,valor,updateValue,valueUpdate,data }) => {



    const [value,setValue] = useState(valor)

    function updateColor(e){
        updateValue({ ...data, valor: e })
        // setValue(e.target.value)
      
        
    }
    const colors = [
      { name: "Rojo", hex: "#FF4D4D" },
      { name: "Azul", hex: "#4D79FF" },
      { name: "Verde", hex: "#4DFF88" },
      { name: "Amarillo", hex: "#FFD54D" },
      { name: "Morado", hex: "#A64DFF" },
      { name: "Rosa", hex: "#FF69B4" },
      { name: "Cian", hex: "#00FFFF" },
      { name: "Naranja", hex: "#FFA500" },
      { name: "Lima", hex: "#BFFF00" },
      { name: "Celeste", hex: "#87CEEB" },
      { name: "Granate", hex: "#800000" },
      { name: "Turquesa", hex: "#40E0D0" },
      { name: "Lavanda", hex: "#E6E6FA" },
      { name: "Oliva", hex: "#808000" },
      { name: "Chocolate", hex: "#D2691E" },
      { name: "Negro", hex: "#000000" },
      { name: "Blanco", hex: "#FFFFFF", textColor: "#000000" },
      { name: "Gris", hex: "#808080" },
      { name: "Beige", hex: "#F5F5DC" },
      { name: "Coral", hex: "#FF7F50" },
      { name: "Azul Marino", hex: "#000080" },
      { name: "Verde Esmeralda", hex: "#50C878" },
      { name: "Vino", hex: "#722F37" },
      { name: "Púrpura", hex: "#800080" },
      { name: "Durazno", hex: "#FFE5B4" },
      { name: "Menta", hex: "#98FF98" },
      { name: "Mostaza", hex: "#FFDB58" },
      { name: "Fucsia", hex: "#FF00FF" },
      { name: "Caqui", hex: "#F0E68C" },
      { name: "Índigo", hex: "#4B0082" },
      { name: "Terracota", hex: "#E2725B" },
      { name: "Pardo", hex: "#8B4513" },
      { name: "Carbón", hex: "#36454F" },
      { name: "Lavanda Oscuro", hex: "#734F96" },
      { name: "Aguamarina", hex: "#7FFFD4" },
    ];
   
 
  return (
    <>
    
      {tipo_atibuto == "color" &&
      <>
          <p>Color</p>

          {/* <input type="color"  value={valor} onChange={updateColor} /> */}

          {colors.map((color) => (
          <button
            key={color.name}
            className="btn text-white rounded-circle shadow-sm me-1"
            style={{ backgroundColor: color.hex, width: '2rem', height: '2rem' }}
            onClick={() => updateColor(color.hex) }
            type='button'
          >
          </button>
      ))}
      </> }


      {tipo_atibuto == "boton" &&
      <>
          <p>Boton</p>

          <button className='btn btn-outline-dark '>{valor} </button>
      </> }


    </>
  )
}
