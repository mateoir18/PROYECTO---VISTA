import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../servicios/auth";


export const Autor = () => {
  const { id } = useParams();
  const [autor, setAutor] = useState(null);
  const [biografia, setBiografia] = useState(null);
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para navegación
  const [isAdmin, setIsAdmin] = useState(false);
  const token = useAuth().getToken();
  const rol = useAuth().getRol();


  useEffect(() => {
    // Verifica si el token es "ADMIN"
    if (token) {
      if(rol=="ADMIN")
      setIsAdmin(true);
    }
  }, [token,rol]);






  // Cargar los detalles del autor
  useEffect(() => {
    const fetchAutor = async () => {
      try {
        const response = await fetch(`http://localhost:8080/autor/${id}`);
        if (!response.ok) {
          throw new Error("No se pudo obtener la información del autor");
        }
        const data = await response.json();
        setAutor(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAutor();
  }, [id]);

  // Cargar la biografía del autor
  useEffect(() => {
    const fetchBiografia = async () => {
      try {
        const response = await fetch(`http://localhost:8080/biografia/${id}`);
        if (!response.ok) {
          throw new Error("No se pudo obtener la información de la biografía");
        }
        const data = await response.json();
        setBiografia(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBiografia();
  }, [id]);

  // Cargar los libros del autor
  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const response = await fetch(`http://localhost:8080/libros/autor/${id}`);
        if (!response.ok) {
          throw new Error("No se pudo obtener los libros del autor");
        }
        const data = await response.json();
        setLibros(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLibros();
  }, [id]);

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }




  const handleEdit = () => {
    navigate(`/autores/edit/${autor.id}`); // Redirige a la vista de edición del libro con su ID
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Detalles del Autor
          </Typography>
          <Typography variant="h5" component="div">
            {autor?.nombre} {autor?.apellido}
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Biografía
          </Typography>
          <Typography variant="body2">
            Obras destacadas: {biografia?.obras_destacadas || "Sin información de obras destacadas"}
          </Typography>
          <Typography variant="body2">
            Premios: {biografia?.premios || "Sin premios registrados"}
          </Typography>

          <Typography sx={{ mt: 2 }} color="text.secondary">
            Libros publicados
          </Typography>
          {libros.length > 0 ? (
            libros.map((libro) => (
              <Typography key={libro.id} variant="body2">
                {libro.titulo} - Precio: ${libro.precio.toFixed(2)}
              </Typography>
            ))
          ) : (
            <Typography variant="body2">No hay libros disponibles</Typography>
          )}
          {isAdmin && (
            <Button onClick={handleEdit} size="small">Editar</Button>
          )}
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Box>
  );
};
