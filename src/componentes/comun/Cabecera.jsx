import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../servicios/auth";

export const Cabecera = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();
  const auth = useAuth();

  const token = auth.getToken();
  const userId = auth.getId();
  const userRole = auth.getRol();
  const { clearToken } = auth;

  const pages = [
    { name: "Autores", path: "/autores", roles: ["USER", "ADMIN"] },
    { name: "Libros", path: "/libros", roles: ["USER", "ADMIN"] },
    { name: "Biografías", path: "/biografias", roles: ["USER", "ADMIN"] },
    { name: "Usuarios", path: "/usuarios", roles: ["ADMIN"] },
    { name: "Compras", path: "/compras", roles: ["ADMIN"] },
    
    
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleCuenta = () => {
    if (userId) {
      navigate(`/usuarios/${userId}`);
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    clearToken(); // Acción existente
    navigate("/") // Nuevo evento o acción
};

  const handleRegistro = () => {
    navigate("/usuarios/add")
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={handleHome}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LIBRERIA
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(e) => setAnchorElNav(e.currentTarget)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages
                .filter(
                  (page) =>
                    page.roles.includes(userRole) ||
                    ["Autores", "Libros", "Biografías"].includes(page.name)
                )
                .map((page) => (
                  <MenuItem
                    key={page.name}
                    onClick={() => handleNavigate(page.path)}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {page.name}
                    </Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages
              .filter(
                (page) =>
                  page.roles.includes(userRole) ||
                  ["Autores", "Libros", "Biografías"].includes(page.name)
              )
              .map((page) => (
                <Button
                  key={page.name}
                  onClick={() => handleNavigate(page.path)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", gap: 2 }}>
            {!token && (
              <>
                <Tooltip title="Iniciar Sesión">
                  <Button onClick={handleLogin} sx={{ my: 2, color: "white" }}>
                    Iniciar Sesión
                  </Button>
                </Tooltip>

                <Tooltip title="Iniciar Sesión">
                  <Button onClick={handleRegistro} sx={{ my: 2, color: "white" }}>
                    Registrarse
                  </Button>
                </Tooltip>
              </>
            )}
            {token && (
              <>
                <Tooltip title="Cerrar Sesión">
                  <Button onClick={handleLogout} sx={{ my: 2, color: "white" }}>
                    Cerrar Sesión
                  </Button>
                </Tooltip>
                <Tooltip title="Mi Perfil">
                  <Button onClick={handleCuenta} sx={{ my: 2, color: "white" }}>
                    Mi Perfil
                  </Button>
                </Tooltip>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
