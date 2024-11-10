import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

export const Usuario = () => {
  const { id } = useParams(); // Obtener el id de la URL
  const [usuario, setUsuario] = useState(null); // Estado para almacenar los datos del usuario
  const [compras, setCompras] = useState([]); // Estado para almacenar las compras del usuario
  const navigate = useNavigate(); // Hook para navegación

  const handleEdit = () => {
    if (usuario) {
      navigate(`/usuarios/edit/${usuario.id}`); // Redirige a la vista de edición del usuario con su ID
    }
  };

  useEffect(() => {
    // Llamada a la API para obtener el usuario con el ID especificado
    fetch(`http://localhost:8080/usuarios/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setUsuario(result); // Guardamos la respuesta de la API
      });

    // Llamada a la API para obtener las compras del usuario
    fetch(`http://localhost:8080/compras/usuario/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setCompras(result); // Guardamos las compras en el estado
      });
  }, [id]);

  if (!usuario) {
    // Muestra un mensaje de carga o un spinner mientras se carga el usuario
    return <p>Cargando...</p>;
  }

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography
            sx={{ color: "text.secondary", fontSize: 14 }}
            gutterBottom
          >
            ID de Usuario: {usuario.id}
          </Typography>
          <Typography variant="h5" component="div">
            Nombre de Usuario: {usuario.username}
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
                  Título del Libro: {compra.libro.titulo}
                </li>
              ))
            ) : (
              <li>No hay compras registradas</li>
            )}
          </ul>
        </CardContent>
        <CardActions>
          <Button onClick={handleEdit} size="small">
            Editar
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
