import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import '../App.css';


function Navbar() {
   
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
          <li className="nav-item">
              <Link className="nav-link" to="/productos" style={{ color: '#f74780' }}>
                Home
              </Link>
            </li>
          <li className="nav-item">
              <Link className="nav-link" to="/productos" style={{ color: '#f74780' }}>
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/fabricantes" style={{ color: '#f74780' }}>
                Fabricantes
              </Link>
            </li>
          </ul>
        </div>
        </nav>
    );
  }
  
  export default Navbar;