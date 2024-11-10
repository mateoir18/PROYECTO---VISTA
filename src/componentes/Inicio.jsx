import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../estilos/Inicio.css';

export const Inicio = () => {
    const [inicio, setInicio] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        // Llamada a la API al montar el componente
        fetch("http://localhost:8080/inicio")
          .then((res) => res.json())
          .then((result) => {
            setInicio(result); // Guardamos la respuesta de la API
          });
    }, []); // El array vacío asegura que se ejecute solo una vez

    const handleNavigation = (route) => {
        navigate(route);
    };

    return (
        <section className="contenedor-seccion">
            <div className='contenedor-categorias'>
                <div 
                    className='categoria-libros' 
                    onClick={() => handleNavigation('/libros')}
                >
                    <p>LIBROS</p>
                </div>
                <div 
                    className='categoria-autores' 
                    onClick={() => handleNavigation('/autores')}
                >
                    <p>AUTORES</p>
                </div>
                <div 
                    className='categoria-biografias' 
                    onClick={() => handleNavigation('/biografias')}
                >
                    <p>BIOGRAFÍAS</p>
                </div>
                <div className='categoria-ventas'>
                    <p>LIBROS MÁS VENDIDOS</p>
                </div>
            </div>
        </section>
    );
};
