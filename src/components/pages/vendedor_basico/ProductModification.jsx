import { AlertCircle, Edit, Pencil, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import './ProductModification.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { SidebarVendedor } from '../../SidebarVendedor';
import EditProductModal from '../../layout/modal/EditProductModal';
import axios from 'axios';
import { URLAPI } from '../../../url';
import ImageUploadModal from '../../layout/modal/ImageUploadModal';

export const ProductModification = () => {

    const [showModal, setShowModal] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setsubCategorias] = useState([]);
    const [categoriaid, setcategoriaID] = useState(0);
    const [subcategoriaid, setsubcategoriaID] = useState(0);

    const [inforacionGeneral, setInformacionGeneral] = useState({
        titular: '',
        descripcion: '',
        idCategoria: '',
        idsubCategoria: ''
    });

    const handleSubmit = (values) => {
      console.log('Valores del formulario:', values);

      console.log(values);

      setInformacionGeneral( (value) =>({
        ...value,
        titular: values.titular,
        descripcion: values.descripcion
        
      }))
      
      setShowModal(false);
    };

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
    
    const handleChangeCategoria = (e) =>{

        setcategoriaID(e.target.value)

        console.log(e.target.value, categorias);
        
        let subcategorias = categorias.filter(el => el.id == e.target.value);

        setsubCategorias(subcategorias[0].subcategorias);
        console.log(subcategorias);  

    }
    const [showUPModal, setUPShowModal] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
  
    const handleSave = (file) => {
      // Aquí puedes manejar la subida del archivo al servidor
      console.log('Archivo a subir:', file);
      
      // Para previsualización local:
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result);
      };
      reader.readAsDataURL(file);
    };


    return (
        <>

            <Container fluid>

                <Row>
                     <SidebarVendedor/>


                    <Col className=" py-4">

                    <Row className="align-items-center my-4">
                            <Col>
                                <h4>Crear producto</h4>
                            </Col>
                            <Col className="text-end">
                                <Button variant="link" className="text-decoration-none" to={"../products/create"}
                                 onClick={() => setShowModal(true)}> 
                                    <Edit size={20} /> Modificar producto
                                </Button>

                                <EditProductModal
                                        show={showModal}
                                        onHide={() => setShowModal(false)}
                                        onSubmit={handleSubmit}
                                    />
                            </Col>
                        </Row>
                        {/* <h2 className="product-title mb-4"></h2> */}

                        <div className="card main-card">
                            <div className="card-body">
                                <h5 className="info-title">Información general del producto</h5>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="image-container position-relative">
                                            <img
                                                src={currentImage ? currentImage : "https://via.placeholder.com/400"}
                                                alt="Product"
                                                className="img-fluid rounded product-image"
                                            />
                                            <button className="btn change-image-btn"  onClick={() => setUPShowModal(true)}>
                                                Cambiar imagen principal
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="edit-group">
                                            <h4 className="product-name"> {inforacionGeneral.titular ? inforacionGeneral.titular : "Introduzca un titular"  }</h4>
                                            <Pencil className="edit-icon" size={16} />
                                        </div>

                                        <div className="edit-group">
                                            <p className="product-description">
                                                {inforacionGeneral.descripcion ? inforacionGeneral.descripcion : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"  }
                                            </p>
                                            <Pencil className="edit-icon" size={16} />
                                        </div>

                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className="form-control custom-input"
                                                placeholder="Marca"
                                            />
                                        </div>

                                        <div className="approval-status mb-3">
                                            <span className="status-label">Estado de aprobación:</span>
                                            <span className="status-value">Sin aprobar</span>
                                        </div>

                                        <div className="mb-3">
                                            <select className="form-select custom-select mb-3" onChange={handleChangeCategoria}>
                                                <option>Seleccionar categoría</option>

                                                {categorias.map((e) =>(

                                                     <option key={"c"+e.id} value={e.id} >{e.nombre}  
                                                    </option>

                                                ))}
                                            </select>

                                            <select className="form-select custom-select" onChange={(e) => setsubcategoriaID(e.target.value)}>
                                                <option>Seleccionar subcategoría</option>
                                                {subcategorias.map((e) =>(

                                                    <option key={"sub"+e.id} value={e.id} >{e.nombre}  
                                                    </option>

                                                    ))}
                                            </select>
                                        </div>

                                        <div className="action-buttons">
                                            <button className="btn btn-primary w-100 save-btn">
                                                Guardar cambios
                                            </button>
                                            {/* <button className="btn btn-outline-danger w-100 disable-btn">
                                                Inhabilitar este producto
                                            </button>
                                            <div className="d-flex align-items-center gap-2">
                                                <button className="btn btn-outline-danger w-100 delete-btn">
                                                    Eliminar este producto
                                                </button>
                                                <AlertCircle className="info-icon" size={20} />
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="subproducts-section bg-light p-2">
                            <h5 className="subproducts-title">Subproductos</h5>
                            <div className="row">
                                {/* Storage Option 1 */}
                                <div className="col-md-4">
                                    <div className="card storage-card">
                                        <div className="card-body">
                                            <img
                                                src="/api/placeholder/300/200"
                                                alt="64GB Storage"
                                                className="img-fluid storage-image mb-3"
                                            />
                                            <h6 className="storage-title">64 GB de almacenamiento</h6>
                                            <p className="original-price">$2510.00</p>
                                            <p className="final-price">$1700</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Storage Option 2 */}
                                <div className="col-md-4">
                                    <div className="card storage-card">
                                        <div className="card-body">
                                            <img
                                                src="/api/placeholder/300/200"
                                                alt="256GB Storage"
                                                className="img-fluid storage-image mb-3"
                                            />
                                            <h6 className="storage-title">256 GB de almacenamiento</h6>
                                            <p className="original-price">$2510.00</p>
                                            <p className="final-price">$1700</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Add New Product Card */}
                                <div className="col-md-4">
                                    <div className="card add-product-card">
                                        <div className="card-body d-flex justify-content-center align-items-center">
                                            <button className="btn add-product-btn">
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
