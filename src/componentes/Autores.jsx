import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export const Autores = () => {
  const [autores, setAutores] = useState([]); // Cambiado a array

  useEffect(() => {
    // Hacemos la llamada a la API al montar el componente
    fetch("http://localhost:8080/autores")
      .then((res) => res.json())
      .then((result) => {
        setAutores(result); // Guardamos la respuesta de la API
      });
  }, []); // El array vacío asegura que se ejecute solo una vez

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="autores table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {autores.map((autor) => (
            <TableRow key={autor.id}>
              <TableCell>{autor.id}</TableCell>
              <TableCell>{autor.nombre}</TableCell>
              <TableCell>{autor.apellido}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
