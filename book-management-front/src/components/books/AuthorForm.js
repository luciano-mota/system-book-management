import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useDebounce from '../../hooks/useDebounce';

const API_AUTHORS = "http://localhost:8080/api/v1/authors";

export default function AuthorForm({ onAuthorSelected }) {
  const [authorName, setAuthorName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearchTerm = useDebounce(authorName, 300);

  const searchAuthors = useCallback(async (name) => {
    if (name.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get(API_AUTHORS, { params: { name } });
      setSearchResults(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar autores:", error);
    }
  }, []);

  useEffect(() => {
    searchAuthors(debouncedSearchTerm);
  }, [debouncedSearchTerm, searchAuthors]);

  function handleSelectAuthor(author) {
    setAuthorName(author.name);
    setSearchResults([]);
    onAuthorSelected(author);
  }

  async function handleCreateAuthor(e) {
    e.preventDefault();
    if (!authorName.trim()) return;

    // Verifica se o autor já existe na lista
    const existingAuthor = searchResults.find(author => author.name.toLowerCase() === authorName.trim().toLowerCase());
    if (existingAuthor) {
      handleSelectAuthor(existingAuthor);
      return;
    }

    try {
      const response = await axios.post(API_AUTHORS, { name: authorName });
      onAuthorSelected(response.data.data); // A API encapsula o resultado em 'data'
      setAuthorName('');
    } catch (error) {
      console.error("Erro ao criar autor:", error);
      alert("Não foi possível criar o autor. Tente novamente.");
    }
  }

  return (
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
          autoComplete="off"
          required
        />
        {searchResults.length > 0 && (
          <ul className="list-group position-absolute w-100" style={{ zIndex: 1000 }}>
            {searchResults.map(author => (
              <li
                key={author.id}
                className="list-group-item list-group-item-action"
                onClick={() => handleSelectAuthor(author)}
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