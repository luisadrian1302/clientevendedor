import axios from 'axios';
import { AlignLeft, ArrowLeft, ArrowRight, BadgeMinus, BadgePercent, ChevronLeft, ChevronRight, Edit, MoveLeft, PlusCircle, Search, Trash, Upload } from 'lucide-react';
import React, { useEffect, useRef } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { data, Link, useNavigate } from 'react-router-dom';
import { usePagination, useTable } from 'react-table';
import { URLAPI } from '../../../../url';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { verificarVendedor } from '../../../../helper/isVendedor';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';
import AddDescuentoModal2 from '../../../layout/modal/AddDescuentoModal2';
import AplicarDescuentosSubproductos from '../../../layout/modal/AplicarDescuentosSubproductos';
import EliminarDescuentosSubproductos from '../../../layout/modal/EliminarDescuentosSubproductos';
  
export const DescuentosIndexScreen = () => {

  const [products, setDescuentos] = useState([]);
  const [descuentoUpdate, setdescuentoUpdate] = useState(null);
  const [option, setoption] = useState('');
  const navegate = useNavigate();
  const [filterSearch, setfilterSearch] = useState('');
  const [DescuentoMemory, setDescuentosMemory] = useState([]);
  const [showModalAtributo, setShowModalAtributo] = useState(false);
  const [showModalAtributoPublic, setShowModalAtributoPublic] = useState(false);
  const [showModalAtributoremoveValue, setshowModalAtributoremoveValue] = useState(false);

  const effectRun = useRef(false);
  function oncloseCaracteristicas() {
    setShowModalAtributo(false)
    setdescuentoUpdate(null);
  }

  function oncloseAtribute() {

    setshowModalAtributoremoveValue(false)

  }

  function onclosePublic() {

    setShowModalAtributoPublic(false)

  }

  async function handleSaveCaracteristicas(value) {

    if (descuentoUpdate != null) {

      await obtenerTodosLosproductos();
      setdescuentoUpdate(null);
            
    }else{

      setDescuentos((descuentos) => ([...descuentos, value ])); 
    }

    console.log(value);
    
    setShowModalAtributo(false)
   
    toast.success("Se guardo el descuento con exito");

  }

  async function handleSavePublic() {
    setShowModalAtributoPublic(false)
    toast.success("se aplicaron los descuento con exito");
    setdescuentoUpdate(null)


  }

  async function handleRemoveDescuento() {
    setshowModalAtributoremoveValue(false)
    toast.success("Se removieron los descuento con exito");
    setdescuentoUpdate(null)



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

        if (value.status == 1 ) {
          
         
          return (
            <>  
            <div className="">

                <Link className='text-primary text-decoration-none hover-primary w-100' onClick={(e) => updatedValue(value.id)} ><Edit/> </Link>
                <Link className='text-success text-decoration-none hover-success w-100' onClick={(e) => updatedCantidadDescuento(value.id)} ><BadgePercent/> </Link>

                <Link className='text-warning text-decoration-none hover-warning w-100' onClick={(e) => quitarDescuento(value.id)} ><BadgeMinus/> </Link>

                <Link className='text-danger text-decoration-none hover-primary w-100' onClick={(e) => eliminarProducto(value.id)}><Trash/></Link>
            </div>
            </>
        
          )
        }

       

       

      }
        

    }
    
  ], []);


  function updatedCantidadDescuento(id){
    setShowModalAtributoPublic(true)
    setdescuentoUpdate(id);

  }

  function quitarDescuento(id){
    setshowModalAtributoremoveValue(true)
    setdescuentoUpdate(id);

  }

  function updatedValue(id){


    
    setdescuentoUpdate(id);
    setShowModalAtributo(true)
  }

  function eliminarProducto(id) {
    


    Swal.fire({
      title: "Eliminar?",
      text: "¿Desea eliminar este descuento?",
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
      const { data } = await axios.delete(`${URLAPI}/descuentos/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      Swal.fire({
        title: "Eliminado",
        text: "Tu descuento a sido eliminado.",
        icon: "success"
      });


      // actualizar los datos
      await obtenerTodosLosproductos()
    } catch (error) {

      
      Swal.fire({
        title: "Error",
        text: "Ocurrio un error al eliminar el descuento.",
        icon: "error"
      })

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

    
    if (value == '0') {
      return 'Elimnado'
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
      // setDescuentosMemory(data)
    
      

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

                  {page.length == 0 ?<>
                      
                      <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "400px", width: "100%" }}>
                          <Search size={64} className="text-secondary" />
                          <h2 className="mt-3 fw-semibold">No hay contenido</h2>
                          <p className="text-muted">Aqui apareceran tus descuentos que vayas creando.</p>
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


      <AddDescuentoModal2 show={showModalAtributo} onClose={() => oncloseCaracteristicas()} onSave={handleSaveCaracteristicas} id={descuentoUpdate}/>
      <AplicarDescuentosSubproductos   show={showModalAtributoPublic} onClosevalue={() => onclosePublic()} onSave={handleSavePublic} toast={toast}  id={descuentoUpdate}  />
      <EliminarDescuentosSubproductos   show={showModalAtributoremoveValue} onClosevalue={() => oncloseAtribute()} onSave={handleRemoveDescuento} toast={toast}  id={descuentoUpdate}  />

      <ToastContainer />

    </>
  )
}
