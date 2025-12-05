import React from 'react';

export default function ListaLivros({ livros, onEditar, onExcluir }) {
  return (
    <table className="table table-striped mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Código</th>
          <th>Título</th>
          <th>Editora</th>
          <th>Ano</th>
          <th>Preço</th>
          <th>Autores</th>
          <th>Assuntos</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {livros.map((livro) => (
          <tr key={livro.id}>
            <td>{livro.id}</td>
            <td>{livro.bookCode}</td>
            <td>{livro.title}</td>
            <td>{livro.publisher}</td>
            <td>{livro.yearPublication}</td>
            <td>{livro.price}</td>
            <td>{livro.autores.map(a => a.nome).join(", ")}</td>
            <td>{livro.assuntos.map(s => s.descricao).join(", ")}</td>
            <td>
              <button className="btn btn-warning btn-sm me-2" onClick={() => onEditar(livro)}>Editar</button>
              <button className="btn btn-danger btn-sm" onClick={() => onExcluir(livro.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}