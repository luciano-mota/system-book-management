import React, { useEffect, useState } from "react";
import axios from "axios";
import BookList from "../components/books/BookList";
import BookModal from "../components/books/BookModal";

const API = "http://localhost:8080/api/v1/books";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    const response = await axios.get(API);
    setBooks(response.data.data);
  }

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