import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useAuth } from "../servicios/auth";

export const Compras = () => {
  const token = useAuth().getToken(); // Obtener el token
  const [compras, setCompras] = useState([]); // Estado para las compras
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


  // Función para navegar a la vista de un libro específico
  const handleVerCompra = (idUsuario, idLibro) => {
    navigate(`/compras/${idUsuario}/${idLibro}`);
  };

  // Función para eliminar una compra
  const handleEliminar = async (idUsuario, idLibro) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar esta compra?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `http://localhost:8080/compras/del/${idUsuario}/${idLibro}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json", // Cambiado para coincidir con el backend
              Authorization: "Bearer " + token,
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          setCompras(
            compras.filter(
              (compra) =>
                !(
                  compra.id.usuarioId === idUsuario &&
                  compra.id.libroId === idLibro
                )
            )
          );
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

  // Obtener las compras al cargar el componente
  useEffect(() => {
    fetch("http://localhost:8080/compras", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudo obtener las compras");
        }
        return res.json();
      })
      .then((result) => {
        setCompras(result);
      })
      .catch((error) => console.error("Error al obtener las compras:", error));
  }, [token]);

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
            <TableRow key={`${compra.id.usuarioId}-${compra.id.libroId}`}>
              <TableCell>{compra.usuario.usuario}</TableCell>
              <TableCell>{compra.libro.titulo}</TableCell>
              <TableCell>{compra.libro.precio?.toFixed(2)} €</TableCell>
              <TableCell>{compra.fecha}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() =>
                    handleVerCompra(compra.id.usuarioId, compra.id.libroId)
                  }
                >
                  Ver
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() =>
                    handleEliminar(compra.id.usuarioId, compra.id.libroId)
                  }
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
