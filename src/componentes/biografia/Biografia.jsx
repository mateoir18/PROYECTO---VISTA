import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { useAuth } from "../servicios/auth";

export const Biografia = () => {
  const { id } = useParams();
  const [biografia, setBiografia] = useState(null);
  const navigate = useNavigate();
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


  const handleEdit = () => {
    navigate(`/biografias/edit/${biografia?.id}`);
  };

  useEffect(() => {
    fetch(`http://localhost:8080/biografia/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setBiografia(result);
      })
      .catch((error) => {
        console.error("Error al cargar la biografía:", error);
      });
  }, [id]);

  if (!biografia) {
    return <Typography>Cargando biografía...</Typography>; // Mostrar mientras se cargan los datos
  }

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ color: 'text.secondary', fontSize: 14 }} gutterBottom>
            Nacionalidad: {biografia.nacionalidad || "No especificada"}
          </Typography>
          <Typography variant="h5" component="div">
            Autor: {biografia.autor?.nombre} {biografia.autor?.apellido}
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
            Fecha de Nacimiento: {biografia.fecha_nac || "No especificada"}
          </Typography>
          <Typography variant="body2">
            Premios: {biografia.premios || "Sin premios"}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Obras Destacadas: {biografia.obras_destacadas || "No especificadas"}
          </Typography>
        </CardContent>
        <CardActions>
        {isAdmin && (
          <Button onClick={handleEdit} size="small">Editar</Button>
        )}
        </CardActions>
      </Card>
    </Box>
  );
};
