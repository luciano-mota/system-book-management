// Importações necessárias do React e da biblioteca axios para chamadas HTTP.
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

// Componentes filhos que serão usados nesta página.
import BookList from "../components/books/BookList"; // Componente para exibir a lista de livros.
import BookModal from "../components/books/BookModal"; // Componente para o modal de cadastro/edição de livros.

// =====================================================================================
// 1. PONTO DE PARTIDA: PÁGINA PRINCIPAL DE LIVROS (`Books.js`)
// Este é o componente "pai" que gerencia o estado principal da página de livros.
// =====================================================================================

// Endereços das APIs que serão consumidas.
const API = "http://localhost:8080/api/v1/books";
const AUTHORS_API = "http://localhost:8080/api/v1/authors";
const SUBJECTS_API = "http://localhost:8080/api/v1/subjects";

export default function Books() {
  // --- ESTADOS DO COMPONENTE ---
  // `books`: Armazena a lista de livros que será exibida na tela.
  const [books, setBooks] = useState([]);
  // `showModal`: Controla a visibilidade do modal de cadastro/edição.
  const [showModal, setShowModal] = useState(false);
  // `editingBook`: Armazena os dados do livro que está sendo editado. Se for `null`, significa que estamos criando um novo livro.
  const [editingBook, setEditingBook] = useState(null);
  // `searchTerm`: Armazena o texto digitado no campo de busca de livros.
  const [searchTerm, setSearchTerm] = useState("");

  // --- FUNÇÕES DE LÓGICA E DADOS ---

  /**
   * Função para carregar os dados essenciais da página.
   * 1. Busca a lista de livros (filtrada pelo `searchTerm`, se houver).
   * 2. Busca a lista COMPLETA de autores e assuntos para "enriquecer" os dados dos livros.
   *    A API de livros retorna apenas os IDs dos autores/assuntos, então precisamos buscar os nomes/descrições separadamente.
   * 3. Cria "mapas" (Map) para facilitar a busca de nomes de autores e descrições de assuntos a partir de seus IDs.
   * 4. "Enriquece" cada livro, substituindo os arrays de IDs por arrays de objetos (ex: `{ id: 1, name: 'Autor Famoso' }`).
   * 5. Atualiza o estado `books` com os dados enriquecidos, o que faz a `BookList` re-renderizar.
   */
  const loadBooks = useCallback(async () => {
    try {
      // Dispara todas as requisições em paralelo para otimizar o tempo de carregamento.
      const [booksResponse, authorsResponse, subjectsResponse] = await Promise.all([
        axios.get(API, { params: { name: searchTerm } }),
        axios.get(AUTHORS_API, { params: { name: '' } }), // Busca todos os autores.
        axios.get(SUBJECTS_API, { params: { name: '' } })  // Busca todos os assuntos.
      ]);

      // Cria mapas para consulta rápida: ID -> Nome/Descrição.
      const authorsMap = new Map(authorsResponse.data.data.map(a => [a.id, a.name]));
      const subjectsMap = new Map(subjectsResponse.data.data.map(s => [s.id, s.description]));

      // Mapeia a lista de livros para adicionar os nomes dos autores e descrições dos assuntos.
      const enrichedBooks = booksResponse.data.data.map(book => ({
        ...book,
        authors: book.authors.map(authorId => ({ id: authorId, name: authorsMap.get(authorId) || "Autor desconhecido" })),
        subjects: book.subjects.map(subjectId => ({
          id: subjectId,
          description: subjectsMap.get(subjectId) || "Assunto desconhecido"
        }))
      }));

      setBooks(enrichedBooks);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }, [searchTerm]); // A função é recriada se `searchTerm` mudar.

  // `useEffect` para chamar `loadBooks` quando o componente é montado pela primeira vez
  // ou quando a função `loadBooks` (e consequentemente o `searchTerm`) muda.
  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  /**
   * Função chamada quando o botão "Editar" na `BookList` é clicado.
   * Define o livro a ser editado e abre o modal.
   * @param {object} book - O objeto do livro clicado.
   */
  function handleEdit(book) {
    setEditingBook(book);
    setShowModal(true);
  }

  /**
   * Função chamada quando o botão "Excluir" na `BookList` é clicado.
   * @param {number} id - O ID do livro a ser excluído.
   */
  async function handleDelete(id) {
    if (window.confirm("Confirmar exclusão?")) {
      await axios.delete(`${API}/${id}`);
      loadBooks(); // Recarrega a lista de livros após a exclusão.
    }
  }

  /**
   * Função final para salvar (criar ou atualizar) um livro.
   * É passada para o `BookModal`, que a chama quando o usuário finaliza o formulário.
   * @param {object} bookData - Os dados completos do livro vindos do modal.
   */
  async function handleSave(bookData) {
    // Prepara o `payload` para a API, convertendo os arrays de objetos de autores/assuntos
    // de volta para arrays de IDs, que é o formato que a API espera.
    const payload = {
      ...bookData,
      bookCode: parseInt(bookData.bookCode),
      authorsIds: bookData.authors.map(a => a.id),
      subjectsIds: bookData.subjects.map(s => s.id),
    };
    // Remove as chaves `authors` e `subjects` para não enviar dados desnecessários para a API.
    delete payload.authors;
    delete payload.subjects;

    // Decide se a requisição será um PUT (atualização) ou POST (criação).
    if (editingBook) {
      await axios.put(`${API}/${editingBook.id}`, payload);
    } else {
      await axios.post(API, payload);
    }

    // Fecha o modal, limpa o estado de edição e recarrega a lista de livros.
    setShowModal(false);
    setEditingBook(null);
    loadBooks();
  }

  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    <div className="container mt-4">
      <h2>Gerenciador de Livros</h2>

      {/* Botão para abrir o modal em modo de criação.
          `setEditingBook(null)` garante que o modal abra limpo. */}
      <button className="btn btn-primary mb-3" onClick={() => { setEditingBook(null); setShowModal(true); }}>
        Cadastrar Livro
      </button>

      {/* Campo de busca de livros. Alterar seu valor dispara a recarga da lista. */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisar por nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Componente que renderiza a tabela de livros.
          - `books`: A lista de livros a ser exibida.
          - `onEdit`: A função a ser chamada quando o botão "Editar" é clicado.
          - `onDelete`: A função a ser chamada quando o botão "Excluir" é clicado. */}
      <BookList books={books} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Componente do modal.
          - `show`: Controla se o modal está visível.
          - `onHide`: Função para fechar o modal.
          - `onSave`: Função a ser chamada para salvar os dados do formulário.
          - `existingBook`: Os dados do livro a ser editado, ou `null` se for um novo livro. */}
      <BookModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSave}
        existingBook={editingBook}
      />
    </div>
  );
}