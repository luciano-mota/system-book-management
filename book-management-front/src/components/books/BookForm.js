import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_AUTHORS = "http://localhost:8080/api/v1/authors";
const API_SUBJECTS = "http://localhost:8080/api/v1/subjects";

export default function BookForm({ onBookSaved, existingBook }) {
  const [form, setForm] = useState({
    bookCode: '',
    title: '',
    publisher: '',
    edition: '',
    yearPublication: '',
    price: '',
    authorsIds: [],
    subjectsIds: []
  });
  const [authors, setAuthors] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [authorSearch, setAuthorSearch] = useState('');

  useEffect(() => {
    if (existingBook) {
      setForm({
        ...existingBook,
        authorsIds: existingBook.authors.map(a => a.id),
        subjectsIds: existingBook.subjects.map(s => s.id)
      });
    }
    loadSubjects();
  }, [existingBook]);

  useEffect(() => {
    const params = authorSearch ? { name: authorSearch } : {};
    axios.get(API_AUTHORS, { params }).then(response => {
      setAuthors(response.data.data);
    });
  }, [authorSearch]);

  async function loadSubjects() {
    const response = await axios.get(API_SUBJECTS);
    setSubjects(response.data.data);
  }

  function handleChange(e) {
    const { name, value, type, selectedOptions } = e.target;
    if (type === 'select-multiple') {
      const values = Array.from(selectedOptions).map(option => parseInt(option.value));
      setForm(prev => ({ ...prev, [name]: values }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onBookSaved(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Book details */}
      <div className="row">
        <div className="col">
          <label>Código</label>
          <input type="number" name="bookCode" value={form.bookCode} onChange={handleChange} className="form-control" required />
        </div>
        <div className="col">
          <label>Título</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} className="form-control" required />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          <label>Editora</label>
          <input type="text" name="publisher" value={form.publisher} onChange={handleChange} className="form-control" required />
        </div>
        <div className="col">
          <label>Edição</label>
          <input type="text" name="edition" value={form.edition} onChange={handleChange} className="form-control" required />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          <label>Ano</label>
          <input type="text" name="yearPublication" value={form.yearPublication} onChange={handleChange} className="form-control" required />
        </div>
        <div className="col">
          <label>Preço</label>
          <input type="text" name="price" value={form.price} onChange={handleChange} className="form-control" required />
        </div>
      </div>

      {/* Author search and selection */}
      <div className="mt-3">
        <label>Buscar Autor</label>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Digite para buscar..."
          value={authorSearch}
          onChange={e => setAuthorSearch(e.target.value)}
        />
        <label>Autores</label>
        <select name="authorsIds" className="form-control" multiple value={form.authorsIds} onChange={handleChange} required>
          {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
      </div>

      {/* Subject selection */}
      <div className="mt-3">
        <label>Assuntos</label>
        <select name="subjectsIds" className="form-control" multiple value={form.subjectsIds} onChange={handleChange} required>
          {subjects.map(s => <option key={s.id} value={s.id}>{s.description}</option>)}
        </select>
      </div>

      <button type="submit" className="btn btn-primary mt-3">{existingBook ? 'Atualizar' : 'Salvar'} Livro</button>
    </form>
  );
}