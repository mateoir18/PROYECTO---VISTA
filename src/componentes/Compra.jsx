import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography, CardActions, Button } from '@mui/material';

export const Compra = () => {
  const { idUsuario, idLibro } = useParams();
  const [compra, setCompra] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompra = async () => {
      try {
        const response = await fetch(`http://localhost:8080/compras/${idUsuario}/${idLibro}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener la compra');
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
  }, [idUsuario, idLibro]); // Volver a ejecutar cuando cambien los ids

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
            Información de la Compra
          </Typography>
          <Typography variant="h5" component="div">
            Título del Libro: {compra?.libro?.titulo} {/* Mostrar título del libro */}
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
            Autor: {compra?.libro?.autor?.nombre} {/* Mostrar nombre del autor */}
          </Typography>
          <Typography variant="body2">
            Precio: ${compra?.libro?.precio.toFixed(2)} {/* Mostrar precio del libro */}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Usuario: {compra?.usuario?.username} {/* Mostrar nombre de usuario */}
          </Typography>
          <Typography variant="body2">
            Fecha de Compra: {compra?.fecha} {/* Mostrar fecha de la compra */}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Comprar</Button>
          
        </CardActions>
      </Card>
    </Box>
  );
};

