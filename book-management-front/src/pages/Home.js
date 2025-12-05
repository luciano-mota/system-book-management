import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container py-5">
      <div className="p-5 text-center bg-light rounded-3">
        <h1 className="display-4">Bem-vindo ao Sistema de Gerenciamento de Livros</h1>
        <p className="lead">
          Este sistema permite que você gerencie sua coleção de livros, autores e assuntos de forma simples e eficiente.
        </p>
        <hr className="my-4" />
        <p>Comece agora mesmo a organizar seus livros.</p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link className="btn btn-primary btn-lg" to="/livros">Ver Livros</Link>
          <Link className="btn btn-outline-secondary btn-lg" to="/autores">Ver Autores</Link>
        </div>
      </div>
    </div>
  );
}