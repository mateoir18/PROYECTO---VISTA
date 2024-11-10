import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NuevoUsuario = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const role = "USER"; // Rol fijo
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Llamada a la API para agregar un nuevo usuario
        fetch('http://localhost:8080/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, rol: role }), // Incluye el rol en la petición
        })
            .then((res) => res.json())
            .then(() => {
                navigate('/usuarios'); // Redirige a la lista de usuarios después de guardar
            });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <TextField
                required
                id="username"
                label="Nombre de Usuario"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                required
                id="password"
                label="Contraseña"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                label="Rol"
                variant="outlined"
                value={role}
                InputProps={{
                    readOnly: true,
                }}
                disabled // Campo de solo lectura
            />
            <Button variant="contained" color="primary" type="submit" sx={{ m: 1 }}>
               Añadir usuario
            </Button>
        </Box>
    );
};
