import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button } from '@mui/material';

export const FormUsuario = () => {
    const { id } = useParams(); // Obtener el ID de la URL
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Llamada a la API para obtener los datos del usuario
        fetch(`http://localhost:8080/usuarios/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setUsername(data.username);
                setPassword(data.password);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Llamada a la API para actualizar el usuario
        fetch(`http://localhost:8080/usuarios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then((res) => res.json())
            .then(() => {
                navigate(`/usuarios/${id}`); // Redirige a la vista del usuario después de guardar
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
            <Button variant="contained" color="primary" type="submit" sx={{ m: 1 }}>
                Guardar Cambios
            </Button>
        </Box>
    );
};
