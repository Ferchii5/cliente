import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';
import Navbar from '../componentes/Navbar';
import ReactPaginate from 'react-paginate';

function Fabricantes() {
  const [codigo, setCodigo] = useState();
  const [nombre, setNombre] = useState('');

  const [editar, setEditar] = useState(false);

  const [fabricantesList, setFabricantes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);  
  const itemsPerPage = 5;
  const offset = currentPage * itemsPerPage;
  const paginatedItems = fabricantesList.slice(offset, offset + itemsPerPage);



  useEffect(() => {
    getFabricantes();
  }, []);

  const addFabricante = () => {
    axios
      .post('http://localhost:3001/createfab', {
        nombre: nombre,
        
      })
      .then(() => {
        alert('Fabricante agregado');
        getFabricantes();
        cancelar();

        Swal.fire({
          title: "<strong>Agregado</strong>",
          html: "<i> el Fabricante se agrego con exito!! </i>",
          icon: 'success'
        });
      });
  };

  const update = () => {
    axios
      .put('http://localhost:3001/updatefab', {
        codigo: codigo,
        nombre: nombre,
      
      })
      .then(() => {
        getFabricantes();
        cancelar();
      });
  };

  const deleteFabricante = (codigo) => {
    axios
      .delete(`http://localhost:3001/deletefab/${codigo}`)
      .then(() => {
        getFabricantes();
        cancelar();
      });
  };

  const cancelar = () => {
    setNombre("");
   
  };

  const editarFabricante = (fabricante) => {
    setEditar(true);

    setNombre(fabricante.nombre);
   
    setCodigo(fabricante.codigo);
  };

  const getFabricantes = () => {
    axios.get('http://localhost:3001/fabricante').then((response) => {
      setFabricantes(response.data);
      setCurrentPage(0); 
    });
  };
  

  return (
    <div className="container">
      <Navbar />
      <br></br>
      <div className="content-container">
  <div className="form-container">
    <div className="card text-center">
      <div className="card-header" style={{ color: '#f74780' }}>FABRICANTES</div>
      <div className="card-body">
        <div className="form-group">
          <label htmlFor="nombre">Nombre fabricante:</label>
          <input
            id="nombre"
            className="form-control"
            type="text"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
          />
        </div>
      </div>
      <div className="card-footer text-body-secondary">
        {editar ? (
          <div>
            <button className="btn btn-warning m-2" onClick={update}>
              {' '}
              Actualizar
            </button>
            <button className="btn btn-primary m-2" onClick={cancelar}>
              {' '}
              Cancelar
            </button>
          </div>
        ) : (
          <button className="btn btn-success" onClick={addFabricante}>
            {' '}
            Guardar{' '}
          </button>
        )}
      </div>
    </div>
  </div>

  <div className="table-container">
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>acciones</th>
        </tr>
      </thead>
      <tbody>
        {fabricantesList.map((fabricante, index) => (
          <tr key={index}>
            <td>{fabricante.codigo}</td>
            <td>{fabricante.nombre}</td>
            <td>
              <div className="btn-group" role="group" aria-label="Basic example">
                <button
                  type="button"
                  onClick={(event) => {
                    editarFabricante(fabricante);
                  }}
                  className="btn btn-info"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deleteFabricante(fabricante.codigo);
                  }}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <ReactPaginate
  previousLabel={'Anterior'}
  nextLabel={'Siguiente'}
  pageCount={Math.ceil(fabricantesList.length / itemsPerPage)}
  onPageChange={({ selected }) => setCurrentPage(selected)}
  containerClassName={'pagination'}
  activeClassName={'active'}
/>

</div>


      <PDFDownloadLink
        document={
          <Document>
            <Page>
              <Text>Tabla de fabricantes:</Text>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {fabricantesList.map((fabricante, index) => (
                    <tr key={index}>
                      <td>{fabricante.codigo}</td>
                      <td>{fabricante.nombre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Page>
          </Document>
        }
        fileName="fabricantess.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Cargando...' : 'Exportar a PDF'
        }
      </PDFDownloadLink>
    </div>
  );
}

export default Fabricantes;
