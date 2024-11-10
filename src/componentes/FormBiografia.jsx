import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

export const FormBiografia = () => {
  const { id } = useParams(); // Obtener el id de la URL
  const [autores, setAutores] = useState([]);
  const [autorSeleccionado, setAutorSeleccionado] = useState("");
  const [fechaNac, setFechaNac] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [obrasDestacadas, setObrasDestacadas] = useState("");
  const [premios, setPremios] = useState("");
  const navigate = useNavigate(); // Hook para navegación

  useEffect(() => {
    // Llamada para obtener los datos de la biografía
    fetch(`http://localhost:8080/biografias/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAutorSeleccionado(data.autor.id);
        setFechaNac(data.fecha_nac);
        setNacionalidad(data.nacionalidad);
        setObrasDestacadas(data.obras_destacadas);
        setPremios(data.premios);
      });

    // Llamada para obtener todos los autores
    fetch("http://localhost:8080/autores")
      .then((res) => res.json())
      .then((data) => setAutores(data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const biografiaActualizada = {
      autor: { id: autorSeleccionado },
      fecha_nac: fechaNac,
      nacionalidad,
      obras_destacadas: obrasDestacadas,
      premios
    };

    try {
      const response = await fetch(`http://localhost:8080/biografias/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(biografiaActualizada),
      });
      if (response.ok) {
        alert("Biografía actualizada exitosamente");
        navigate(`/biografias/${id}`); // Redirige a la vista de la biografía actualizada
      } else {
        alert("Error al actualizar la biografía");
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
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel id="autor-label">Autor</InputLabel>
        <Select
          labelId="autor-label"
          id="autor"
          value={autorSeleccionado}
          onChange={(e) => setAutorSeleccionado(e.target.value)}
          label="Autor"
          required
        >
          {autores.map((autor) => (
            <MenuItem key={autor.id} value={autor.id}>
              {autor.nombre} {autor.apellido}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        required
        id="fecha_nac"
        label="Fecha de Nacimiento"
        variant="outlined"
        value={fechaNac}
        onChange={(e) => setFechaNac(e.target.value)}
      />
      <TextField
        required
        id="nacionalidad"
        label="Nacionalidad"
        variant="outlined"
        value={nacionalidad}
        onChange={(e) => setNacionalidad(e.target.value)}
      />
      <TextField
        id="obras_destacadas"
        label="Obras Destacadas"
        variant="outlined"
        value={obrasDestacadas}
        onChange={(e) => setObrasDestacadas(e.target.value)}
      />
      <TextField
        id="premios"
        label="Premios"
        variant="outlined"
        value={premios}
        onChange={(e) => setPremios(e.target.value)}
      />
      <Button variant="contained" color="primary" type="submit" sx={{ m: 1 }}>
        Guardar Cambios
      </Button>
    </Box>
  );
};
