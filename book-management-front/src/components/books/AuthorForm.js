import React, { useState } from 'react';
import axios from 'axios';

const API_AUTHORS = "http://localhost:8080/api/v1/authors";

export default function AuthorForm({ onAuthorCreated }) {
  const [authorName, setAuthorName] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!authorName.trim()) return;

    try {
      const response = await axios.post(API_AUTHORS, { name: authorName });
      onAuthorCreated(response.data);
      setAuthorName('');
    } catch (error) {
      console.error("Erro ao criar autor:", error);
      alert("Não foi possível criar o autor. Tente novamente.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="authorName" className="form-label">Nome do Autor</label>
        <input
          type="text"
          className="form-control"
          id="authorName"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Digite o nome do autor"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Salvar Autor</button>
    </form>
  );
}