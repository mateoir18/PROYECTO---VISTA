import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Cabecera} from "./componentes/Cabecera";
import { Autores } from "./componentes/Autores";
import { Libros } from "./componentes/Libros";
import { Usuarios } from "./componentes/Usuarios";
import { Compras } from "./componentes/Compras";
import { Biografias } from "./componentes/Biografias";
import { Inicio } from "./componentes/Inicio";
import { Libro } from "./componentes/Libro";
import { FormLibro } from "./componentes/FormLibro";




function App() {
  return (
    <>
      <BrowserRouter>
     <Cabecera></Cabecera>
        <Routes>
          <Route path="/" element={<Inicio/>}></Route>
          <Route path="/autores" element={<Autores/>}></Route>
          <Route path="/libros" element={<Libros/>}></Route>
          <Route path="/biografias" element={<Biografias/>}></Route>
          <Route path="/compras" element={<Compras/>}></Route>
          <Route path="/usuarios" element={<Usuarios/>}></Route>
          <Route path="/libro/:id" element={<Libro/>}></Route>
          <Route path="/libro/edit/:id" element={<FormLibro/>}></Route>


        </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
