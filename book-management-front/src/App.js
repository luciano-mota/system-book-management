import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Books from "./pages/Books";
import Authors from "./pages/Authors";
import Subjects from "./pages/Subjects";
import Report from "./pages/Report";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<h2>Book Manager</h2>} />
          <Route path="/books" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
