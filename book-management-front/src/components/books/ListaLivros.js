import React from 'react';

/**
 * Componente ListaLivros: Exibe uma tabela com a lista de livros.
 * Permite visualizar os detalhes de cada livro e oferece ações de edição e exclusão.
 *
 * @param {object} props - As propriedades do componente.
 * @param {Array<object>} props.livros - Um array de objetos de livro a serem exibidos.
 * @param {function} props.onEditar - Função de callback chamada ao clicar no botão "Editar".
 * @param {function} props.onExcluir - Função de callback chamada ao clicar no botão "Excluir".
 */
export default function ListaLivros({ livros, onEditar, onExcluir }) {
  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    <table className="table table-striped mt-4">
      {/* Cabeçalho da tabela com as colunas de informações do livro. */}
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
          <th>Ações</th> {/* Coluna para os botões de ação (Editar/Excluir). */}
        </tr>
      </thead>
      {/* Corpo da tabela, onde cada livro é renderizado como uma linha. */}
      <tbody>
        {/* Mapeia o array de 'livros' para criar uma linha (<tr>) para cada livro. */}
        {livros.map((livro) => (
          <tr key={livro.id}> {/* 'key' é importante para o React identificar cada item de forma única. */}
            <td>{livro.id}</td>
            <td>{livro.bookCode}</td>
            <td>{livro.title}</td>
            <td>{livro.publisher}</td>
            <td>{livro.yearPublication}</td>
            <td>{livro.price}</td>
            {/* Exibe os nomes dos autores, separados por vírgula. */}
            <td>{livro.authors.map(a => a.name).join(", ")}</td>
            {/* Exibe as descrições dos assuntos, separados por vírgula. */}
            <td>{livro.subjects.map(s => s.description).join(", ")}</td>
            <td>
              {/* Botão "Editar": chama a função onEditar passando o objeto do livro. */}
              <button className="btn btn-warning btn-sm me-2" onClick={() => onEditar(livro)}>Editar</button>
              {/* Botão "Excluir": chama a função onExcluir passando o ID do livro. */}
              <button className="btn btn-danger btn-sm" onClick={() => onExcluir(livro.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}