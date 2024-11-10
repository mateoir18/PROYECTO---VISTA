import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export const Autores = () => {
  const [autores, setAutores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/autores")
      .then((res) => res.json())
      .then((result) => {
        setAutores(result);
      });
  }, []);

  const eliminarAutor = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este autor?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8080/autores/del/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setAutores(autores.filter((autor) => autor.id !== id));
          alert("Autor eliminado exitosamente");
        } else {
          alert("Error al eliminar el autor");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Error al conectar con el servidor");
      }
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/autores/add")}
        sx={{ mb: 2 }}
      >
        Añadir Autor
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="autores table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {autores.map((autor) => (
              <TableRow key={autor.id}>
                <TableCell>{autor.id}</TableCell>
                <TableCell>{autor.nombre}</TableCell>
                <TableCell>{autor.apellido}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(`/autores/${autor.id}`)}
                  >
                    Ver
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => eliminarAutor(autor.id)}
                    sx={{ ml: 1 }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
