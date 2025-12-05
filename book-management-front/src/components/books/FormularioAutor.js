// Importações necessárias do React, axios e o hook customizado `useDebounce`.
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useDebounce from '../../hooks/useDebounce';

const API_AUTORES = "http://localhost:8080/api/v1/authors";

export default function FormularioAutor({ onAutorSelecionado }) {
  const [nomeAutor, setNomeAutor] = useState('');
  const [resultadosBusca, setResultadosBusca] = useState([]);
  const termoBuscaDebounced = useDebounce(nomeAutor, 300);

  const buscarAutores = useCallback(async (nome) => {
    if (nome.trim().length < 2) {
      setResultadosBusca([]);
      return;
    }
    try {
      const resposta = await axios.get(API_AUTORES, { params: { name: nome } });
      setResultadosBusca(resposta.data.data);
    } catch (error) {
      console.error("Erro ao buscar autores:", error);
    }
  }, []);

  useEffect(() => {
    buscarAutores(termoBuscaDebounced);
  }, [termoBuscaDebounced, buscarAutores]);

  function selecionarAutor(autor) {
    onAutorSelecionado(autor);
    setNomeAutor(''); // Limpa o campo de busca
    setResultadosBusca([]); // Esconde a lista de resultados
  }

  async function criarAutor(e) {
    e.preventDefault();
    if (!nomeAutor.trim()) return;

    const autorExistente = resultadosBusca.find(autor => autor.name.toLowerCase() === nomeAutor.trim().toLowerCase());
    if (autorExistente) {
      selecionarAutor(autorExistente);
      return;
    }

    try {
      const resposta = await axios.post(API_AUTORES, { name: nomeAutor });
      onAutorSelecionado(resposta.data.data);
      setNomeAutor('');
    } catch (error) {
      console.error("Erro ao criar autor:", error);
      alert("Não foi possível criar o autor. Tente novamente.");
    }
  }

  return (
    <form onSubmit={criarAutor}>
      <div className="mb-3 position-relative">
        <label htmlFor="nomeAutor" className="form-label">Nome do Autor</label>
        <input
          type="text"
          className="form-control"
          id="nomeAutor"
          value={nomeAutor}
          onChange={(e) => setNomeAutor(e.target.value)}
          placeholder="Pesquise ou cadastre um novo autor"
          autoComplete="off"
          required
        />
        {resultadosBusca.length > 0 && (
          <ul className="list-group position-absolute w-100" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto', top: '100%' }}>
            {resultadosBusca.map(autor => (
              <li
                key={autor.id}
                className="list-group-item list-group-item-action"
                onClick={() => selecionarAutor(autor)}
                style={{ cursor: 'pointer' }}
              >
                {autor.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit" className="btn btn-primary">Salvar Autor</button>
    </form>
  );
}