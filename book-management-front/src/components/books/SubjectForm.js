import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useDebounce from '../../hooks/useDebounce';

const API_SUBJECTS = "http://localhost:8080/api/v1/subjects";

export default function SubjectForm({ onSubjectSelected }) {
  const [description, setDescription] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearchTerm = useDebounce(description, 300);

  const searchSubjects = useCallback(async (searchTerm) => {
    if (searchTerm.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    try {
      // Usa 'name' para a busca (query param)
      const response = await axios.get(API_SUBJECTS, { params: { subject: searchTerm } });
      setSearchResults(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar assuntos:", error);
    }
  }, []);

  useEffect(() => {
    searchSubjects(debouncedSearchTerm);
  }, [debouncedSearchTerm, searchSubjects]);

  function handleSelectSubject(subject) {
    // Internamente, o objeto de assunto usa 'description'
    setDescription(subject.description);
    setSearchResults([]);
    onSubjectSelected(subject);
  }

  async function handleCreateSubject(e) {
    e.preventDefault();
    if (!description.trim()) return;

    const existingSubject = searchResults.find(s => s.description.toLowerCase() === description.trim().toLowerCase());
    if (existingSubject) {
      handleSelectSubject(existingSubject);
      return;
    }

    try {
      // Usa 'description' para criar um novo assunto (corpo do POST)
      const response = await axios.post(API_SUBJECTS, { description: description });
      onSubjectSelected(response.data.data);
      setDescription('');
    } catch (error) {
      console.error("Erro ao criar assunto:", error);
      alert("Não foi possível criar o assunto. Tente novamente.");
    }
  }

  return (
    <form onSubmit={handleCreateSubject}>
      <div className="mb-3 position-relative">
        <label htmlFor="subjectDescription" className="form-label">Descrição do Assunto</label>
        <input
          type="text"
          className="form-control"
          id="subjectDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Pesquise ou cadastre um novo assunto"
          autoComplete="off"
          required
        />
        {searchResults.length > 0 && (
          <ul className="list-group position-absolute w-100" style={{ zIndex: 1000 }}>
            {searchResults.map(subject => (
              <li
                key={subject.id}
                className="list-group-item list-group-item-action"
                onClick={() => handleSelectSubject(subject)}
                style={{ cursor: 'pointer' }}
              >
                {subject.description}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit" className="btn btn-primary">Salvar Assunto</button>
    </form>
  );
}