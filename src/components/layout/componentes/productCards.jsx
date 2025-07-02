import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { URLAPI, URLAPI_SUBPRODUCT_PUBLIC } from '../../../url';
import { multimediaToImage } from '../../../helper/gettValues';
import { Product } from './product';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const links = {

  "nuevas_ofertas": "/public/findByUltimasOfertas",
  "mejores_ofertas": "/public/findBymejoresOfertas",
  "ultimos_productos": "/public/findByultimosProductos",
}

export const ProductsCards = ({ type, limit }) => {

  // findByUltimasOfertas
  const [products, setProduct] = useState([]);
  // const dispatch = useDispatch();
  const navigate = useNavigate();


  async function traerProductos() {

    // logica de programacion

    try {
      const { data } = await axios.get(URLAPI_SUBPRODUCT_PUBLIC+links[type]+"?limit="+limit)


      for (let i = 0; i < data.length; i++) {
        const multimedia = multimediaToImage(data[i].multimedia);
        data[i].multimedia = multimedia;
        
      }
      setProduct(data);
      console.log(data);
      
      
    } catch (error) {
      console.log(error);
      
      
    }
  }
  useEffect(() => {
    traerProductos();
    console.log(links[type]);



  }, [])

  function redirect(redirect){
    navigate(redirect)
  }

  function header(){


    if (type == "nuevas_ofertas") {
      
      return (
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <h4 className='my-2'>Nuevas Ofertas</h4>
            <button className='btn' onClick={(e) => redirect("/nuevas-ofertas")} >Ver todas las ofertas</button>
  
          </div>
      )
    }


    if (type == "mejores_ofertas") {
      
      return (
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <h4 className='my-2'>Mejores Ofertas</h4>
            <button className='btn' onClick={(e) => redirect("/mejores-ofertas")} >Ver todas las ofertas</button>
  
          </div>
      )
    }


    if (type == "ultimos_productos") {
      
      return (
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <h4 className='my-2'>Nuevos productos</h4>
            <button className='btn' onClick={(e) => redirect("/ultimos-productos")} >Ver nuevos productos</button>
  
          </div>
      )
    }

  }

  return (
    <>

      <div className="background-light mt-4 p-2"
        style={{ backgroundColor: "white" }}>

        {header()}

        <div className="row">

          {
            products.map((e, i) => (
              <>
               <Product producto={e} key={i+""}/>
              
              </>
            ))
          }

         

        </div>





      </div>

    </>
  )
}
