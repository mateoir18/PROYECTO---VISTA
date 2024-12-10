import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const MasVendidos = () => {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Llamada a la API para obtener los libros más vendidos
    const fetchLibrosMasVendidos = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/compras/masvendidos"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los libros más vendidos");
        }
        const data = await response.json();
        setLibros(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLibrosMasVendidos();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID del Libro</TableCell>
            <TableCell>Título</TableCell>
            <TableCell>Autor</TableCell>
            <TableCell>Ventas</TableCell> {/* Nueva columna */}
          </TableRow>
        </TableHead>
        <TableBody>
          {libros.map(([libro, ventas]) => ( // Accede al libro y las ventas desde el arreglo
            <TableRow key={libro.id}>
              <TableCell>{libro.id}</TableCell>
              <TableCell>{libro.titulo}</TableCell>
              <TableCell>
                {libro.autor
                  ? `${libro.autor.nombre} ${libro.autor.apellido}`
                  : "Desconocido"}
              </TableCell>
              <TableCell>{ventas}</TableCell> {/* Muestra las ventas */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
