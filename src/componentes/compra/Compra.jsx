import { useState, useEffect } from "react"; // Importar useState y useEffect
import { useParams, useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useAuth } from "../servicios/auth";

export const Compra = () => {
  const { idUsuario, idLibro } = useParams();
  const [compra, setCompra] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useAuth().getToken();
  const navigate = useNavigate();
  const rol = useAuth().getRol();

  // Validación de autenticación y rol
  useEffect(() => {
    if (token) {
      if (rol !== "ADMIN") {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [token, rol, navigate]);

 
  

  // Obtener los datos de la compra
  useEffect(() => {
    const fetchCompra = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/compras/${idUsuario}/${idLibro}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("No se pudo obtener la compra");
        }
        const data = await response.json();
        setCompra(data); // Guardar los datos de la compra en el estado
      } catch (error) {
        setError(error.message); // Manejar errores
      } finally {
        setLoading(false); // Cambiar estado de cargando
      }
    };

    fetchCompra(); // Llamar a la función para obtener la compra
  }, [idUsuario, idLibro, token]); // Volver a ejecutar cuando cambien los ids

  if (loading) {
    return <Typography>Cargando...</Typography>; // Mostrar mensaje de carga
  }

  if (error) {
    return <Typography>Error: {error}</Typography>; // Mostrar mensaje de error
  }

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography
            sx={{ color: "text.secondary", fontSize: 14 }}
            gutterBottom
          >
            Información de la Compra
          </Typography>
          <Typography variant="h5" component="div">
            Título del Libro: {compra?.libro?.titulo || "Sin título"}{" "}
            {/* Manejar valores nulos */}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            Autor: {compra?.libro?.autor?.nombre || "Autor desconocido"}{" "}
            {/* Manejar valores nulos */}
          </Typography>
          <Typography variant="body2">
            Precio: ${compra?.libro?.precio.toFixed(2)}{" "}
            {/* Mostrar precio del libro */}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Usuario: {compra?.usuario?.usuario || "Usuario desconocido"}{" "}
            {/* Manejar valores nulos */}
          </Typography>
          <Typography variant="body2">
            Fecha de Compra: {compra?.fecha || "Sin fecha"}{" "}
            {/* Manejar valores nulos */}
          </Typography>
          {/* Botón para editar */}
          
        </CardContent>
      </Card>
    </Box>
  );
};
