import { AlertCircle, Edit, Pencil, Plus, Trash, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import '../pages/vendedor_basico/styles/ProductModification.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { URLAPI, URLAPI_SUBPRODUCT_PUBLIC, URLAPI_SUBPRODUCT_SELLER } from '../../url';
import Swal from 'sweetalert2';
import "../../styles/product.css"
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "../../styles/subcategoria.css"
import MultipleImageUpload from '../layout/modal/MultipleImageUpload';
import ImageUploadSubproductModal from '../layout/modal/ImageUploadSubproductModal';
import DescuentoModal from '../layout/modal/DescuentoModal';
import CaracteristicasModal from '../layout/modal/Caracteristicas';
import { Descripcion_producto } from '../layout/modal/Descripcion_producto';
import { CaracteristicaTable } from '../layout/modal/CaracteristicaTable';
import ShowItems from '../layout/componentes/ShowItems';
import { validarValor } from './vendedor_basico/helpers/validaciones';
import CarouselTouch from '../layout/componentes/CarouselTouch';
import { Resenas } from '../layout/componentes/Resenas';
import { ShowAtributesProductPublic } from './vendedor_basico/subproductos_components/ShowAtributesProductPublic';

export const DetailsProduct = () => {


    const dispatch = useDispatch();
    const navegate = useNavigate();
    const { id } = useParams();

    const [producto, setproducto] = useState({});
    const [subproducto, setsubproducto] = useState({});
    const [resultsResena, setresultsResena] = useState({});
    const [variantes, setVariantes] = useState([]);
    const [resenas, setResenas] = useState([]);
    const [descuento, setDescuento] = useState(null);


    const [indice, setIndece] = useState(0);
    const [currentImage, setCurrentImage] = useState(null);
    const [croppedImageFile, setcroppedImageFile] = useState([]);


    const [categorias, setCategorias] = useState([]);
    const [caracteristica, setcaracteristica] = useState([]);
    const [caracteristicaMemory, setcaracteristicaMemory] = useState([]);
    const [caracteristicaAll, setcaracteristicaAll] = useState([]);
    const [imagenes, setImagenes] = useState([]);


    const [inforacionGeneral, setInformacionGeneral] = useState({
        precio: '',
        cantidad: '',
        peso: '',
        grosor: '',
        largo: '',
        ancho: '',
        descripcion: '',

    });


    useEffect(() => {

        async function obtenerImagenes() {
            const findAllImages = document.querySelectorAll(".imagenes_class");
            let cambio = 0;
            for (let i = 0; i < findAllImages.length; i++) {

                const image = findAllImages[i].src;
                if (image.startsWith(URLAPI)) {
                    let img = await imgToFileReader(findAllImages[i]);
                    img.onload = function (event) {
                        // console.log("Base64:", event.target.result); // Aquí obtienes la imagen en base64
                        imagenes[i] = event.target.result;
                    };

                    cambio++;

                }
            }

            if (cambio > 0) {
                setImagenes(imagenes);
            }
            setCurrentImage(imagenes[0])

        }
        obtenerImagenes();

    }, [imagenes])


    async function imgToFileReader(imgElement) {
        const response = await fetch(imgElement.src);
        const blob = await response.blob(); // Convertir a Blob
        const fileReader = new FileReader();



        fileReader.readAsDataURL(blob); // Convertir Blob a Base64

        return fileReader;
    }






    function castsetcaracteristicaAll(data) {
        let caracteristicas = [];
        for (let i = 0; i < data.length; i++) {
            let car = {};
            let element = data[i];
            car.atributo = element.atributo;
            car.valor = element.valor;

            caracteristicas.push(car);
        }

        setcaracteristicaAll(caracteristicas);

    }
    function caracteristicaToCaractertisticaModal(data) {
        let caracteristicas = [];


        for (let i = 0; i < data.length; i++) {
            let caracteristica = {};
            const element = data[i];

            // caracteristica.id_caractertistca = element.id;
            caracteristica.id_atributo = element.atributo.id;
            // caracteristica.id_valor = element.valor.id;
            caracteristica.propiedad = element.atributo.nombre;
            caracteristica.tipo = element.atributo.tipoPropiedad;
            caracteristica.valor = element.valor.valor;
            caracteristicas.push(caracteristica);

        }

        setcaracteristica(caracteristicas);
        return caracteristicas


    }

    function multimediaToImage(data) {

        let imagenes = JSON.parse(data);
        let saveImagenes = [];
        for (let i = 0; i < imagenes.length; i++) {
            const element = imagenes[i];
            const url = URLAPI_SUBPRODUCT_PUBLIC + "/image/" + element;
            saveImagenes.push(url)
        }
        setImagenes(saveImagenes);

    }
    function mostrarInformacion() {

        const div = document.getElementById('descripcion_general');

        if (div) {
            
            div.innerHTML = subproducto.descripcion.replace(/\n/g, '<br>');
        }
        
        
    }


    useEffect(() => {
        async function traerResenas(id) {
            try {
                const { data } = await axios.get(URLAPI + "/resenas/public/getById/" + id)
                console.log(data);
                setResenas(data);
            } catch (error) {
                console.log("no se pudeo obtener las reseñas", error);

            }

        }

        async function traerInfoResenas(id) {
            try {
                const { data } = await axios.get(URLAPI + "/resenas/public/getAvgById/" + id)
                console.log(data);
                setresultsResena(data);
            } catch (error) {
                console.log("no se pudeo obtener la informacion de las reseñas", error);
            }
        }
        async function traerVariantes(id, caracteristica) {
            try {
                let { data } = await axios.get(URLAPI + "/caracteristicas/public/getProperties/" + id)
                console.log(data);
                let datamemory = data;
                let orden = [];

                for (let i = 0; i < data.length; i++) {
                    // verificar las caracteristicas

                    for (let e = 0; e < caracteristica.length; e++) {
                        if (caracteristica[e].propiedad == data[i].nombre &&
                            caracteristica[e].valor == data[i].valor &&
                            caracteristica[e].tipo == data[i].tipoPropiedad
                        ) {
                            data[i].active = true;
                        }

                    }

                    let nombreAlmacenado = data[i].nombre;

                    let arreglo1 = datamemory.filter(e => e.nombre == nombreAlmacenado);
                    let filtrar = datamemory.filter(e => e.nombre != nombreAlmacenado);


                    if (arreglo1.length > 0) {
                        orden.push(arreglo1);
                    }
                    datamemory = filtrar;
                }
                console.log(orden);

                // obtener los valores activos


                setVariantes(orden);
            } catch (error) {
                console.log("no se pudeo obtener la informacion de las reseñas", error);

            }

        }

        async function traerProducto() {
            try {
                const { data } = await axios.get(URLAPI_SUBPRODUCT_PUBLIC + "/public/getById/" + id)
                console.log(data.producto);
                setproducto(data.producto);


                setInformacionGeneral(inforacionGeneral);

                if (data.descuento) {
                    setDescuento(data.descuento);
                }
                console.log(data.descripcion);
                

                castsetcaracteristicaAll(data.caracteristicasTable);

                // castear de caractertistica a subcatactertistica
                setcaracteristicaMemory(data.caracteristicas);

                const car = caracteristicaToCaractertisticaModal(data.caracteristicas)
                multimediaToImage(data.multimedia)

                setsubproducto(data);

                // traer reseñas
                await traerResenas(data.producto.id)
                await traerInfoResenas(data.producto.id)

                await traerVariantes(data.producto.id, car)

            } catch (error) {

                console.log("no se pudeo obtener las categorias", error);

            }

        }

        // traer producto
        traerProducto();
        // traer productos similares (del vendedor u similares)
        // traer datos del vendedor


    }, [id])


    function mostrarImagenSeleccionada(index) {


        setIndece(index)
        setCurrentImage(imagenes[index])

    }
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    function obtenerCantidades(stock) {

        let cantidad = 0;
        if (stock <= 10) {
            cantidad = stock
        } else {
            cantidad = 10
        }

        let opciones = [];
        for (let i = 1; i < cantidad + 1; i++) {
            opciones.push(<option key={"unity" + i} value={i} > {i == 1 ? "1 unidad" : i + " unidades"} </option>)
        }
        return (
            <>
                {opciones}
            </>
        )
    }

    async function onchange(data) {
        console.log(data, caracteristica);
        let dataCaracteristica = caracteristica;
        let posValue = 0;


        for (let i = 0; i < dataCaracteristica.length; i++) {

            if (dataCaracteristica[i].propiedad == data.nombre &&
                dataCaracteristica[i].tipo == data.tipoPropiedad
            ) {
                posValue = i;
                dataCaracteristica[i].id_atributo = data.id;
                dataCaracteristica[i].valor = data.valor;
                dataCaracteristica[i].tipo = data.tipoPropiedad;
                dataCaracteristica[i].propiedad = data.nombre;
            }
        }
        const formdata = new FormData();

        formdata.append("caractertistica", JSON.stringify(dataCaracteristica));
        formdata.append("posId", posValue);

        try {
            const response = await fetch(URLAPI_SUBPRODUCT_PUBLIC + "/public/changeSubproduct/" + producto.id, {
                method: 'POST',
                body: formdata,
            })
            const data = await response.text();


            if (data > 0) {
                console.log(data);
                navegate("/product/" + data)
                return;
            }

            console.log(data);
        } catch (error) {
            console.log(error);

        }


        // peticion

    }

    return (
        <>

            <Container >

                <Row>


                    <Col className=" py-3">




                        {subproducto.id != null ?
                            <>
                                {/* <h2 className="product-title mb-4"></h2> */}
                                <div className="pb-2">
                                    <Link className='text-primary text-decoration-none hover-primary'></Link>
                                </div>
                                <div className="card main-card">

                                    <div className="card-body">

                                        <h5 className="  d-flex d-md-none">{producto.titular}</h5>

                                        <div className="row">
                                            {/* desktop */}
                                            <div className="col-lg-9 row col-md-12">

                                                <div className="col-md-7  " id='img-container'>
                                                    {/* imagenes en desktop */}
                                                    <div className="d-flex row" id='img-banner' style={{ width: "100%", maxHeight: "550px" }}>
                                                        <div className="p-2 col-md-2 d-none d-md-flex" id='imagenes' >
                                                            {imagenes.map((e, i) => (
                                                                <img
                                                                    key={i}
                                                                    src={e ? e : "https://picsum.photos/seed/picsum/500/300"}
                                                                    alt="Product"
                                                                    className="img-fluid  py-1 imagenes_class"
                                                                    style={{ width: "60px", height: "60px", objectFit: "contain" }}
                                                                    onClick={(e) => mostrarImagenSeleccionada(i)}
                                                                />
                                                            ))}
                                                        </div>

                                                        <div className="image-container position-relative col-md-10  d-none d-md-flex"  >
                                                            <img
                                                                src={currentImage ? currentImage : "https://picsum.photos/seed/picsum/400/300"}
                                                                alt="Product"
                                                                className="img-fluid rounded product-image"
                                                                style={{
                                                                    objectFit: "contain",
                                                                    minHeight: "300px"
                                                                }}
                                                            />
                                                        </div>


                                                    </div>
                                                    {/* imagenes en movil */}
                                                    <div className="d-block d-md-none">
                                                        <CarouselTouch imagenes={imagenes} />
                                                    </div>
                                                </div>

                                                <div className="col-md-5 d-none d-md-block">

                                                    <h4 className="">{producto.titular} </h4>

                                                    <Resenas puntuacion={resultsResena.promedio} users={resultsResena.total} />

                                                    {descuento != null ?
                                                        <>
                                                            <div className="">
                                                                <p className="text-decoration-line-through text-muted mb-1 ">{formatCurrency(subproducto.precio)} </p>
                                                                <div className="d-flex" style={{
                                                                    alignItems: "center"
                                                                }}>

                                                                    <p className=" p-0 display-6 ">{formatCurrency(subproducto.precio - ((descuento.porcentajeDescuento * subproducto.precio) / 100))} </p>
                                                                    <h5 className="text-success ms-2">{descuento.porcentajeDescuento}% OFF</h5>
                                                                </div>

                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            <p className=" p-0 display-6 ">{formatCurrency(subproducto.precio)} </p>

                                                        </>}

                                                    {variantes.map((e, i) => (
                                                        <>

                                                            <div className="mb-2"></div>
                                                            <p >{e[0].nombre}</p>
                                                            <ShowAtributesProductPublic caracteristicas={e} key={i} onchange={onchange} />
                                                        </>

                                                    ))}

                                                </div>


                                                <div className="col-12  d-none d-lg-block subproducts-section p-3 ">
                                                    <div className="container mb-3">

                                                        <div className="row " style={{ alignItems: "center" }}>

                                                            <h3 className=''>Productos similares</h3>
                                                        </div>

                                                    </div>
                                                    <div className="container mb-4">

                                                        <div className="row " style={{ alignItems: "center" }}>

                                                            <h3 className='col-md-11 col-10'>Descripcion del producto</h3>
                                                        </div>
                                                        <div className=" mt-1" id='descripcion_general'>
                                                            {mostrarInformacion()}
                                                        </div>
                                                    </div>
                                                    <div className="container">

                                                        <div className="row " style={{ alignItems: "center" }}>

                                                            <h3 className='col-md-11 col-10'>Características del producto</h3>
                                                        </div>
                                                        <div className=" mt-1">
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
                                                                        (i + caracteristica.length) % 2 == 0 ?

                                                                            <tr key={"ekey_" + i} className="table-secondary" style={{ position: "relative" }}>
                                                                                <th>{e.atributo}</th>
                                                                                <td>
                                                                                    {e.valor}

                                                                                </td>
                                                                            </tr>
                                                                            :
                                                                            <tr key={"ekey_" + i} style={{ position: "relative" }}>
                                                                                <th>{e.atributo}</th>
                                                                                <td >{e.valor}
                                                                                </td>

                                                                            </tr>

                                                                    ))}


                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                            {/* Desktop */}
                                            <div className="col-lg-3 col-md-12 d-none d-md-block ">
                                                <h5>Stock disponible</h5>
                                                <div className="">
                                                    <p>

                                                        cantidad disponible: <strong>{subproducto.stock}</strong>
                                                    </p>

                                                    <select className='form-control form-select' name="" id="">
                                                        {obtenerCantidades(subproducto.stock)}
                                                    </select>
                                                </div>

                                                <div className="">
                                                    <button className='btn btn-primary w-100 mt-3' >Comprar ahora </button>
                                                    <button className='btn bg-primary bg-opacity-25 text-primary w-100 mt-3' > Agregar al carrito</button>
                                                </div>

                                            </div>


                                            {/* tablet */}
                                            <div className="col-12  d-none d-md-block d-lg-none subproducts-section p-3 ">
                                                <div className="container">

                                                    <div className="row " style={{ alignItems: "center" }}>

                                                        <h3 className=''>Productos similares</h3>
                                                    </div>

                                                </div>
                                                <div className="container">

                                                    <div className="row " style={{ alignItems: "center" }}>

                                                        <h3 className='col-md-11 col-10'>Características del producto</h3>
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
                                                                    (i + caracteristica.length) % 2 == 0 ?

                                                                        <tr key={"ekey_" + i} className="table-secondary" style={{ position: "relative" }}>
                                                                            <th>{e.atributo}</th>
                                                                            <td>
                                                                                {e.valor}

                                                                            </td>
                                                                        </tr>
                                                                        :
                                                                        <tr key={"ekey_" + i} style={{ position: "relative" }}>
                                                                            <th>{e.atributo}</th>
                                                                            <td >{e.valor}
                                                                            </td>

                                                                        </tr>

                                                                ))}


                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>

                                            </div>

                                            {/* Movile */}

                                            <div className="d-block d-md-none">
                                                {variantes.map((e, i) => (
                                                    <>

                                                        <div className="mb-2"></div>
                                                        <p >{e[0].nombre}:</p>
                                                        <ShowAtributesProductPublic caracteristicas={e} key={i} onchange={onchange} />
                                                    </>

                                                ))}

                                                {/* informacion */}

                                                {descuento != null ?
                                                    <>
                                                        <div className="mt-4">
                                                            <p className="text-decoration-line-through text-muted mb-1 ">{formatCurrency(subproducto.precio)} </p>
                                                            <div className="d-flex" style={{
                                                                alignItems: "center"
                                                            }}>

                                                                <p className=" p-0 display-6 ">{formatCurrency(subproducto.precio - ((descuento.porcentajeDescuento * subproducto.precio) / 100))} </p>
                                                                <h5 className="text-success ms-2">{descuento.porcentajeDescuento}% OFF</h5>
                                                            </div>

                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <p className="mt-4 p-0 display-6 ">{formatCurrency(subproducto.precio)} </p>

                                                    </>}

                                                <Resenas puntuacion={resultsResena.promedio} users={resultsResena.total} />
                                                <div className="mt-3 ">
                                                    <h5>Stock disponible</h5>
                                                    <div className="">
                                                        <p>

                                                            cantidad disponible: <strong>{subproducto.stock}</strong>
                                                        </p>

                                                        <select className='form-control form-select' name="" id="">
                                                            {obtenerCantidades(subproducto.stock)}
                                                        </select>
                                                    </div>

                                                    <div className="">
                                                        <button className='btn btn-primary w-100 mt-3' >Comprar ahora </button>
                                                        <button className='btn bg-primary bg-opacity-25 text-primary w-100 mt-3' > Agregar al carrito</button>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>



                            : <>
                                no content

                            </>}


                    </Col>


                </Row>

            </Container>





        </>
    )
}
