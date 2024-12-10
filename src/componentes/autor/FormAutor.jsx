import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import { useAuth } from "../servicios/auth";

export const FormAutor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const token = useAuth().getToken();
  const rol = useAuth().getRol();

  useEffect(() => {
    if (token) {
      if (rol !== "ADMIN") {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [token, rol]);

  // Cargar los datos del autor
  useEffect(() => {
    const fetchAutor = async () => {
      try {
        const response = await fetch(`http://localhost:8080/autor/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data); // Procesa los datos aquí
      } catch (error) {
        console.error("Error fetching autor:", error);
      }
    };

    fetchAutor();
  }, [id, token]);

  // Manejar la actualización del autor
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/autores/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        credentials: "include",
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
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
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
