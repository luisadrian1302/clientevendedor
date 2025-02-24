import React from 'react';
import {
  useTable,
  usePagination,
} from 'react-table';

const BasicTable = () => {
  // Datos de ejemplo
  const data = React.useMemo(
    () => [
      { id: 1, nombre: 'Juan', edad: 25, ciudad: 'Madrid' },
      { id: 2, nombre: 'Ana', edad: 30, ciudad: 'Barcelona' },
      { id: 3, nombre: 'Carlos', edad: 28, ciudad: 'Valencia' },
      { id: 4, nombre: 'María', edad: 35, ciudad: 'Sevilla' },
      { id: 5, nombre: 'Pedro', edad: 32, ciudad: 'Bilbao' },
    ],
    []
  );

  // Definición de columnas
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Nombre',
        accessor: 'nombre',
      },
      {
        Header: 'Edad',
        accessor: 'edad',
      },
      {
        Header: 'Ciudad',
        accessor: 'ciudad',
      },
    ],
    []
  );

  // Configuración de la tabla usando los hooks de react-table
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
      data,
      initialState: { pageSize: 2 }, // Elementos por página
    },
    usePagination
  );

  return (
    <div>
      <table {...getTableProps()}>
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

      <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Anterior
        </button>
        <span>
          Página {pageIndex + 1}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Siguiente
        </button>
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
        >
          {[2, 5, 10].map(size => (
            <option key={size} value={size}>
              Mostrar {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BasicTable;