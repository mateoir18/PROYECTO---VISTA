import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import { useAuth } from "../servicios/auth";

export const Usuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [compras, setCompras] = useState([]);
  const [accessDenied, setAccessDenied] = useState(false); // Estado para denegar acceso
  const auth = useAuth();
  const token = auth.getToken();
  const userId = auth.getId();
  const userRole = auth.getRol();
  const navigate = useNavigate()

  useEffect(() => {
    
    // Validar acceso
    if (!token || (!userId || (userId != id && userRole !== "ADMIN"))) {
      setAccessDenied(true); // Si no tiene permiso, denegar acceso
      return;
      
    }

    // Llamada para obtener usuario
    fetch(`http://localhost:8080/usuarios/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener el usuario");
        }
        return res.json();
      })
      .then((result) => {
        setUsuario(result);
        
      })
      .catch((error) => {
        console.error(error);
        setUsuario({ error: "No se pudo cargar el usuario" });
      });

    // Llamada para obtener compras
    fetch(`http://localhost:8080/compras/usuario/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener las compras");
        }
        return res.json();
      })
      .then((result) => {
        setCompras(result);
      })
      .catch((error) => {
        console.error(error);
        setCompras([]);
      });
  }, [id, token, userId, userRole, setAccessDenied]);

  if (accessDenied) {
    console.log(accessDenied)
    return <p>No tienes permisos para acceder</p>;
  }

  if (!usuario) {
    return <p>Cargando...</p>;
  }

  if (usuario.error) {
    return <p>Error: {usuario.error}</p>;
  }

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ color: "text.secondary", fontSize: 14 }} gutterBottom>
            ID de Usuario: {usuario.id}
          </Typography>
          <Typography variant="h5" component="div">
            Nombre de Usuario: {usuario.usuario}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            Rol: {usuario.rol}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Compras:
          </Typography>
          <ul>
            {compras.length > 0 ? (
              compras.map((compra) => (
                <li key={`${compra.id.usuarioId}-${compra.id.libroId}`}>
                  Título del Libro: {compra.libro ? compra.libro.titulo : "Información no disponible"}
                </li>
              ))
            ) : (
              <li>No hay compras registradas</li>
            )}
          </ul>
        </CardContent>
        <CardActions>
          <Button onClick={() => navigate(`/usuarios/edit/${usuario.id}`)} size="small">
            Editar
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
