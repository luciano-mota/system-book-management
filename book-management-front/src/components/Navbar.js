import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Gerenciador de Livros</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/books">Livros</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/authors">Autores</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/subjects">Assuntos</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}