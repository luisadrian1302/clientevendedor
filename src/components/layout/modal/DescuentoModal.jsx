import axios from "axios";
import { useEffect, useState } from "react";
import { URLAPI } from "../../../url";
import '../../../styles/descuentos.css'
import { validarValor } from "../../pages/vendedor_basico/helpers/validaciones";
import { Swal } from "sweetalert2/dist/sweetalert2";




export default function DescuentoModal({ show, onClose, onSave }) {
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

    const [descuentos, setDescuentos] = useState([]);
    const handleSubmit = async() => {


        console.log(formData);

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

        console.log(formData);
        try {
            let token = localStorage.getItem("token");
            let payload = {
                "porcentajeDescuento": formData.porcentaje_descuento,
                "fechaInicioDescuento": formData.fecha_inicial_descuento,
                "fechaFinalDescuento": formData.fecha_final_descuento,
                "nombre": formData.nombre_descuento
            }

            const {data} = await axios.post(`${URLAPI}/descuentos/crearDescuento`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });



            console.log(data);
            setDescuentos((descuentos) => ([...descuentos, data ])); 

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
        console.log(value);
        


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
                const { data } = await axios.get(URLAPI + "/descuentos/getByUser", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })


                 // Obtener la fecha actual en formato YYYY-MM-DD
                 inhabilitarFechasFinal();
                 inhabilitarFechasInicial();
               

                // Asignar la fecha mínima al input
                setDescuentos(data);
            } catch (error) {
                console.log(error);
                

                console.log("no se pudeo obtener las categorias");

            }

        }
        if (show) {
            console.log("proceso extraño");
            traerCategorias();

        }
    }, [show])

    function seleccionarDescuento(id){
        console.log(id);

        const list = document.querySelectorAll(".listelement")

        for (let i = 0; i < list.length; i++) {
            list[i].classList.remove("bg-active");
            
        }
        if ( document.querySelector("#des-"+id)) {
            document.querySelector("#des-"+id).classList.add("bg-active");
            
        }
       
        setndex(id);
    }


    function obtenerDescuento(){
        if (index == null || index == 0)  {
            return;
        }

        let descuento = descuentos.find(e => e.id == index);

        onSave(descuento);
        onClose();

    }

    return (
        <div className={`modal fade w-100 ${show ? "show d-block" : ""}`} tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog w-100 " role="document">
                <div className="modal-content  ">
                    <div className="modal-header bg-warning d-flex" style={{justifyContent: "space-between", alignItems: "center"}}>
                        <h5 className="modal-title">Agregar Descuento</h5>
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
                    <hr />
                    <div className="d-flex my-2 p-2" style={{justifyContent: "space-between", alignItems: "center"}}>

                        <h5 className="mt-0 p-0">Selecciona descuento</h5>
                        <button type="button" className="btn bg-none text-primary mb-2 mx-0 px-0 "
                        // onClick={handleSubmit}
                        >Administrar descuentos</button>
                    </div>
                    <div className="p-2">

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Porcentaje</th>
                                <th>Fecha Inicio</th>
                                <th>Fecha Final</th>
                            </tr>
                        </thead>
                        <tbody>
                            {descuentos && descuentos.length > 0 ? (
                                descuentos.map((descuento, index) => (
                                    <tr key={index} onClick={(e) => seleccionarDescuento(descuento.id)} id={ "des-"+descuento.id  } className={ "listelement"}>
                                        <td>{descuento.nombre}</td>
                                        <td>{descuento.porcentajeDescuento}%</td>
                                        <td>{descuento.fechaInicioDescuento}</td>
                                        <td>{descuento.fechaFinalDescuento}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">No hay descuentos disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
                        <button type="button" className="btn btn-primary"
                        onClick={obtenerDescuento}
                        >Seleccionar descuento</button>
                    </div>
                </div>
                
            </div>


        </div>

        
    );
}
