import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../estilos/Inicio.css";
import { useAuth } from "../servicios/auth";

export const Inicio = () => {
  const navigate = useNavigate();
  const { setUsuarioId } = useAuth();
  const token = useAuth().getToken();
  const username = useAuth().getUser();

  useEffect(() => {
    fetch(`http://localhost:8080/usuarios/nombre/${username}`, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        if (result.id && result.id !== setUsuarioId) {
          setUsuarioId(result.id);
        }
      })
      .catch((error) => console.error("Error fetching user ID:", error));
  }, [token, username, setUsuarioId]);
  
  

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <section className="contenedor-seccion">
      <div className="contenedor-categorias">
        <div
          className="categoria-libros"
          onClick={() => handleNavigation("/libros")}
        >
          <p>LIBROS</p>
        </div>
        <div
          className="categoria-autores"
          onClick={() => handleNavigation("/autores")}
        >
          <p>AUTORES</p>
        </div>
        <div
          className="categoria-biografias"
          onClick={() => handleNavigation("/biografias")}
        >
          <p>BIOGRAFÍAS</p>
        </div>
        <div
          className="categoria-ventas"
          onClick={() => handleNavigation("/libros/masvendidos")}
        >
          <p>LIBROS MÁS VENDIDOS</p>
        </div>
      </div>
    </section>
  );
};
