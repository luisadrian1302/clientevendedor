import React, { useEffect, useState } from 'react'
import { URLAPI, URLAPI_SUBPRODUCT_SELLER } from '../../../url';
import axios from 'axios';
import ProductDetail from '../componentes/ProductDetail';
import { caracteristicaToCaractertisticaModal, multimediaToImage } from '../../../helper/gettValues';

export const ClonarSubproducto = ({show,  onClosevalue, onsave, id}) => {


    const [subproductos, setSubproductos] = useState([]);
    const [subproducto, setSubproducto] = useState({});
    const [idSubprodcto, setidSubprodcto] = useState("");
    const [imagenes, setImagenes] = React.useState([]);
    const [caracteristica, setcaracteristica] = React.useState([]);

    async function obtenerSubproductos (){
        try {
            let token = localStorage.getItem("token")
            const { data } = await axios.get(URLAPI_SUBPRODUCT_SELLER + "/getByProduct/"+id, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            setSubproductos(data);
            console.log(data);
            
        } catch (error) {

            console.log("no se pudeo obtener las categorias");

        }
    }

    async function mostrarProducto (){

        if (!idSubprodcto) {
            return;
        }

        const producto = subproductos.find(element => element.id == idSubprodcto);
        setSubproducto(producto);

        setImagenes(multimediaToImage(producto.multimedia))
        setcaracteristica(caracteristicaToCaractertisticaModal(producto.caracteristicas))

        console.log(imagenes, caracteristica, subproducto);
        

    }
    useEffect(() => {
      if (show) {
        obtenerSubproductos();
      }
    }, [show])


    function reset(){
        setSubproducto({})
        setcaracteristica([])
        setImagenes([])
    }


    function quitarVisualizacion(){
        reset();
    }   
    function saveClone(){
        if (!idSubprodcto) {
            return;
        }

        const producto = subproductos.find(element => element.id == idSubprodcto);

        onsave(producto);

    } 
    return (
        <>


            <div className={`modal fade w-100 ${show ? "show d-block" : ""}`} tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog w-100 modal-xl" role="document">
                    <div className="modal-content  ">
                        <div className="modal-header bg-warning d-flex" style={{ justifyContent: "space-between", alignItems: "center" }}>
                            <h5 className="modal-title">Duplicar Subproducto</h5>
                            <button type="button" className="close btn bg-none" onClick={onClosevalue}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body  ">

                            <div className="container py-5">
                                <h3 className="mt-2 mb-4">Seleccione el subproducto que desee duplicar</h3>

                                <div className="row" id="cardContainer">

                                    <div className="">

                                        <label>seleccione el subproducto que desee clonar</label>
                                        <select name="tipo_atributo" id="" className="form-control me-2 mb-4" 
                                            value={idSubprodcto} onChange={(e) => setidSubprodcto(e.target.value)}
                                            >
                                                <option value="">-------Seleccione-------</option>
                                                {subproductos.map(element => (
                                                    <option key={element.id} value={element.id}> Producto: {element.producto.titular}, {" "}
                                                         {element.caracteristicas[0].atributo.nombre} : {element.caracteristicas[0].valor.valor}, {" "}
                                                         {element.caracteristicas[1].atributo.nombre} : {element.caracteristicas[1].valor.valor}
                                                     </option>

                                                ))}
                                            {/* <option value="color">Color</option>
                                            {/* <option value="imageColor">ImageColor</option>
                                            <option value="select">Select</option> */}
                                            
                                        </select>

                                        <ProductDetail producto={subproducto} caracteristica={caracteristica} imagenes={imagenes}/>

                                    </div>



                                </div>
                                <div className="mt-4" >
                                    <button className="btn btn-info me-2" onClick={(e) => mostrarProducto()}>Mostrar producto</button>
                                    <button className="btn btn-success me-2" onClick={(e) => saveClone()}  >Duplicar producto</button>
                                    {
                                        Object.entries(subproducto).length ? 
                                            <button className="btn btn-warning me-2" onClick={(e) => quitarVisualizacion()}>Cerrar visualizacion</button>
                                        
                                        : null
                                    }
                    
                                </div>

                              

                            </div>

                        </div>
                        <hr />

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClosevalue} >Cerrar</button>

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
