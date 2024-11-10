import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export const NuevaCompra = () => {
  const { idUsuario, idLibro } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [libro, setLibro] = useState(null);

  // Cargar datos de usuario y libro
  useEffect(() => {
    const fetchUsuarioYLibro = async () => {
      try {
        const usuarioResponse = await fetch(`http://localhost:8080/usuarios/${idUsuario}`);
        const libroResponse = await fetch(`http://localhost:8080/libros/${idLibro}`);
        
        if (usuarioResponse.ok && libroResponse.ok) {
          setUsuario(await usuarioResponse.json());
          setLibro(await libroResponse.json());
        }
      } catch (error) {
        console.error("Error al cargar usuario y libro:", error);
      }
    };

    fetchUsuarioYLibro();
  }, [idUsuario, idLibro]);

  const handleAddCompra = async () => {
    try {
      const response = await fetch(`http://localhost:8080/compras/${idUsuario}/${idLibro}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        alert("Compra añadida exitosamente");
      } else {
        alert("Error al añadir la compra");
      }
    } catch (error) {
      console.error("Error al añadir la compra:", error);
    }
  };

  return (
    <Stack
      component="form"
      sx={{ width: "25ch" }}
      spacing={2}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Usuario"
        variant="filled"
        size="small"
        value={usuario ? usuario.username : ""}
        InputProps={{ readOnly: true }}
      />
      <TextField
        label="Título del Libro"
        variant="filled"
        size="small"
        value={libro ? libro.titulo : ""}
        InputProps={{ readOnly: true }}
      />
      <TextField
        label="Precio"
        variant="filled"
        size="small"
        value={libro ? libro.precio : ""}
        InputProps={{ readOnly: true }}
      />

      <Button size="small" onClick={handleAddCompra}>
        Añadir Compra
      </Button>
    </Stack>
  );
};

