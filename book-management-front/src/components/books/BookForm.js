import React, { useState } from 'react'; // Importe useState para gerenciar o estado de erro

export default function BookForm({
  bookData,
  onSave,
  onChange,
  onRemoveAuthor,
  onRemoveSubject
}) {
  const [yearPublicationError, setYearPublicationError] = useState(''); // Novo estado para a mensagem de erro

  function handleSubmit(e) {
    e.preventDefault();
    // Verifica se há erros antes de salvar
    if (yearPublicationError) {
      alert("Por favor, corrija os erros de validação antes de salvar.");
      return;
    }
    onSave();
  }

  // Função de onChange customizada para o campo yearPublication
  function handleYearPublicationChange(e) {
    const { name, value } = e.target;

    // Remove caracteres não numéricos
    const numericValue = value.replace(/\D/g, '');

    // Validação: deve ter exatamente 4 dígitos
    if (numericValue.length > 0 && numericValue.length !== 4) {
      setYearPublicationError('O ano de publicação deve ter exatamente 4 dígitos.');
    } else {
      setYearPublicationError(''); // Limpa o erro se a validação passar
    }

    // Chama o onChange original do componente pai com o valor limpo
    onChange({ target: { name, value: numericValue } });
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
          <input
            type="text" // Alterado para text para permitir controle total da entrada
            name="yearPublication"
            value={bookData.yearPublication}
            onChange={handleYearPublicationChange} // Usando o novo handler
            className={`form-control ${yearPublicationError ? 'is-invalid' : ''}`} // Adiciona classe de erro
            maxLength="4" // Limita a entrada a 4 caracteres no HTML
          />
          {yearPublicationError && (
            <div className="invalid-feedback">
              {yearPublicationError}
            </div>
          )}
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