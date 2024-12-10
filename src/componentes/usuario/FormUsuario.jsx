import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Alert } from "@mui/material";
import { useAuth } from "../servicios/auth";

export const FormUsuario = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ usuario: "", password: "" });
  const [error, setError] = useState(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const navigate = useNavigate();
  const { getToken, setToken, getId, getRol } = useAuth();
  const token = getToken();
  const userId = getId();
  const userRole = getRol();

  useEffect(() => {
    // Validar acceso
    if (!token || !userId || (userId != id && userRole !== "ADMIN")) {
      setAccessDenied(true);
      return;
    }

    // Obtener datos del usuario
    fetch(`http://localhost:8080/usuarios/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los datos del usuario");
        return res.json();
      })
      .then((data) => setFormData({ usuario: data.username, password: "" })) // No cargar la contraseña encriptada
      .catch((err) => setError(err.message));
  }, [id, token, userId, userRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/usuarios/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al actualizar el usuario");
        return res.json();
      })
      .then((data) => {
        if (data.token) setToken(data.token); // Actualizar token si se devuelve
        navigate(`/usuarios/${id}`); // Redirigir a la vista del usuario
      })
      .catch((err) => setError(err.message));
  };

  // Mostrar mensaje de acceso denegado si no tiene permisos
  if (accessDenied) {
    return (
      <Alert severity="error">
        Acceso denegado: no tienes permiso para editar este usuario.
      </Alert>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
    >
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        required
        id="username"
        label="Nombre de Usuario"
        variant="outlined"
        name="usuario"
        value={formData.usuario}
        onChange={handleChange}
      />
      <TextField
        required
        id="password"
        label="Contraseña"
        variant="outlined"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <Button variant="contained" color="primary" type="submit" sx={{ m: 1 }}>
        Guardar Cambios
      </Button>
    </Box>
  );
};
