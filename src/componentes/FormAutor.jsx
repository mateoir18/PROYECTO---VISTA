import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button } from '@mui/material';

export const FormAutor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  // Cargar los datos del autor
  useEffect(() => {
    const fetchAutor = async () => {
      try {
        const response = await fetch(`http://localhost:8080/autores/${id}`);
        if (response.ok) {
          const autor = await response.json();
          setNombre(autor.nombre);
          setApellido(autor.apellido);
        } else {
          alert("Autor no encontrado");
        }
      } catch (error) {
        console.error("Error al cargar el autor:", error);
      }
    };

    fetchAutor();
  }, [id]);

  // Manejar la actualización del autor
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/autores/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido }),
      });
      if (response.ok) {
        alert("Autor actualizado exitosamente");
        navigate("/autores"); // Redireccionar a la lista de autores
      } else {
        alert("Error al actualizar el autor");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        id="nombre"
        label="Nombre"
        variant="outlined"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <TextField
        required
        id="apellido"
        label="Apellido"
        variant="outlined"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
      />
      <Button variant="contained" color="primary" type="submit" sx={{ m: 1 }}>
        Guardar
      </Button>
    </Box>
  );
};
