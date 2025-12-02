import React, { useState } from 'react';
import axios from 'axios';

const API_SUBJECTS = "http://localhost:8080/api/v1/subjects";

export default function SubjectForm({ onSubjectCreated }) {
  const [subjectDescription, setSubjectDescription] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!subjectDescription.trim()) return;

    try {
      const response = await axios.post(API_SUBJECTS, { description: subjectDescription });
      onSubjectCreated(response.data);
      setSubjectDescription('');
    } catch (error) {
      console.error("Erro ao criar assunto:", error);
      alert("Não foi possível criar o assunto. Tente novamente.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="subjectDescription" className="form-label">Descrição do Assunto</label>
        <input
          type="text"
          className="form-control"
          id="subjectDescription"
          value={subjectDescription}
          onChange={(e) => setSubjectDescription(e.target.value)}
          placeholder="Digite a descrição do assunto"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Salvar Assunto</button>
    </form>
  );
}