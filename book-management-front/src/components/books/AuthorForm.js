// Importações necessárias do React, axios e o hook customizado `useDebounce`.
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useDebounce from '../../hooks/useDebounce';

// =====================================================================================
// 3. COMPONENTE DE BUSCA E SELEÇÃO: `AuthorForm.js` (e `SubjectForm.js`)
// Este é um componente focado e reutilizável. Sua única responsabilidade é
// permitir ao usuário buscar, selecionar ou criar um autor.
// Ele não sabe nada sobre o resto da aplicação (livros, modal, etc.).
// =====================================================================================

const API_AUTHORS = "http://localhost:8080/api/v1/authors";

/**
 * Props recebidas do componente pai (`BookModal.js`):
 * @param {function} onAuthorSelected - Função de callback que será chamada quando um autor
 *                                      for selecionado ou criado. O componente envia o objeto
 *                                      do autor de volta para o pai.
 */
export default function AuthorForm({ onAuthorSelected }) {
  // --- ESTADOS DO COMPONENTE ---
  // `authorName`: Armazena o texto que o usuário digita no campo de input.
  const [authorName, setAuthorName] = useState('');
  // `searchResults`: Armazena a lista de autores retornada pela API de busca.
  const [searchResults, setSearchResults] = useState([]);

  // `useDebounce` é um hook customizado que ajuda a evitar chamadas excessivas à API.
  // Ele espera um tempo (300ms) após o usuário parar de digitar para atualizar o `debouncedSearchTerm`.
  const debouncedSearchTerm = useDebounce(authorName, 300);

  // --- FUNÇÕES DE LÓGICA E DADOS ---

  /**
   * Função que efetivamente busca os autores na API.
   * É chamada pelo `useEffect` sempre que o `debouncedSearchTerm` muda.
   */
  const searchAuthors = useCallback(async (name) => {
    // Só faz a busca se o usuário digitou pelo menos 2 caracteres.
    if (name.trim().length < 2) {
      setSearchResults([]); // Limpa os resultados se o campo estiver quase vazio.
      return;
    }
    try {
      // Faz a chamada GET para a API, passando o termo de busca como um query param.
      const response = await axios.get(API_AUTHORS, { params: { name } });
      setSearchResults(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar autores:", error);
    }
  }, []);

  // `useEffect` que observa mudanças no `debouncedSearchTerm`.
  // Quando o termo muda, a função `searchAuthors` é chamada.
  useEffect(() => {
    searchAuthors(debouncedSearchTerm);
  }, [debouncedSearchTerm, searchAuthors]);

  /**
   * Chamada quando o usuário clica em um autor na lista de resultados.
   * @param {object} author - O objeto do autor clicado.
   */
  function handleSelectAuthor(author) {
    setAuthorName(author.name); // Preenche o input com o nome do autor selecionado.
    setSearchResults([]);       // Esconde a lista de resultados.
    onAuthorSelected(author);   // **PONTO CHAVE**: Notifica o componente pai (`BookModal`) enviando o autor selecionado.
  }

  /**
   * Chamada quando o formulário é submetido (usuário clica em "Salvar Autor").
   * A lógica decide se deve selecionar um autor existente ou criar um novo.
   */
  async function handleCreateAuthor(e) {
    e.preventDefault();
    if (!authorName.trim()) return;

    // Verifica se o nome digitado corresponde exatamente a um autor na lista de resultados.
    const existingAuthor = searchResults.find(author => author.name.toLowerCase() === authorName.trim().toLowerCase());
    if (existingAuthor) {
      // Se sim, trata como uma seleção normal.
      handleSelectAuthor(existingAuthor);
      return;
    }

    // Se não, cria um novo autor.
    try {
      const response = await axios.post(API_AUTHORS, { name: authorName });
      onAuthorSelected(response.data.data); // Notifica o pai com os dados do NOVO autor.
      setAuthorName(''); // Limpa o campo de input.
    } catch (error) {
      console.error("Erro ao criar autor:", error);
      alert("Não foi possível criar o autor. Tente novamente.");
    }
  }

  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    // O `onSubmit` chama a função que decide entre criar ou selecionar.
    <form onSubmit={handleCreateAuthor}>
      <div className="mb-3 position-relative">
        <label htmlFor="authorName" className="form-label">Nome do Autor</label>
        <input
          type="text"
          className="form-control"
          id="authorName"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Pesquise ou cadastre um novo autor"
          autoComplete="off" // Impede o preenchimento automático do navegador.
          required
        />
        {/* A lista de resultados só é exibida se houver resultados. */}
        {searchResults.length > 0 && (
          <ul className="list-group position-absolute w-100" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto', top: '100%' }}>
            {searchResults.map(author => (
              <li
                key={author.id}
                className="list-group-item list-group-item-action"
                onClick={() => handleSelectAuthor(author)} // Clicar aqui seleciona o autor.
                style={{ cursor: 'pointer' }}
              >
                {author.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit" className="btn btn-primary">Salvar Autor</button>
    </form>
  );
}