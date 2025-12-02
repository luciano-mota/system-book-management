// src/pages/Books.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8080/api/v1/books";
const API_AUTHORS = "http://localhost:8080/api/v1/authors";
const API_SUBJECTS = "http://localhost:8080/api/v1/subjects";

export default function Books() {
  const [books, setBooks] = useState([]);

  const [authors, setAuthors] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [form, setForm] = useState({
    bookCode: "",
    title: "",
    publisher: "",
    edition: "",
    yearPublication: "",
    price: "",
    authorsIds: [],
    subjectsIds: []
  });

  const [editId, setEditId] = useState(null);

  async function carregarLivros() {
    const response = await axios.get(API);
    setBooks(response.data.data);
  }

  async function carregarAutores() {
    const response = await axios.get(API_AUTHORS);
    setAuthors(response.data.data);
  }

  async function carregarAssuntos() {
    const response = await axios.get(API_SUBJECTS);
    setSubjects(response.data.data);
  }

  useEffect(() => {
    carregarLivros();
    carregarAutores();
    carregarAssuntos();
  }, []);

  function atualizarFormulario(e) {
    const { name, value } = e.target;

    if (name === "authorsIds" || name === "subjectsIds") {
      const selected = Array.from(e.target.selectedOptions).map((opt) =>
          parseInt(opt.value)
      );
      setForm({ ...form, [name]: selected });
      return;
    }

    setForm({ ...form, [name]: value });
  }

  async function save(e) {
    e.preventDefault();

    const payload = {
      bookCode: parseInt(form.bookCode),
      title: form.title,
      publisher: form.publisher,
      edition: form.edition,
      yearPublication: form.yearPublication,
      price: form.price,
      authorsIds: form.authorsIds,
      subjectsIds: form.subjectsIds
    };

    if (editId) {
      await axios.put(`${API}/${editId}`, payload);
    } else {
      await axios.post(API, payload);
    }

    resetarFormulario();
    carregarLivros();
  }

  function resetarFormulario() {
    setForm({
      bookCode: "",
      title: "",
      publisher: "",
      edition: "",
      yearPublication: "",
      price: "",
      authorsIds: [],
      subjectsIds: []
    });
    setEditId(null);
  }

  function selectBook(book) {
    setEditId(book.id);
    setForm({
      bookCode: book.bookCode,
      title: book.title,
      publisher: book.publisher,
      edition: book.edition,
      yearPublication: book.yearPublication,
      price: book.price,
      authorsIds: book.authors,
      subjectsIds: book.subjects
    });
  }

  async function remove(id) {
    if (!window.confirm("Confirmar exclusão?")) return;
    await axios.delete(`${API}/${id}`);
    carregarLivros();
  }

  return (
    <div className="container mt-4">
      <h2>Gerenciador de Livros</h2>

      {/* Formulário */}
      <form onSubmit={save} className="mt-3 mb-4">
        <div className="row">
          <div className="col">
            <label>Código do Livro</label>
            <input
              type="number"
              name="bookCode"
              className="form-control"
              value={form.bookCode}
              onChange={atualizarFormulario}
              required
            />
          </div>

          <div className="col">
            <label>Título</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={form.title}
              onChange={atualizarFormulario}
              required
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col">
            <label>Editora</label>
            <input
              type="text"
              name="publisher"
              className="form-control"
              value={form.publisher}
              onChange={atualizarFormulario}
              required
            />
          </div>

          <div className="col">
            <label>Edição</label>
            <input
              type="text"
              name="edition"
              className="form-control"
              value={form.edition}
              onChange={atualizarFormulario}
              required
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col">
            <label>Ano de Publicação</label>
            <input
              type="text"
              name="yearPublication"
              className="form-control"
              value={form.yearPublication}
              onChange={atualizarFormulario}
              required
            />
          </div>

          <div className="col">
            <label>Preço (R$)</label>
            <input
              type="text"
              name="price"
              className="form-control"
              value={form.price}
              onChange={atualizarFormulario}
              required
            />
          </div>
        </div>

        {/* Autores */}
        <div className="mt-3">
          <label>Autores</label>
          <select
            name="authorsIds"
            className="form-control"
            multiple
            value={form.authorsIds}
            onChange={atualizarFormulario}
            required
          >
            {authors.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
            ))}
          </select>
        </div>

        {/* Assuntos */}
        <div className="mt-3">
          <label>Assuntos</label>
          <select
            name="subjectsIds"
            className="form-control"
            multiple
            value={form.subjectsIds}
            onChange={atualizarFormulario}
            required
          >
            {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.description}
                </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary mt-3" type="submit">{editId ? "Atualizar" : "Cadastrar"}</button>

        {editId && (
            <button className="btn btn-secondary ms-2 mt-3" onClick={resetarFormulario}>Cancelar</button>
        )}
      </form>

      {/* Tabela */}
      <table className="table table-striped mt-4">
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
          <th>Ações</th>
        </tr>
        </thead>

        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.bookCode}</td>
              <td>{b.title}</td>
              <td>{b.publisher}</td>
              <td>{b.yearPublication}</td>
              <td>{b.price}</td>
              <td>{b.authors.join(", ")}</td>
              <td>{b.subjects.join(", ")}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => selectBook(b)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => remove(b.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>
  );
}
