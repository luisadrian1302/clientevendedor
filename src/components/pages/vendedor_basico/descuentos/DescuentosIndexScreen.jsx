import axios from 'axios';
import { AlignLeft, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, MoveLeft, PlusCircle, Upload } from 'lucide-react';
import React, { useEffect, useRef } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { data, Link, useNavigate } from 'react-router-dom';
import { usePagination, useTable } from 'react-table';
import { URLAPI } from '../../../../url';
import { useState } from 'react';
import AddSubproductModal from '../../../layout/modal/AddSubproductModal';
import Swal from 'sweetalert2';
import { verificarVendedor } from '../../../../helper/isVendedor';
import PublicarSubProductos from '../../../layout/modal/PublicarSubProductos';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';
import AddDescuentoModal from '../../../layout/modal/AddDescuentoModal';

export const DescuentosIndexScreen = () => {

  const [products, setDescuentos] = useState([]);
  const [option, setoption] = useState('');
  const navegate = useNavigate();
  const [filterSearch, setfilterSearch] = useState('');
  const [DescuentoMemory, setDescuentosMemory] = useState([]);
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

    console.log(value);

  }

  async function handleSavePublic() {
    setShowModalAtributoPublic(false)

    await obtenerTodosLosproductos();

  }

  const columns = React.useMemo(() => [

    {
      Header: 'Nombre',
      accessor: 'nombre'
    },
    {
      Header: 'Porcentaje descuento',
      accessor: 'porcentajeDescuento'
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
      Header: 'Fecha de inicio del descuento',
      accessor: 'fechaInicioDescuento'
    },
    {
      Header: 'Fecha de final del descuento',
      accessor: 'fechaFinalDescuento'
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
      
      const { data } = await axios.get(`${URLAPI}/SubProduct/getHability/${id}`, {
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
      const { data } = await axios.delete(`${URLAPI}/SubProduct/getID/${id}`, {
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
      const { data } = await axios.delete(`${URLAPI}/SubProduct/getById/${id}`, {
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

  async function obtenerTodosLosproductos() {

    try {
      let token = localStorage.getItem("token");
      const { data } = await axios.get(`${URLAPI}/descuentos/getByUserAll`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // setDescuentoss(data)
      console.log(data);

      setDescuentos(data)
      setDescuentosMemory(data)
    
      console.log(DescuentoMemory);
      

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
    

    let filterValue = DescuentoMemory.filter(element => {

      if (element.nombre.includes(opt)  || 
      element.fechaInicioDescuento.includes(opt) ||
      element.fechaFinalDescuento.includes(opt)) {
        return element;
      }
    })

    

    setDescuentos(filterValue);

    

  }
  function updateFilter(e){

    let opt = e.target.value;
    setoption(opt);

    console.log("desde filter: "+DescuentoMemory);

    if (opt == "sinfiltros") {
      setDescuentos(DescuentoMemory)
    }

    if (opt == "descuentosActivos") {
      let descuentoFilter = DescuentoMemory.filter(descuento => descuento.status == 1);
      setDescuentos(descuentoFilter)

    }
    
    if (opt == "descuentosInactivos") {
      let descuentoFilter = DescuentoMemory.filter(descuento => descuento.status == 4);
      setDescuentos(descuentoFilter)
    }

    

  }


  return (
    <>
      <Container fluid>

        <Row>


          <Col className='p-2'>
            <h2 className="text-xl font-semibold my-3">Descuentos</h2>

            <div class="d-flex align-items-center gap-4 mb-4">
              <div class="col-md-4">
                <input
                  style={{ background: "#cccccc" }}
                  type="search"
                  class="form-control"
                  placeholder="Buscar"
                  onChange={(e) => filterValueFunc(e)}
                />
              </div>



              <select class="form-select " value={option} style={{ width: "200px", background: "transparent" }} onChange={(e) => updateFilter(e)}>
                <option selected>Filtrar por</option>
                <option value="sinfiltros">Mostrar Todo</option>
                <option value="descuentosActivos">Mis descuentos Activos</option>
                <option value="descuentosInactivos">Mis descuentos Inactivos</option>
              </select>


              <span class="text-secondary">Mis descuentos: {products.length}</span>
            </div>

            <Col style={{ background: "white" }} className='p-2'>


              <div className="container mt-4">
                <Row className="align-items-center my-4 p-2">
                  <Col>
                    <h4>Mis descuentos</h4>
                  </Col>
                  <Col className="text-end">
                    <button variant="link" className="text-decoration-none btn text-primary"
                      onClick={(e) => setShowModalAtributo(true)}>
                      <PlusCircle size={20} /> Añadir
                    </button>

                    {/* <button variant="link" className="text-decoration-none btn text-primary"
                      onClick={(e) => setShowModalAtributoPublic(true)}>
                      <Upload size={20} /> Publicar subproductos
                    </button> */}
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


      <AddDescuentoModal show={showModalAtributo} onClose={() => oncloseCaracteristicas()} onSave={handleSaveCaracteristicas} />
      {/* <PublicarSubProductos subproductos={DescuentoMemory}  show={showModalAtributoPublic} onClosevalue={() => onclosePublic()} onSave={handleSavePublic} toast={toast}  /> */}

      <ToastContainer />

    </>
  )
}
