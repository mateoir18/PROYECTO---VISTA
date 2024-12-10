import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../servicios/auth";

export const NuevoUsuario = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = useAuth().getToken();


const handleSubmit = (e) => {
  e.preventDefault();

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`; // Solo añade el token si está presente
  }

  fetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers,
    body: JSON.stringify({ usuario, password }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
      return res.json().catch(() => ({})); // Maneja respuestas vacías
    })
    .then((data) => {
      console.log("Usuario registrado:", data);
      navigate("/");
    })
    .catch((err) => {
      console.error("Error al registrar usuario:", err.message);
    });
};


  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        id="username"
        label="Nombre de Usuario"
        variant="outlined"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <TextField
        required
        id="password"
        label="Contraseña"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" type="submit" sx={{ m: 1 }}>
        Añadir usuario
      </Button>
    </Box>
  );
};
