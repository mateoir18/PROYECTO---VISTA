import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Cabecera} from "./componentes/Cabecera";
import { Autores } from "./componentes/Autores";
import { Autor } from "./componentes/Autor";
import { FormAutor } from "./componentes/FormAutor"
import { NuevoAutor } from "./componentes/NuevoAutor"
import { Libros } from "./componentes/Libros";
import { Libro } from "./componentes/Libro";
import { FormLibro } from "./componentes/FormLibro";
import { NuevoLibro } from "./componentes/NuevoLibro";
import { Usuarios } from "./componentes/Usuarios";
import { Usuario } from "./componentes/Usuario";
import { FormUsuario } from "./componentes/FormUsuario";
import { NuevoUsuario } from "./componentes/NuevoUsuario";
import { Compras } from "./componentes/Compras";
import { Compra } from "./componentes/Compra";
import { NuevaCompra } from "./componentes/NuevaCompra";
import { Biografias } from "./componentes/Biografias";
import { Biografia } from "./componentes/Biografia";
import { FormBiografia } from "./componentes/FormBiografia";
import { NuevaBiografia } from "./componentes/NuevaBiografia";
import { Inicio } from "./componentes/Inicio";





function App() {
  return (
    <>
      <BrowserRouter>
     <Cabecera></Cabecera>
        <Routes>
          <Route path="/" element={<Inicio/>}></Route>
          <Route path="/autores" element={<Autores/>}></Route>
          <Route path="/autores/:id" element={<Autor/>}></Route>
          <Route path="/autores/edit/:id" element={<FormAutor/>}></Route>
          <Route path="/autores/add" element={<NuevoAutor/>}></Route>
          <Route path="/libros" element={<Libros/>}></Route>
          <Route path="/libros/:id" element={<Libro/>}></Route>
          <Route path="/libros/edit/:id" element={<FormLibro/>}></Route>
          <Route path="/libros/add" element={<NuevoLibro/>}></Route>
          <Route path="/biografias" element={<Biografias/>}></Route>
          <Route path="/biografias/:id" element={<Biografia/>}></Route>
          <Route path="/biografias/edit/:id" element={<FormBiografia/>}></Route>
          <Route path="/biografias/add" element={<NuevaBiografia/>}></Route>
          <Route path="/compras" element={<Compras/>}></Route>
          <Route path="/compras/:idUsuario/:idLibro" element={<Compra />} />
          <Route path="/compras/nueva/:idUsuario/:idLibro" element={<NuevaCompra />} />
          <Route path="/usuarios" element={<Usuarios/>}></Route>
          <Route path="/usuarios/:id" element={<Usuario/>}></Route>
          <Route path="/usuarios/edit/:id" element={<FormUsuario/>}></Route>
          <Route path="/usuarios/add" element={<NuevoUsuario/>}></Route>
          


        </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
