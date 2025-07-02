import axios from 'axios';
import { AlignLeft, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, MoveLeft, PlusCircle, Search, Upload } from 'lucide-react';
import React, { useEffect, useRef } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { data, Link, useNavigate } from 'react-router-dom';
import { usePagination, useTable } from 'react-table';
import { URLAPI, URLAPI_SUBPRODUCT_SELLER } from '../../../../url';
import { useState } from 'react';
import AddSubproductModal from '../../../layout/modal/AddSubproductModal';
import Swal from 'sweetalert2';
import { verificarVendedor } from '../../../../helper/isVendedor';
import PublicarSubProductos from '../../../layout/modal/PublicarSubProductos';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export const SubproductIndexScreen = () => {

  const [products, setProduct] = useState([]);
  const [option, setoption] = useState('');
  const navegate = useNavigate();
  const [filterSearch, setfilterSearch] = useState('');
  const [productsMemory, setProductMemory] = useState([]);
  const [showModalAtributo, setShowModalAtributo] = useState(false);
  const [showModalAtributoPublic, setShowModalAtributoPublic] = useState(false);
  const effectRun = useRef(false);
  function oncloseCaracteristicas() {

    setShowModalAtributo(false)

  }

  function onclosePublic() {

    setShowModalAtributoPublic(false)

  }



  function handleSaveCaracteristicas(value) {

  }

  async function handleSavePublic() {
    setShowModalAtributoPublic(false)

    await obtenerTodosLosproductos();

  }

  const columns = React.useMemo(() => [

    {
      Header: 'Producto Relacionado',
      accessor: 'titular'
    },
    {
      Header: 'Descripción',
      accessor: 'descripcionGeneral'
    },
    {
      Header: 'Precio',
      accessor: 'precio',
      Cell: ({ value }) => `$${value.toFixed(2)}`
    },
    {
      Header: 'Stock',
      accessor: 'stock'
    },
    {
      Header: 'Estado',
      accessor: 'status',
      Cell: ({ value }) => (
        <span className={`badge ${verifyStatus(value)}`}>
          {verifyStatusText(value)}
        </span>
      )
    },
    {
      Header: 'Estado validacion',
      accessor: 'statusValidacion',
      Cell: ({ value }) => (
        <span className={`badge ${verifyStatusValidacion(value)}`}>
          {verifyStatusTextValidacion(value)}
        </span>
      )
    },
    {
      Header: 'Dimensiones',
      accessor: row => `${row.tamañoAlto}cm x ${row.tamañoAncho}cm`
    },
    {
      Header: 'Acciones',
      accessor: row => row,
      Cell: ({ value }) => {

        if (value.status == 1 || value.status == 2 || value.status == 3) {
          
          return (
            <>  
              <p>
                <Link className='text-primary text-decoration-none hover-primary w-100' to={"/subproducts/edit/" + value.id}>Editar </Link>
              </p>
              <p>
                <Link className='text-danger text-decoration-none hover-primary w-100' onClick={(e) => eliminarProducto(value.id)}>Inhabilitar </Link>
              </p>
            </>
        
          )
        }

        if (value.status == 4) {

          return (
<>  
              <p>
                <Link className='text-success text-decoration-none hover-success w-100' onClick={(e) => HabilitarSubproducto(value.id)}>Habilitar </Link>
              </p>
              <p>
                <Link className='text-danger text-decoration-none hover-primary w-100' onClick={(e) => eliminarPermanenteProducto(value.id)}>Eliminar </Link>
              </p>
            </>
          )
          
        }

       

      }
        

    }
    
  ], []);

  async function HabilitarSubproducto(id){
    

    try {
      let token = localStorage.getItem("token");
      console.log(id);
      
      const { data } = await axios.get(`${URLAPI_SUBPRODUCT_SELLER}/getHability/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // actualizar los datos
      await obtenerTodosLosproductos()
      
     
    } catch (error) {

      let msgDefault = error.response.data.message ? error.response.data.message :"No se pudo habilitar este producto.";

      
      Swal.fire({
        title: "Error",
        text: msgDefault,
        icon: "error"
      });
    }
  }

  function eliminarProducto(id) {
    


    Swal.fire({
      title: "¿Inhabilitar?",
      text: "¿Desea inhabilitar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Si, inhabilitar!"
    }).then((result) => {
      if (result.isConfirmed) {
        // logica de programacion
        eliminarSubproductoPorID(id)
        Swal.fire({
          title: "inhabilitado",
          text: "Tu subproducto a sido inhabilitado.",
          icon: "success"
        });
      }
    });

  }

  function eliminarPermanenteProducto(id) {


    Swal.fire({
      title: "¿Eliminar permanentemente?",
      text: "¿Desea eliminar este producto de forma permanente?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        // logica de programacion
        eliminarSubproductoDefinitivoPorID(id)
        Swal.fire({
          title: "Eliminado!",
          text: "Tu subproducto a sido eliminado.",
          icon: "success"
        });
      }
    });

  }


  async function eliminarSubproductoDefinitivoPorID(id) {
    try {
      let token = localStorage.getItem("token");
      const { data } = await axios.delete(`${URLAPI_SUBPRODUCT_SELLER}/getID/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // actualizar los datos
      await obtenerTodosLosproductos()
    } catch (error) {

    }
  }


  async function eliminarSubproductoPorID(id) {
    try {

      let token = localStorage.getItem("token");
      const { data } = await axios.delete(`${URLAPI_SUBPRODUCT_SELLER}/getById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // actualizar los datos
      await obtenerTodosLosproductos()
    } catch (error) {

    }
  }



  function verifyStatus(value) {
    if (value == '1') {
      return 'bg-success'
    }

    if (value == '2' || value == '3') {
      return 'bg-warning'
    }

    if (value == '0' || value == '4') {
      return 'bg-danger'
    }

  }

  function verifyStatusValidacion(value) {
    if (value == '1') {
      return 'bg-success'
    }

    if (value == '0') {
      return 'bg-secondary'
    }

    
    if (value == '2' ) {
      return 'bg-warning'
    }


    if (value == '3' ) {
      return 'bg-danger'
    }

  }
  function verifyStatusText(value) {
    if (value == '1') {
      return 'Activo'
    }

    if (value == '2') {
      return 'Sin stock'
    }

    if (value == '0') {
      return 'Elimnado'
    }
    if (value == '4') {
      return 'Inactivo'
    }
  }


  function verifyStatusTextValidacion(value) {
    console.log(value);
    
    if (value == '1') {
      return 'validado'
    }

    if (value == '0') {
      return 'No publicado'
    }

    if (value == '2') {
      return 'pendiente'
    }


    if (value == '3') {
      return 'Rechazado'
    }
    
  }
  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: products });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: products,
      initialState: { pageSize: 5 }, // Elementos por página
    },
    usePagination
  );

  const { isUpdateProduct } = useSelector(re => re.notificationsReducer);

  useEffect(() => {
    setProduct([]);
    setProductMemory([]);

    console.log("obteniendo productos de nuevo.....");
    
    obtenerTodosLosproductos()
  }, [isUpdateProduct])
  


  async function obtenerTodosLosproductos() {

    try {
      let token = localStorage.getItem("token");
      const { data } = await axios.get(`${URLAPI_SUBPRODUCT_SELLER}/getByUser`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // setproducts(data)
      console.log(data);

      setProduct(data)
      setProductMemory(data)
    
      console.log(productsMemory);
      

    } catch (error) {
      console.log(error);


    }
  }

  useEffect(() => {
    // 

   
    if (!effectRun.current) {
      effectRun.current = true;
   }else{

    async function getUser() {
         
        let isvendedor = await verificarVendedor(localStorage.getItem("token"));
        if (!isvendedor) {
            navegate("../")
        }
    }

    getUser();
    obtenerTodosLosproductos();
   }

  }, [])

  function filterValueFunc(e){

    let opt = e.target.value;
    // setoption(opt);

    // buscar
    

    let filterValue = productsMemory.filter(element => {

      if (element.titular.includes(opt) || element.descripcionGeneral.includes(opt) ||  
      parseFloat(element.precio).toString().includes(opt)) {
        return element;
      }
    })
    filterSelect(filterValue);
    

  }
  function filterTextKey(productsFilter = []){
    let opt = document.querySelector("#filterText").value;
    let filterValue = productsFilter.filter(element => {

      if (element.titular.includes(opt) || element.descripcionGeneral.includes(opt) ||  
      parseFloat(element.precio).toString().includes(opt)) {
        return element;
      }
    })
    setProduct(filterValue);


  }

  function filterSelect(productsFilterMemory = []){
    let opt = document.querySelector("#filterSelect").value;

    if (opt == "sinfiltros") {
      setProduct(productsFilterMemory)
    }

    if (opt == "productosActivos") {
      let productsFilter = productsFilterMemory.filter(product => product.status == 1);
      setProduct(productsFilter)
    }

    if (opt == "productosInactivos") {
      let productsFilter = productsFilterMemory.filter(product => product.status == 4);
      setProduct(productsFilter)
    }

    if (opt == "SinStock") {
      let productsFilter = productsFilterMemory.filter(product => product.status == 3);
      setProduct(productsFilter)

    }

    if (opt == "pendiente") {
      let productsFilter = productsFilterMemory.filter(product => product.status == 2);
      setProduct(productsFilter)

    }
    

  }
  function updateFilter(e){

    let opt = e.target.value;
    setoption(opt);

    console.log("desde filter: "+productsMemory);

    if (opt == "sinfiltros") {
      setProduct(productsMemory)
    }

    if (opt == "productosActivos") {
      let productsFilter = productsMemory.filter(product => product.status == 1);
      filterTextKey(productsFilter);
    }
    
    if (opt == "productosInactivos") {
      let productsFilter = productsMemory.filter(product => product.status == 4);
      filterTextKey(productsFilter);

    }

    if (opt == "SinStock") {
      let productsFilter = productsMemory.filter(product => product.status == 3);
      filterTextKey(productsFilter);

    }

    if (opt == "pendiente") {
      let productsFilter = productsMemory.filter(product => product.status == 2);
      filterTextKey(productsFilter);

    }


  }


  return (
    <>
      <Container fluid>

        <Row>


          <Col className='p-2'>
            <h2 className="text-xl font-semibold my-3">Sub productos</h2>

            <div class="d-flex align-items-center gap-4 mb-4">
              <div class="col-md-4">
                <input
                  style={{ background: "#cccccc" }}
                  type="search"
                  class="form-control"
                  placeholder="Buscar"
                  id="filterText"
                  onChange={(e) => filterValueFunc(e)}
                />
              </div>



              <select class="form-select " value={option} style={{ width: "200px", background: "transparent" }}
               onChange={(e) => updateFilter(e)}  id="filterSelect">
                <option selected>Filtrar por</option>
                <option value="sinfiltros">MostrarTodo</option>
                <option value="productosActivos">Productos Activos</option>
                <option value="productosInactivos">Productos Inactivos</option>
                <option value="SinStock">productos sin stock</option>
                <option value="pendiente">productos por completar</option>
              </select>


              <span class="text-secondary">Mis subproductos: {products.length}</span>
            </div>

            <Col style={{ background: "white" }} className='p-2'>


              <div className="container mt-4">
                <Row className="align-items-center my-4 p-2">
                  <Col>
                    <h4>Mis productos</h4>
                  </Col>
                  <Col className="text-end">
                    <button variant="link" className="text-decoration-none btn text-primary"
                      onClick={(e) => setShowModalAtributo(true)}>
                      <PlusCircle size={20} /> Añadir
                    </button>

                    <button variant="link" className="text-decoration-none btn text-primary"
                      onClick={(e) => setShowModalAtributoPublic(true)}>
                      <Upload size={20} /> Publicar subproductos
                    </button>
                  </Col>
                </Row>

                <div className="table-responsive">

                  <table {...getTableProps()} className="table table-striped table-hover">
                    <thead>
                      {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                              {column.render('Header')}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {page.map(row => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                              <td {...cell.getCellProps()}>
                                {cell.render('Cell')}
                              </td>
                            ))}
                          </tr>
                        );
                      })}

                     
                    </tbody>

                   
                  </table>

                  {page.length == 0 ?<>
                      
                      <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "400px", width: "100%" }}>
                          <Search size={64} className="text-secondary" />
                          <h2 className="mt-3 fw-semibold">No hay contenido</h2>
                          <p className="text-muted">Aqui apareceran tus subproductos que vayas creando.</p>
                      </div>

                    </> : null}
                 

                  <div className='row m-0 p-0' style={{justifyContent: "space-between"}}>
                   

                    <nav aria-label="Page navigation" className='col-6'>
                      <ul className="pagination ">
                        <li className={!canPreviousPage ? "page-item disabled": " page-item" } ><a class="page-link"  onClick={() => previousPage()} ><ChevronLeft/></a></li>
                        <li className="page-item"><a class="page-link" >{pageIndex + 1}</a></li>
                        <li className={!canNextPage ? "page-item disabled": " page-item" } ><a class="page-link" onClick={() => nextPage()} ><ChevronRight/> </a></li>
                       
                      </ul>
                    </nav>
                    <div className="col-2">

                      <select
                        className='form-select'
                        value={pageSize}
                        onChange={e => setPageSize(Number(e.target.value))}
                      >
                        {[5, 10, 20].map(size => (
                          <option key={size} value={size}>
                            Mostrar {size}
                          </option>
                        ))}
                      </select>
                    </div>
                </div>

              </div>
            </div>

          </Col>
        </Col>
      </Row>
    </Container >


      <AddSubproductModal show={showModalAtributo} onClose={() => oncloseCaracteristicas()} onSave={handleSaveCaracteristicas} />
      <PublicarSubProductos subproductos={productsMemory}  show={showModalAtributoPublic} onClosevalue={() => onclosePublic()} onSave={handleSavePublic} toast={toast}  />

      <ToastContainer />

    </>
  )
}
