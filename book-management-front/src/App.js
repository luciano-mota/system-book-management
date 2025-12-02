import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Authors from "./pages/Authors";
import Subjects from "./pages/Subjects";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/subjects" element={<Subjects />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
