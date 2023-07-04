import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';
import Navbar from '../componentes/Navbar';

function Productos() {
  const [codigo, setCodigo] = useState();
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState();
  const [codigoFabricante, setCodigoFabricante] = useState('');

  const [editar, setEditar] = useState(false);

  const [productosList, setProductos] = useState([]);
  const [fabricantesList, setFabricantesList] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    getProductos();
  }, []);

  const addProducto = () => {
    axios
      .post('http://localhost:3001/create', {
        nombre: nombre,
        precio: precio,
        codigo_fabricante: codigoFabricante,
      })
      .then(() => {
        getProductos();
        cancelar();

        Swal.fire({
          title: "<strong>Agregado</strong>",
          html: "<i>El producto se agregó con éxito!!</i>",
          icon: 'success'
        });
      });
  };

  const update = () => {
    axios
      .put('http://localhost:3001/update', {
        codigo: codigo,
        nombre: nombre,
        precio: precio,
        codigo_fabricante: codigoFabricante,
      })
      .then(() => {
        getProductos();
        cancelar();
      });
  };

  const deleteProducto = (codigo) => {
    axios
      .delete(`http://localhost:3001/delete/${codigo}`)
      .then(() => {
        getProductos();
        cancelar();
      });
  };

  const cancelar = () => {
    setNombre('');
    setPrecio('');
    setCodigoFabricante('');
  };

  const editarProducto = (producto) => {
    setEditar(true);

    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setCodigoFabricante(producto.codigo_fabricante);
    setCodigo(producto.codigo);
  };

  const getProductos = () => {
    axios.get('http://localhost:3001/producto').then((response) => {
      setProductos(response.data);
      setProductosFiltrados(response.data);
    });
    axios.get('http://localhost:3001/fabricante').then((response) => {
      setFabricantesList(response.data);
    });
  };

  const filtrarProductos = () => {
    const productosFiltrados = productosList.filter((producto) => {
      return producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    });
    setProductosFiltrados(productosFiltrados);
  };

  useEffect(() => {
    filtrarProductos();
  }, [busqueda, productosList]);

  return (
    <div className="container">
      <Navbar />
      <br />
      <div className="content-container">
        <div className="form-container">
          <div className="card text-center">
            <div className="card-header" style={{ color: '#f74780' }}>
              PRODUCTOS
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="nombre">Nombre producto:</label>
                <input
                  id="nombre"
                  className="form-control"
                  type="text"
                  value={nombre}
                  onChange={(event) => setNombre(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="precio">Precio:</label>
                <input
                  id="precio"
                  className="form-control"
                  type="number"
                  value={precio}
                  onChange={(event) => setPrecio(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Fabricante:</label>
                <select
                  id="fabricante"
                  className="form-control"
                  value={codigoFabricante}
                  onChange={(event) => setCodigoFabricante(event.target.value)}
                >
                  <option value="">Seleccionar fabricante</option>
                  {fabricantesList.map((fabricante) => (
                    <option key={fabricante.codigo} value={fabricante.codigo}>
                      {fabricante.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="card-footer text-body-secondary">
              {editar ? (
                <div>
                  <button className="btn btn-success m-2" onClick={update}>
                    Actualizar
                  </button>
                  <button className="btn btn-primary m-2" onClick={cancelar}>
                    Cancelar
                  </button>
                </div>
              ) : (
                <button className="btn btn-success" onClick={addProducto}>
                  Guardar
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="table-container">
          <div className="mb-2" controlId="formBusqueda">
            <input
              type="text"
              placeholder="Buscar producto"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
            />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Fabricante</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.codigo}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.nombre_fabricante}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button
                        type="button"
                        onClick={(event) => {
                          editarProducto(producto);
                        }}
                        className="btn btn-warning"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          deleteProducto(producto.codigo);
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
      </div>

      <PDFDownloadLink
        document={
          <Document>
            <Page>
              <Text>Tabla de productos:</Text>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Fabricante</th>
                  </tr>
                </thead>
                <tbody>
                  {productosList.map((producto, index) => (
                    <tr key={index}>
                      <td>{producto.codigo}</td>
                      <td>{producto.nombre}</td>
                      <td>{producto.precio}</td>
                      <td>{producto.nombre_fabricante}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Page>
          </Document>
        }
        fileName="productos.pdf"
      >
        {({ blob, url, loading, error }) => (loading ? 'Cargando...' : 'Exportar a PDF')}
      </PDFDownloadLink>
    </div>
  );
}

export default Productos;
