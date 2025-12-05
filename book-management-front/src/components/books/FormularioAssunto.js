import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useDebounce from '../../hooks/useDebounce';

const API_ASSUNTOS = "http://localhost:8080/api/v1/subjects";

export default function FormularioAssunto({ onAssuntoSelecionado }) {
  const [descricao, setDescricao] = useState('');
  const [resultadosBusca, setResultadosBusca] = useState([]);
  const termoBuscaDebounced = useDebounce(descricao, 300);

  const buscarAssuntos = useCallback(async (termoBusca) => {
    if (termoBusca.trim().length < 2) {
      setResultadosBusca([]);
      return;
    }
    try {
      const resposta = await axios.get(API_ASSUNTOS, { params: { subject: termoBusca } });
      setResultadosBusca(resposta.data.data);
    } catch (error) {
      console.error("Erro ao buscar assuntos:", error);
    }
  }, []);

  useEffect(() => {
    buscarAssuntos(termoBuscaDebounced);
  }, [termoBuscaDebounced, buscarAssuntos]);

  function selecionarAssunto(assunto) {
    onAssuntoSelecionado(assunto);
    setDescricao(''); // Limpa o campo de busca
    setResultadosBusca([]); // Esconde a lista de resultados
  }

  async function criarAssunto(e) {
    e.preventDefault();
    if (!descricao.trim()) return;

    const assuntoExistente = resultadosBusca.find(s => s.description.toLowerCase() === descricao.trim().toLowerCase());
    if (assuntoExistente) {
      selecionarAssunto(assuntoExistente);
      return;
    }

    try {
      const resposta = await axios.post(API_ASSUNTOS, { description: descricao });
      onAssuntoSelecionado(resposta.data.data);
      setDescricao('');
    } catch (error) {
      console.error("Erro ao criar assunto:", error);
      alert("Não foi possível criar o assunto. Tente novamente.");
    }
  }

  return (
    <form onSubmit={criarAssunto}>
      <div className="mb-3 position-relative">
        <label htmlFor="descricaoAssunto" className="form-label">Descrição do Assunto</label>
        <input
          type="text"
          className="form-control"
          id="descricaoAssunto"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Pesquise ou cadastre um novo assunto"
          autoComplete="off"
          required
        />
        {resultadosBusca.length > 0 && (
          <ul className="list-group position-absolute w-100" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto', top: '100%' }}>
            {resultadosBusca.map(assunto => (
              <li
                key={assunto.id}
                className="list-group-item list-group-item-action"
                onClick={() => selecionarAssunto(assunto)}
                style={{ cursor: 'pointer' }}
              >
                {assunto.description}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit" className="btn btn-primary">Salvar Assunto</button>
    </form>
  );
}