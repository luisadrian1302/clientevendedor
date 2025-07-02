import axios from "axios";
import { useEffect, useState } from "react";
import { URLAPI, URLAPI_SUBPRODUCT_PUBLIC, URLAPI_SUBPRODUCT_SELLER } from "../../../url";
import '../../../styles/subproduct.css'
import { Download, Pencil, Plus } from "lucide-react";
import { TipoAtributo } from "./TipoAtributo";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { ShowAtributes } from "../../pages/vendedor_basico/subproductos_components/showAtributes";
import Swal from "sweetalert2";


export default function AplicarDescuentosSubproductos({ show, onClosevalue, onSave, subproductos = [], toast, id }) {

    const notifyNotFound = (msg) => toast.error(msg);
    // const notifyError = () => toast.error("");

    const [formData, setFormData] = useState({
        id_producto: "",

    });

    const [idToast, setIdToast] = useState(0);
    const navegate = useNavigate();
    const [carroucelPage, setcarroucelPage] = useState(1);
    const [error, setError] = useState("");
    const [products, setproducts] = useState([]);

    const [productActve, setproductActve] = useState([]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    useEffect(() => {
        async function obtenerTodosLosproductos() {

            try {
                let token = localStorage.getItem("token");
                const { data } = await axios.get(`${URLAPI_SUBPRODUCT_SELLER}/getByUserOutDescuento`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(data);

                // setproducts(data)
                setproductActve(data)

            } catch (error) {
                console.log(error);
            }
        }

        if (show == true) {

            obtenerTodosLosproductos()
        }



    }, [show])

    function toggleSelection(id) {
        console.log(id);

        document.querySelector("#apply" + id).classList.toggle('selected');
        // add or remove id
    }

    async function getSelectedCards() {
        const selectedCards = document.querySelectorAll('.apply.selected');
        const ids = Array.from(selectedCards).map(card => {
            let id = card.id.split("apply")[1]
            return id

        });

        if (ids.length > 0) {
            // premarar el subproducto 
            await publicarSubproductosPeticion(ids)

        } else {
            Swal.fire({
                title: "Error",
                text: "No hay elementos seleccionados",
                icon: "error"
            });
        }
    }
    async function publicarSubproductosPeticion(ids) {


        try {
            let token = localStorage.getItem("token");
            let payload = {
                "ids": JSON.stringify(ids)
            }

            const { data, status } = await axios.post(`${URLAPI_SUBPRODUCT_SELLER}/addDescuento/${id}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });


            if (status == "200") {
                await onSave();
                return;
            }
            Swal.fire({
                title: "Error",
                text: "No se actualizar los descuentos",
                icon: "error"
            });


        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error",
                text: "No se pudieron publicar los productos",
                icon: "error"
            });

        }

    }
    function obtenerImagenSubproducto(multimedia, ca) {

        let jsonMulti = JSON.parse(multimedia);



        return (
            <img
                src={URLAPI_SUBPRODUCT_PUBLIC + "/image/" + jsonMulti[0]}
                alt="64GB Storage"
                className="img-fluid storage-image mb-3 image_subproduct"
            />
        )
    }

    function closeToast() {
        if (toast.isActive(idToast)) {
            toast.dismiss(idToast);
        }
        onClosevalue();
    }
    return (
        <>


            <div className={`modal fade w-100 ${show ? "show d-block" : ""}`} tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog w-100 modal-xl" role="document">
                    <div className="modal-content  ">
                        <div className="modal-header bg-warning d-flex" style={{ justifyContent: "space-between", alignItems: "center" }}>
                            <h5 className="modal-title">Publicar Subproducto</h5>
                            <button type="button" className="close btn bg-none" onClick={closeToast}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body  ">

                            <div className="container py-5">
                                <h3 className="mt-2 mb-4">Seleccione los sub productos que desea Aplicar descuento</h3>

                                <div className="row" id="cardContainer">

                                    {productActve.map(e => (

                                        <div className="col-lg-4 col-xl-3 col-md-6 col-sm-6" key={e}>
                                            <div className="card apply" id={"apply" + e.id} onClick={(element) => toggleSelection(e.id)}>
                                                <div className="card-body">
                                                    {obtenerImagenSubproducto(e.multimedia, e.caracteristicas)}

                                                    <h5 className="card-title">Producto: {e.producto.titular}</h5>
                                                    {/* <p className="card-text">Subproducto: {e.precio}</p> */}

                                                    <ShowAtributes caracteristicas={e.caracteristicas} />



                                                    <p className="original-price">Precio: ${e.precio}</p>
                                                    {e.descuento ? <p className="final-price">Precio con descuento: ${e.precio - (e.precio * (e.descuento.porcentajeDescuento / 100))}</p> : null}


                                                </div>
                                            </div>
                                        </div>

                                    ))}




                                </div>

                                <div className="mt-4" >
                                    <button className="btn btn-primary" onClick={(e) => getSelectedCards()}>Aplicar productos</button>
                                </div>


                               

                             
                            </div>








                        </div>
                        <hr />

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeToast}>Cerrar</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
