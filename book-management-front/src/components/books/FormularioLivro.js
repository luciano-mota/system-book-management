import React, { useState } from 'react';

export default function FormularioLivro({
  dadosLivro,
  onSalvar,
  onMudar,
  onRemoverAutor,
  onRemoverAssunto
}) {
  const [erroAnoPublicacao, setErroAnoPublicacao] = useState('');

  function submeter(e) {
    e.preventDefault();
    if (erroAnoPublicacao) {
      alert("Por favor, corrija os erros de validação antes de salvar.");
      return;
    }
    onSalvar();
  }

  function manipularMudancaAnoPublicacao(e) {
    const { name, value } = e.target;
    const valorNumerico = value.replace(/\D/g, '');

    if (valorNumerico.length > 0 && valorNumerico.length !== 4) {
      setErroAnoPublicacao('O ano de publicação deve ter exatamente 4 dígitos.');
    } else {
      setErroAnoPublicacao('');
    }

    onMudar({ target: { name, value: valorNumerico } });
  }

  return (
    <form onSubmit={submeter}>
      <h5>Detalhes do Livro</h5>
      
      <div className="row">
        <div className="col-md-6 mb-2">
          <label>Título</label>
          <input type="text" name="title" value={dadosLivro.title} onChange={onMudar} className="form-control" required />
        </div>
        <div className="col-md-6 mb-2">
          <label>Código</label>
          <input type="number" name="bookCode" value={dadosLivro.bookCode} onChange={onMudar} className="form-control" required />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-2">
          <label>Editora</label>
          <input type="text" name="publisher" value={dadosLivro.publisher} onChange={onMudar} className="form-control" />
        </div>
        <div className="col-md-6 mb-2">
          <label>Edição</label>
          <input type="text" name="edition" value={dadosLivro.edition} onChange={onMudar} className="form-control" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-2">
          <label>Ano de Publicação</label>
          <input
            type="text"
            name="yearPublication"
            value={dadosLivro.yearPublication}
            onChange={manipularMudancaAnoPublicacao}
            className={`form-control ${erroAnoPublicacao ? 'is-invalid' : ''}`}
            maxLength="4"
          />
          {erroAnoPublicacao && (
            <div className="invalid-feedback">
              {erroAnoPublicacao}
            </div>
          )}
        </div>
        <div className="col-md-6 mb-2">
          <label>Preço</label>
          <input type="number" step="0.01" name="price" value={dadosLivro.price} onChange={onMudar} className="form-control" />
        </div>
      </div>

      <div className="mt-3">
        <h6>Autores Selecionados</h6>
        {dadosLivro.authors.length > 0 ? (
          <ul className="list-group">
            {dadosLivro.authors.map(autor => (
              <li key={autor.id} className="list-group-item d-flex justify-content-between align-items-center">
                {autor.name}
                <button type="button" className="btn btn-danger btn-sm" onClick={() => onRemoverAutor(autor.id)}>X</button>
              </li>
            ))}
          </ul>
        ) : <p>Nenhum autor adicionado.</p>}
      </div>

      <div className="mt-3">
        <h6>Assuntos Selecionados</h6>
        {dadosLivro.subjects.length > 0 ? (
          <ul className="list-group">
            {dadosLivro.subjects.map(assunto => (
              <li key={assunto.id} className="list-group-item d-flex justify-content-between align-items-center">
                {assunto.description}
                <button type="button" className="btn btn-danger btn-sm" onClick={() => onRemoverAssunto(assunto.id)}>X</button>
              </li>
            ))}
          </ul>
        ) : <p>Nenhum assunto adicionado.</p>}
      </div>

      <button type="submit" className="btn btn-success mt-4 w-100">
        {dadosLivro.id ? 'Atualizar Livro' : 'Salvar Livro'}
      </button>
    </form>
  );
}