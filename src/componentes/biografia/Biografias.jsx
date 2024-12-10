import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../estilos/Biografias.css";
import { useAuth } from "../servicios/auth";

export const Biografias = () => {
  const [biografias, setBiografias] = useState([]);
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const [isAdmin, setIsAdmin] = useState(false);
  const rol = useAuth().getRol();



  useEffect(() => {
    // Verifica si el token es "ADMIN"
    if (token) {
      if(rol=="ADMIN")
      setIsAdmin(true);
    }
  }, [token,rol]);
  


  useEffect(() => {
    // Llamada a la API al montar el componente
    fetch("http://localhost:8080/biografias")
      .then((res) => res.json())
      .then((result) => {
        setBiografias(result);
      });
  }, []);

  const eliminarBiografia = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/biografia/del/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        credentials: "include",
      });
      
      if (response.ok) {
        setBiografias(biografias.filter((biografia) => biografia.id !== id));
        alert("Biografía eliminada exitosamente");
      } else {
        alert("Error al eliminar la biografía");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error al conectar con el servidor");
    }
  };

  const verBiografia = (id) => {
    navigate(`/biografias/${id}`); // Redirige a la vista de detalles de la biografía con el ID
  };

  return (
    <>
    {isAdmin && (
      <button className="boton-añadir" onClick={() => navigate("/biografias/add")}>
        Añadir
      </button>
       )}
      <section className="contenedor-seccion">
        <div className="contenedor-categorias">
          {biografias.map((biografia) => (
            <div key={biografia.id} className="cuadro-autor">
              <p>{biografia.autor.nombre}</p>
              <button
                className="boton-ver"
                onClick={() => verBiografia(biografia.id)}
              >
                Ver
              </button>
              {isAdmin && (
              <button
                className="boton-eliminar"
                onClick={() => eliminarBiografia(biografia.id)}
              >
                Eliminar
              </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
  
};
