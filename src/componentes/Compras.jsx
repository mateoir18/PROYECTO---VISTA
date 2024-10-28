import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const Compras = () => {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/compras")
      .then((res) => res.json())
      .then((result) => {
        setCompras(result);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="compras table">
        <TableHead>
          <TableRow>
            <TableCell>Usuario</TableCell>
            <TableCell>Libro</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {compras.map((compra) => (
            <TableRow key={compra.id.usuarioId + '-' + compra.id.libroId}>
              <TableCell>{compra.usuario.username}</TableCell>
              <TableCell>{compra.libro.titulo}</TableCell>
              <TableCell>{compra.libro.precio.toFixed(2)} €</TableCell>
              <TableCell>{compra.fecha}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

