import axios from "axios";
import { useEffect, useState } from "react";
import { URLAPI } from "../../../url";
import '../../../styles/descuentos.css'
import { validarValor } from "../../pages/vendedor_basico/helpers/validaciones";
import Swal  from "sweetalert2/dist/sweetalert2";




export default function AddDescuentoModal2({ show, onClose, onSave, id }) {
    const [formData, setFormData] = useState({
        porcentaje_descuento: "",
        fecha_inicial_descuento: "",
        fecha_final_descuento: "",
        nombre_descuento: ""
    });

    const [error, setError] = useState("");
    const [index, setndex] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [descuento, setDescuentos] = useState(null);
    const handleSubmit = async() => {



        if (formData.porcentaje_descuento == "" || formData.fecha_inicial_descuento == "" || formData.fecha_final_descuento == "" || formData.nombre_descuento == "") {
            setError("Todos los campos son obligatorios.");

            return
        }

        if (formData.porcentaje_descuento > 100) {
            setError("El porfentaje no debe ser mayor a 100%.");

            return
        }

        if (new Date(formData.fecha_inicial_descuento) > new Date(formData.fecha_final_descuento)) {
            setError("La fecha de inicio no puede ser mayor que la fecha de finalización.");
            return;
        }

        
        setError("");

        try {
            let token = localStorage.getItem("token");
            let payload = {
                "porcentajeDescuento": formData.porcentaje_descuento,
                "fechaInicioDescuento": formData.fecha_inicial_descuento,
                "fechaFinalDescuento": formData.fecha_final_descuento,
                "nombre": formData.nombre_descuento
            }

            if (id) {

                const {data} = await axios.put(`${URLAPI}/descuentos/actualizarescuento/${id}`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                await onSave(data);
                
            }else{

                const {data} = await axios.post(`${URLAPI}/descuentos/crearDescuento`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                await onSave(data);


            }
            setFormData({
                porcentaje_descuento: "",
                fecha_inicial_descuento: "",
                fecha_final_descuento: "",
                nombre_descuento: ""
            })

        } catch (error) {
            let msgDefault = error.response.data.message ? error.response.data.message :"No se pudo habilitar este producto.";
            
                  
            Swal.fire({
                title: "Error",
                text: msgDefault,
                icon: "error"
            });
            
        }


      
    };

    function inhabilitarFechasFinal(){

        // fecha final
        const fechaActualSinModificar = new Date();

        const fechaFinal1 = fechaActualSinModificar.toLocaleDateString("es-MX", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });
        let  [dia, mes, año] = fechaFinal1.split("/");
        const fechaFormateadaFinal = `${año}-${mes}-${dia}`;

        document.getElementById("fechaFinal").setAttribute("min", fechaFormateadaFinal); 
        document.getElementById("fechaInicio").setAttribute("max", fechaFormateadaFinal);


        const fechaActualSinModificar2 = new Date();
        fechaActualSinModificar2.setFullYear(fechaActualSinModificar2.getFullYear() + 1)
        const fechaFinal2 = fechaActualSinModificar2.toLocaleDateString("es-MX", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });

        let  value = fechaFinal2.split("/");
        const fechaFormateadaFinal2 = `${value[2]}-${value[1]}-${value[0]}`; 
        


        document.getElementById("fechaFinal").setAttribute("max", fechaFormateadaFinal2);  

        // establecer fecha maxima a nuestro inicial

    }

    function inhabilitarFechasInicial (){
         // fecha inicial
         const fechaInicialAceptableSinValores = new Date()
         fechaInicialAceptableSinValores.setDate( new Date().getDate() - 7)
     
         const fechaInicialAceptable = fechaInicialAceptableSinValores.toLocaleDateString("es-MX", {
             year: "numeric",
             month: "2-digit",
             day: "2-digit"
         });
         
     
         let  [dia, mes, año] = fechaInicialAceptable.split("/");
 
         // Formatear la fecha a "YYYY-MM-DD"
        
         const fechaFormateada = `${año}-${mes}-${dia}`;
         document.getElementById("fechaInicio").setAttribute("min", fechaFormateada);
    }
    
    useEffect(() => {
        async function traerCategorias() {
            try {
                let token = localStorage.getItem("token")
                const { data } = await axios.get(URLAPI + "/descuentos/getByID/"+id, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })

                console.log(data);
                
                // Asignar la fecha mínima al input

                setFormData({
                    porcentaje_descuento: data.porcentajeDescuento,
                    fecha_inicial_descuento: data.fechaInicioDescuento,
                    fecha_final_descuento: data.fechaFinalDescuento,
                    nombre_descuento: data.nombre
                })
                
            } catch (error) {
                console.log(error);
            }
        }
        if (show) {
            // Obtener la fecha actual en formato YYYY-MM-DD
            inhabilitarFechasFinal();
            inhabilitarFechasInicial();
            if (id) {
                traerCategorias();
               
                
            }else{
                setFormData({
                    porcentaje_descuento: "",
                    fecha_inicial_descuento: "",
                    fecha_final_descuento: "",
                    nombre_descuento: ""
                })
            }

        }
    }, [show])



    

    return (
        <div className={`modal fade w-100 ${show ? "show d-block" : ""}`} tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog w-100 " role="document">
                <div className="modal-content  ">
                    <div className="modal-header bg-warning d-flex" style={{justifyContent: "space-between", alignItems: "center"}}>
                        <h5 className="modal-title">{id == null ? "Agregar Descuento" :  "Editar Descuento"}</h5>
                        <button type="button" className="close btn bg-none" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body  ">
                        <form>
                            <div className="form-group">
                                <label>Nombre del Descuento</label>
                                <input type="text" className="form-control" name="nombre_descuento" value={formData.nombre_descuento} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Porcentaje de Descuento</label>
                                <input type="number" className="form-control" name="porcentaje_descuento" 
                                value={formData.porcentaje_descuento} onChange={(event) => validarValor(event, "porcentaje_descuento", setFormData)} />
                            </div>
                            <div className="form-group">
                                <label>Fecha Inicial</label>
                                <input type="date" className="form-control"  id="fechaInicio" name="fecha_inicial_descuento" 
                                value={formData.fecha_inicial_descuento} onChange={handleChange } />
                            </div>
                            <div className="form-group">
                                <label>Fecha Final</label>
                                <input type="date" className="form-control" id="fechaFinal" name="fecha_final_descuento" value={formData.fecha_final_descuento} onChange={handleChange} />
                            </div>
                           
                            {error && <p className="text-danger">{error}</p>}
                            <button type="button" className="btn bg-none text-primary mt-3 mx-0 px-0" onClick={handleSubmit}>Guardar descuento</button>



                        </form>
                    </div>
                    
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
                        <button type="button" className="btn btn-primary"
                        onClick={onClose}
                        >Aceptar</button>
                    </div>
                </div>
                
            </div>


        </div>

        
    );
}
