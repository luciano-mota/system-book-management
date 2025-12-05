// Importações necessárias do React, axios e o hook customizado `useDebounce`.
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useDebounce from '../../hooks/useDebounce'; // Hook para atrasar a execução de uma função.

// Endereço da API para operações com autores.
const API_AUTORES = "http://localhost:8080/api/v1/authors";

/**
 * Componente FormularioAutor: Permite buscar, selecionar ou cadastrar um novo autor.
 *
 * @param {object} props - As propriedades do componente.
 * @param {function} props.onAutorSelecionado - Função de callback chamada quando um autor
 *                                              é selecionado ou criado.
 */
export default function FormularioAutor({ onAutorSelecionado }) {
  // nomeAutor: Estado que armazena o texto digitado no campo de busca/cadastro de autor.
  const [nomeAutor, setNomeAutor] = useState('');
  // resultadosBusca: Estado que armazena a lista de autores retornada pela API de busca.
  const [resultadosBusca, setResultadosBusca] = useState([]);
  // termoBuscaDebounced: Versão "atrasada" de nomeAutor, usada para evitar chamadas excessivas à API.
  const termoBuscaDebounced = useDebounce(nomeAutor, 300); // Atraso de 300ms.

  // --- FUNÇÕES DE LÓGICA E DADOS ---

  /**
   * buscarAutores: Função assíncrona para buscar autores na API com base no nome.
   * Utiliza useCallback para memorizar a função.
   * @param {string} nome - O termo de busca para autores.
   */
  const buscarAutores = useCallback(async (nome) => {
    // Só realiza a busca se o termo tiver pelo menos 2 caracteres.
    if (nome.trim().length < 2) {
      setResultadosBusca([]); // Limpa os resultados se o termo for muito curto.
      return;
    }
    try {
      // Faz a chamada GET para a API, passando o termo de busca como parâmetro.
      const resposta = await axios.get(API_AUTORES, { params: { name: nome } });
      setResultadosBusca(resposta.data.data); // Atualiza os resultados da busca.
    } catch (error) {
      console.error("Erro ao buscar autores:", error);
    }
  }, []); // Dependências vazias, pois 'nome' é passado como argumento.

  /**
   * useEffect: Hook que observa mudanças no 'termoBuscaDebounced'.
   * Quando o termo debounced muda, a função 'buscarAutores' é chamada.
   */
  useEffect(() => {
    buscarAutores(termoBuscaDebounced);
  }, [termoBuscaDebounced, buscarAutores]); // Dependências: executa quando o termo debounced ou a função de busca mudam.

  /**
   * selecionarAutor: Função chamada quando um autor é selecionado da lista de resultados.
   * @param {object} autor - O objeto do autor selecionado.
   */
  function selecionarAutor(autor) {
    onAutorSelecionado(autor); // Notifica o componente pai com o autor selecionado.
    setNomeAutor(''); // Limpa o campo de busca.
    setResultadosBusca([]); // Esconde a lista de resultados.
  }

  /**
   * criarAutor: Função assíncrona para cadastrar um novo autor ou selecionar um existente.
   * Chamada na submissão do formulário.
   * @param {object} e - Evento de submissão do formulário.
   */
  async function criarAutor(e) {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página.
    if (!nomeAutor.trim()) return; // Não faz nada se o campo estiver vazio.

    // Verifica se o nome digitado corresponde exatamente a um autor já listado nos resultados da busca.
    const autorExistente = resultadosBusca.find(autor => autor.name.toLowerCase() === nomeAutor.trim().toLowerCase());
    if (autorExistente) {
      selecionarAutor(autorExistente); // Se existir, trata como uma seleção.
      return;
    }

    try {
      // Se não existe, faz uma requisição POST para criar um novo autor.
      const resposta = await axios.post(API_AUTORES, { name: nomeAutor });
      onAutorSelecionado(resposta.data.data); // Notifica o pai com os dados do novo autor.
      setNomeAutor(''); // Limpa o campo de busca.
    } catch (error) {
      console.error("Erro ao criar autor:", error);
      alert("Não foi possível criar o autor. Tente novamente.");
    }
  }

  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    <form onSubmit={criarAutor}>
      <div className="mb-3 position-relative">
        <label htmlFor="nomeAutor" className="form-label">Nome do Autor</label>
        <input
          type="text"
          className="form-control"
          id="nomeAutor"
          value={nomeAutor}
          onChange={(e) => setNomeAutor(e.target.value)} // Atualiza o estado 'nomeAutor' ao digitar.
          placeholder="Pesquise ou cadastre um novo autor"
          autoComplete="off" // Desativa o preenchimento automático do navegador.
          required // Campo obrigatório.
        />
        {/* Exibe a lista de resultados da busca apenas se houver resultados. */}
        {resultadosBusca.length > 0 && (
          <ul className="list-group position-absolute w-100" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto', top: '100%' }}>
            {resultadosBusca.map(autor => (
              <li
                key={autor.id}
                className="list-group-item list-group-item-action"
                onClick={() => selecionarAutor(autor)} // Ao clicar, seleciona o autor.
                style={{ cursor: 'pointer' }}
              >
                {autor.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Botão para submeter o formulário (criar ou selecionar autor). */}
      <button type="submit" className="btn btn-primary">Salvar Autor</button>
    </form>
  );
}