import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const Usuarios = () => {
  const [usuarios, setUsuario] = useState([]); // Inicializamos como un array vacío

  useEffect(() => {
    // Hacemos la llamada a la API al montar el componente
    fetch("http://localhost:8080/usuarios")
      .then((res) => res.json())
      .then((result) => {
        setUsuario(result); // Guardamos la respuesta de la API
      });
  }, []); // El array vacío asegura que se ejecute solo una vez

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Clientes table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>rol</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow key={usuario.id}>
              <TableCell>{usuario.id}</TableCell>
              <TableCell>{usuario.username}</TableCell>
              <TableCell>{usuario.password}</TableCell>
              <TableCell>{usuario.rol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
