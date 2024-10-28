import { useState, useEffect } from "react";
import '../estilos/Biografias.css';

export const Biografias = () => {
  const [biografias, setBiografias] = useState([]); // Estado para almacenar las biografías

  useEffect(() => {
    // Llamada a la API al montar el componente
    fetch("http://localhost:8080/biografias")
      .then((res) => res.json())
      .then((result) => {
        setBiografias(result); // Guardamos la respuesta de la API
      });
  }, []); // El array vacío asegura que se ejecute solo una vez

  return (
    <section className="contenedor-seccion">
      <div className="contenedor-categorias">
        {biografias.map((biografia) => (
          <div key={biografia.id} className="cuadro-autor">
            {/* Mostramos el nombre del autor */}
            <p>{biografia.autor.nombre}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
