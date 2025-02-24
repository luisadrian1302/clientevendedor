import axios from "axios";
import { useEffect, useState } from "react";
import { URLAPI } from "../../../url";
import '../../../styles/descuentos.css'
import { Pencil, Plus } from "lucide-react";
import { TipoAtributo } from "./TipoAtributo";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function CaracteristicasModal({ show, onClose, onSave, idCategoria , caracteristica, elementEdit}) {

    const notify = () => toast.error("Solo se permite colocar 3 caracteristicas destacadas");

    const [formData, setFormData] = useState({
        id_atributo: "",
        valor: "",
        fecha_final_descuento: "",
        nombre_descuento: ""
    });

    const [formDataAtributo, setFormDataAtributo] = useState({
        nombre: "",
        tipo_atributo: ""
    });

    const [formDataCaracteristica, setFormDataCaracteristica] = useState({
        id_atributo: "",
        valor: "",
    });
    const [error, setError] = useState("");
    const [errorAtributo, setErrorAtributo] = useState("");
    const [index, setndex] = useState(null);
    const [carroucelPage, setcarroucelPage] = useState(1);

    const [tipo_valor, setTipo_valor] = useState("");

   
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleChangeAtributo = (e) => {
        console.log(e.target.name,  e.target.value);
        
        setFormDataAtributo({ ...formDataAtributo, [e.target.name]: e.target.value });
    };

    const handleChangeCaracteristica = (e) => {
        console.log(e.target.name,  e.target.value);
        
        setFormDataCaracteristica({ ...formDataCaracteristica, [e.target.name]: e.target.value });
    };

    const [atributos, setAtributos] = useState([]);
   

    useEffect(() => {
        async function traerCategorias() {
            try {
                console.log(caracteristica, "en length");

                let token = localStorage.getItem("token")
                let { data } = await axios.get(URLAPI + "/atributo/getBySubcategoria/" + idCategoria, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })


                let memoryData = data;
                let filtro = [];
                // fitrar la caracteristica

                

                if (caracteristica.length) {
                    
                    for (let i = 0; i < caracteristica.length; i++) {

                        if (caracteristica[i].tipo == "boton") {
                            

                            let value = data.filter(e => e.nombre != caracteristica[i].propiedad);
                            data = [ ...value];
                        

                            
                        }else{
                            let value = data.filter(e => e.tipoPropiedad != caracteristica[i].tipo);
                            data = [ ...value];
                        }
    
                        
                    }

                    if (elementEdit) {
                        let findItem = memoryData.find(e => e.nombre == elementEdit.propiedad);
                        data = [...data, findItem]
                        formDataCaracteristica.id_atributo =elementEdit.id_atributo;
                        setFormDataCaracteristica(formDataCaracteristica);
                        
                    }
                    
                    filtro = data;
                    setAtributos(filtro);
                   


                }else{
                    setAtributos(data)
                }
                
                // let filter = da
                // ta.filter()

            } catch (error) {
                setAtributos([])

                console.log("no se pudeo obtener las categorias", error);

            }

        }
        if (show) {
            if (elementEdit) {
                console.log(elementEdit);
                
                traerCategorias();

                formDataCaracteristica.valor =elementEdit.valor;

                formDataAtributo.nombre = elementEdit.propiedad
                formDataAtributo.tipo_atributo = elementEdit.tipo;

                setFormDataAtributo(formDataAtributo);
                setFormDataCaracteristica(formDataCaracteristica);
                setTipo_valor(elementEdit.tipo);
                
            }else{

                if (caracteristica.length >= 3) {
                    notify();
                    onClose();
                    
                }else{
    
                    traerCategorias();
                }

      
                console.log(caracteristica, "inicio de caracteristica");
                

            }

        }
    }, [show])

    

    function addAtributo(value) {
        setcarroucelPage(value);

    }

    function obtenerDescuento() {
        

        if (formDataCaracteristica.id_atributo == "" || formDataCaracteristica.valor == "") {
            return;
        }


        const objeto = {
            id_atributo: formDataCaracteristica.id_atributo,
            valor: formDataCaracteristica.valor,
        };
        objeto.tipo = tipo_valor;

        let propiedad = atributos.find((element) => element.id == formDataCaracteristica.id_atributo)
        
        objeto.propiedad = propiedad.nombre;

        const wrapeer = objeto;
        onSave(wrapeer);
        onClose();
        formDataCaracteristica.valor = "";
        formDataCaracteristica.id_atributo = "";

        formDataAtributo.nombre = ""
        formDataAtributo.tipo_atributo = "";
        setFormDataAtributo(formDataAtributo);
        setFormDataCaracteristica(formDataCaracteristica);

      

    }

    

    async function crearAtributo() {
        if (formDataAtributo.nombre == "" || formDataAtributo.tipo_atributo == "") {
            setErrorAtributo("Todos los campos son obligatorios.");

            return
        }
        setErrorAtributo("");

        console.log(formData);
        try {
            let token = localStorage.getItem("token");
            let payload = {
                "nombre": formDataAtributo.nombre,
                "idSubcategoria": idCategoria,
                "tipoPropiedad": formDataAtributo.tipo_atributo,
               
            }

            const {data} = await axios.post(`${URLAPI}/atributo/crearAtributo`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(data);
            atributos.push(data);
            setAtributos(atributos);
            setcarroucelPage(1)

            // setDescuentos(descuentos);

        } catch (error) {
            
            let msg = error.response.data.message
            toast.error(msg);
            
        }

    }

    function obtenerAtributo(e){
        console.log(e.target);
        let atributo = atributos.find(element => element.id == e.target.value);
        if (atributo) {
            setTipo_valor(atributo.tipoPropiedad);

            if (atributo.tipoPropiedad == "color") {
                formDataCaracteristica.valor ="#000000";
                setFormDataCaracteristica(formDataCaracteristica);
            }
        }
        
        handleChangeCaracteristica(e);
    }


    function pageCaracteristicas() {

        if (carroucelPage == 1) {
            return (
                <form >
                    <div className="">
                        <label>Atributo</label>
                        <div className="form-group edit-group " style={{ alignItems: "center" }}>
                            <select name="id_atributo" id="" className="form-control me-2"  value={formDataCaracteristica.id_atributo} onChange={obtenerAtributo} >
                                <option value="">seleccione el atributo</option>
                                {atributos.map((e, i) => (
                                    <option value={e.id} key={i} >{e.nombre}, tipo: {e.tipoPropiedad}</option>
                                ))}
                            </select>
                            <Plus className="edit-icon" size={16} onClick={() => addAtributo(2)} />


                        </div>
                    </div>

                    <div className="form-group">
                        <label>Valor del atributo</label>
                        <input type="text" className="form-control" name="valor" value={formDataCaracteristica.valor} onChange={handleChangeCaracteristica} />
                    </div>
                    
                    <TipoAtributo tipo_atibuto={tipo_valor} valor={formDataCaracteristica.valor} 
                    updateValue={setFormDataCaracteristica} valueUpdate={"valor"}
                    data={formDataCaracteristica}/>

                    {error && <p className="text-danger">{error}</p>}

                </form>
            )
        }

        if (carroucelPage == 2) {
            return (
                <form>

                    <a href="#"className="link" style={{textDecoration: "none"}} onClick={(e) => setcarroucelPage(1)}> Ir a principal</a>
                    <h3 className="mt-2">Añadir Atributo</h3>
                   

                    <div className="form-group">
                        <label>Nombre del Atributo</label>
                        <input type="text" className="form-control" name="nombre" value={formDataAtributo.nombre} onChange={handleChangeAtributo} />
                    </div>
                    <div className="">
                        <div className="form-group  " style={{ alignItems: "center" }}>
                            <label>seleccione el tipo de atributo</label>
                            <select name="tipo_atributo" id="" className="form-control me-2" value={formDataAtributo.tipo_atributo} onChange={handleChangeAtributo}>
                                <option value="color">Color</option>
                                <option value="boton">Boton</option>
                                {/* <option value="imageColor">ImageColor</option>
                                <option value="select">Select</option> */}
                                
                            </select>

                        </div>
                    </div>

                    {errorAtributo && <p className="text-danger">{errorAtributo}</p>}
                    <button type="button" className="btn btn-primary"
                            onClick={crearAtributo}
                        >Crear Atributo</button>

                </form>
            )
        }
    }

    return (
        <>
        
        
        <div className={`modal fade w-100 ${show ? "show d-block" : ""}`} tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog w-100 " role="document">
                <div className="modal-content  ">
                    <div className="modal-header bg-warning d-flex" style={{ justifyContent: "space-between", alignItems: "center" }}>
                        <h5 className="modal-title">Agregar Descuento</h5>
                        <button type="button" className="close btn bg-none" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body  ">
                        {
                            pageCaracteristicas()
                        }

                    </div>
                    <hr />

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
                        <button type="button" className="btn btn-primary"
                            onClick={obtenerDescuento}
                        >Añadir caracteristica</button>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer />
        </>
    );
}
