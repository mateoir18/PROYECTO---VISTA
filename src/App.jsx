import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Cabecera } from "./componentes/comun/Cabecera";
import { Autores } from "./componentes/autor/Autores";
import { Autor } from "./componentes/autor/Autor";
import { FormAutor } from "./componentes/autor/FormAutor";
import { NuevoAutor } from "./componentes/autor/NuevoAutor";
import { Libros } from "./componentes/libro/Libros";
import { Libro } from "./componentes/libro/Libro";
import { FormLibro } from "./componentes/libro/FormLibro";
import { NuevoLibro } from "./componentes/libro/NuevoLibro";
import { Usuarios } from "./componentes/usuario/Usuarios";
import { Usuario } from "./componentes/usuario/Usuario";
import { FormUsuario } from "./componentes/usuario/FormUsuario";
import { NuevoUsuario } from "./componentes/usuario/NuevoUsuario";
import { Compras } from "./componentes/compra/Compras";
import { Compra } from "./componentes/compra/Compra";
import { NuevaCompra } from "./componentes/compra/NuevaCompra";
import { Biografias } from "./componentes/biografia/Biografias";
import { Biografia } from "./componentes/biografia/Biografia";
import { FormBiografia } from "./componentes/biografia/FormBiografia";
import { NuevaBiografia } from "./componentes/biografia/NuevaBiografia";
import { Inicio } from "./componentes/comun/Inicio";
import { Login } from "./componentes/servicios/Login";
import { MasVendidos } from "./componentes/estadisticas/MasVendidos";


function App() {
  return (
    <>
      <BrowserRouter>
        <Cabecera></Cabecera>
        <Routes>
          <Route path="/" element={<Inicio />}></Route>
          <Route path="/autores" element={<Autores />}></Route>
          <Route path="/autores/:id" element={<Autor />}></Route>
          <Route path="/autores/edit/:id" element={<FormAutor />}></Route>
          <Route path="/autores/add" element={<NuevoAutor />}></Route>
          <Route path="/libros" element={<Libros />}></Route>
          <Route path="/libros/:id" element={<Libro />}></Route>
          <Route path="/libros/edit/:id" element={<FormLibro />}></Route>
          <Route path="/libros/add" element={<NuevoLibro />}></Route>
          <Route path="/libros/masvendidos" element={<MasVendidos />}></Route>
          <Route path="/biografias" element={<Biografias />}></Route>
          <Route path="/biografias/:id" element={<Biografia />}></Route>
          <Route
            path="/biografias/edit/:id"
            element={<FormBiografia />}
          ></Route>
          <Route path="/biografias/add" element={<NuevaBiografia />}></Route>
          <Route path="/compras" element={<Compras />}></Route>
          <Route path="/compras/:idUsuario/:idLibro" element={<Compra />} />
          <Route
            path="/compras/nueva/:idUsuario/:idLibro"
            element={<NuevaCompra />}
          />
          <Route path="/usuarios" element={<Usuarios />}></Route>
          <Route path="/usuarios/:id" element={<Usuario />}></Route>
          <Route path="/usuarios/edit/:id" element={<FormUsuario />}></Route>
          <Route path="/usuarios/add" element={<NuevoUsuario />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
