import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../servicios/auth"; // Asegúrate de importar correctamente

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setToken } = useAuth(); // Usar correctamente setToken de useAuth
  const navigate = useNavigate();

  
  

  // Manejo de login exitoso
  const handleSuccessfulLogin = () => {
    navigate("/");
  };

  // Manejo del login
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({usuario:username, password:password}), // Usar el estado credentials
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }


      

      const data = await response.json();
      setToken(data.token); // Guardar el token en el contexto
      handleSuccessfulLogin(); // Redirigir al inicio
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Credenciales inválidas o error del servidor.");
    }
  };





  // Manejo del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};
