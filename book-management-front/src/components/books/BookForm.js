import React from 'react';

export default function BookForm({
  bookData,
  onSave,
  onChange,
  onRemoveAuthor,
  onRemoveSubject
}) {

  function handleSubmit(e) {
    e.preventDefault();
    onSave();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h5>Detalhes do Livro</h5>
      
      {/* Campos do formulário */}
      <div className="row">
        <div className="col-md-6 mb-2">
          <label>Título</label>
          <input type="text" name="title" value={bookData.title} onChange={onChange} className="form-control" required />
        </div>
        <div className="col-md-6 mb-2">
          <label>Código</label>
          <input type="number" name="bookCode" value={bookData.bookCode} onChange={onChange} className="form-control" required />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-2">
          <label>Editora</label>
          <input type="text" name="publisher" value={bookData.publisher} onChange={onChange} className="form-control" />
        </div>
        <div className="col-md-6 mb-2">
          <label>Edição</label>
          <input type="text" name="edition" value={bookData.edition} onChange={onChange} className="form-control" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-2">
          <label>Ano de Publicação</label>
          <input type="number" name="yearPublication" value={bookData.yearPublication} onChange={onChange} className="form-control" />
        </div>
        <div className="col-md-6 mb-2">
          <label>Preço</label>
          <input type="number" step="0.01" name="price" value={bookData.price} onChange={onChange} className="form-control" />
        </div>
      </div>

      {/* Autores Selecionados */}
      <div className="mt-3">
        <h6>Autores Selecionados</h6>
        {bookData.authors.length > 0 ? (
          <ul className="list-group">
            {bookData.authors.map(author => (
              <li key={author.id} className="list-group-item d-flex justify-content-between align-items-center">
                {author.name}
                <button type="button" className="btn btn-danger btn-sm" onClick={() => onRemoveAuthor(author.id)}>X</button>
              </li>
            ))}
          </ul>
        ) : <p>Nenhum autor adicionado.</p>}
      </div>

      {/* Assuntos Selecionados */}
      <div className="mt-3">
        <h6>Assuntos Selecionados</h6>
        {bookData.subjects.length > 0 ? (
          <ul className="list-group">
            {bookData.subjects.map(subject => (
              <li key={subject.id} className="list-group-item d-flex justify-content-between align-items-center">
                {subject.description}
                <button type="button" className="btn btn-danger btn-sm" onClick={() => onRemoveSubject(subject.id)}>X</button>
              </li>
            ))}
          </ul>
        ) : <p>Nenhum assunto adicionado.</p>}
      </div>

      <button type="submit" className="btn btn-success mt-4 w-100">
        {bookData.id ? 'Atualizar Livro' : 'Salvar Livro'}
      </button>
    </form>
  );
}