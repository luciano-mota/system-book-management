import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import BookList from "../components/books/BookList";
import BookModal from "../components/books/BookModal";

const API = "http://localhost:8080/api/v1/books";
const AUTHORS_API = "http://localhost:8080/api/v1/authors";
const SUBJECTS_API = "http://localhost:8080/api/v1/subjects";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadBooks = useCallback(async () => {
    const [booksResponse, authorsResponse, subjectsResponse] = await Promise.all([
      axios.get(API, { params: { name: searchTerm } }),
      axios.get(AUTHORS_API),
      axios.get(SUBJECTS_API)
    ]);

    const authorsMap = new Map(authorsResponse.data.data.map(a => [a.id, a.name]));
    const subjectsMap = new Map(subjectsResponse.data.data.map(s => [s.id, s.description]));

    const enrichedBooks = booksResponse.data.data.map(book => ({
      ...book,
      authors: book.authors.map(authorId => ({ id: authorId, name: authorsMap.get(authorId) || "Autor desconhecido" })),
      subjects: book.subjects.map(subjectId => ({ id: subjectId, name: subjectsMap.get(subjectId) || "Assunto desconhecido" }))
    }));

    setBooks(enrichedBooks);
  }, [searchTerm]);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  function handleEdit(book) {
    setEditingBook(book);
    setShowModal(true);
  }

  async function handleDelete(id) {
    if (window.confirm("Confirmar exclusão?")) {
      await axios.delete(`${API}/${id}`);
      loadBooks();
    }
  }

  async function handleSave(bookData) {
    const payload = {
      ...bookData,
      bookCode: parseInt(bookData.bookCode),
      authors: bookData.authors.map(a => a.id),
      subjects: bookData.subjects.map(s => s.id),
    };

    if (editingBook) {
      await axios.put(`${API}/${editingBook.id}`, payload);
    } else {
      await axios.post(API, payload);
    }

    setShowModal(false);
    setEditingBook(null);
    loadBooks();
  }

  return (
    <div className="container mt-4">
      <h2>Gerenciador de Livros</h2>
      <button className="btn btn-primary mb-3" onClick={() => { setEditingBook(null); setShowModal(true); }}>
        Cadastrar Livro
      </button>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisar por nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <BookList books={books} onEdit={handleEdit} onDelete={handleDelete} />

      <BookModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSave}
        existingBook={editingBook}
      />
    </div>
  );
}
