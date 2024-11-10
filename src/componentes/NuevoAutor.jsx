import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

export const NuevoAutor = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/autores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido }),
      });
      if (response.ok) {
        alert("Autor agregado exitosamente");
        setNombre("");
        setApellido("");
      } else {
        alert("Error al agregar el autor");
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
      <div>
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
      </div>
      <Button variant="contained" color="primary" type="submit" sx={{ m: 1 }}>
        Agregar Autor
      </Button>
    </Box>
  );
};
