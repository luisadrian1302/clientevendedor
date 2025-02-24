import {  Pencil, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import './styles/ProductModification.css';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { URLAPI } from '../../../url';
import ImageUploadModal from '../../layout/modal/ImageUploadModal';
import Swal from 'sweetalert2';
import "../../../styles/product.css"
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { actualizarInfomracionGeneralProducto } from '../../../actions/ProductVendedorAction';
import { useParams } from "react-router-dom";
import { ShowAtributes } from './subproductos_components/showAtributes';

export const ProductModification = () => {


    const { id } = useParams();

    const dispatch = useDispatch();
    const navegate = useNavigate();

    const [showUPModal, setUPShowModal] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [currentOldImage, setCurrentOldImage] = useState(null);
    const [croppedImageFile, setcroppedImageFile] = useState(null);

    const [categorias, setCategorias] = useState([]);
    const [producto, setproducto] = useState({});
    const [subcategorias, setsubCategorias] = useState([]);
    const [subProducto, setsubProducto] = useState([]);
    const [categoriaid, setcategoriaID] = useState(0);
    const [subcategoriaid, setsubcategoriaID] = useState(0);

    const [inforacionGeneral, setInformacionGeneral] = useState({
        titular: '',
        descripcion: '',
        idCategoria: 0,
        idsubCategoria: 0,
        marca: ""
    });



    useEffect(() => {

        async function traerCategorias() {
            try {
                let token = localStorage.getItem("token")
                const { data } = await axios.get(URLAPI + "/categorias/getAllcategorias", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })

                setCategorias(data);
            } catch (error) {

                console.log("no se pudeo obtener las categorias");

            }

        }

        async function traerProducto() {
            try {
                let token = localStorage.getItem("token")
                const { data } = await axios.get(URLAPI + "/product/getVendedor/" + id, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                console.log(data.subcategoria.categoria.id);
                setproducto(data);


            } catch (error) {

                console.log("no se pudeo obtener las categorias");

            }

        }

        async function traersubProducto() {
            try {
                let token = localStorage.getItem("token")
                const { data } = await axios.get(URLAPI + "/SubProduct/getByProduct/" + id, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                setsubProducto(data);


            } catch (error) {

                console.log("no se pudeo obtener las subproductos", error);

            }

        }


        traerProducto();
        traersubProducto();
        traerCategorias();
    }, [])

    useEffect(() => {
        if (Object.entries(producto).length) {


            setInformacionGeneral({
                descripcion: producto.descripcionGeneral,
                titular: producto.titular,
                idCategoria: producto.subcategoria.categoria.id,
                idsubCategoria: producto.subcategoria.id
            })


            document.querySelector("#categoria").value = producto.subcategoria.categoria.id;
            document.querySelector("#subcategoría").value = producto.subcategoria.id;
            handleCategorias(producto.subcategoria.categoria.id)
            setCurrentImage(URLAPI + "/product/image/" + producto.imagePortada);
            setCurrentOldImage(URLAPI + "/product/image/" + producto.imagePortada)

            if (subProducto.length > 0) {
                document.querySelector("#categoria").setAttribute("disabled", "true");
                document.querySelector("#subcategoría").setAttribute("disabled", "true");
            }

        }
    }, [categorias])


    const handleChangeCategoria = (e) => {
        handleCategorias(e.target.value)

    }
    function handleCategorias(value) {
        setInformacionGeneral((element) => ({ ...element, idCategoria: value }))


        let subcategorias = categorias.filter(el => el.id == value);
        if (subcategorias.length) {

            setsubCategorias(subcategorias[0].subcategorias);
        } else {
            setsubCategorias([])
        }
    }

    const handleSave = (file) => {

        setcroppedImageFile(new File(
            [file],
            'cropped-image.jpg',
            { type: 'image/jpeg' }
        ));
        // Aquí puedes manejar la subida del archivo al servidor

        // Para previsualización local:
        const reader = new FileReader();
        reader.onloadend = () => {
            setCurrentImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    function guardarCambios(e) {
        e.preventDefault();


        //obtener los valores 

        if (inforacionGeneral.titular == "" || inforacionGeneral.descripcion == "") {
            Swal.fire({
                icon: "error",
                text: "Coloque un titular y una descripcion a su producto"
            })
            return
        }

        if (inforacionGeneral.idCategoria == 0 || inforacionGeneral.idsubCategoria == 0) {
            Swal.fire({
                icon: "error",
                text: "Coloque una categoria y subcategoria a su producto"
            })
            return
        }
        if (currentImage == null && currentOldImage == null) {
            Swal.fire({
                icon: "error",
                text: "Coloque una imagen principal a su producto"
            })
            return
        }


        let formdata = new FormData();





        formdata.append("id", id);
        formdata.append("titular", inforacionGeneral.titular);
        formdata.append("descripcion", inforacionGeneral.descripcion);
        formdata.append("categoriaid", inforacionGeneral.idCategoria);
        formdata.append("subcategoriaid", inforacionGeneral.idsubCategoria);
        

        // Crear un nuevo archivo a partir del blob
        if (croppedImageFile != null) {

            formdata.append('image', croppedImageFile);
        }


        dispatch(actualizarInfomracionGeneralProducto(formdata, navegate))


    }

    function quitarImagen() {
        setcroppedImageFile(null);
        setCurrentImage(currentOldImage)

    }

    function crearSubcategoria() {
        navegate("/subproducts/" + id)

    }
    function obtenerImagenSubproducto(multimedia, ca) {

        let jsonMulti = JSON.parse(multimedia);
        


        return (
            <img
                src={URLAPI+"/SubProduct/image/"+jsonMulti[0]}
                alt="64GB Storage"
                className="img-fluid storage-image mb-3 image_subproduct"
            />
        )
    }
    function editarSubcategoria(id){

        navegate("/subproducts/edit/"+id);

    }

    function eliminarProducto(id) {
        
    
    
        Swal.fire({
          title: "Eliminar?",
          text: "¿Desea eliminar este producto?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Si, eliminar!"
        }).then((result) => {
          if (result.isConfirmed) {
            // logica de programacion
            eliminarSubproductoPorID(id)
            
          }
        });
    
      }


      async function eliminarSubproductoPorID(id) {
        try {
    
          let token = localStorage.getItem("token");
          const { data, status} = await axios.delete(`${URLAPI}/product/getProduct/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          if (status == "200") {
             Swal.fire({
                title: "eliminar",
                text: "Tu producto a sido eliminado.",
                icon: "success"
            });
            navegate("/vendedorProductos");
            return;
          }
    
          Swal.fire({
            title: "Error",
            text: "Tu producto no pudo ser eliminado.",
            icon: "error"
        });
          // actualizar los datos
        //   await obtenerTodosLosproductos()

       
        } catch (error) {

            let msgDefault = error.response.data.message ? error.response.data.message :"No se pudo eliminar este producto.";
           
                 
            Swal.fire({
                title: "Error",
                text: msgDefault,
                icon: "error"
            });
    
        }
      }

    return (
        <>

            <Container fluid>

                <Row>


                    <Col className=" py-0">

                        <Row className="align-items-center my-2">
                            <Col>
                                <h4>Modificar producto</h4>
                            </Col>

                        </Row>
                        {/* <h2 className="product-title mb-4"></h2> */}

                        <div className="card main-card">
                            <div className="card-body">
                            <div className="pb-2">
                                    <Link className=' text-secondary text-decoration-none hover-primary '
                                    to={"/vendedorProductos"}>Productos / </Link>
                                    <Link className='text-primary text-decoration-none hover-primary'>{inforacionGeneral.titular}</Link>
                                </div>
                                <h5 className="info-title">Información general del producto</h5>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="image-container position-relative">
                                            <img
                                                src={currentImage ? currentImage : "https://picsum.photos/seed/picsum/400/300"}
                                                alt="Product"
                                                className="img-fluid rounded product-image"
                                            />
                                            <button className="btn change-image-btn"  onClick={() => setUPShowModal(true)}>
                                                Cambiar imagen2 principal
                                            </button>
                                        </div>
                                        {
                                            croppedImageFile != null ? <button className='btn btn-outline text-danger' onClick={quitarImagen} > Quitar imagen</button> : ""
                                        }

                                    </div>

                                    <form className="col-md-6" encType='multipart/form-data'>
                                        <div className="edit-group">

                                            <h3 className="product-name" style={{ width: "100%" }}>
                                                <input type="text" className='non-input-style' value={inforacionGeneral.titular} placeholder='Coloque su titulo'
                                                    onChange={(event) => setInformacionGeneral((e) => ({ ...e, titular: event.target.value }))} />
                                            </h3>
                                            <Pencil className="edit-icon" size={16} />
                                        </div>

                                        <div className="edit-group">
                                            <p className="product-description" style={{ width: "100%" }}>
                                                <input type="text" className='non-input-style' value={inforacionGeneral.descripcion}
                                                    onChange={(event) => setInformacionGeneral((e) => ({ ...e, descripcion: event.target.value }))} placeholder={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"}
                                                />

                                            </p>
                                            <Pencil className="edit-icon" size={16} />
                                        </div>

                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className="form-control custom-input"
                                                placeholder="Marca"
                                                value={inforacionGeneral.marca}
                                                onChange={(e) => setInformacionGeneral((info) => ({ ...info, marca: e.target.value }))}

                                            />
                                        </div>

                                        <div className="approval-status mb-3">
                                            <span className="status-label">Estado de aprobación:</span>
                                            <span className="status-value">Sin aprobar</span>
                                        </div>

                                        <div className="mb-3">
                                            <select className="form-select custom-select mb-3" id='categoria' onChange={handleChangeCategoria}>
                                                <option value={0}>Seleccionar categoría</option>

                                                {categorias.map((e) => (

                                                    <option key={"c" + e.id} value={e.id} >{e.nombre}
                                                    </option>

                                                ))}
                                            </select>

                                            <select className="form-select custom-select" id='subcategoría'
                                                onChange={(e) => setInformacionGeneral((lement) => ({ ...lement, idsubCategoria: e.target.value }))}>
                                                <option value={0}>Seleccionar subcategoría</option>
                                                {subcategorias.map((e) => (

                                                    <option key={"sub" + e.id} value={e.id} >{e.nombre}
                                                    </option>

                                                ))}
                                            </select>


                                        </div>
                                        <div className="mt-2 mb-2">

                                             <a className='text-danger text-decoration-none hover-danger ' href='#' onClick={(e) => eliminarProducto(id)}>Eliminar producto</a>
                                        </div>


                                        <div className="action-buttons">
                                            <button className="btn btn-primary w-100 save-btn" onClick={guardarCambios} type='submit'>
                                                Guardar cambios
                                            </button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>



                        <div className="subproducts-section bg-light p-2">
                            <h5 className="subproducts-title">Subproductos</h5>
                            <div className="row">
                                {/* Storage Option 1 */}

                                {subProducto.map((e, i) => (
                                    <div className="col-lg-4 col-xl-3 col-md-6 col-sm-6">
                                        <div className="card storage-card">
                                            <div className="card-body">

                                                {obtenerImagenSubproducto(e.multimedia, e.caracteristicas)}



                                            
                                                <ShowAtributes caracteristicas={e.caracteristicas}/>

                                             
                                                
                                                <p className="original-price">Precio: ${e.precio}</p>
                                                {e.descuento ? <p className="final-price">Precio con descuento: ${e.precio - (e.precio * (e.descuento.porcentajeDescuento / 100))}</p> : null }
                                                
                                                <button className="btn btn-primary save-btn mt-2" 
                                                onClick={(ev) => editarSubcategoria(e.id)}
                                                 type='button'>
                                                Modificar subproducto
                                            </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}



                                {/* Add New Product Card */}
                                <div className="col-lg-4 col-xl-3 col-md-6 col-sm-6">
                                    <div className="card add-product-card">
                                        <div className="card-body d-flex justify-content-center align-items-center">
                                            <button className="btn add-product-btn" onClick={crearSubcategoria} >
                                                <Plus size={32} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>


                </Row>

            </Container>




            <ImageUploadModal
                show={showUPModal}
                onHide={() => setUPShowModal(false)}
                onSave={handleSave}
                currentImage={currentImage}
            />

        </>
    )
}
