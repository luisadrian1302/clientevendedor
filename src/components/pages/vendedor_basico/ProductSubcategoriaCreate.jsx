import {  Pencil, Plus, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import './styles/ProductModification.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { URLAPI } from '../../../url';
import Swal from 'sweetalert2';
import "../../../styles/product.css"
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "../../../styles/subcategoria.css"
import MultipleImageUpload from '../../layout/modal/MultipleImageUpload';
import ImageUploadSubproductModal from '../../layout/modal/ImageUploadSubproductModal';
import DescuentoModal from '../../layout/modal/DescuentoModal';
import CaracteristicasModal from '../../layout/modal/Caracteristicas';
import { ShowItems } from './subproductos_components/ShowItems';
import { Descripcion_producto } from '../../layout/modal/Descripcion_producto';
import { CaracteristicaTable } from '../../layout/modal/CaracteristicaTable';
import { validarValor } from './helpers/validaciones';
export const ProductSubcategoriaCreate = () => {


    const [showModal, setShowModal] = useState(false);
    const [showModalAtributo, setShowModalAtributo] = useState(false);

    const dispatch = useDispatch();
    const navegate = useNavigate();
    const { id } = useParams();

    const [element, setelement] = useState(null);
    const [indexEdit, setindexEdit] = useState(0);

    const [producto, setproducto] = useState({});
    const [descuento, setDescuento] = useState(null);
    const [productos, setproductos] = useState([]);


    const [showUPModal, setUPShowModal] = useState(false);
    const [indice, setIndece] = useState(0);
    const [currentImage, setCurrentImage] = useState(null);
    const [croppedImageFile, setcroppedImageFile] = useState([]);


    const [showUPModalMultiple, setUPShowModalMultiple] = useState(false);
    const [currentImageMultiple, setCurrentImageMultiple] = useState(null);
    const [croppedImageFileMultiple, setcroppedImageFileMultiple] = useState(null);

    const [categorias, setCategorias] = useState([]);
    const [caracteristica, setcaracteristica] = useState([]);
    const [caracteristicaAll, setcaracteristicaAll] = useState([]);
    const [subcategorias, setsubCategorias] = useState([]);
    const [imagenes, setImagenes] = useState([]);
    const [imagenesMemory, setImagenesMemory] = useState([]);
    const [categoriaid, setcategoriaID] = useState(0);
    const [subcategoriaid, setsubcategoriaID] = useState(0);

    const [inforacionGeneral, setInformacionGeneral] = useState({
        precio: '',
        cantidad: '',
        peso: '',
        grosor: '',
        largo: '',
        ancho: '',
        descripcion: '',
       
    });

    // modal de descripcion

    const [showDesc, setShowDesc] = useState(false);
    // const [text, setText] = useState("");

    const handleCloseDesc = () => setShowDesc(false);
    const handleShowDesc = () => setShowDesc(true);
    // cartegoria

    const [showCat, setShowCat] = useState(false);
    // const [text, setText] = useState("");

    const handleCloseCat = () => setShowCat(false);
    const handleShowCat = () => setShowCat(true);




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


        traerCategorias();
    }, [])



    const handleSave = (file) => {


        let memoryImage = imagenesMemory.find(e => e.id == indice);


        if (memoryImage) {
            memoryImage.image = imagenes[indice]
        } else {

            memoryImage = {
                id: indice,
                image: imagenes[indice]
            }
            imagenesMemory.push(memoryImage);
        }


        setImagenesMemory(imagenesMemory)
        // setcroppedImageFile(new File(
        //     [file],
        //     'cropped-image.jpg',
        //     { type: 'image/jpeg' }
        // ));
        // Aquí puedes manejar la subida del archivo al servidor
        console.log('Archivo a subir:', file);

        // Para previsualización local:
        const reader = new FileReader();

        reader.onloadend = () => {
            setCurrentImage(reader.result);
            imagenes[indice] = reader.result;
            setImagenes(imagenes);



        };
        reader.readAsDataURL(file);
    };


    const handleSaveMultiple = (files) => {


        setImagenes((images) => ([...images, ...files]));

    };

    async function guardarCambios(e) {
        e.preventDefault();

        if (!imagenes.length) {
            Swal.fire({
                icon: "error",
                text: "Coloque al menos una imagen en el subproducto"
            })
          return;  
        }

        let formdata =new FormData();

        for (let i = 0; i < imagenes.length; i++) {
            let base64Data = imagenes[i].split(',')[1];
            let byteCharacters = atob(base64Data);
            let byteNumbers = new Uint8Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            let file = new File(
                    [byteNumbers],
                    'cropped-image'+i+'.jpg',
                    { type: 'image/jpeg' }
                )
            formdata.append("imagenes", file)
            
            
        }
      
        // caracteristicas

        if (caracteristica.length < 2 ) {

            Swal.fire({
                icon: "error",
                text: "Coloque al menos dos caractertisticas en el sub producto"
            })
          return; 
            
        }

        if (inforacionGeneral.precio == "" || inforacionGeneral.ancho == ""  || inforacionGeneral.cantidad == "" 
            || inforacionGeneral.descripcion == ""  || inforacionGeneral.grosor == "" || inforacionGeneral.largo == ""
            || inforacionGeneral.peso == ""
        ) {
            Swal.fire({
                icon: "error",
                text: "Coloque toda la informacion del subproducto"
            })
          return;
            
        }

        if (!caracteristicaAll.length) {
            Swal.fire({
                icon: "error",
                text: "Coloque al menos una caracteristica en la tabla de su producto"
            })
          return;
        }

        if (descuento) {
            
            formdata.append("descuento", JSON.stringify(descuento.id))
        }
        
        formdata.append("caractertistica", JSON.stringify(caracteristica))
        console.log(caracteristica);
        
        formdata.append("inforacionGeneral", JSON.stringify(inforacionGeneral))
        formdata.append("caracteristicaAll", JSON.stringify(caracteristicaAll))
        formdata.append("id_producto", id)  
        

        try {
            let token = localStorage.getItem("token");

            const response = await fetch(`${URLAPI}/SubProduct/subir`, {
                method: 'POST',
                body: formdata,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },);
            

            if (await response.status == 200) {
                Swal.fire({
                    icon: "success",
                    text: "Se creo la sub producto con exitó",
                    
                }).then((_) =>{
                    navegate("../../vendedorProductos")
                })
            }else{
            let data = await response.json();
            console.log(data);

            let message = data.message ? data.message : "Ocurrio un error en el servidor"
            
                Swal.fire({
                    icon: "error",
                    text: message
                })
            }

            
        } catch (error) {
            console.log(error);
            
            
        }


        //obtener los valores 

       
        // console.log(categoriaid, currentImage);


        // let formdata = new FormData();




        // formdata.append("titular", inforacionGeneral.titular);
        // formdata.append("descripcion", inforacionGeneral.descripcion);
        // formdata.append("categoriaid", inforacionGeneral.idCategoria);
        // formdata.append("subcategoriaid", inforacionGeneral.idsubCategoria);

        // // Crear un nuevo archivo a partir del blob

        // formdata.append('image', croppedImageFile);
        // dispatch(mandarInfomracionGeneralProducto(formdata, navegate))


    }


    useEffect(() => {
        console.log(imagenes);
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

        traerProducto();

    }, [])


    function mostrarImagenSeleccionada(index) {


        setIndece(index)
        setCurrentImage(imagenes[index])

    }

    function rehacerCambios() {
        let index = indice;
        let memoryImage = imagenesMemory.find(e => e.id == indice);
        if (memoryImage) {
            imagenes[index] = memoryImage.image;
            setImagenes(imagenes);
            setCurrentImage(imagenes[index])

        }

    }



    function EliminarImagen() {
        let index = indice;
        let memoryImage = imagenesMemory.filter(e => e.id != indice);
        let images = imagenes.filter((value, i) => i != indice);

        setImagenesMemory(memoryImage);
        setImagenes(images);
        setCurrentImage(null);


        // if (memoryImage) {
        //     imagenes[index] = memoryImage.image;
        //     setImagenes(imagenes);
        //     setCurrentImage(imagenes[index])

        // }

    }

    const handleSaveDescuento = (data) => {
        setDescuento(data);
        console.log("Datos guardados:", data);
    };

    const handleSaveCaracteristicas = (data) => {

        const dataSinestado = data;

        console.log(dataSinestado, caracteristica);
        
        
        if (element) {
            caracteristica[indexEdit] = dataSinestado;
            setelement(null);
            setindexEdit(null);
        }else{
            
            caracteristica.push(dataSinestado)
        }
        setcaracteristica(caracteristica);

    };

    function sendCaractertisticaTabla(data) {
        caracteristicaAll.push(data)

        setcaracteristicaAll(caracteristicaAll)

    }


    function eliminarCaracteristicaTabla(index){
        let caracteristicaFilert = caracteristicaAll.filter((e,i) => i != index);
        setcaracteristicaAll(caracteristicaFilert);

    }
    function openModalCaracteristica(element, id){

        setShowModalAtributo(true)
        setelement(element);
        setindexEdit(id);
    }
    function oncloseCaracteristicas(){
        setelement(null);
        setindexEdit(null);
        setShowModalAtributo(false)

    }

    
    return (
        <>

            <Container fluid>

                <Row>


                    <Col className=" py-2">

                        <Row className="align-items-center my-3">
                          
                            <Col>
                                <h4>Crear subproducto</h4>
                            </Col>

                        </Row>
                        {/* <h2 className="product-title mb-4"></h2> */}

                        <div className="card main-card">
                            <div className="card-body">
                            <div className="pb-2">
                                    <Link className=' text-secondary text-decoration-none hover-primary '
                                    to={"/products/edit/"+producto.id}>Producto / </Link>
                                    <Link className='text-primary text-decoration-none hover-primary'>subproducto</Link>
                                </div>
                                <h5 className="info-title">Información general del subproducto</h5>

                                <div className="row">
                                    <div className="col-lg-8 " id='img-container'>
                                        <div className="d-flex row" id='img-banner' style={{ width: "100%", maxHeight: "550px" }}>
                                            <div className="p-2 col-md-2" id='imagenes' >
                                                {imagenes.map((e, i) => (
                                                    <img
                                                        key={i}
                                                        src={e ? e : "https://picsum.photos/seed/picsum/500/300"}
                                                        alt="Product"
                                                        className="img-fluid  py-1"
                                                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                                        onClick={(e) => mostrarImagenSeleccionada(i)}
                                                    />
                                                ))}

                                                <div className="card-body d-flex justify-content-center align-items-center" style={{ width: "50px" }}>
                                                    <button className="btn add-product-btn" onClick={() => setUPShowModalMultiple(true)}
                                                    //  onClick={crearSubcategoria}
                                                    >
                                                        <Plus size={20} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="image-container position-relative col-md-10"  >
                                                <img
                                                    src={currentImage ? currentImage : "https://picsum.photos/seed/picsum/400/300"}
                                                    alt="Product"
                                                    className="img-fluid rounded product-image"
                                                    style={{
                                                        objectFit: "cover",
                                                        height: "500px"
                                                    }}
                                                />
                                                <button className="btn change-image-btn" onClick={() => setUPShowModal(true)}>
                                                    Cambiar imagen principal
                                                </button>
                                                {currentImage != null ? <div className="d-flex w-100" style={{ justifyContent: "space-between" }}>
                                                    <a href='#' className='text-decoration-none ' onClick={rehacerCambios}>Rehacer cambios </a>
                                                    <a href='#' className='text-decoration-none text-danger' onClick={EliminarImagen}>Eliminar imagen</a>

                                                </div> : ""}

                                            </div>
                                        </div>

                                    </div>

                                    <form className="col-lg-4 row " encType='multipart/form-data' >

                                        <div className="edit-group">

                                            <h3 className="product-name" style={{ width: "100%" }}>
                                                {producto.titular}
                                            </h3>
                                            <Pencil className="edit-icon" size={16} />
                                        </div>

                                        <div className="edit-group">
                                            Subcategoria:

                                            <p className="ps-2" style={{ width: "100%" }}>
                                                <strong>

                                                    {producto.subcategoria ? producto.subcategoria.nombre : ""}
                                                </strong>
                                            </p>
                                            {/* <Pencil className="edit-icon" size={16} /> */}
                                        </div>


                                        <div className="edit-group col-md-6" style={{ display: "inline-block" }} >
                                            <p>colocar precio</p>

                                            {descuento != null ?
                                                <p>precio descuento: ${Math.round((inforacionGeneral.precio - (inforacionGeneral.precio * (descuento.porcentajeDescuento / 100))) * 100) / 100}</p>
                                                : ""}
                                            <h3 className="product-name" style={{ width: "100%" }}>
                                                <input type="text" min={1} className='non-input-style' value={inforacionGeneral.precio} placeholder='$00.00'
                                                    onChange={(event) => validarValor(event, "precio", setInformacionGeneral)} />
                                            </h3>
                                            <Pencil className="edit-icon" size={16} />
                                        </div>

                                        <div className="edit-group col-md-6" style={{ display: "inline-block" }}  >
                                            <p>Colocar descuento (opcional)</p>

                                            <h3 className="product-name text-success " onClick={() => setShowModal(true)}>
                                                {descuento != null ? descuento.porcentajeDescuento : "0"}% OFF
                                            </h3>
                                            <Pencil className="edit-icon" size={16} onClick={() => setShowModal(true)} />
                                        </div>


                                        <ShowItems caracteristicas={caracteristica} setCaracteristica={setcaracteristica} onUpdate={openModalCaracteristica} />

                                        <div className="edit-group "   >
                                            <button className='btn text-primary m-0 p-0' type='button' onClick={() => setShowModalAtributo(true)} >
                                                <Plus className='mx-2' />

                                                Añadir caracteristica </button>
                                        </div>


                                        <div className="edit-group " style={{ display: "inline-block" }} >

                                            <p>Stock:</p>


                                            <h3 className="product-name" style={{ width: "100%" }}>
                                                <input type="number" name='precio' min={1} className='non-input-style' value={inforacionGeneral.cantidad} placeholder='0'
                                                    onChange={(event) => validarValor(event, "cantidad", setInformacionGeneral) }
                                                    // onChange={(event) => setInformacionGeneral((e)=> ({...e, cantidad: event.target.value})) }
                                                     />
                                            </h3>
                                        </div>
                                        <div className="col-md-6 ">
                                            <p>Peso del producto: (en gramos)</p>
                                            <input type="text" min={1} className='form-control' value={inforacionGeneral.peso} placeholder='0'
                                                onChange={(event) => validarValor(event, "peso",setInformacionGeneral) } />
                                        </div>

                                        <div className="col-md-6 ">
                                            <p>Grosor: (en CM)</p>
                                            <input type="text" min={1} className='form-control' value={inforacionGeneral.grosor} placeholder='0'
                                                onChange={(event) => validarValor(event, "grosor", setInformacionGeneral) } />
                                        </div>

                                        <div className="col-md-6  ">
                                            <p>Tamaño ancho del producto: (en cm)</p>
                                            <input type="text" min={1} className='form-control' value={inforacionGeneral.ancho} placeholder='0'
                                                onChange={(event) => validarValor(event, "ancho", setInformacionGeneral) } />
                                        </div>

                                        <div className="col-md-6 ">
                                            <p>Tamaño largo del producto: (en cm)</p>

                                            <input type="text" min={1} className='form-control' value={inforacionGeneral.largo} placeholder='0'
                                                onChange={(event) => validarValor(event, "largo", setInformacionGeneral)  } />
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

                        <div className="subproducts-section bg-light ">
                            <div className="container">

                                <div className="row " style={{ alignItems: "center" }}>

                                    <h3 className='col-md-11 col-10'>Descripción</h3>
                                    <Pencil className="col-md-1 col-2 pull-right me-auto" size={16} onClick={() => handleShowDesc()} />
                                </div>

                                <p id='descripcion'> {inforacionGeneral.descripcion}</p>
                            </div>

                        </div>

                        <div className="subproducts-section bg-light p-3 ">
                            <div className="container">

                                <div className="row " style={{ alignItems: "center" }}>

                                    <h3 className='col-md-11 col-10'>Características del producto</h3>
                                    <Pencil className="col-md-1 col-2 pull-right me-auto" size={16} onClick={() => handleShowCat()} />
                                </div>
                                <div className=" mt-4">
                                    <table className="table table-bordered">
                                        <tbody>
                                            {/* vamos a iterar las caracteristicas principales */}

                                            {caracteristica.map((e, i) => (
                                                i % 2 == 0 ?

                                                    <tr key={"element_" + i} className="table-secondary">
                                                        <th>{e.propiedad}</th>
                                                        <td>{e.valor}</td>
                                                    </tr>
                                                    :
                                                    <tr key={"element_" + i}>
                                                        <th>{e.propiedad}</th>
                                                        <td>{e.valor}</td>
                                                    </tr>

                                            ))}

                                            {caracteristicaAll.map((e, i) => (
                                                (i+ caracteristica.length)  % 2 == 0 ?

                                                    <tr key={"ekey_" + i} className="table-secondary" style={{position: "relative"}}>
                                                        <th>{e.atributo}</th>
                                                        <td>
                                                            {e.valor}
                                                            <X className='text-danger'  style={{position: "absolute", right: 0, marginRight: "10px"}} 
                                                            onClick={(e) => eliminarCaracteristicaTabla(i)} />
                                                        </td>
                                                    </tr>
                                                    :
                                                    <tr key={"ekey_" + i} style={{position: "relative"}}>
                                                        <th>{e.atributo}</th>
                                                        <td >{e.valor}


                                                        <X className='text-danger' style={{position: "absolute", right: 0, marginRight: "10px"}}
                                                        onClick={(e) => eliminarCaracteristicaTabla(i)} />
                                                        </td>

                                                    </tr>

                                            ))}


                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </Col>


                </Row>

            </Container>




            <ImageUploadSubproductModal
                show={showUPModal}
                onHide={() => setUPShowModal(false)}
                onSave={handleSave}
                currentImage={currentImage}
            />


            <MultipleImageUpload
                show={showUPModalMultiple}
                onHide={() => setUPShowModalMultiple(false)}
                onSave={handleSaveMultiple}
                currentImage={currentImageMultiple}
            />


            <DescuentoModal show={showModal} onClose={() => setShowModal(false)} onSave={handleSaveDescuento} />

            <CaracteristicasModal show={showModalAtributo} onClose={() => oncloseCaracteristicas()} onSave={handleSaveCaracteristicas}
                idCategoria={producto.subcategoria ? producto.subcategoria.id : 0} caracteristica={caracteristica}
                elementEdit={element} />

            <Descripcion_producto handleClose={handleCloseDesc} show={showDesc} setText={setInformacionGeneral}
                text={inforacionGeneral} />

            <CaracteristicaTable handleClose={handleCloseCat} show={showCat}
                sendInformacion={sendCaractertisticaTabla} />




        </>
    )
}
