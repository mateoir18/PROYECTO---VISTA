import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";

export const Compras = () => {
  const [compras, setCompras] = useState([]);
  const navigate = useNavigate();





  // Función para navegar a la vista de un libro específico
  const handleVerCompra = (idUsuario, idLibro) => {
    navigate(`/compras/${idUsuario}/${idLibro}`);
  };


  const handleEliminar = async (idUsuario, idLibro) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar esta compra?");
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:8080/compras/${idUsuario}/${idLibro}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setCompras(compras.filter((compra) => !(compra.id.usuarioId === idUsuario && compra.id.libroId === idLibro)));
          alert("Compra eliminada correctamente");
        } else {
          alert("Error al eliminar la compra");
        }
      } catch (error) {
        console.error("Error al eliminar la compra:", error);
        alert("Error al eliminar la compra");
      }
    }
  };



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
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {compras.map((compra) => (
            <TableRow key={compra.id.usuarioId + '-' + compra.id.libroId}>
              <TableCell>{compra.usuario.username}</TableCell>
              <TableCell>{compra.libro.titulo}</TableCell>
              <TableCell>{compra.libro.precio.toFixed(2)} €</TableCell>
              <TableCell>{compra.fecha}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleVerCompra(compra.id.usuarioId, compra.id.libroId)}
                >
                  Ver
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => handleEliminar(compra.id.usuarioId, compra.id.libroId)}
                  style={{ marginLeft: "10px" }}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

