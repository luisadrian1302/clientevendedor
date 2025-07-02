import { Button, Card } from "react-bootstrap";
import { URLAPI, URLAPI_SUBPRODUCT_SELLER } from "../../../url";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ShowAtributesProduct } from "../../pages/vendedor_basico/subproductos_components/showAtributesProduct";



export const ProductCard = ({ imagePortada, titular, id ,descripcionGeneral,subproducto,subcategoria, navegate}) => {

  const [caracteristica, setCaracteristica] = useState([]);

  const effectRun = useRef(false);


  useEffect(() => {
    if (!effectRun.current) {
      effectRun.current = true;
   }else{
      console.log("adios");

      async function obtenerSubproductos(){
        let token = localStorage.getItem("token")
        let { data } = await axios.get(URLAPI_SUBPRODUCT_SELLER + "/getAtributos/" + id, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        // ordenar productos por nombres
   
        let datamemory = data;
        let orden = [];
        let nombreAntiguo = "";
   
        for (let i = 0; i < data.length; i++) {
          
          let nombreAlmacenado = data[i].nombre;
          
          let arreglo1 = datamemory.filter( e => e.nombre == nombreAlmacenado);
          let filtrar = datamemory.filter( e => e.nombre != nombreAlmacenado);
   
          
          if (arreglo1.length > 0) {
            orden.push(arreglo1);
          }
          datamemory = filtrar;
        }
   
        
   
        setCaracteristica(orden);
        
        
      }
      if (subproducto) {
        obtenerSubproductos();       
      }
    
   }

   return () => {
    setCaracteristica([])
  }
    
  }, [])

 
  
  function obtenerValores(){
    return (
      caracteristica.map((c,i)=> (

        <ShowAtributesProduct key={i} caracteristicas={c} id={id} />
      ))
    )
  }

  return (
    <>
    
    <div className=" d-flex justify-content-center align-items-center " style={{height: "100%"}}>
      <div className="card position-relative p-3 " style={{height: "100%"}}>
        <div className="decorative-element"></div>
        
        <img 
          src={URLAPI+"/product/image/"+imagePortada} 
          alt="Red High Heel Shoe" 
          className="product-image mb-3" 
        />
        <h4 className="mt-2 mb-2">{titular}</h4>
      
        {
          subcategoria ? <p className="text-muted small">
          Subcategoria: <strong>{subcategoria.nombre}</strong>
        </p> : null
        }
        <div className="color-dots d-flex justify-content-center my-2" style={{flexDirection: "column"}}>
          {/* <div className="color-dot" style={{ backgroundColor: '#FF6B6B' }}></div>
          <div className="color-dot" style={{ backgroundColor: '#4ECDC4' }}></div>
          <div className="color-dot" style={{ backgroundColor: '#FFB347' }}></div> */}

          {obtenerValores()}
        </div>
        <div className="d-flex justify-content-between align-items-center" >
          {/* <span className="price fw-bold">$45.00</span> */}
          <button className=" btn btn-primary" onClick={(e) => navegate("/products/edit/"+id)}>Modificar</button>
        </div>
      </div>
    </div>
    </>
  )
   
   
};