import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useAuth } from "../servicios/auth";


export const FormLibro = () => {
  const { id } = useParams(); // Obtener el id del libro desde la URL
  const [titulo, setTitulo] = useState("");
  const [precio, setPrecio] = useState("");
  const [autorId, setAutorId] = useState(""); // ID del autor seleccionado
  const [autores, setAutores] = useState([]); // Lista de autores disponibles
  const token = useAuth().getToken();
  const navigate = useNavigate();
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

  // Función para obtener los datos del libro por su ID
  useEffect(() => {
    const fetchLibro = async () => {
      try {
        const response = await fetch(`http://localhost:8080/libro/${id}`);
        const libro = await response.json();
        setTitulo(libro.titulo);
        setPrecio(libro.precio);
        setAutorId(libro.autor?.id || ""); // ID del autor actual del libro
      } catch (error) {
        console.error("Error al obtener el libro:", error);
      }
    };

    const fetchAutores = async () => {
      try {
        const response = await fetch("http://localhost:8080/autores");
        const autores = await response.json();
        setAutores(autores); // Guardar la lista de autores
      } catch (error) {
        console.error("Error al obtener los autores:", error);
      }
    };

    fetchLibro();
    fetchAutores();
  }, [id]);

  // Función para manejar la actualización del libro
  const handleUpdate = async () => {
    try {
      const libroActualizado = {
        titulo,
        precio: parseFloat(precio), // Convertir a número
        autor: {
          id: autorId, // Solo necesitas enviar el ID del autor
        },
      };
      const response = await fetch(`http://localhost:8080/libros/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        credentials: "include",
        body: JSON.stringify(libroActualizado),
      });
      

      if (response.ok) {
        alert("Libro actualizado correctamente");
      } else {
        alert("Error al actualizar el libro");
      }
    } catch (error) {
      console.error("Error al actualizar el libro:", error);
      alert("Error al actualizar el libro");
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
        label="Título"
        variant="filled"
        size="small"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <TextField
        label="Precio"
        variant="filled"
        size="small"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />
      
      {/* Selector de autor */}
      <FormControl variant="filled" size="small">
        <InputLabel id="autor-select-label">Autor</InputLabel>
        <Select
          labelId="autor-select-label"
          value={autorId}
          onChange={(e) => setAutorId(e.target.value)}
        >
          {autores.map((autor) => (
            <MenuItem key={autor.id} value={autor.id}>
              {autor.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Button size="small" onClick={handleUpdate}>
        Actualizar
      </Button>
    </Stack>
  );
};
