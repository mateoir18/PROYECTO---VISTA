import { useEffect, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useAuth } from "../servicios/auth";
import { useNavigate } from "react-router-dom";

export const NuevoAutor = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [error, setError] = useState({ nombre: false, apellido: false }); // Estado para errores
  const token = useAuth().getToken();
  const rol = useAuth().getRol();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      if (rol !== "ADMIN") {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [token, rol]);

  const validateFields = () => {
    const errors = {
      nombre: nombre.trim() === "",
      apellido: apellido.trim() === "",
    };
    setError(errors);
    return !errors.nombre && !errors.apellido; // Devuelve true si no hay errores
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/autores/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        credentials: "include",
        body: JSON.stringify({ nombre, apellido }),
      });
      if (response.ok) {
        alert("Autor agregado exitosamente");
        setNombre("");
        setApellido("");
        setError({ nombre: false, apellido: false }); // Resetea los errores
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
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
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
          error={error.nombre} // Indica si hay error en este campo
          helperText={error.nombre ? "El nombre es obligatorio" : ""}
          onChange={(e) => setNombre(e.target.value)}
        />
        <TextField
          required
          id="apellido"
          label="Apellido"
          variant="outlined"
          value={apellido}
          error={error.apellido} // Indica si hay error en este campo
          helperText={error.apellido ? "El apellido es obligatorio" : ""}
          onChange={(e) => setApellido(e.target.value)}
        />
      </div>
      <Button variant="contained" color="primary" type="submit" sx={{ m: 1 }}>
        Agregar Autor
      </Button>
    </Box>
  );
};
