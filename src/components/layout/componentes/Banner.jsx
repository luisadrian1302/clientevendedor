import React from 'react'
import img from '../../../imagenes/img4.jpg'

export const Banner = () => {
  return (
    <div className='mt-2'>
 <div className="position-relative overflow-hidden text-white" style={{
    position: "relative"
 }}>
      <img
        src={img}
        alt="iPhone antiguo"
        className="img-fluid w-100"
        style={{ 
            height: "250px",
            objectFit: "cover"
         }}
      />
      <div className="" style={{
        position: "absolute",
        width: "100%",
        height: "250px",
        background: "rgb(0,0,0)",
        background: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,9,10,0) 100%)",
        top: 0,
        left:0,
        

      }}>

      </div>
      <div className="position-absolute top-50 start-0 translate-middle-y ms-4">
        <h2>Ver artículos similares</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod ultrices vestibulum.</p>
        <button className="btn btn-light">Ver artículos</button>
      </div>
    </div>
    </div>
  )
}
