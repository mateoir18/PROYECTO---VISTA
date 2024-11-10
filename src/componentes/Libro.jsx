import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

export const Libro = () => {
  const { id } = useParams(); // Obtener el id de la URL
  const [libro, setLibro] = useState(null); // Estado para almacenar los datos del libro
  const [loading, setLoading] = useState(true); // Estado para manejar el cargado
  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate(); // Hook para navegación


  const handleEdit = () => {
    navigate(`/libros/edit/${libro.id}`); // Redirige a la vista de edición del libro con su ID
  };
  

  // Obtener datos del libro desde la API
  useEffect(() => {
    const fetchLibro = async () => {
      try {
        const response = await fetch(`http://localhost:8080/libros/${id}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener el libro');
        }
        const data = await response.json();
        setLibro(data); // Guardar los datos del libro en el estado
      } catch (error) {
        setError(error.message); // Manejar errores
      } finally {
        setLoading(false); // Cambiar estado de cargando
      }
    };

    fetchLibro(); // Llamar a la función para obtener el libro
  }, [id]); // Volver a ejecutar cuando cambie el id

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
          <Typography sx={{ color: 'text.secondary', fontSize: 14 }} gutterBottom>
            Título del Libro
          </Typography>
          <Typography variant="h5" component="div">
            {libro?.titulo} {/* Mostrar título del libro */}
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
            Autor: {libro?.autor?.nombre} {/* Mostrar nombre del autor */}
          </Typography>
          <Typography variant="body2">
            Precio: ${libro?.precio.toFixed(2)} {/* Mostrar precio del libro */}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => navigate("/compras/nueva/:idUsuario/:idLibro")} size="small">Comprar</Button>
          <Button onClick={handleEdit} size="small">Editar</Button>
        </CardActions>
      </Card>
    </Box>
  );
};


