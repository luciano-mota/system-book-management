// Importação necessária do React.
import React from 'react';

// =====================================================================================
// 4. O COMPONENTE DE APRESENTAÇÃO: `BookForm.js`
// Este é um componente "burro" ou "controlado". Ele não tem estado próprio nem
// lógica de negócios. Sua única responsabilidade é exibir os dados que recebe
// e notificar seu componente pai (`BookModal`) sobre as interações do usuário.
// =====================================================================================

/**
 * Props recebidas do componente pai (`BookModal.js`):
 * @param {object} bookData - O objeto contendo TODOS os dados do livro a serem exibidos nos campos.
 * @param {function} onSave - Função a ser chamada quando o formulário for submetido.
 * @param {function} onChange - Função a ser chamada quando o valor de qualquer input de texto/número mudar.
 * @param {function} onRemoveAuthor - Função a ser chamada quando o botão "X" de um autor for clicado.
 * @param {function} onRemoveSubject - Função a ser chamada quando o botão "X" de um assunto for clicado.
 */
export default function BookForm({
  bookData,
  onSave,
  onChange,
  onRemoveAuthor,
  onRemoveSubject
}) {

  /**
   * Função chamada quando o formulário é submetido.
   * Apenas previne o comportamento padrão do navegador e chama a função `onSave` recebida do pai.
   */
  function handleSubmit(e) {
    e.preventDefault();
    onSave();
  }

  // --- RENDERIZAÇÃO DO COMPONENTE ---
  // Note que todos os `value` dos inputs vêm de `bookData` e todos os eventos (`onChange`, `onClick`)
  // chamam as funções recebidas via props. Isso o torna um componente totalmente controlado.
  return (
    <form onSubmit={handleSubmit}>
      <h5>Detalhes do Livro</h5>
      
      {/* Seção com os campos de detalhes do livro. */}
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

      {/* Seção para exibir os autores que foram selecionados. */}
      <div className="mt-3">
        <h6>Autores Selecionados</h6>
        {bookData.authors.length > 0 ? (
          <ul className="list-group">
            {bookData.authors.map(author => (
              <li key={author.id} className="list-group-item d-flex justify-content-between align-items-center">
                {author.name}
                {/* O botão "X" chama a função `onRemoveAuthor` do pai, passando o ID do autor a ser removido. */}
                <button type="button" className="btn btn-danger btn-sm" onClick={() => onRemoveAuthor(author.id)}>X</button>
              </li>
            ))}
          </ul>
        ) : <p>Nenhum autor adicionado.</p>}
      </div>

      {/* Seção para exibir os assuntos que foram selecionados. */}
      <div className="mt-3">
        <h6>Assuntos Selecionados</h6>
        {bookData.subjects.length > 0 ? (
          <ul className="list-group">
            {bookData.subjects.map(subject => (
              <li key={subject.id} className="list-group-item d-flex justify-content-between align-items-center">
                {subject.description}
                {/* O botão "X" chama a função `onRemoveSubject` do pai, passando o ID do assunto a ser removido. */}
                <button type="button" className="btn btn-danger btn-sm" onClick={() => onRemoveSubject(subject.id)}>X</button>
              </li>
            ))}
          </ul>
        ) : <p>Nenhum assunto adicionado.</p>}
      </div>

      {/* Botão de submissão do formulário. */}
      <button type="submit" className="btn btn-success mt-4 w-100">
        {/* O texto do botão muda dependendo se estamos editando (bookData.id existe) ou criando. */}
        {bookData.id ? 'Atualizar Livro' : 'Salvar Livro'}
      </button>
    </form>
  );
}