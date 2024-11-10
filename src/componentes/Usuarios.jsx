import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/usuarios")
      .then((res) => res.json())
      .then((result) => {
        setUsuarios(result);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/usuarios/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
        }
      })
      .catch((error) => console.error("Error al eliminar usuario:", error));
  };

  const handleView = (id) => {
    navigate(`/usuarios/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Button onClick={() => navigate("/usuarios/add")}>Registrarse</Button>
      <Table sx={{ minWidth: 650 }} aria-label="Usuarios table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow key={usuario.id}>
              <TableCell>{usuario.id}</TableCell>
              <TableCell>{usuario.username}</TableCell>
              <TableCell>{usuario.password}</TableCell>
              <TableCell>{usuario.rol}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleView(usuario.id)}
                  size="small"
                  sx={{ marginRight: 1 }}
                >
                  Ver
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(usuario.id)}
                  size="small"
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
