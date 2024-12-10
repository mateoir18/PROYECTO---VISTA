import { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, FormControl, InputLabel, } from '@mui/material';
import { useAuth } from "../servicios/auth";
import { useNavigate } from "react-router-dom";

export const NuevoLibro = () => {
    const [titulo, setTitulo] = useState('');
    const [precio, setPrecio] = useState('');
    const [autor, setAutor] = useState('');
    const [autores, setAutores] = useState([]);
    const [error, setError] = useState(null);
    const token = useAuth().getToken();
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
    

    // Obtener lista de autores al cargar el componente
    useEffect(() => {
        const fetchAutores = async () => {
            try {
                const response = await fetch('http://localhost:8080/autores');
                if (!response.ok) {
                    throw new Error('Error al obtener la lista de autores');
                }
                const data = await response.json();
                setAutores(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchAutores();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevoLibro = { titulo, precio, autor: { id: autor } };

        try {
            const response = await fetch('http://localhost:8080/libros/add', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + token,
                },
                credentials: 'include',
                body: JSON.stringify(nuevoLibro),
              });
              

            if (!response.ok) {
                throw new Error('Error al agregar el libro');
            }

            // Limpiar campos después de enviar
            setTitulo('');
            setPrecio('');
            setAutor('');
            alert('Libro agregado correctamente');
        } catch (error) {
            setError(error.message);
        }
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
                    id="titulo"
                    label="Título"
                    variant="outlined"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <TextField
                    required
                    id="precio"
                    label="Precio"
                    variant="outlined"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />
                <FormControl sx={{ m: 1, width: '25ch' }}>
                    <InputLabel id="autor-label">Autor</InputLabel>
                    <Select
                        labelId="autor-label"
                        id="autor"
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                        label="Autor"
                        required
                    >
                        {autores.map((autor) => (
                            <MenuItem key={autor.id} value={autor.id}>
                                {autor.nombre} {autor.apellido}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            
            <Button variant="contained" color="primary" type="submit" sx={{ m: 1 }}>
                Agregar Libro
            </Button>
        </Box>
    );
};
