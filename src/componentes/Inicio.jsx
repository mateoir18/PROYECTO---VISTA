import {  useState, useEffect } from "react";
import '../estilos/Inicio.css'


export const Inicio = () => {
    const [inicio, setInicio] = useState();

    useEffect(() => {
        // Hacemos la llamada a la API al montar el componente
        fetch("http://localhost:8080/inicio")
          .then((res) => res.json())
          .then((result) => {
            setInicio(result); // Guardamos la respuesta de la API
          });
      }, []); // El array vacío asegura que se ejecute solo una vez
    
  return (
    <section className="contenedor-seccion">
      <div className='contenedor-categorias'>
        <div className='categoria-libros'>
          <p>LIBROS</p>
        </div>
        <div className='categoria-autores'>
          <p>AUTORES</p>
        </div>
        <div className='categoria-biografias'>
          <p>BIOGRAFIAS</p>
        </div>
        <div className='categoria-ventas'>
          <p>LIBROS MAS VENDIDOS</p>
        </div>
      </div>
    </section>
  )
}

