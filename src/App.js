import './App.css';
import {useState} from "react"
import axios from "axios";

function App() {

const [nombre,setNombre] =useState("");
const [precio,setPrecio] =useState(0);
const [codigo_fabricante,setcodigo_fabricante] =useState("");

const add =()=>{
  axios.post("http://localhost:3001/create",{
    nombre:nombre,
    precio: precio,
    codigo_fabricante: codigo_fabricante
  }).then (()=>{
    alert("producto agregado");
  });
}

  return (
    <div className="App">
      <div className="datos">
        <label>Nombre producto: <input 
        onChange={(event)=>{
          setNombre(event.target.value)
        }}
        type="text"/></label>
        <label>Precio: <input 
        onChange={(event)=>{
          setPrecio(event.target.value)
        }}
        type="number"/></label>
        <label>Fabricante: <input
        onChange={(event)=>{
          setcodigo_fabricante(event.target.value)
        }}
         type="text"/></label>
        <button onClick={add}>Guardar</button>
      </div>
    </div>
  );
}

export default App;
