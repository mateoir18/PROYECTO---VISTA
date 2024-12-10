import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useAuth } from "../servicios/auth";

export const NuevaCompra = () => {
  const { idLibro } = useParams();
  const [libro, setLibro] = useState(null);
  const idUsuario = useAuth().getId();
  const token = useAuth().getToken();
  const usuario = useAuth().getUser();
  const [fecha, setFecha] = useState("");

  // Cargar datos de usuario y libro
  useEffect(() => {
    const fetchUsuarioYLibro = async () => {
      try {
        const libroResponse = await fetch(
          `http://localhost:8080/libro/${idLibro}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (libroResponse.ok) {
          setLibro(await libroResponse.json());
        }
      } catch (error) {
        console.error("Error al cargar usuario y libro:", error);
      }
    };

    fetchUsuarioYLibro();
  }, [idUsuario, idLibro, token]);

  const handleAddCompra = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/compras/add/${idUsuario}/${idLibro}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body:  fecha , // Incluye la fecha seleccionada
        }
      );
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
        value={usuario}
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
      <TextField
        label="Fecha"
        type="date" // Campo de tipo fecha
        variant="filled"
        size="small"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)} // Actualiza el estado con la fecha seleccionada
        InputLabelProps={{
          shrink: true, 
        }}
      />
      <Button size="small" onClick={handleAddCompra}>
        Añadir Compra
      </Button>
    </Stack>
  );
};
