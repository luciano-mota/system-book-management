import { NavLink } from "react-router-dom"; // Importa o componente NavLink para navegação.

/**
 * Componente Navbar: Barra de navegação principal da aplicação.
 * Contém links para as diferentes seções do sistema.
 */
export default function Navbar() {
  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        {/* Link da marca/logo que leva para a página inicial. */}
        <NavLink className="navbar-brand" to="/">Gerenciador de Livros</NavLink>
        
        {/* Botão para alternar o menu de navegação em telas menores (mobile). */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Conteúdo do menu de navegação. */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto"> {/* 'ms-auto' alinha os itens à direita. */}
            {/* Item de navegação para a página de Livros. */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/livros">Livros</NavLink>
            </li>
            {/* Item de navegação para a página de Autores. */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/autores">Autores</NavLink>
            </li>
            {/* Item de navegação para a página de Assuntos. */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/assuntos">Assuntos</NavLink>
            </li>
            {/* Item de navegação para a página de Relatórios. */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/relatorios">Relatórios</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}