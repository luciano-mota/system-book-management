import React from 'react';

export default function BookList({ books, onEdit, onDelete }) {
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
        {books.map((b) => (
          <tr key={b.id}>
            <td>{b.id}</td>
            <td>{b.bookCode}</td>
            <td>{b.title}</td>
            <td>{b.publisher}</td>
            <td>{b.yearPublication}</td>
            <td>{b.price}</td>
            <td>{b.authors.map(a => a.name).join(", ")}</td>
            <td>{b.subjects.map(s => s.name).join(", ")}</td>
            <td>
              <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(b)}>Editar</button>
              <button className="btn btn-danger btn-sm" onClick={() => onDelete(b.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}