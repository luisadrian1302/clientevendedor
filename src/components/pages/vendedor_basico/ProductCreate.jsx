import {  Pencil, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import './styles/ProductModification.css';
import {  Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { URLAPI } from '../../../url';
import ImageUploadModal from '../../layout/modal/ImageUploadModal';
import Swal from 'sweetalert2';
import "../../../styles/product.css"
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { mandarInfomracionGeneralProducto } from '../../../actions/ProductVendedorAction';

export const ProductCreate = () => {

    const [isEditTitular, setIseditTitular] = useState(false);

    const dispatch = useDispatch();
    const navegate = useNavigate();

    const [showUPModal, setUPShowModal] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [croppedImageFile, setcroppedImageFile] = useState(null);
  
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setsubCategorias] = useState([]);
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
      
      async function traerCategorias(){
        try {
            let token = localStorage.getItem("token")
            const {data} = await axios.get(URLAPI+"/categorias/getAllcategorias", {
                headers:{
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


    const getSubcategoriasById = async (id)=> {
        try {
            let token = localStorage.getItem("token")
            const {data} = await axios.get(URLAPI+"/subcategoria/getByIdCategoria/"+id, {
                headers:{
                    Authorization: "Bearer " + token
                }
            })
            setsubCategorias(data);
        } catch (error) {
            
            console.log(error);
            
        }

    }

    
    const handleChangeCategoria = async (e) =>{

        setInformacionGeneral((element) => ({...element,idCategoria:  e.target.value}))

        console.log(e.target.value, categorias);
        await getSubcategoriasById(e.target.value);
       


    }


    
    const handleSave = (file) => {

        setcroppedImageFile(new File(
            [file],
            'cropped-image.jpg',
            { type: 'image/jpeg' }
        ));
      // Aquí puedes manejar la subida del archivo al servidor
      console.log('Archivo a subir:', file);
      
      // Para previsualización local:
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result);
      };
      reader.readAsDataURL(file);
    };

    function guardarCambios (e){
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
        if (currentImage == null) {
            Swal.fire({
                icon: "error",
                text: "Coloque una imagen principal a su producto"
            })
            return  
        }
        console.log(categoriaid, currentImage);
        

        let formdata = new FormData();
       
 


        formdata.append("titular", inforacionGeneral.titular );
        formdata.append("marca", inforacionGeneral.marca != "" ? inforacionGeneral.marca : "");
        formdata.append("descripcion", inforacionGeneral.descripcion );
        formdata.append("categoriaid", inforacionGeneral.idCategoria );
        formdata.append("subcategoriaid", inforacionGeneral.idsubCategoria );

          // Crear un nuevo archivo a partir del blob
       
        formdata.append('image', croppedImageFile);
        dispatch(mandarInfomracionGeneralProducto(formdata, navegate))


    }


    return (
        <>

            <Container fluid>

                <Row>


                    <Col className=" py-4">

                    <Row className="align-items-center my-4">
                            <Col>
                                <h4>Crear producto</h4>
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
                                                Cambiar imagen principal
                                            </button>
                                        </div>
                                    </div>

                                    <form className="col-md-6" encType='multipart/form-data'>
                                        <div className="edit-group">
                                         
                                            <h3 className="product-name" style={{width: "100%"}}>
                                                    <input type="text" className='non-input-style' value={inforacionGeneral.titular} placeholder='Coloque su titulo'  
                                                    onChange={(event) => setInformacionGeneral((e) => ({...e, titular: event.target.value }))}/>
                                            </h3>
                                            <Pencil className="edit-icon" size={16}  />
                                        </div>

                                        <div className="edit-group">
                                            <p className="product-description" style={{width: "100%"}}>
                                                <input type="text" className='non-input-style' value={inforacionGeneral.descripcion} 
                                                    onChange={(event) => setInformacionGeneral((e) => ({...e, descripcion: event.target.value }))} placeholder={"Coloque su decripción"}
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
                                                onChange={(e) => setInformacionGeneral(  (info) =>    ({...info, marca: e.target.value   }))}

                                            />
                                        </div>

                                        <div className="mb-3">
                                            <select className="form-select custom-select mb-3" onChange={handleChangeCategoria}>
                                                <option value={0}>Seleccionar categoría</option>

                                                {categorias.map((e) =>(

                                                     <option key={"c"+e.id} value={e.id} >{e.nombre}  
                                                    </option>

                                                ))}
                                            </select>

                                            <select className="form-select custom-select" 
                                            onChange={(e) => setInformacionGeneral((lement) => ({ ...lement, idsubCategoria: e.target.value} ))}>
                                                <option value={0}>Seleccionar subcategoría</option>
                                                {subcategorias.map((e) =>(

                                                    <option key={"sub"+e.id} value={e.id} >{e.nombre}  
                                                    </option>

                                                    ))}
                                            </select>
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
