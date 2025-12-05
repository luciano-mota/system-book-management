import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Livros from "./pages/Livros";
import Autores from "./pages/Autores";
import Assuntos from "./pages/Assuntos";
import RelatorioLivros from "./pages/RelatorioLivros";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/livros" element={<Livros />} />
          <Route path="/autores" element={<Autores />} />
          <Route path="/assuntos" element={<Assuntos />} />
          <Route path="/relatorios" element={<RelatorioLivros />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;