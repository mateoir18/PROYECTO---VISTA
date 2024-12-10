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

export const Libros = () => {
  const [libros, setLibros] = useState([]); // Inicializamos como un array vacío
  const navigate = useNavigate(); // Hook para navegación
  const token = useAuth().getToken();
  const [isAdmin, setIsAdmin] = useState(false);
  const [canBuy, setCanBuy] = useState(false);
  const rol = useAuth().getRol();

  useEffect(() => {
    // Verifica los roles según el token
    if (token) {
      if (rol === "ADMIN") {
        setIsAdmin(true);
        setCanBuy(true);
      } else if (rol === "USER") {
        setCanBuy(true);
      }
    }
  }, [token, rol]);

  const handleLibro = (id) => {
    navigate(`/libros/${id}`); // Redirige a la vista del libro con su ID
  };

  const handleEliminar = async (id) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este libro?");
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:8080/libro/del/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          credentials: "include",
        });

        if (response.ok) {
          setLibros(libros.filter((libro) => libro.id !== id)); // Actualiza el estado eliminando el libro
          alert("Libro eliminado correctamente");
        } else {
          alert("Error al eliminar el libro");
        }
      } catch (error) {
        console.error("Error al eliminar el libro:", error);
        alert("Error al eliminar el libro");
      }
    }
  };

  useEffect(() => {
    // Hacemos la llamada a la API al montar el componente
    fetch("http://localhost:8080/libros")
      .then((res) => res.json())
      .then((result) => {
        setLibros(result); // Guardamos la respuesta de la API
      });
  }, []); // El array vacío asegura que se ejecute solo una vez

  return (
    <TableContainer component={Paper}>
      {isAdmin && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/libros/add")}
          sx={{ mb: 2 }}
        >
          Añadir Libro
        </Button>
      )}
      <Table sx={{ minWidth: 700 }} aria-label="libros table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Título</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Autor</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {libros.map((libro) => (
            <TableRow key={libro.id} style={{ cursor: "pointer" }}>
              <TableCell>{libro.id}</TableCell>
              <TableCell onClick={() => handleLibro(libro.id)}>
                {libro.titulo}
              </TableCell>
              <TableCell>{libro.precio.toFixed(2)} €</TableCell>
              <TableCell>{libro.autor.nombre}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleLibro(libro.id)}
                >
                  Ver
                </Button>
                {isAdmin && (
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleEliminar(libro.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </Button>
                )}
                {canBuy && (
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => navigate(`/compras/nueva/:idUsuario/${libro.id}`)}
                    style={{ marginLeft: "10px" }}
                  >
                    Comprar
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
