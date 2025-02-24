import axios from "axios";
import { useEffect, useState } from "react";
import { URLAPI } from "../../../url";
import '../../../styles/descuentos.css'
import { Download, Pencil, Plus } from "lucide-react";
import { TipoAtributo } from "./TipoAtributo";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


export default function AddDescuentoModal({ show, onClose, onSave }) {

    const notify = () => toast.error("Solo se permite colocar 3 caracteristicas destacadas");

    const [formData, setFormData] = useState({
        id_producto: "",

    });

    const navegate = useNavigate();
    const [carroucelPage, setcarroucelPage] = useState(1);
    const [error, setError] = useState("");
    const [products, setproducts] = useState([]);



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    useEffect(() => {
        async function getProducts() {
            try {
                let token = localStorage.getItem("token");
                const { data } = await axios.get(`${URLAPI}/product/verProductosPorUsuario`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setproducts(data)
                console.log(data);

            } catch (error) {

            }
        }

        getProducts()
    }, [])




    function irASubproductos() {
        if (formData.id_producto == "") {
            setError("seleccione un producto")
            return;

        }
        setError("");


        navegate("/subproducts/" + formData.id_producto);

    }



    function pageCaracteristicas() {

        if (carroucelPage == 1) {
            return (
                <form >
                    <div className="">
                        <label>Producto</label>
                        <div className="form-group edit-group " style={{ alignItems: "center" }}>
                            <select name="id_producto" id="" className="form-control me-2" onChange={handleChange}>
                                <option value="">seleccione el producto</option>
                                {products.map((e, i) => (
                                    <option value={e.id} key={i} >{e.titular}</option>
                                ))}
                            </select>


                        </div>


                    </div>
                    {error && <p className="text-danger">{error}</p>}

                    <div className="">
                        <button className="btn btn-primary" type="button" onClick={(e) => irASubproductos()}>Ir a subproducto </button>
                    </div>



                </form>
            )
        }

        if (carroucelPage == 2) {
            return (
                <form>

                    <h3 className="mt-2"></h3>



                    <div className="">
                        <label>Producto</label>
                        <div className="form-group edit-group " style={{ alignItems: "center" }}>
                            <select name="id_producto" id="" className="form-control me-2" onChange={handleChange}>
                                <option value="">seleccione el producto</option>
                                {products.map((e, i) => (
                                    <option value={e.id} key={i} >{e.titular}</option>
                                ))}
                            </select>


                        </div>


                    </div>
                    <div className="mt-4">

                        <p>Importar datos en excel</p>
                        <div className="form-control">
                            <input type="file" className="form-group" />
                        </div>
                    </div>


                    <div className="mt-4">

                        <p>Descargar plantilla</p>
                        <a href="/images/myw3schoolsimage.jpg" download className="btn "  >
                                <Download/>
                        </a>
                    </div>

                    {/* {errorAtributo && <p className="text-danger">
                        {errorAtributo} */}
                    {/* </p>} */}
                    <div className="mt-4">

                        <button type="button" className="btn btn-primary"
                        // onClick={crearAtributo}
                        >Crear subproductos</button>
                    </div>

                </form>
            )
        }
    }


    useEffect(() => {
        let carroucels = document.querySelectorAll(".carroucelbtn");
        if (carroucelPage == 1) {
            carroucels[0].classList.remove("text-primary");
            carroucels[0].classList.add("text-secondary");

            carroucels[1].classList.add("text-primary");
            carroucels[1].classList.remove("text-secondary");


        } else if (carroucelPage == 2) {
            carroucels[0].classList.add("text-primary");
            carroucels[0].classList.remove("text-secondary");


            carroucels[1].classList.remove("text-primary");
            carroucels[1].classList.add("text-secondary");
        }
    }, [carroucelPage])


    return (
        <>


            <div className={`modal fade w-100 ${show ? "show d-block" : ""}`} tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog w-100 " role="document">
                    <div className="modal-content  ">
                        <div className="modal-header bg-warning d-flex" style={{ justifyContent: "space-between", alignItems: "center" }}>
                            <h5 className="modal-title">Añadir subproducto</h5>
                            <button type="button" className="close btn bg-none" onClick={onClose}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body  ">
                            <div className="pb-2">
                                <button className=' text-secondary text-decoration-none hover-primary btn carroucelbtn' onClick={(e) => setcarroucelPage(1)}
                                >Forma manual </button>
                                <button className='text-primary text-decoration-none hover-primary btn carroucelbtn' onClick={(e) => setcarroucelPage(2)}>Importación automatica</button>
                            </div>

                            <div className="mt-2">

                                {

                                    pageCaracteristicas()
                                }
                            </div>

                        </div>
                        <hr />

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>

                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
