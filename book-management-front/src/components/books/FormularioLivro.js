import React, { useState } from 'react';

/**
 * Componente FormularioLivro: Exibe o formulário principal para edição dos detalhes de um livro.
 * Inclui campos para título, código, editora, edição, ano de publicação e preço,
 * além de exibir os autores e assuntos selecionados.
 *
 * @param {object} props - As propriedades do componente.
 * @param {object} props.dadosLivro - Objeto contendo os dados atuais do livro.
 * @param {function} props.onSalvar - Função de callback para salvar o livro.
 * @param {function} props.onMudar - Função de callback para lidar com a mudança dos campos de input.
 * @param {function} props.onRemoverAutor - Função de callback para remover um autor da lista.
 * @param {function} props.onRemoverAssunto - Função de callback para remover um assunto da lista.
 */
export default function FormularioLivro({
  dadosLivro,
  onSalvar,
  onMudar,
  onRemoverAutor,
  onRemoverAssunto
}) {
  // erroAnoPublicacao: Estado para armazenar mensagens de erro de validação do campo "Ano de Publicação".
  const [erroAnoPublicacao, setErroAnoPublicacao] = useState('');

  /**
   * submeter: Função chamada na submissão do formulário.
   * Previne o comportamento padrão e verifica se há erros de validação antes de salvar.
   * @param {object} e - Evento de submissão do formulário.
   */
  function submeter(e) {
    e.preventDefault(); // Previne o recarregamento da página.
    // Se houver erro no ano de publicação, alerta o usuário e impede o salvamento.
    if (erroAnoPublicacao) {
      alert("Por favor, corrija os erros de validação antes de salvar.");
      return;
    }
    onSalvar(); // Chama a função de salvar passada via props.
  }

  /**
   * manipularMudancaAnoPublicacao: Lida com a mudança no campo "Ano de Publicação".
   * Realiza validação para garantir que o ano tenha exatamente 4 dígitos numéricos.
   * @param {object} e - Evento de mudança do input.
   */
  function manipularMudancaAnoPublicacao(e) {
    const { name, value } = e.target;
    // Remove caracteres não numéricos do valor.
    const valorNumerico = value.replace(/\D/g, '');

    // Validação: Verifica se o valor numérico tem exatamente 4 dígitos.
    if (valorNumerico.length > 0 && valorNumerico.length !== 4) {
      setErroAnoPublicacao('O ano de publicação deve ter exatamente 4 dígitos.');
    } else {
      setErroAnoPublicacao(''); // Limpa a mensagem de erro se a validação passar.
    }

    // Chama a função 'onMudar' do componente pai com o valor limpo e validado.
    onMudar({ target: { name, value: valorNumerico } });
  }

  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    <form onSubmit={submeter}>
      <h5>Detalhes do Livro</h5>
      
      {/* Campos de Título e Código */}
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

      {/* Campos de Editora e Edição */}
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

      {/* Campos de Ano de Publicação e Preço */}
      <div className="row">
        <div className="col-md-6 mb-2">
          <label>Ano de Publicação</label>
          <input
            type="text" // Usado 'text' para ter controle total sobre a entrada e validação.
            name="yearPublication"
            value={dadosLivro.yearPublication}
            onChange={manipularMudancaAnoPublicacao} // Usa o handler customizado para validação.
            className={`form-control ${erroAnoPublicacao ? 'is-invalid' : ''}`} // Adiciona classe de erro se houver.
            maxLength="4" // Limita a entrada a 4 caracteres no HTML.
          />
          {/* Exibe a mensagem de erro de validação, se houver. */}
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

      {/* Seção de Autores Selecionados */}
      <div className="mt-3">
        <h6>Autores Selecionados</h6>
        {dadosLivro.authors.length > 0 ? (
          <ul className="list-group">
            {dadosLivro.authors.map(autor => (
              <li key={autor.id} className="list-group-item d-flex justify-content-between align-items-center">
                {autor.name}
                {/* Botão para remover o autor da lista. */}
                <button type="button" className="btn btn-danger btn-sm" onClick={() => onRemoverAutor(autor.id)}>X</button>
              </li>
            ))}
          </ul>
        ) : <p>Nenhum autor adicionado.</p>}
      </div>

      {/* Seção de Assuntos Selecionados */}
      <div className="mt-3">
        <h6>Assuntos Selecionados</h6>
        {dadosLivro.subjects.length > 0 ? (
          <ul className="list-group">
            {dadosLivro.subjects.map(assunto => (
              <li key={assunto.id} className="list-group-item d-flex justify-content-between align-items-center">
                {assunto.description}
                {/* Botão para remover o assunto da lista. */}
                <button type="button" className="btn btn-danger btn-sm" onClick={() => onRemoverAssunto(assunto.id)}>X</button>
              </li>
            ))}
          </ul>
        ) : <p>Nenhum assunto adicionado.</p>}
      </div>

      {/* Botão de Salvar/Atualizar Livro */}
      <button type="submit" className="btn btn-success mt-4 w-100">
        {dadosLivro.id ? 'Atualizar Livro' : 'Salvar Livro'} {/* Texto muda conforme é edição ou novo cadastro. */}
      </button>
    </form>
  );
}